function AlbumsAssistant() {
	document.getElementById('sceneStyle').style.backgroundImage =  "url(" + backGroundImage + ")";
	document.getElementById('sceneStyle').style.color =  textColor;
	document.getElementById('listBorder').style.border =  "2px solid "+textColor;
	//document.getElementById('name').style.color =  textColor;
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		Mojo.Log.info('Pixi sized')
		document.getElementById('scrollerId').style.height = '260px';
	}
}

AlbumsAssistant.prototype.setup = function() {
	albumsAss = this
	this.controller.get('scrimSpinner').hide();
	this.controller.setupWidget(Mojo.Menu.appMenu, accountsAttr, appMenuModel);
	
		
		this.cmdMenuModel = {
  				visible: true,
  					items: [
							{label: $L(''),icon: 'home',command: 'backToSearch'},
							//{label: $L(''),icon: 'lists',command: 'savedPlaylists'},
   							//{label: $L(''), icon:'downloads', command:'downloads'},
							{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'}, {label: $L(''), icon:'playAll', command:'playAll'},{label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
							{label: $L(''),icon: 'list', command: 'viewPlaylist'},
  							]
						};
	this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass:'no-fade'}, this.cmdMenuModel);
	
			this.viewMenuModel = {
  				visible: true,
  					items: [{
    					items: [
								{label: $L(artistInfo),icon: '',command: 'openWiki', width:260},
	      						{label: $L(''),icon: 'menu',command: 'sortMenu'},
    							]
  							}]
						};
		this.controller.setupWidget(Mojo.Menu.viewMenu, {spacerHeight: 0, menuClass:'no-fade'}, this.viewMenuModel);
		
	this.controller.setupWidget("listAlbumsWidget", {
        itemTemplate: "albums/rowTemplate",
        listTemplate: "albums/listTemplate",
		swipeToDelete: true,
		fixedHeightItems: true,
		autoconfirmDelete: true,
		hasNoWidgets: true,
		renderLimit: 20,
    },  
	this.listAlbumsModel = {
        items: listAlbums
    });
    this.readSongsHandler = this.readSongs.bindAsEventListener(this);
	this.listAlbumsWidgetHandler=this.controller.get('listAlbumsWidget');
	this.swipeAddToPlayListHandler = this.swipeAddToPlayList.bindAsEventListener(this);	
	this.songListHandler = this.songList.bind(this)
	this.popupHandler = this.popup.bind(this)	
	//this.openWikiHandler = this.openWiki.bind(this)
	//this.menuHandler = this.menu.bind(this)
	this.sortHandler = this.sort.bind(this)
	//spinner
	this.controller.setupWidget("spinner",
         this.attributes = {
             spinnerSize: 'large'
         },
         this.model = {
             spinning: false 
         });	
		 
	this.controller.setupWidget("spinnerSmall", 
		this.spinnerSmallAttributes = {
			spinnerSize: 'small'
		}, 
		this.spinnerSmallModel = {
			spinning: false
		});		
		
	
	this.controller.setupWidget("scrollerId",
         this.scrollerAttributes = {
             mode: 'vertical'
         },
         this.scrollerModel = {
         });		
		 //$('name').innerHTML = artistInfo 	
}

AlbumsAssistant.prototype.activate = function(event) {
	stageAss.listResize()
	this.controller.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.listen(this.listAlbumsWidgetHandler, Mojo.Event.listTap, this.readSongsHandler);	 
	this.controller.listen(this.listAlbumsWidgetHandler, Mojo.Event.listDelete, this.swipeAddToPlayListHandler); 
	Mojo.Event.listen(this.controller.window, 'resize', listResizeHandler);
	//this.controller.listen($('menu'), Mojo.Event.tap, this.menuHandler)
	//this.controller.listen($('name'), Mojo.Event.tap, this.openWikiHandler)
}


AlbumsAssistant.prototype.deactivate = function(event) {
	this.controller.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.stopListening(this.listAlbumsWidgetHandler, Mojo.Event.listTap, this.readSongsHandler);	 
	this.controller.stopListening(this.listAlbumsWidgetHandler, Mojo.Event.listDelete, this.swipeAddToPlayListHandler); 
	Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
	//this.controller.stopListening($('menu'), Mojo.Event.tap, this.menuHandler)	 
	//this.controller.stopListening($('name'), Mojo.Event.tap, this.openWikiHandler)	  
		accountsAss.resetToggleSorts()
}

AlbumsAssistant.prototype.cleanup = function(event) {
	this.controller.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.stopListening(this.listAlbumsWidgetHandler, Mojo.Event.listTap, this.readSongsHandler);		 
	this.controller.stopListening(this.listAlbumsWidgetHandler, Mojo.Event.listDelete, this.swipeAddToPlayListHandler);
	Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
	//this.controller.stopListening($('menu'), Mojo.Event.tap, this.menuHandler)  
	//this.controller.stopListening($('name'), Mojo.Event.tap, this.openWikiHandler)
listAlbums.length = 0;
totalAlbumsSongs = 0
}

AlbumsAssistant.prototype.readSongs = function(event) {
if (internet == true) {
	var target = event.originalEvent.target.className;
	popupIndex = event.index;
	Mojo.Log.info('target: '+target);
	if (target !== "addFavs") {
		this.controller.get('spinner').mojo.start();
		this.controller.get('scrimSpinner').show();
		albumArt = listAlbums[event.index].art;
		album = listAlbums[event.index].album
		artistAlbum = listAlbums[event.index].artist
		var albumId = listAlbums[event.index].albumId;
		var filterUrl = serverUrl + "/server/xml.server.php?action=album_songs&auth=" + token + "&filter=" + albumId;
			
		//Mojo.Controller.errorDialog(albumArt);
		var request = new Ajax.Request(filterUrl, {
			method: "get",
			evalJSON: "false",
			onComplete: this.songListHandler,
			onFailure: function(){
				Mojo.Controller.errorDialog("there was a problem.");
			}
		});
	}
	else {
		this.controller.popupSubmenu({
			onChoose: this.popupHandler,
			placeNear: event.originalEvent.target,
			items: [{
				label: 'Add to Playlist',
				command: 'addToList'
			}, {
				label: 'Bookmark Album',
				command: 'addToFavs'
			}, 
			{label: 'Cancel',command: 'cancel'}
			]
		});
	}
}
else {
	Mojo.Controller.errorDialog("No Internet available");
}
}

AlbumsAssistant.prototype.songList = function(transport){
			var songs = transport.responseXML.getElementsByTagName('song');
			listSongs = [];
			for (i = 0; i < songs.length; i++) {
				/*var url = songs[i].getElementsByTagName('url')[0].firstChild.data,		
					extension = "";
	
				if (url.length != 0) {
					var dotPos = url.lastIndexOf(".");
				if (dotPos != -1) 
					extension = url.substr(dotPos + 1).toLowerCase(); ;
				}*/

				listSongs[i] = {
					song: songs[i].getElementsByTagName('title')[0].firstChild.data,
					songId: songs[i].getAttribute("id"),
					time: songs[i].getElementsByTagName('time')[0].firstChild.data,
					timeUnformatted: songs[i].getElementsByTagName('time')[0].firstChild.data,
					artist: songs[i].getElementsByTagName('artist')[0].firstChild.data,
					album: songs[i].getElementsByTagName('album')[0].firstChild.data,
					url: songs[i].getElementsByTagName('url')[0].firstChild.data,
					size: songs[i].getElementsByTagName('size')[0].firstChild.data,
					art: songs[i].getElementsByTagName('art')[0].firstChild.data,
					track: songs[i].getElementsByTagName('track')[0].firstChild.data,
					source: 'album',
					//type: extension
				}
	convert = Math.floor(listSongs[i].time / 60);
	convert2 = listSongs[i].time % 60;
	convertString = convert2.toString()
	if (convertString[1] == "." || convertString[1] == undefined){convertSecs = "0"+convertString[0]}
	else{convertSecs = convertString[0]+convertString[1]}
					
					listSongs[i].time = convert + ":" + convertSecs;
			}
			if (artistSearch == true) {
					tempArray = []
					for (i = 0; i < listSongs.length; i++) {
						if (listSongs[i].artist == artist){
							tempArray.push(listSongs[i])
						}
					}
				listSongs = tempArray	
			}
			this.controller.stageController.pushScene({name: "songs", disableSceneScroller: true});
			this.controller.get('scrimSpinner').hide();
			this.controller.get('spinner').mojo.stop();
}
AlbumsAssistant.prototype.swipeAddToPlayList = function(event){	
//	artistPlayListIndex = newPlayListIndex;
//	artistPlayListSum = playListSum;
//	artistArray = playListItems;
	playListSumDifference = 0;
	spliceCount = 0
	//Mojo.Controller.errorDialog("Tha game stops here.");
	if (tapToAdd == true) {
		playListIndex = popupIndex
	}
	else {
		playListIndex = event.index
	}
	this.controller.get('spinnerSmall').mojo.start();
	//this.controller.get('scrimSpinner').show();
	var albumId = listAlbums[playListIndex].albumId;
	var filterUrl = serverUrl + "/server/xml.server.php?action=album_songs&auth=" +token+ "&filter="+albumId;
	//Mojo.Controller.errorDialog(albumArt);
	var request = new Ajax.Request(filterUrl,
  	{
    	method:"get",
		evalJSON: "false",
    		onComplete: function(transport){
							var songs = transport.responseXML.getElementsByTagName('song');
							
				if (artistSearch == true) {
					count = 0
					for (i = 0; i < songs.length; i++) {
						if (songs[i].getElementsByTagName('artist')[0].firstChild.data == artist) {
							count = count+1
						playListItems[newPlayListIndex] = {
							song: songs[i].getElementsByTagName('title')[0].firstChild.data,
							songId: songs[i].getAttribute("id"),
							time: songs[i].getElementsByTagName('time')[0].firstChild.data,
							timeUnformatted: songs[i].getElementsByTagName('time')[0].firstChild.data,
							artist: songs[i].getElementsByTagName('artist')[0].firstChild.data,
							album: songs[i].getElementsByTagName('album')[0].firstChild.data,
							url: songs[i].getElementsByTagName('url')[0].firstChild.data,
							size: songs[i].getElementsByTagName('size')[0].firstChild.data,
							art: songs[i].getElementsByTagName('art')[0].firstChild.data,
							track: songs[i].getElementsByTagName('track')[0].firstChild.data,
							source: 'playlist',
							urlAdd: false
						}
						playListItems[newPlayListIndex].time = parseFloat(playListItems[newPlayListIndex].time)
						playListItems[newPlayListIndex].timeUnformatted = parseFloat(playListItems[newPlayListIndex].timeUnformatted)
						playListSum = playListSum + playListItems[newPlayListIndex].time
						convert = Math.floor(playListItems[newPlayListIndex].time / 60);
						convert2 = playListItems[newPlayListIndex].time % 60;
						convertString = convert2.toString()
						if (convertString[1] == "." || convertString[1] == undefined) {
							convertSecs = "0" + convertString[0]
						}
						else {
							convertSecs = convertString[0] + convertString[1]
						}
						playListItems[newPlayListIndex].time = convert + ":" + convertSecs;
						newPlayListIndex = newPlayListIndex + 1;
						}
					}
					//albumsAss.controller.get('scrimSpinner').hide();
					albumsAss.controller.get('spinnerSmall').mojo.stop();
		Mojo.Controller.getAppController().showBanner(count+' songs added to playlist.', {
			source: 'notification'
		});
				}
				else {
					for (i = 0; i < songs.length; i++) {
						playListItems[newPlayListIndex] = {
							song: songs[i].getElementsByTagName('title')[0].firstChild.data,
							songId: songs[i].getAttribute("id"),
							time: songs[i].getElementsByTagName('time')[0].firstChild.data,
							timeUnformatted: songs[i].getElementsByTagName('time')[0].firstChild.data,
							artist: songs[i].getElementsByTagName('artist')[0].firstChild.data,
							album: songs[i].getElementsByTagName('album')[0].firstChild.data,
							url: songs[i].getElementsByTagName('url')[0].firstChild.data,
							size: songs[i].getElementsByTagName('size')[0].firstChild.data,
							art: songs[i].getElementsByTagName('art')[0].firstChild.data,
							track: songs[i].getElementsByTagName('track')[0].firstChild.data,
							source: 'playlist',
							urlAdd: false
						}
						playListItems[newPlayListIndex].time = parseFloat(playListItems[newPlayListIndex].time)
						playListItems[newPlayListIndex].timeUnformatted = parseFloat(playListItems[newPlayListIndex].timeUnformatted)
						playListSum = playListSum + playListItems[newPlayListIndex].time
						convert = Math.floor(playListItems[newPlayListIndex].time / 60);
						convert2 = playListItems[newPlayListIndex].time % 60;
						convertString = convert2.toString()
						if (convertString[1] == "." || convertString[1] == undefined) {
							convertSecs = "0" + convertString[0]
						}
						else {
							convertSecs = convertString[0] + convertString[1]
						}
						playListItems[newPlayListIndex].time = convert + ":" + convertSecs;
						newPlayListIndex = newPlayListIndex + 1;
					}
					//albumsAss.controller.get('scrimSpinner').hide();
					albumsAss.controller.get('spinnerSmall').mojo.stop();
		Mojo.Controller.getAppController().showBanner(songs.length+' songs added to playlist.', {
			source: 'notification'
		});
				}
/*				if (artistSearch == true) {
					newPlayListIndex = newPlayListIndex - spliceCount;
					if (newPlayListIndex != 0) {
						temp = playListItems.splice(newPlayListIndex);
					}
					playListSum = playListSum - playListSumDifference;
					//artistArray = playListItems;
					//Mojo.Controller.errorDialog(spliceCount+', '+ newPlayListIndex+ ', '+ playListSum+ ', '+ playListItems.length+ ', '+playListSumDifference+ ', '+artistArray.length);
					for (i = 0; i < playListItems.length; i++) {
						if (playListItems[i].artist == artist){
							artistArray[newPlayListIndex] = playListItems[i]
							playListSum = playListSum + artistArray[newPlayListIndex].timeUnformatted
							newPlayListIndex = newPlayListIndex + 1;
						}
					}
					Mojo.Controller.errorDialog(spliceCount+', '+ newPlayListIndex+ ', '+ playListSum+ ', '+ playListItems.length+ ', '+playListSumDifference+ ', '+artistArray.length);
					//newPlayListIndex = artistPlayListIndex
					//playListSum = artistPlayListSum;
					//temp = artistArray.splice(newPlayListIndex) ;
					//temp.length = 0;
					playListItems = artistArray
					//Mojo.Controller.errorDialog(newPlayListIndex);	
				}*/
						}, 
    		onFailure: function(){
					//albumsAss.controller.get('scrimSpinner').hide();
					albumsAss.controller.get('spinnerSmall').mojo.stop();	
					Mojo.Controller.errorDialog("there was a problem.");
			}
	});
	if (tapToAdd == false) {
		listAlbums.splice(playListIndex, 1)
	}
	tapToAdd = false
}
AlbumsAssistant.prototype.handleCommand = function(event){
	//this.currentScene=Mojo.Controller.stageController.activeScene();
	if (event.type == Mojo.Event.command) {
		switch (event.command) {
		
			case 'search':
				this.OK();
				break;
			case 'playAll':
				this.setupPlayAll();
				break;
			case 'sortMenu':
				this.menu(event);
			break;
			case 'openWiki':
				this.openWiki();
			break;
		}
	}
	if (event.type == Mojo.Event.back){
	  //lastScene = 'artists'
		//this.controller.stageController.swapScene(lastScene);
	}
}
AlbumsAssistant.prototype.popup = function(command){
		switch (command) {
		
			case 'addToFavs':
				this.addToFavs();
				break;
			case 'addToList':
				tapToAdd = true
				this.swipeAddToPlayList();
				break;
			case 'cancel':
				//function(){};
				break;
		}
}
AlbumsAssistant.prototype.addToFavs = function(){
		favoritesArray.push({
			type: 'album_songs',
			artist: listAlbums[popupIndex].artist,
			albumId: listAlbums[popupIndex].albumId,
			album: listAlbums[popupIndex].album,
			image: "images/album50px.png",
			textName: listAlbums[popupIndex].album,
			textArtist: listAlbums[popupIndex].artist,
		})
		db.add('favList', favoritesArray, function(){
/*
			searchAss.favoritesModel.items = favoritesArray;
			searchAss.controller.modelChanged(searchAss.favoritesModel);
*/
			Mojo.Log.info("SUCCESS SAVE");
			}, function(){ Mojo.Log.error("FAIL SAVE")});
}
AlbumsAssistant.prototype.setupPlayAll = function(event){
	if (totalAlbumsSongs < 300) {
			//this.controller.get('spinnerSmall').mojo.start();
			this.controller.get('spinner').mojo.start();
			this.controller.get('scrimSpinner').show();
			playItems = [];
			playAllIndex = 0
			listIndex = 0
			this.playAll();
	}
	else{
			this.controller.showAlertDialog({
				onChoose: function(value){
					if (value == "OK") {
						totalAlbumsSongs = 299
						this.setupPlayAll();
					}
					else if (value == "cancel") {}
				},
			title: $L("The total number of songs is over 300. This could take awhile and cause AmpachPre to stop responding."),
				choices: [{
					label: $L("OK"),
					value: "OK",
					type: 'primary'
				},{
					label: $L("Cancel"),
					value: "cancel",
					type: 'dismiss'
				}]
			});
	}
}				
AlbumsAssistant.prototype.playAll = function(event){
//	for (i = 0; i < list.length; i++) {
	var albumId = listAlbums[playAllIndex].albumId;
	var filterUrl = serverUrl + "/server/xml.server.php?action=album_songs&auth=" +token+ "&filter="+albumId;
		Mojo.Log.info('Play All filterUrl: '+filterUrl);
		request = new Ajax.Request(filterUrl, {
			method: "get",
			evalJSON: "false",
			onComplete: function(transport){
				var songs = transport.responseXML.getElementsByTagName('song');
				Mojo.Log.info('songs.length: '+songs.length);
				for (i = 0; i < songs.length; i++) {
						playItems.push({
							song: songs[i].getElementsByTagName('title')[0].firstChild.data,
							songId: songs[i].getAttribute("id"),
							time: songs[i].getElementsByTagName('time')[0].firstChild.data,
							timeUnformatted: songs[i].getElementsByTagName('time')[0].firstChild.data,
							artist: songs[i].getElementsByTagName('artist')[0].firstChild.data,
							album: songs[i].getElementsByTagName('album')[0].firstChild.data,
							url: songs[i].getElementsByTagName('url')[0].firstChild.data,
							size: songs[i].getElementsByTagName('size')[0].firstChild.data,
							art: songs[i].getElementsByTagName('art')[0].firstChild.data,
							track: songs[i].getElementsByTagName('track')[0].firstChild.data,
							source: 'playlist',
							urlAdd: false
						})
					Mojo.Log.info('Play All Album: '+playItems[playItems.length - 1].album);
					playItems[playItems.length - 1].time = parseFloat(playItems[playItems.length - 1].time)
					playListAllSum = playListAllSum + playItems[playItems.length - 1].time
					convert = Math.floor(playItems[playItems.length - 1].time / 60);
					convert2 = playItems[playItems.length - 1].time % 60;
					convertString = convert2.toString()
					if (convertString[1] == "." || convertString[1] == undefined) {
						convertSecs = "0" + convertString[0]
					}
					else {
						convertSecs = convertString[0] + convertString[1]
					}
					playItems[playItems.length - 1].time = convert + ":" + convertSecs;
				}
				//newPlayListIndex=newPlayListIndex+1;
				
			if (playAllIndex == listAlbums.length - 1) {
						Mojo.Log.info('artistSearch: '+artistSearch);
						if (artistSearch == true) {
								tempArray = []
								for (i = 0; i < playItems.length; i++) {
									if (playItems[i].artist == artist){
										tempArray.push(playItems[i])
									}
								}
							playItems = tempArray	
						}
				//albumsAss.controller.get('spinnerSmall').mojo.stop();
				
				audioAss.rewrite();
				
				if(ticketNumArray.length != 0){
					audioAss.deleteSongs();
				}
				albumsAss.controller.stageController.pushScene({
					name: "stream",
					//transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				}, 'playAll');
				audioAss.setupPlaySong();
			 	albumsAss.controller.get('scrimSpinner').hide();
				albumsAss.controller.get('spinner').mojo.stop();
			}
			else{
				playAllIndex++
				//albumsAss.playAll()
				albumsAss.playAll()
			}
			},
			onFailure: function(){
			 	albumsAss.controller.get('scrimSpinner').hide();
			 	albumsAss.controller.get('spinner').mojo.stop();
				//albumsAss.controller.get('spinnerSmall').mojo.stop();
				Mojo.Controller.errorDialog("there was a problem.");
			}
		});
//	}

}

AlbumsAssistant.prototype.openWiki = function(){
	artistName = artist.replace(/\s+/g, '%20')//.replace(/\W/g, '')
	this.controller.serviceRequest("palm://com.palm.applicationManager", {
  		method: "open",
 		 parameters:  {
      		id: 'com.palm.app.browser',
     		params: {
          	target: "http://en.m.wikipedia.org/wiki/Special:Search?search="+artistName
      		}
  		}
	});
}

AlbumsAssistant.prototype.menu = function(event){
		this.controller.popupSubmenu({
			onChoose: this.sortHandler,
			placeNear: event.target,
			items: [{
				label: 'Sort by Artist',
				command: 'sortByArtist'
			}, {
				label: 'Sort by Album',
				command: 'sortByAlbum'
			}, {
				label: 'Sort by Year',
				command: 'sortByYear'
			}, 
			{label: 'Cancel',command: 'cancel'}
			]
		});

}
AlbumsAssistant.prototype.sort = function(command){
	
		switch (command) {
		
			case 'sortByArtist':
			accountsAss.sortArray(listAlbums, this.listAlbumsModel, 'artist')
				break;
			case 'sortByAlbum':
			accountsAss.sortArray(listAlbums, this.listAlbumsModel, 'album')
				break;
			case 'sortByYear':
			accountsAss.sortArray(listAlbums, this.listAlbumsModel, 'year')
				break;
			case 'cancel':
				break;
		}

}