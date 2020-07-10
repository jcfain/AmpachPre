function SongsAssistant() {
	document.getElementById('sceneStyle').style.backgroundImage =  "url(" + backGroundImage + ")";
	document.getElementById('sceneStyle').style.color =  textColor;
	document.getElementById('listBorder').style.border =  "2px solid "+textColor;
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		document.getElementById('scrollerId').style.height = '260px';
	}
}

SongsAssistant.prototype.setup = function() {
	this.controller.get('scrimSpinner').hide();
	this.controller.setupWidget(Mojo.Menu.appMenu, accountsAttr, appMenuModel);	
	
		this.cmdMenuModel = {
  				visible: true,
  					items: [				
							{label: $L(''),icon: 'home',command: 'backToSearch'},
							{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'}, {label: $L(''), icon:'playAll', command:'playAll'},{label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
							{label: $L(''),icon: 'list', command: 'viewPlaylist'},
  							]
						};
		this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass:'no-fade'}, this.cmdMenuModel);

		this.viewMenuModel = {
  				visible: true,
  					items: [{
    					items: [
								{label: $L(album),icon: '',command: 'openWiki', width:260},
	      						{label: $L(''),icon: 'menu',command: 'sortMenu'},
    							]
  							}]
						};
		this.controller.setupWidget(Mojo.Menu.viewMenu, {spacerHeight: 0, menuClass:'no-fade'}, this.viewMenuModel);
	
	this.controller.setupWidget("listSongsWidget", {
        itemTemplate: "songs/rowTemplate",
        listTemplate: "songs/listTemplate",
		swipeToDelete: true,
		fixedHeightItems: true,
		autoconfirmDelete: true,
		hasNoWidgets: true,
		renderLimit: 20,
    },  
	this.listSongsModel = {
        items: listSongs
    });
    this.playSongHandler = this.playSong.bindAsEventListener(this);	
	this.listSongsWidgetHandler=this.controller.get('listSongsWidget');
	this.swipeAddToPlayListHandler = this.swipeAddToPlayList.bindAsEventListener(this);
	this.popupHandler = this.popup.bind(this)	
	//this.openWikiHandler = this.openWiki.bind(this)
	//this.menuHandler = this.menu.bind(this)
	this.sortHandler = this.sort.bind(this)
	//this.playAllHandler = this.playAll.bind(this)
	
	//spinner
   this.controller.setupWidget("spinner",
         this.attributes = {
             spinnerSize: 'large'
         },
         this.model = {
             spinning: false 
         });	 
		

	this.controller.setupWidget("scrollerId",
         this.scrollerAttributes = {
             mode: 'vertical'
         },
         this.scrollerModel = {
         });
		 //$('playAll').innerHTML = "<img src="+albumArt+" height=32px width=32px></img>"
		// $('name').innerHTML = album	
}

SongsAssistant.prototype.activate = function(event) {
		stageAss.listResize()
	Mojo.Event.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.listen(this.listSongsWidgetHandler, Mojo.Event.listTap, this.playSongHandler);
	this.controller.listen(this.listSongsWidgetHandler, Mojo.Event.listDelete, this.swipeAddToPlayListHandler);
	Mojo.Event.listen(this.controller.window, 'resize', listResizeHandler);
	//this.controller.listen($('playAll'), Mojo.Event.tap, this.playAllHandler)
	//this.controller.listen($('name'), Mojo.Event.tap, this.openWikiHandler)
	//this.controller.listen($('menu'), Mojo.Event.tap, this.menuHandler)
}


SongsAssistant.prototype.deactivate = function(event) {
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.stopListening(this.listSongsWidgetHandler, Mojo.Event.listTap, this.playSongHandler);
	this.controller.stopListening(this.listSongsWidgetHandler, Mojo.Event.listDelete, this.swipeAddToPlayListHandler);
	Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
	//this.controller.stopListening($('playAll'), Mojo.Event.tap, this.playAllHandler)
	//this.controller.stopListening($('name'), Mojo.Event.tap, this.openWikiHandler)
	//this.controller.stopListening($('menu'), Mojo.Event.tap, this.menuHandler)
	accountsAss.resetToggleSorts()
}

SongsAssistant.prototype.cleanup = function(event) {
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.stopListening(this.listSongsWidgetHandler, Mojo.Event.listTap, this.playSongHandler);
	this.controller.stopListening(this.listSongsWidgetHandler, Mojo.Event.listDelete, this.swipeAddToPlayListHandler);
	Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
	//this.controller.stopListening($('playAll'), Mojo.Event.tap, this.playAllHandler)
	//this.controller.stopListening($('name'), Mojo.Event.tap, this.openWikiHandler)
	//this.controller.stopListening($('menu'), Mojo.Event.tap, this.menuHandler)
	listSongs.length = 0;
}

SongsAssistant.prototype.selectSong = function(event){
	listIndex=event.index;
	//songAtIndex=listSongs[listIndex].song;
	//artistAtIndex=listSongs[listIndex].artist;
	//albumAtIndex=listSongs[listIndex].album;
	//Mojo.Controller.errorDialog(artAtIndex);
	//artAtIndex="<img src=\""+listSongs[listIndex].art+"\" width=\"225\" height=\"225\"></img>";
	//songUrl=listSongs[listIndex].url
	
//	if (listSongs[listIndex].type == 'mp3' || listSongs[listIndex].type == 'aac' || listSongs[listIndex].type == 'wav' || listSongs[listIndex].type == 'amr' || listSongs[listIndex].type == 'qcp') {
		this.controller.showAlertDialog({
			onChoose: function(value){
				if (value == "add") {
					this.addToPlayList();
				}
				else 
					if (value == "play") {
						this.playSong();
					}
				else 
					if (value == "albumAdd") {
						this.albumAdd();
					}
					else 
						if (value == "cancel") {
						}
			},
			title: $L("What do you want to do?"),
			choices: [{
				label: $L("Play from Selection"),
				value: "play", type:'primary'
			}, {
				label: $L("Add To Playlist"),
				value: "add", type:'primary'
			}, {
				label: $L("Album To Playlist"),
				value: "albumAdd", type:'primary'
			}, {
				label: $L("Cancel"),
				value: "cancel", type:'dismiss'
			}]
		});
//	}
//	else {Mojo.Controller.errorDialog("Sorry this is not a playable format");}
}

/*SongsAssistant.prototype.playSong = function(){
this.controller.stageController.pushScene("stream", songUrl);
}*/
SongsAssistant.prototype.handleCommand = function(event){
	if (event.type == Mojo.Event.command) {
	
		switch (event.command) {
			case 'playAll':
				this.playAll();
				break;
			case 'sortMenu':
				this.menu(event);
			break;
			case 'openWiki':
				this.openWiki();
			break;
		}
	}
	if (event.type == Mojo.Event.back) {
	 // lastScene = 'artists'
	//	this.controller.stageController.swapScene(lastScene);
	}	
}	
SongsAssistant.prototype.addToPlayList = function(){
	//Mojo.Controller.errorDialog("Tha game stops here.");

	playListItems[newPlayListIndex]={
					song: listSongs[listIndex].song,
					songId: listSongs[listIndex].songId,
					time: listSongs[listIndex].time,
					artist: listSongs[listIndex].artist,
					album: listSongs[listIndex].album,
					url: listSongs[listIndex].url,
					size: listSongs[listIndex].size,
					art: listSongs[listIndex].art
					};	
	/*this.controller.showAlertDialog({
		onChoose: function(value){},
		title: $L("Success!!"),
		message: $L("Song \"" + playListItems[newPlayListIndex].song + "\" added @ slot "+playListItems.length),
		choices: [{
			label: $L("OK"),
			value: ""
		}]
	});	*/
	//Mojo.Controller.errorDialog(playListItems[0].song);	
		newPlayListIndex=newPlayListIndex+1;
	//Mojo.Controller.errorDialog(newPlayListIndex);
}
SongsAssistant.prototype.playSong = function(event){
	if (internet == true) {
		var target = event.originalEvent.target.className;
		popupIndex = event.index;
		// Mojo.Controller.errorDialog(target);
		if (target !== "addFavs") {
			this.controller.get('spinner').mojo.start();
			this.controller.get('scrimSpinner').show();
			listIndex = event.index;
			/*	if (useWeb == 'yes') {
			 this.controller.serviceRequest('palm://com.palm.applicationManager', {
			 method: 'open',
			 parameters: {
			 target: listSongs[listIndex].url
			 }
			 });
			 }
			 else {*/
			//playlist = 'false'
			//lastScene = 'songs'
			//	this.controller.stageController.pushScene("stream", true)
			this.controller.stageController.pushScene({
				name: "stream",
				//transition: Mojo.Transition.crossFade,
				disableSceneScroller: true
			}, true);
			if(ticketNumArray.length != 0){
				audioAss.deleteSongs();
			}
			audioAss.clone(listSongs)
			this.controller.get('scrimSpinner').hide();
			this.controller.get('spinner').mojo.stop();
		}
		else {
			this.controller.popupSubmenu({
				onChoose: this.popupHandler,
				placeNear: event.originalEvent.target,
				items: [{
					label: 'Add to Now Playing',
					command: 'addToNow'
				}, {
					label: 'Add to Playlist',
					command: 'addToList'
				}, {
					label: 'Bookmark Song',
					command: 'addToFavs'
				}, {
					label: 'Cancel',
					command: 'cancel'
				}]
			});
		}
	}
	else {
		Mojo.Controller.errorDialog("No Internet available");
	}//transition: Mojo.Transition.crossFade
	//}
}
SongsAssistant.prototype.albumAdd = function() {
		for (i=0; i<listSongs.length; i++){
			playListItems[newPlayListIndex]={
					song: listSongs[i].song,
					songId: listSongs[i].songId,
					time: listSongs[i].time,
					artist: listSongs[i].artist,
					album: listSongs[i].album,
					url: listSongs[i].url,
					size: listSongs[i].size,
					art: listSongs[i].art
					}
		newPlayListIndex=newPlayListIndex+1;
		}
}
SongsAssistant.prototype.swipeAddToPlayList = function(event){
	//Mojo.Controller.errorDialog("Tha game stops here.");
	if (tapToAdd == true) {
		playListIndex = popupIndex
	}
	else {
		playListIndex = event.index
	}
	playListItems[newPlayListIndex]={
					song: listSongs[playListIndex].song,
					songId: listSongs[playListIndex].songId,
					time: listSongs[playListIndex].time,
					timeUnformatted: parseFloat(listSongs[playListIndex].timeUnformatted),
					artist: listSongs[playListIndex].artist,
					album: listSongs[playListIndex].album,
					url: listSongs[playListIndex].url,
					size: listSongs[playListIndex].size,
					art: listSongs[playListIndex].art,
					source: 'playlist',
					urlAdd: false
					};	
		playListSum = playListSum + playListItems[newPlayListIndex].timeUnformatted;
		//Mojo.Controller.errorDialog(playListSum)
	/*this.controller.showAlertDialog({
		onChoose: function(value){},
		title: $L("Success!!"),
		message: $L("Song \"" + playListItems[newPlayListIndex].song + "\" added @ slot "+playListItems.length),
		choices: [{
			label: $L("OK"),
			value: ""
		}]
	});	*/
	//Mojo.Controller.errorDialog(playListItems[0].song);
		Mojo.Controller.getAppController().showBanner(playListItems[newPlayListIndex].song+' added to playlist.', {
			source: 'notification'
		});	
		newPlayListIndex=newPlayListIndex+1;
	if (tapToAdd == false) {
		listSongs.splice(playListIndex, 1)
	}
		tapToAdd = false
		/*this.listSongsModel.items=listSongs;
		this.controller.modelChanged(this.listSongsModel);*/
	//Mojo.Controller.errorDialog(newPlayListIndex);
}
SongsAssistant.prototype.popup = function(command){
		switch (command) {
		
			case 'addToFavs':
				this.addToFavs();
				break;
			case 'addToList':
				tapToAdd = true
				this.swipeAddToPlayList();
				break;
			case 'addToNow':
				//tapToAdd = true
				audioAss.addToNowPlaying(listSongs[popupIndex])
				break;
			case 'cancel':
				//function(){};
				break;
		}

}
SongsAssistant.prototype.addToFavs = function(event){
/*
						favoritesArray[i].image = "images/song50px.png"
						favoritesArray[i].textName = favoritesArray[i].song
						favoritesArray[i].textArtist = favoritesArray[i].artist
*/
favoritesArray.push({
					type: 'song',
					song: listSongs[popupIndex].song,
					songId: listSongs[popupIndex].songId,
					time: listSongs[popupIndex].time,
					timeUnformatted: parseFloat(listSongs[popupIndex].timeUnformatted),
					artist: listSongs[popupIndex].artist,
					album: listSongs[popupIndex].album,
					url: listSongs[popupIndex].url,
					size: listSongs[popupIndex].size,
					art: listSongs[popupIndex].art,
					image: "images/song50px.png",
					textName: listSongs[popupIndex].song,
					textArtist: listSongs[popupIndex].artist,
	})
		db.add('favList', favoritesArray, function(){
/*
			searchAss.favoritesModel.items = favoritesArray;
			searchAss.controller.modelChanged(searchAss.favoritesModel);
*/
			Mojo.Log.info("SUCCESS SAVE");
			}, function(){ Mojo.Log.error("FAIL SAVE")});
}

SongsAssistant.prototype.playAll = function(event){
			listIndex = 0
			if(ticketNumArray.length != 0){
				audioAss.deleteSongs();
			}
			this.controller.stageController.pushScene({
				name: "stream",
				//transition: Mojo.Transition.crossFade,
				disableSceneScroller: true
			}, true);
			audioAss.clone(listSongs);
}

SongsAssistant.prototype.openWiki = function(){
	albumName = album.replace(/\s+/g, '%20')//.replace(/\W/g, '')
	artistName = artistAlbum.replace(/\s+/g, '%20')//.replace(/\W/g, '')
	this.controller.serviceRequest("palm://com.palm.applicationManager", {
  		method: "open",
 		 parameters:  {
      		id: 'com.palm.app.browser',
     		params: {
          	target: "http://en.m.wikipedia.org/wiki/Special:Search?search="+albumName+'%20'+artistName
      		}
  		}
	});
}

SongsAssistant.prototype.menu = function(event){
		this.controller.popupSubmenu({
			onChoose: this.sortHandler,
			placeNear: event.target,
			items: [{
				label: 'Sort by Song',
				command: 'sortBySong'
			}, {
				label: 'Sort by Track',
				command: 'sortByTrack'
			}, {
				label: 'Sort by Time',
				command: 'sortByTime'
			}, {
				label: 'Sort by Artist',
				command: 'sortByArtist'
			}, {
				label: 'Sort by Album',
				command: 'sortByAlbum'
			}, {
				label: 'Sort by Size',
				command: 'sortBySize'
			}, 
			{label: 'Cancel',command: 'cancel'}
			]
		});

}
SongsAssistant.prototype.sort = function(command){
	
		switch (command) {
		
			case 'sortByArtist':
			accountsAss.sortArray(listSongs, this.listSongsModel, 'artist')
				break;
			case 'sortByAlbum':
			accountsAss.sortArray(listSongs, this.listSongsModel, 'album')
				break;
			case 'sortBySong':
			accountsAss.sortArray(listSongs, this.listSongsModel, 'song')
				break;
			case 'sortByTime':
			accountsAss.sortArray(listSongs, this.listSongsModel, 'time')
				break;
			case 'sortByTrack':
			accountsAss.sortArray(listSongs, this.listSongsModel, 'track')
				break;
			case 'sortBySize':
			accountsAss.sortArray(listSongs, this.listSongsModel, 'size')
				break;
			case 'cancel':
				break;
		}

}