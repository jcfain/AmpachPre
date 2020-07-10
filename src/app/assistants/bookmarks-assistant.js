function BookmarksAssistant() {
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
	//document.getElementById('name').style.color =  textColor;
}

BookmarksAssistant.prototype.setup = function() {
	bookmarksAss = this
	//this.controller.get('title').innerHTML = 'Bookmarks'
	this.getFavoritesHandler = this.getFavorites.bind(this)
    this.favoritesHandler = this.favorites.bind(this);
	this.deleteFavHandeler=this.deleteFav.bind(this);
	this.moveAtIndexHandler=this.moveAtIndex.bind(this);
	
	
	this.controller.setupWidget(Mojo.Menu.appMenu, accountsAttr, appMenuModel);	
	
	
				this.cmdMenuModel = {
					visible: true,
					items: [					
							{label: $L(''),icon: 'home',command: 'backToSearch'},
							{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'},{label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
							{label: $L(''),icon: 'list', command: 'viewPlaylist'},
						]
				}
		this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass:'no-fade'}, this.cmdMenuModel);
		
	this.controller.setupWidget("favorites", {
        itemTemplate: "bookmarks/rowTemplate",
        listTemplate: "bookmarks/listTemplate",
		fixedHeightItems: true,
		swipeToDelete: true,
		reorderable: true,
		hasNoWidgets: true,
    },  
	this.favoritesModel = {
         items : favoritesArray
    });
		
//spinners
   this.controller.setupWidget("spinner",
         this.attributes = {
             spinnerSize: 'large'
         },
         this.model = {
             spinning: false 
         });
};

BookmarksAssistant.prototype.activate = function(event) {
/*
	bookmarksAss.favoritesModel.items = favoritesArray;
	bookmarksAss.controller.modelChanged(bookmarksAss.favoritesModel);
*/
		stageAss.listResize()
	Mojo.Event.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	Mojo.Event.listen($('favorites'), Mojo.Event.listTap, this.favoritesHandler);	 
	Mojo.Event.listen($('favorites'), Mojo.Event.listDelete, this.deleteFavHandeler);
	Mojo.Event.listen($('favorites'), Mojo.Event.listReorder, this.moveAtIndexHandler);
		Mojo.Event.listen(this.controller.window, 'resize', listResizeHandler);
};

BookmarksAssistant.prototype.deactivate = function(event) {
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	Mojo.Event.stopListening($('favorites'), Mojo.Event.listTap, this.favoritesHandler);	 
	Mojo.Event.stopListening($('favorites'), Mojo.Event.listDelete, this.deleteFavHandeler);
	Mojo.Event.stopListening($('favorites'), Mojo.Event.listReorder, this.moveAtIndexHandler);
		Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
};

BookmarksAssistant.prototype.cleanup = function(event) {
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	Mojo.Event.stopListening($('favorites'), Mojo.Event.listTap, this.favoritesHandler);	 
	Mojo.Event.stopListening($('favorites'), Mojo.Event.listDelete, this.deleteFavHandeler);
	Mojo.Event.stopListening($('favorites'), Mojo.Event.listReorder, this.moveAtIndexHandler);
		Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
};
BookmarksAssistant.prototype.favorites = function(event){
	favType = favoritesArray[event.index].type
	if (favType == 'artist_albums') {
		favorite = favoritesArray[event.index].artistId;
		artist = favoritesArray[event.index].artist;
	}
	else 
		if (favType == 'album_songs') {
			favorite = favoritesArray[event.index].albumId;
			album = favoritesArray[event.index].album	
		}
	if (favType == 'song') {
		listIndex = 0
		listSongs = []
		selectedSong = favoritesArray[event.index].song
				listSongs.push({
					song: favoritesArray[event.index].song,
					songId: favoritesArray[event.index].songId,
					time: favoritesArray[event.index].time,
					timeUnformatted: parseFloat(favoritesArray[event.index].timeUnformatted),
					artist: favoritesArray[event.index].artist,
					album: favoritesArray[event.index].album,
					url: favoritesArray[event.index].url,
					size: favoritesArray[event.index].size,
					art: favoritesArray[event.index].art,
					currentTime: favoritesArray[event.index].currentTime,
					source: 'savedPlaylist',
				})
		for (i = 0; i < favoritesArray.length; i++) {
			if (favoritesArray[i].type == 'song') {
				if (selectedSong != favoritesArray[i].song) {
					listSongs.push({
						song: favoritesArray[i].song,
						songId: favoritesArray[i].songId,
						time: favoritesArray[i].time,
						timeUnformatted: parseFloat(favoritesArray[i].timeUnformatted),
						artist: favoritesArray[i].artist,
						album: favoritesArray[i].album,
						url: favoritesArray[i].url,
						size: favoritesArray[i].size,
						art: favoritesArray[i].art,
						currentTime: favoritesArray[i].currentTime,
						source: 'savedPlaylist',
					})
				}
			}
		}
		//Mojo.Controller.errorDialog(listSongs[0].url)
		if (searchTimeout != true) {
			this.controller.get('spinner').mojo.start();
			this.controller.get('scrimSpinner').show();
			this.controller.stageController.pushScene({
				name: "stream",
				disableSceneScroller: true,
				//transition: Mojo.Transition.crossFade,
			}, true);
			if(ticketNumArray.length != 0){
				audioAss.deleteSongs();
			}
			audioAss.clone(listSongs);
			this.controller.get('scrimSpinner').hide();
			this.controller.get('spinner').mojo.stop();
		}else{
				searchTimeout = false
		}
	}
	else {
		this.controller.get('spinner').mojo.start();
		this.controller.get('scrimSpinner').show();
		var search = serverUrl + "/server/xml.server.php?action=" + favType + "&auth=" + token + "&filter=" + favorite;
		//Mojo.Controller.errorDialog(search);
		
		var request = new Ajax.Request(search, {
			method: "get",
			evalJSON: "false",
			onComplete: this.getFavoritesHandler, //Mojo.Controller.errorDialog("beg"+searchString+"end"),
			onFailure: function(){
				Mojo.Controller.errorDialog("there was a problem.");
			}
		});
	}
}


BookmarksAssistant.prototype.getFavorites = function(transport){
		if (favType == "artist_albums") {
			artistSearch = true;
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
			if (searchTimeout != true) {
				this.controller.stageController.pushScene({
					name: "albums",
					//transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				});
				this.controller.get('scrimSpinner').hide();
				this.controller.get('spinner').mojo.stop();
			}else{
				searchTimeout = false
			}	


		}
		else 
			if (favType == "album_songs") {
				var songs = transport.responseXML.getElementsByTagName('song');
				//Mojo.Controller.errorDialog(songs.length);
				listSongs = [];
				for (i = 0; i < songs.length; i++) {
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
						source: 'album'
					}
					convert = Math.floor(listSongs[i].time / 60);
					convert2 = listSongs[i].time % 60;
					convertString = convert2.toString()
					if (convertString[1] == "." || convertString[1] == undefined){convertSecs = "0"+convertString[0]}
					else{convertSecs = convertString[0]+convertString[1]}
					
					listSongs[i].time = convert + ":" + convertSecs;
			}	
				if (searchTimeout != true) {	
					albumArt = listSongs[0].art;
					artistAlbum = listSongs[0].artist
					this.controller.stageController.pushScene({
						name: "songs",
					//transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
					});
					this.controller.get('scrimSpinner').hide();
					this.controller.get('spinner').mojo.stop();
				}else{
					searchTimeout = false
				}
			}
			else if (favType == "songs") {
				var response = transport.responseText || "no response text";
				Mojo.Log.info(response);
				listSongs = [];
				/*var videos = transport.responseXML.getElementsByTagName('video');
				//Mojo.Controller.errorDialog(videos.length);
				listGenres = [];
				for (i = 0; i < videos.length; i++) {
					listVideos[i] = {
						video: listGenres[i].getElementsByTagName('title')[0].firstChild.data,
						videoId: listGenres[i].getAttribute("id"),
						mime: listGenres[i].getElementsByTagName('mime')[0].firstChild.data,
						resolution: listGenres[i].getElementsByTagName('resolution')[0].firstChild.data,
						url: videos[i].getElementsByTagName('url')[0].firstChild.data,
					}
				}
			if (listVideos == "") {
			Mojo.Controller.errorDialog("Sorry, nothing with the search string, \""+ searchString +"\" in the category of " + this.selectorsModel.currentCategory + " was found.");
			this.controller.get('spinner').mojo.stop();
			}
			else {
				//Mojo.Controller.errorDialog(listSongs[0].artist);						
				this.controller.stageController.pushScene("genre");
				this.controller.get('spinner').mojo.stop();
				}*/
			}
			else if (favType == "videos") {
				//var response = transport.responseText || "no response text";
				//Mojo.Log.info(response);
				var videos = transport.responseXML.getElementsByTagName('video');
				//Mojo.Controller.errorDialog(videos.length);
				listVideos = [];
				for (i = 0; i < videos.length; i++) {
					listVideos[i] = {
						video: videos[i].getElementsByTagName('title')[0].firstChild.data,
						videoId: videos[i].getAttribute("id"),
						mime: videos[i].getElementsByTagName('mime')[0].firstChild.data,
						resolution: videos[i].getElementsByTagName('resolution')[0].firstChild.data,
						url: videos[i].getElementsByTagName('url')[0].firstChild.data,
					}
				}
				//Mojo.Controller.errorDialog(listSongs[0].artist);	
				if (searchTimeout != true) {
					this.controller.stageController.pushScene({
						name: "videos",
						//transition: Mojo.Transition.crossFade,
						disableSceneScroller: true
					});
					this.controller.get('scrimSpinner').hide();
					this.controller.get('spinner').mojo.stop();
				}else{
					searchTimeout = false
				}
			}
}
BookmarksAssistant.prototype.deleteFav = function(event){
	Mojo.Log.info('favoritesArray.length: '+favoritesArray.length+', event.index: '+event.index)
					favoritesArray.splice(event.index, 1)
					db.add('favList', favoritesArray, function(){Mojo.Log.info("SUCCESS SAVE");}, function(){ Mojo.Log.error("FAIL SAVE")});
					/*favoritesSav = new Mojo.Model.Cookie('favorites');
					favoritesSav.put(favorites);*/	
}
BookmarksAssistant.prototype.moveAtIndex = function(event){
	Mojo.Log.info('favoritesArray.length: '+favoritesArray.length+', event.fromIndex: '+event.fromIndex+', event.toIndex: '+event.toIndex)
					move = []
					move = favoritesArray.splice(event.fromIndex, 1) 
					favoritesArray.splice(event.toIndex, 0, move[0])
					db.add('favList', favoritesArray, function(){Mojo.Log.info("SUCCESS SAVE");}, function(){ Mojo.Log.error("FAIL SAVE")});
					/*favoritesSav = new Mojo.Model.Cookie('favorites');
					favoritesSav.put(favorites);*/	
}