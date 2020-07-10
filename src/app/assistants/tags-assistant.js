function TagsAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	document.getElementById('sceneStyle').style.backgroundImage =  "url(" + backGroundImage + ")";
	document.getElementById('sceneStyle').style.color =  textColor;
	document.getElementById('listBorder').style.border =  "2px solid "+textColor;
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		document.getElementById('scrollerId').style.height = '260px';
	}
}

TagsAssistant.prototype.setup = function() {
	tagsAss = this
	this.controller.get('scrimSpinner').hide();
	//$('name').innerHTML = 'Genre: '+searchString
    this.readTagsHandler = this.readTags.bind(this);
	this.artistListHandler = this.artistList.bind(this)	
	this.albumsListHandler = this.albumList.bind(this)
	this.songsListHandler = this.songList.bind(this)
	this.popupHandler = this.popup.bind(this)	
	this.playAllHandler = this.setupPlayAll.bind(this)
	this.swipeAddToPlayListHandler = this.swipeAddToPlayList.bind(this);	
	//this.menuHandler = this.menu.bind(this)
	this.sortHandler = this.sort.bind(this)
/*
	this.divideHandler = this.divide.bind(this)
*/
	
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
								{label: $L('Genre: '+searchString),icon: '',command: 'openWiki', width:260},
	      						{label: $L(''),icon: 'menu',command: 'sortMenu'},
    							]
  							}]
						};
		this.controller.setupWidget(Mojo.Menu.viewMenu, {spacerHeight: 0, menuClass:'no-fade'}, this.viewMenuModel);
	
	this.controller.setupWidget("listTagsWidget", {
        itemTemplate: "tags/rowTemplate",
        listTemplate: "tags/listTemplate",
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
        items: listTags
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
/*
	this.addFavsHandler = $('addFavs')
	this.add2FavsHandler = this.addToFavs.bind(this)
*/
	
	
	    this.controller.setupWidget("scrollerId",
         this.scrollerAttributes = {
             mode: 'vertical'
         },
         this.scrollerModel = {
         });
};

TagsAssistant.prototype.activate = function(event) {
		stageAss.listResize()
		this.controller.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	  	this.controller.listen($('listTagsWidget'), Mojo.Event.listTap, this.readTagsHandler);	 
		this.controller.listen($('listTagsWidget'), Mojo.Event.listDelete, this.swipeAddToPlayListHandler);
	Mojo.Event.listen(this.controller.window, 'resize', listResizeHandler);
		//this.controller.listen($('menu'), Mojo.Event.tap, this.menuHandler)
	  	//this.controller.listen(jQuery("#addFav").get(0), Mojo.Event.tap, this.add2FavsHandler);	 
};

TagsAssistant.prototype.deactivate = function(event) {
		this.controller.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
		this.controller.stopListening($('listTagsWidget'), Mojo.Event.listTap, this.readTagsHandler);	 
		this.controller.stopListening($('listTagsWidget'), Mojo.Event.listDelete, this.swipeAddToPlayListHandler);
	Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
		//this.controller.stopListening($('menu'), Mojo.Event.tap, this.menuHandler)
	  	//this.controller.stopListening(this.addFavsHandler, Mojo.Event.tap, this.add2FavsHandler);	 
		accountsAss.resetToggleSorts()
};

TagsAssistant.prototype.cleanup = function(event) {
		this.controller.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
		this.controller.stopListening($('listTagsWidget'), Mojo.Event.listTap, this.readTagsHandler);	 
		this.controller.stopListening($('listTagsWidget'), Mojo.Event.listDelete, this.swipeAddToPlayListHandler);
	Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
		//this.controller.stopListening($('menu'), Mojo.Event.tap, this.menuHandler)
	  	//this.controller.stopListening(this.addFavsHandler, Mojo.Event.tap, this.add2FavsHandler);	 
};

TagsAssistant.prototype.readTags = function(event) {
if (internet == true) {
	var target = event.originalEvent.target.className;
	popupIndex = event.index;
	Mojo.Log.info('target: '+target);
	if (target !== "addFavs") {
		this.controller.get('spinner').mojo.start();
		this.controller.get('scrimSpinner').show();
		tagId = listTags[event.index].tagId;
		//artist = listTags[event.index].artist;
		if (listTags[event.index].artists > 0) {
			var filterUrl = serverUrl + "/server/xml.server.php?action=tag_artists&auth=" + token + "&filter=" + tagId;
			//Mojo.Controller.errorDialog(filterUrl);
			var request = new Ajax.Request(filterUrl, {
				method: "get",
				evalJSON: "false",
				onComplete: this.artistListHandler,
				onFailure: function(){
					Mojo.Controller.errorDialog("there was a problem.");
				}
			});
		}else if(listTags[event.index].albums > 0){
			var filterUrl = serverUrl + "/server/xml.server.php?action=tag_albums&auth=" + token + "&filter=" + tagId;
			//Mojo.Controller.errorDialog(filterUrl);
			var request = new Ajax.Request(filterUrl, {
				method: "get",
				evalJSON: "false",
				onComplete: this.albumsListHandler,
				onFailure: function(){
					Mojo.Controller.errorDialog("there was a problem.");
				}
			});
		}
		else if(listTags[event.index].songs > 0){
			var filterUrl = serverUrl + "/server/xml.server.php?action=tag_songs&auth=" + token + "&filter=" + tagId;
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
			}, 
/*
			{
				label: 'Bookmark Artist',
				command: 'addToFavs'
			},
*/
			 {label: 'Cancel',command: 'cancel'}
				]
		});
	}
}
else {
	Mojo.Controller.errorDialog("No Internet available");
}
}
TagsAssistant.prototype.artistList = function(transport){
			artistSearch = true;
			var artists = transport.responseXML.getElementsByTagName('artist');
			list = [];
			for (i = 0; i < artists.length; i++) {
				list[i] = {
					artist: artists[i].getElementsByTagName('name')[0].firstChild.data,
					artistId: artists[i].getAttribute("id"),
					songs: artists[i].getElementsByTagName('songs')[0].firstChild.data,
					albums: artists[i].getElementsByTagName('albums')[0].firstChild.data,
				}
				totalArtistSongs = totalArtistSongs+parseFloat(list[i].songs)
			}
			//Mojo.Controller.errorDialog(list);
			if (searchTimeout != true) {
				if (list == "") {
					clearTimeout(searchTimeout)
					Mojo.Controller.errorDialog("Sorry, nothing with the search string, \"" + searchString + "\" in the category of " + this.selectorsModel.currentCategory + " was found.");
					this.controller.get('scrimSpinner').hide();
					this.controller.get('spinner').mojo.stop();
				}
				else {
					this.controller.stageController.pushScene({
						name: "artist",
						//transition: Mojo.Transition.crossFade,
						disableSceneScroller: true
					});
					clearTimeout(searchTimeout)
					this.controller.get('scrimSpinner').hide();
					this.controller.get('spinner').mojo.stop();
				}
			}else{
				searchTimeout = false
			}
};
TagsAssistant.prototype.albumList = function(transport){
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
			artist = searchString
			artistInfo = artist+', '+totalAlbumsSongs+' Songs'
			this.controller.stageController.pushScene({name: "albums", disableSceneScroller: true});
			this.controller.get('scrimSpinner').hide();
			this.controller.get('spinner').mojo.stop();
};
TagsAssistant.prototype.songList = function(transport){
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
			albumArt = listSongs[0].art;
			album = "Songs: "+searchString;
			artistAlbum = listAlbums[event.index].artist
			this.controller.stageController.pushScene({name: "songs", disableSceneScroller: true});
			this.controller.get('scrimSpinner').hide();
			this.controller.get('spinner').mojo.stop();
}
TagsAssistant.prototype.handleCommand = function(event){
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

TagsAssistant.prototype.popup = function(command){
		switch (command) {
		
			case 'addToFavs':
				//this.addToFavs();
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

TagsAssistant.prototype.setupPlayAll = function(event){
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
TagsAssistant.prototype.playAll = function(){
		tagId = listTags[playAllIndex].tagId;
			var filterUrl = serverUrl + "/server/xml.server.php?action=tag_songs&auth=" + token + "&filter=" + tagId;
			//Mojo.Controller.errorDialog(filterUrl);
			var request = new Ajax.Request(filterUrl, {
				method: "get",
				evalJSON: "false",
				onComplete: function(transport){
							var songs = transport.responseXML.getElementsByTagName('song');
							for (i = 0; i < songs.length; i++) {
								/*var url = songs[i].getElementsByTagName('url')[0].firstChild.data,		
									extension = "";
					
								if (url.length != 0) {
									var dotPos = url.lastIndexOf(".");
								if (dotPos != -1) 
									extension = url.substr(dotPos + 1).toLowerCase(); ;
								}*/
				
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
									source: 'album',
									//type: extension
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
							if (playAllIndex == listTags.length - 1) {
								tagsAss.pushPlayAll();
							}else{
								playAllIndex++
								tagsAss.playAll();
							}
					
				},
				onFailure: function(){
					Mojo.Controller.errorDialog("there was a problem.");
				}
			});
}

TagsAssistant.prototype.pushPlayAll = function(items){
		//albumsAss.controller.get('spinnerSmall').mojo.stop();
		
				
		audioAss.rewrite();

		if(ticketNumArray.length != 0){
			audioAss.deleteSongs();
		}
		tagsAss.controller.stageController.pushScene({
			name: "stream",
			//transition: Mojo.Transition.crossFade,
			disableSceneScroller: true
		});
		audioAss.setupPlaySong();
		tagsAss.controller.get('scrimSpinner').hide();
		tagsAss.controller.get('spinner').mojo.stop();
}
TagsAssistant.prototype.swipeAddToPlayList = function(event){
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
	
	tagId = listTags[playListIndex].tagId;
	var filterUrl = serverUrl + "/server/xml.server.php?action=tag_songs&auth=" + token + "&filter=" + tagId;
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
								
								tagsAss.controller.get('spinnerSmall').mojo.stop();
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
	tagsAss.controller.get('spinnerSmall').mojo.stop();
			Mojo.Controller.errorDialog("there was a problem.");
		}
	});
	if (tapToAdd == false) {
		listTags.splice(playListIndex, 1)
	}
	tapToAdd = false
}

TagsAssistant.prototype.menu = function(event){
		this.controller.popupSubmenu({
			onChoose: this.sortHandler,
			placeNear: event.target,
			items: [{
				label: 'Sort by Genre',
				command: 'sortByName'
			}, {
				label: 'Sort by Artists',
				command: 'sortByArtists'
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
TagsAssistant.prototype.sort = function(command){
	
		switch (command) {
		
			case 'sortByArtists':
			accountsAss.sortArray(listTags, this.listModel, 'artists')
				break;
			case 'sortByAlbums':
			accountsAss.sortArray(listTags, this.listModel, 'albums')
				break;
			case 'sortBySongs':
			accountsAss.sortArray(listTags, this.listModel, 'songs')
				break;
			case 'sortByName':
			accountsAss.sortArray(listTags, this.listModel, 'name')
				break;
			case 'cancel':
				break;
		}

}