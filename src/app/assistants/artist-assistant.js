function ArtistAssistant() {
	document.getElementById('sceneStyle').style.backgroundImage =  "url(" + backGroundImage + ")";
	document.getElementById('sceneStyle').style.color =  textColor;
	document.getElementById('listBorder').style.border =  "2px solid "+textColor;
	//document.getElementById('name').style.color =  textColor;
	//document.getElementById('row').style.color =  textColor;
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		Mojo.Log.info('Pixi sized')
		document.getElementById('scrollerId').style.height = '260px';
	}

}
//try {
ArtistAssistant.prototype.setup = function() {
	artistAss = this
	this.controller.get('scrimSpinner').hide();
	//$('name').innerHTML = list.length+' Artists, '+totalArtistSongs+' Songs'
    this.readAlbumsHandler = this.readAlbums.bindAsEventListener(this);
	this.listArtistsWidgetHandler=this.controller.get('listArtistsWidget')
	this.swipeAddToPlayListHandler = this.swipeAddToPlayList.bindAsEventListener(this);	
	this.albumListHandler = this.albumList.bind(this)
	this.songsListHandler = this.songsList.bind(this)
	this.popupHandler = this.popup.bind(this)	
	this.divideHandler = this.divide.bind(this)
	this.menuHandler = this.menu.bind(this)
	this.sortHandler = this.sort.bind(this)
	
	this.controller.setupWidget(Mojo.Menu.appMenu, accountsAttr, appMenuModel);
	
		this.cmdMenuModel = {
  				visible: true,
  					items: [
							//{label: $L(''),icon: 'search',command: 'backToSearch'},
							//{label: $L(''),icon: 'list', command: 'viewPlaylist'},
							//{label: $L(''),icon: 'lists',command: 'savedPlaylists'},
   							//{label: $L(''), icon:'downloads', command:'downloads'},
							//{label: $L(''),icon: 'nowPlaying',command: 'stream'}, 
							//{label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}, 
   							//{label: $L(''), icon:'playAll', command:'playAll'},							
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
								{label: $L(list.length+' Artists, '+totalArtistSongs+' Songs'),icon: '',command: '', width:260},
	      						{label: $L(''),icon: 'menu',command: 'sortMenu'},
    							]
  							}]
						};
		this.controller.setupWidget(Mojo.Menu.viewMenu, {spacerHeight: 0, menuClass:'no-fade'}, this.viewMenuModel);
	
	this.controller.setupWidget("listArtistsWidget", {
        itemTemplate: "artist/rowTemplate",
        listTemplate: "artist/listTemplate",
		swipeToDelete: true,
		fixedHeightItems: true,
		autoconfirmDelete: true, 
		renderLimit: 20,          
/*
		dividerTemplate: 'artist/divider',
        dividerFunction: this.divideHandler,
*/

    },  
	this.listModel = {
        items: list
    });

		//spinner
		this.controller.setupWidget("spinner", this.attributes = {
			spinnerSize: 'large'
		}, this.spinnerModel = {
			spinning: false
		});	
	this.controller.setupWidget("spinnerSmall", 
		this.spinnerSmallAttributes = {
			spinnerSize: 'small'
		}, 
		this.spinnerSmallModel = {
			spinning: false
		});	
	//this.controller.setupWidget('subscroller', this.model);	
	this.addFavsHandler = $('addFavs')
	this.add2FavsHandler = this.addToFavs.bind(this)
	
	
	    this.controller.setupWidget("scrollerId",
         this.scrollerAttributes = {
             mode: 'vertical'
         },
         this.scrollerModel = {
         });
/*his.filterAttributes = {
     itemTemplate: 'artist/filterTemplate',
     filterFunction: this.filterFunction.bind(this)
};
this.filterModel = {
};
this.controller.setupWidget($('filterList'), this.filterAttributes, this.filterModel);
//this.controller.get('filterList').mojo.setCount(10);	*/ 
}

ArtistAssistant.prototype.activate = function(event) {
		stageAss.listResize()
		this.controller.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	  	this.controller.listen(this.listArtistsWidgetHandler, Mojo.Event.listTap, this.readAlbumsHandler);	 
		this.controller.listen(this.listArtistsWidgetHandler, Mojo.Event.listDelete, this.swipeAddToPlayListHandler);
		Mojo.Event.listen(this.controller.window, 'resize', listResizeHandler);
		//this.controller.listen($('menu'), Mojo.Event.tap, this.menuHandler)
	  	//this.controller.listen(jQuery("#addFav").get(0), Mojo.Event.tap, this.add2FavsHandler);	 
}


ArtistAssistant.prototype.deactivate = function(event) {
		this.controller.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
		this.controller.stopListening(this.listArtistsWidgetHandler, Mojo.Event.listTap, this.readAlbumsHandler);	 
		this.controller.stopListening(this.listArtistsWidgetHandler, Mojo.Event.listDelete, this.swipeAddToPlayListHandler);
		Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
		//this.controller.stopListening($('menu'), Mojo.Event.tap, this.menuHandler)
		accountsAss.resetToggleSorts()
	  	//this.controller.stopListening(this.addFavsHandler, Mojo.Event.tap, this.add2FavsHandler);	 
}

ArtistAssistant.prototype.cleanup = function(event) {
		this.controller.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
		this.controller.stopListening(this.listArtistsWidgetHandler, Mojo.Event.listTap, this.readAlbumsHandler);	 
		this.controller.stopListening(this.listArtistsWidgetHandler, Mojo.Event.listDelete, this.swipeAddToPlayListHandler);
		Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
		//this.controller.stopListening($('menu'), Mojo.Event.tap, this.menuHandler)
	  	list.length = 0;
		totalArtistSongs = 0
		//set to false to not have recent filtered items by date
		recentFilter = false
	  //	this.controller.stopListening(this.addFavsHandler, Mojo.Event.tap, this.add2FavsHandler);	   
}
ArtistAssistant.prototype.readAlbums = function(event) {
if (internet == true) {
	var target = event.originalEvent.target.className;
	popupIndex = event.index;
	Mojo.Log.info('target: '+target);
	if (target !== "addFavs") {
		this.controller.get('spinner').mojo.start();
		this.controller.get('scrimSpinner').show();
		artistId = list[event.index].artistId;
		artist = list[event.index].artist;
		if (list[event.index].albums > 1) {
			var filterUrl = serverUrl + "/server/xml.server.php?action=artist_albums&auth=" + token + "&filter=" + artistId;
			//Mojo.Controller.errorDialog(filterUrl);
			var request = new Ajax.Request(filterUrl, {
				method: "get",
				evalJSON: "false",
				onComplete: this.albumListHandler,
				onFailure: function(){
					Mojo.Controller.errorDialog("there was a problem.");
				}
			});
		}
		else{
			var filterUrl = serverUrl + "/server/xml.server.php?action=artist_songs&auth=" + token + "&filter=" + artistId;
			//Mojo.Controller.errorDialog(filterUrl);
			var request = new Ajax.Request(filterUrl, {
				method: "get",
				evalJSON: "false",
				onComplete: this.songsListHandler,
				onFailure: function(){
					Mojo.Controller.errorDialog("there was a problem.");
				}
			});
		}
	}
	else {
		this.controller.popupSubmenu({
			onChoose: this.popupHandler,
			placeNear: event.originalEvent.target,
			items: [{
				label: 'Add to Playlist',
				command: 'addToList'
			}, {
				label: 'Bookmark Artist',
				command: 'addToFavs'
			}, {label: 'Cancel',command: 'cancel'}
				]
		});
	}
}
else {
	Mojo.Controller.errorDialog("No Internet available");
}
}
ArtistAssistant.prototype.albumList = function(transport){
			albums = transport.responseXML.getElementsByTagName('album');
			listAlbums = [];
			for (i = 0; i < albums.length; i++) {
				listAlbums[i] = {
					album: albums[i].getElementsByTagName('name')[0].firstChild.data,
					albumId: albums[i].getAttribute("id"),
					songs: albums[i].getElementsByTagName('tracks')[0].firstChild.data,
					artist: albums[i].getElementsByTagName('artist')[0].firstChild.data,
					art: albums[i].getElementsByTagName('art')[0].firstChild.data,
					year: albums[i].getElementsByTagName('year')[0].firstChild.data
				}
				totalAlbumsSongs = totalAlbumsSongs+parseFloat(listAlbums[i].songs)
			}
			artistInfo = artist+', '+totalAlbumsSongs+' Songs'
			this.controller.stageController.pushScene({name: "albums", disableSceneScroller: true});
			this.controller.get('scrimSpinner').hide();
			this.controller.get('spinner').mojo.stop();
};
ArtistAssistant.prototype.swipeAddToPlayList = function(event){
	//Mojo.Controller.errorDialog("Tha game stops here.");
	if (tapToAdd == true) {
		playListIndex = popupIndex
	}
	else {
		playListIndex = event.index
	}
	this.controller.get('spinnerSmall').mojo.start();
	/*
this.controller.get('spinner').mojo.start();
	this.controller.get('scrimSpinner').show();
*/
	artistId = list[playListIndex].artistId;
	var filterUrl = serverUrl + "/server/xml.server.php?action=artist_songs&auth=" + token + "&filter=" + artistId;
	//Mojo.Controller.errorDialog(filterUrl);
	var request = new Ajax.Request(filterUrl, {
		method: "get",
		evalJSON: "false",
		onComplete: function(transport){
							var songs = transport.responseXML.getElementsByTagName('song');
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
									playListSum = playListSum + playListItems[newPlayListIndex].time
									convert = Math.floor(playListItems[newPlayListIndex].time / 60);
									convert2 = playListItems[newPlayListIndex].time % 60;
									convertString = convert2.toString()
									if (convertString[1] == "." || convertString[1] == undefined){convertSecs = "0"+convertString[0]}
										else{convertSecs = convertString[0]+convertString[1]}
									playListItems[newPlayListIndex].time = convert + ":" + convertSecs;
									newPlayListIndex=newPlayListIndex+1;
								}	
								
								artistAss.controller.get('spinnerSmall').mojo.stop();
		Mojo.Controller.getAppController().showBanner(songs.length+' songs added to playlist.', {
			source: 'notification'
		});
								/*

								artistAss.controller.get('scrimSpinner').hide();
								artistAss.controller.get('spinner').mojo.stop();	
*/
						},
		onFailure: function(){
			/*
artistAss.controller.get('scrimSpinner').hide();
			artistAss.controller.get('spinner').mojo.stop();	
*/
	artistAss.controller.get('spinnerSmall').mojo.stop();
			Mojo.Controller.errorDialog("there was a problem.");
		}
	});
	if (tapToAdd == false) {
		list.splice(playListIndex, 1)
	}
	tapToAdd = false
}
ArtistAssistant.prototype.handleCommand = function(event){
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
		}
	}
	if (event.type == Mojo.Event.back){
		//this.controller.stageController.swapScene('search');
	}
}
ArtistAssistant.prototype.popup = function(command){
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
ArtistAssistant.prototype.addToFavs = function(){
			//Mojo.Controller.errorDialog(list[popupIndex].artistId);
		favoritesArray.push({
			type: 'artist_albums',
			artist: list[popupIndex].artist,
			artistId: list[popupIndex].artistId,
			image: "images/artist50px.png",
			textName: list[popupIndex].artist,
			textArtist: "",
		})
		db.add('favList', favoritesArray, function(){
			Mojo.Log.info("SUCCESS SAVE");
/*
			searchAss.favoritesModel.items = favoritesArray;
			searchAss.controller.modelChanged(searchAss.favoritesModel);
*/
			}, function(){ Mojo.Log.error("FAIL SAVE")});
}
ArtistAssistant.prototype.divide = function (items) {
        return items.artist[0].toUpperCase();
}

ArtistAssistant.prototype.setupPlayAll = function(event){
	if (totalArtistSongs < 300) {
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
						totalArtistSongs = 299
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
ArtistAssistant.prototype.playAll = function(event){
//	for (i = 0; i < list.length; i++) {
		artistId = list[playAllIndex].artistId;
		filterUrl = serverUrl + "/server/xml.server.php?action=artist_songs&auth=" + token + "&filter=" + artistId;
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
						source: 'playAll',
						urlAdd: false
					})
					Mojo.Log.info('Play All Artist: '+playItems[playItems.length - 1].artist);
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
				//newPlayListIndex=newPlayListIndex+1;
				}
				
			if (playAllIndex == list.length - 1) {
				//artistAss.controller.get('spinnerSmall').mojo.stop();
								
				audioAss.rewrite();
				
				artistAss.controller.stageController.pushScene({
					name: "stream",
					//transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				}, 'playAll');
				if(ticketNumArray.length != 0){
					audioAss.deleteSongs();
				}
				audioAss.setupPlaySong();
				artistAss.controller.get('scrimSpinner').hide();
				artistAss.controller.get('spinner').mojo.stop();
			}else{
				playAllIndex++
				artistAss.playAll()
			}
			},
			onFailure: function(){
				//artistAss.controller.get('spinnerSmall').mojo.stop();
			 	artistAss.controller.get('scrimSpinner').hide();
			 	artistAss.controller.get('spinner').mojo.stop();
				Mojo.Controller.errorDialog("there was a problem.");
			}
		});
//	}

}


ArtistAssistant.prototype.menu = function(event){
		this.controller.popupSubmenu({
			onChoose: this.sortHandler,
			placeNear: event.target,
			items: [{
				label: 'Sort by Artist',
				command: 'sortByArtist'
			}, {
				label: 'Sort by Albums',
				command: 'sortByAlbums'
			}, {
				label: 'Sort by Songs',
				command: 'sortBySongs'
			}, 
			{label: 'Cancel',command: 'cancel'}
			]
		});

}
ArtistAssistant.prototype.sort = function(command){
	
		switch (command) {
		
			case 'sortByArtist':
			accountsAss.sortArray(list, this.listModel, 'artist')
				break;
			case 'sortByAlbums':
			accountsAss.sortArray(list, this.listModel, 'albums')
				break;
			case 'sortBySongs':
			accountsAss.sortArray(list, this.listModel, 'songs')
				break;
			case 'cancel':
				break;
		}

}
ArtistAssistant.prototype.songsList = function(transport){
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
/*
			if (artistSearch == true) {
					tempArray = []
					for (i = 0; i < listSongs.length; i++) {
						if (listSongs[i].artist == artist){
							tempArray.push(listSongs[i])
						}
					}
				listSongs = tempArray	
			}
*/
			albumArt = listSongs[0].art;
			album = listSongs[0].album
			artistAlbum = listSongs[0].artist
			this.controller.stageController.pushScene({name: "songs", disableSceneScroller: true});
			this.controller.get('scrimSpinner').hide();
			this.controller.get('spinner').mojo.stop();
}