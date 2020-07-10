function ListAllAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	document.getElementById('sceneStyle').style.backgroundImage =  "url(" + backGroundImage + ")";
	document.getElementById('sceneStyle').style.color =  textColor;
	document.getElementById('listBorder').style.border =  "2px solid "+textColor;
	document.getElementById('singleBorder').style.borderColor = textColor;
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		document.getElementById('scrollerId').style.height = '260px';
	}
}

ListAllAssistant.prototype.setup = function() {
	Mojo.Log.info('Enter ListAllAssistant.prototype.setup');	
	listAllAss = this
/*
	if(listAll.length > 1){
		$('name').innerHTML = listAll.length+' results, '+totalListAllSongs+' Songs'
	}else{
		$('name').innerHTML = listAll.length+' result, '+totalListAllSongs+' Songs'
	}
*/
	
    this.pushNextHandler = this.pushNext.bindAsEventListener(this);
	this.listAllWidgetHandler=this.controller.get('listAllWidget')
	this.swipeAddToPlayListHandler = this.swipeAddToPlayList.bindAsEventListener(this);	
	this.popupHandler = this.popup.bind(this)	
	//this.playAllHandler = this.setupPlayAll.bind(this)
	this.menuHandler = this.menu.bind(this)
	this.sortHandler = this.sort.bind(this)
	this.artistListHandler = this.artistList.bind(this)	
	this.albumsListHandler = this.albumList.bind(this)
	this.songsListHandler = this.songList.bind(this)
	//this.divideHandler = this.divide.bind(this)
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
								{label: $L(listAll.length+' results, '+totalListAllSongs+' Songs'),icon: '',command: '', width:260},
	      						{label: $L(''),icon: 'menu',command: 'sortMenu'},
    							]
  							}]
						};
		this.controller.setupWidget(Mojo.Menu.viewMenu, {spacerHeight: 0, menuClass:'no-fade'}, this.viewMenuModel);
	
	this.controller.setupWidget("listAllWidget", {
        itemTemplate: "listAll/rowTemplate",
        listTemplate: "listAll/listTemplate",
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
        items: listAll
    });
	
	//spinners
	this.controller.setupWidget("spinner", this.attributes = {
		spinnerSize: 'large'
	}, this.spinnerModel = {
		spinning: false
	});	
	this.controller.setupWidget("spinnerSmall", this.spinnerSmallattributes = {
		spinnerSize: 'small'
	}, this.spinnerSmallModel = {
		spinning: false
	});	
	
	this.addFavsHandler = $('addFavs')
	this.add2FavsHandler = this.addToFavs.bind(this)
	
	
	this.controller.setupWidget("scrollerId",
    	this.scrollerAttributes = {
        	mode: 'vertical'
        },
        this.scrollerModel = {
    });

Mojo.Log.info('Exit ListAllAssistant.prototype.setup');
}

ListAllAssistant.prototype.activate = function(event) {
		stageAss.listResize()
		Mojo.Event.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	  	this.controller.listen(this.listAllWidgetHandler, Mojo.Event.listTap, this.pushNextHandler);	 
		this.controller.listen(this.listAllWidgetHandler, Mojo.Event.listDelete, this.swipeAddToPlayListHandler);
	Mojo.Event.listen(this.controller.window, 'resize', listResizeHandler);
		//this.controller.listen(Mojo.Event.hold, this.menuHandler)
}


ListAllAssistant.prototype.deactivate = function(event) {
		Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
		this.controller.stopListening(this.listAllWidgetHandler, Mojo.Event.listTap, this.pushNextHandler);	 
		this.controller.stopListening(this.listAllWidgetHandler, Mojo.Event.listDelete, this.swipeAddToPlayListHandler);
	Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
		//this.controller.stopListening($('menu'), Mojo.Event.tap, this.menuHandler)
		accountsAss.resetToggleSorts()
}

ListAllAssistant.prototype.cleanup = function(event) {
		Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
		this.controller.stopListening(this.listAllWidgetHandler, Mojo.Event.listTap, this.pushNextHandler);	 
		this.controller.stopListening(this.listAllWidgetHandler, Mojo.Event.listDelete, this.swipeAddToPlayListHandler);
	Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
		//this.controller.stopListening(Mojo.Event.hold, this.menuHandler)
	  	listAll.length = 0;
		playAll.length = 0;
		totalListAllSongs = 0
}
ListAllAssistant.prototype.pushNext = function(event){
    var target = event.originalEvent.target.className;
    popupIndex = event.index;
    // Mojo.Log.info("target: "+target);
    if (target !== "addFavs") {
        this.controller.get('spinner').mojo.start();
        this.controller.get('scrimSpinner').show();    
		if (listAll[event.index].sourceType == 'artist') {
			artistSearch = true
			artistId = listAll[event.index].artistId;
			artist = listAll[event.index].artist;
			
			if (listAll[event.index].albums > 1) {
				var filterUrl = serverUrl + "/server/xml.server.php?action=artist_albums&auth=" + token + "&filter=" + artistId;
				//Mojo.Controller.errorDialog(filterUrl);
				var request = new Ajax.Request(filterUrl, {
					method: "get",
					evalJSON: "false",
					onComplete: function(transport){
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
							totalAlbumsSongs = totalAlbumsSongs + parseFloat(listAlbums[i].songs)
						}
						artistInfo = artist + ', ' + totalAlbumsSongs + ' Songs'
						listAllAss.controller.stageController.pushScene({
							name: "albums",
							disableSceneScroller: true
						});
						listAllAss.controller.get('scrimSpinner').hide();
						listAllAss.controller.get('spinner').mojo.stop();
						
					},
					onFailure: function(){
						Mojo.Controller.errorDialog("there was a problem.");
					}
				});
			}
			else {
				var filterUrl = serverUrl + "/server/xml.server.php?action=artist_songs&auth=" + token + "&filter=" + artistId;
				//Mojo.Controller.errorDialog(filterUrl);
				var request = new Ajax.Request(filterUrl, {
					method: "get",
					evalJSON: "false",
					onComplete: function(transport){
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
							if (convertString[1] == "." || convertString[1] == undefined) {
								convertSecs = "0" + convertString[0]
							}
							else {
								convertSecs = convertString[0] + convertString[1]
							}
							
							listSongs[i].time = convert + ":" + convertSecs;
						}
						albumArt = listSongs[0].art;
						album = listSongs[0].album
						artistAlbum = listSongs[0].artist
						listAllAss.controller.stageController.pushScene({
							name: "songs",
							disableSceneScroller: true
						});
						listAllAss.controller.get('scrimSpinner').hide();
						listAllAss.controller.get('spinner').mojo.stop();
					},
					onFailure: function(){
						Mojo.Controller.errorDialog("there was a problem.");
					}
				});
			}
		}
		else 
			if (listAll[event.index].sourceType == 'album') {
				albumArt = listAll[event.index].art;
				album = listAll[event.index].album
				albumId = listAll[event.index].albumId;
				var filterUrl = serverUrl + "/server/xml.server.php?action=album_songs&auth=" + token + "&filter=" + albumId;
				//Mojo.Controller.errorDialog(albumArt);
				var request = new Ajax.Request(filterUrl, {
					method: "get",
					evalJSON: "false",
					onComplete: function(transport){
						var songs = transport.responseXML.getElementsByTagName('song');
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
								source: 'album',
							//type: extension
							}
							convert = Math.floor(listSongs[i].time / 60);
							convert2 = listSongs[i].time % 60;
							convertString = convert2.toString()
							if (convertString[1] == "." || convertString[1] == undefined) {
								convertSecs = "0" + convertString[0]
							}
							else {
								convertSecs = convertString[0] + convertString[1]
							}
							
							listSongs[i].time = convert + ":" + convertSecs;
						}
						listAllAss.controller.stageController.pushScene({
							name: "songs",
							disableSceneScroller: true
						});
						listAllAss.controller.get('scrimSpinner').hide();
						listAllAss.controller.get('spinner').mojo.stop();
					},
					onFailure: function(){
						Mojo.Controller.errorDialog("there was a problem.");
					}
				});
			}
			else 
				if (listAll[event.index].sourceType == 'song') {
					playItems = []
					playItems.push(listAll[event.index])
					for (i = 0; i < listAll.length; i++) {
						if (listAll[i].sourceType == 'song') {
							if (listAll[i].song != listAll[event.index].song) {
								playItems.push(listAll[i])
							}
						}
					}
					listIndex = 0
					if (ticketNumArray.length != 0) {
						audioAss.deleteSongs();
					}
					this.controller.stageController.pushScene({
						name: "stream",
						//transition: Mojo.Transition.crossFade,
						disableSceneScroller: true
					}, 'playAll');
					audioAss.setupPlaySong();
					this.controller.get('scrimSpinner').hide();
					this.controller.get('spinner').mojo.stop();
				}
				else 
					if (listAll[event.index].sourceType == 'tags') {
						tagId = listAll[event.index].tagId;
						//artist = listTags[event.index].artist;
						if (listAll[event.index].artists > 0) {
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
						}else if(listAll[event.index].albums > 0){
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
						else if(listAll[event.index].songs > 0){
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
    }
    else {
		if (listAll[event.index].sourceType != 'tags') {
			this.controller.popupSubmenu({
				onChoose: this.popupHandler,
				placeNear: event.originalEvent.target,
				items: [{
					label: 'Add to Playlist',
					command: 'addToList'
				}, {
					label: 'Bookmark',
					command: 'addToFavs'
				}, {
					label: 'Cancel',
					command: 'cancel'
				}]
			});
		}else{
			this.controller.popupSubmenu({
				onChoose: this.popupHandler,
				placeNear: event.originalEvent.target,
				items: [{
					label: 'Add to Playlist',
					command: 'addToList'
				}, {
					label: 'Cancel',
					command: 'cancel'
				}]
			});
		}
    }

}
ListAllAssistant.prototype.popup = function(command){
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
					if (listAll[popupIndex].sourceType == 'song') {
						audioAss.addToNowPlaying(listAll[popupIndex])
					}else{
						Mojo.Controller.errorDialog('Add to now playing on Artists and Albums not supported yet.');
					}
				break;
			case 'cancel':
				//function(){};
				break;
		}
}

ListAllAssistant.prototype.addToFavs = function(){
			//Mojo.Controller.errorDialog(list[popupIndex].artistId);
	
if (listAll[popupIndex].sourceType == 'artist') {
	favoritesArray.push({
		type: 'artist_albums',
		artist: listAll[popupIndex].artist,
		artistId: listAll[popupIndex].artistId,
		image: "images/artist50px.png",
		textName: listAll[popupIndex].artist,
		textArtist: "",
	})
}
else 
	if (listAll[popupIndex].sourceType == 'album') {
		favoritesArray.push({
			type: 'album_songs',
			artist: listAll[popupIndex].artist,
			albumId: listAll[popupIndex].albumId,
			album: listAll[popupIndex].album,
			image: "images/album50px.png",
			textName: listAll[popupIndex].album,
			textArtist: listAll[popupIndex].artist,
		})
	}
	else 
		if (listAll[popupIndex].sourceType == 'song') {
			favoritesArray.push({
					type: 'song',
					song: listAll[popupIndex].song,
					songId: listAll[popupIndex].songId,
					time: listAll[popupIndex].time,
					timeUnformatted: parseFloat(listAll[popupIndex].timeUnformatted),
					artist: listAll[popupIndex].artist,
					album: listAll[popupIndex].album,
					url: listAll[popupIndex].url,
					size: listAll[popupIndex].size,
					art: listAll[popupIndex].art,
					image: "images/song50px.png",
					textName: listAll[popupIndex].song,
					textArtist: listAll[popupIndex].artist,
			})
		}
		db.add('favList', favoritesArray, function(){
			Mojo.Log.info("SUCCESS SAVE");
/*
			bookmarksAss.favoritesModel.items = favoritesArray;
			bookmarksAss.controller.modelChanged(bookmarksAss.favoritesModel);
*/
			}, function(){ Mojo.Log.error("FAIL SAVE")});
}
ListAllAssistant.prototype.swipeAddToPlayList = function(event){
	if (tapToAdd == true) {
		playListIndex = popupIndex
	}
	else {
		playListIndex = event.index
	}
	this.controller.get('spinnerSmall').mojo.start();
if (listAll[playListIndex].sourceType == 'artist') {
	artistId = listAll[playListIndex].artistId;
	var filterUrl = serverUrl + "/server/xml.server.php?action=artist_songs&auth=" + token + "&filter=" + artistId;
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
				if (convertString[1] == "." || convertString[1] == undefined) {
					convertSecs = "0" + convertString[0]
				}
				else {
					convertSecs = convertString[0] + convertString[1]
				}
				playListItems[newPlayListIndex].time = convert + ":" + convertSecs;
				newPlayListIndex = newPlayListIndex + 1;
			}
			listAllAss.controller.get('spinnerSmall').mojo.stop();
			Mojo.Controller.getAppController().showBanner(songs.length + ' songs added to playlist.', {
				source: 'notification'
			});
			if (tapToAdd == false) {
				totalListAllSongs = totalListAllSongs - songs.length
				if (listAll.length > 1) {
					$('name').innerHTML = listAll.length + ' results, ' + totalListAllSongs + ' Songs'
				}
				else {
					$('name').innerHTML = listAll.length + ' result, ' + totalListAllSongs + ' Songs'
				}
				listAll.splice(playListIndex, 1)
			}
			tapToAdd = false
		},
		onFailure: function(){
			listAllAss.controller.get('spinnerSmall').mojo.stop();
			Mojo.Controller.errorDialog("there was a problem.");
		}
	});
}
else 
	if (listAll[playListIndex].sourceType == 'album') {
		playListSumDifference = 0;
		spliceCount = 0
		var albumId = listAll[playListIndex].albumId;
		var filterUrl = serverUrl + "/server/xml.server.php?action=album_songs&auth=" + token + "&filter=" + albumId;
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
				listAllAss.controller.get('spinnerSmall').mojo.stop();
				Mojo.Controller.getAppController().showBanner(songs.length + ' songs added to playlist.', {
					source: 'notification'
				});
				if (tapToAdd == false) {
					totalListAllSongs = totalListAllSongs - songs.length
					if (listAll.length > 1) {
						$('name').innerHTML = listAll.length + ' results, ' + totalListAllSongs + ' Songs'
					}
					else {
						$('name').innerHTML = listAll.length + ' result, ' + totalListAllSongs + ' Songs'
					}
					listAll.splice(playListIndex, 1)
				}
				tapToAdd = false
			},
			onFailure: function(){
				listAllAss.controller.get('spinnerSmall').mojo.stop();
				Mojo.Controller.errorDialog("there was a problem.");
			}
		});
	}
	else 
		if (listAll[playListIndex].sourceType == 'song') {
			songs = ['1']
			playListItems[newPlayListIndex] = {
				song: listAll[playListIndex].song,
				songId: listAll[playListIndex].songId,
				time: listAll[playListIndex].time,
				timeUnformatted: parseFloat(listAll[playListIndex].timeUnformatted),
				artist: listAll[playListIndex].artist,
				album: listAll[playListIndex].album,
				url: listAll[playListIndex].url,
				size: listAll[playListIndex].size,
				art: listAll[playListIndex].art,
				source: 'playlist',
				urlAdd: false
			};
			playListSum = playListSum + playListItems[newPlayListIndex].timeUnformatted;
			Mojo.Controller.getAppController().showBanner(playListItems[newPlayListIndex].song + ' added to playlist.', {
				source: 'notification'
			});
			newPlayListIndex = newPlayListIndex + 1;
			listAllAss.controller.get('spinnerSmall').mojo.stop();
			
			if (tapToAdd == false) {
				totalListAllSongs = totalListAllSongs - songs.length
				if (listAll.length > 1) {
					$('name').innerHTML = listAll.length + ' results, ' + totalListAllSongs + ' Songs'
				}
				else {
					$('name').innerHTML = listAll.length + ' result, ' + totalListAllSongs + ' Songs'
				}
				listAll.splice(playListIndex, 1)
			}
			tapToAdd = false
		}
		else 
			if (listAll[playListIndex].sourceType == 'tags') {
				tagId = listAll[playListIndex].tagId;
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
							if (convertString[1] == "." || convertString[1] == undefined) {
								convertSecs = "0" + convertString[0]
							}
							else {
								convertSecs = convertString[0] + convertString[1]
							}
							playListItems[newPlayListIndex].time = convert + ":" + convertSecs;
							newPlayListIndex = newPlayListIndex + 1;
						}
						
						listAllAss.controller.get('spinnerSmall').mojo.stop();
						Mojo.Controller.getAppController().showBanner(songs.length + ' songs added to playlist.', {
							source: 'notification'
						});
						if (tapToAdd == false) {
							totalListAllSongs = totalListAllSongs - songs.length
							if (listAll.length > 1) {
								$('name').innerHTML = listAll.length + ' results, ' + totalListAllSongs + ' Songs'
							}
							else {
								$('name').innerHTML = listAll.length + ' result, ' + totalListAllSongs + ' Songs'
							}
							listAll.splice(playListIndex, 1)
						}
						tapToAdd = false
					},
					onFailure: function(){
						listAllAss.controller.get('spinnerSmall').mojo.stop();
						Mojo.Controller.errorDialog("there was a problem.");
					}
				})
			}
}
ListAllAssistant.prototype.setupPlayAll = function(event){
	if (totalListAllSongs < 300) {
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
						totalListAllSongs = 299
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
ListAllAssistant.prototype.playAll = function(event){
		Mojo.Log.info('listAll[playAllIndex].sourceType: ' + listAll[playAllIndex].sourceType)
		if (listAll[playAllIndex].sourceType == 'artist') {
			artistId = listAll[playAllIndex].artistId;
			filterUrl = serverUrl + "/server/xml.server.php?action=artist_songs&auth=" + token + "&filter=" + artistId;
			Mojo.Log.info('Play All filterUrl: ' + filterUrl);
			request = new Ajax.Request(filterUrl, {
				method: "get",
				evalJSON: "false",
				onComplete: function(transport){
					var songs = transport.responseXML.getElementsByTagName('song');
					Mojo.Log.info('songs.length artist: ' + songs.length);
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
						Mojo.Log.info('Play All Artist: ' + playItems[playItems.length - 1].artist);
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
					
					
					if (playAllIndex != listAll.length - 1) {
						playAllIndex++
						listAllAss.playAll()
					}
					else {
						listAllAss.pushPlayAll();
					}
					
				},
				onFailure: function(){
					//artistAss.controller.get('spinnerSmall').mojo.stop();
					listAllAss.controller.get('scrimSpinner').hide();
					listAllAss.controller.get('spinner').mojo.stop();
					Mojo.Controller.errorDialog("there was a problem.");
				}
			});
		}
		else 
			if (listAll[playAllIndex].sourceType == 'album') {
				var albumId = listAll[playAllIndex].albumId;
				var filterUrl = serverUrl + "/server/xml.server.php?action=album_songs&auth=" + token + "&filter=" + albumId;
				Mojo.Log.info('Play All filterUrl: ' + filterUrl);
				request = new Ajax.Request(filterUrl, {
					method: "get",
					evalJSON: "false",
					onComplete: function(transport){
						var songs = transport.responseXML.getElementsByTagName('song');
						Mojo.Log.info('songs.length album: ' + songs.length);
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
							Mojo.Log.info('Play All Album: ' + playItems[playItems.length - 1].album);
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
						
						
						
						if (playAllIndex != listAll.length - 1) {
							playAllIndex++
							listAllAss.playAll()
						}
						else {
							listAllAss.pushPlayAll();
						}
					//newPlayListIndex=newPlayListIndex+1;
					
					},
					onFailure: function(){
						listAllAss.controller.get('scrimSpinner').hide();
						listAllAss.controller.get('spinner').mojo.stop();
						//albumsAss.controller.get('spinnerSmall').mojo.stop();
						Mojo.Controller.errorDialog("there was a problem.");
					}
				});
			}
			else 
				if (listAll[playAllIndex].sourceType == 'tags') {
					tagId = listAll[playAllIndex].tagId;
					var filterUrl = serverUrl + "/server/xml.server.php?action=tag_songs&auth=" + token + "&filter=" + tagId;
					//Mojo.Controller.errorDialog(filterUrl);
					var request = new Ajax.Request(filterUrl, {
						method: "get",
						evalJSON: "false",
						onComplete: function(transport){
							var songs = transport.responseXML.getElementsByTagName('song');
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
								Mojo.Log.info('Play All Album: ' + playItems[playItems.length - 1].album);
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
							if (playAllIndex != listAll.length - 1) {
								playAllIndex++
								listAllAss.playAll()
							}
							else {
								listAllAss.pushPlayAll();
							}
						}
					})
				}
				else 
					if (listAll[playAllIndex].sourceType == 'song') {
						playItems.push(listAll[playAllIndex])
						
						if (playAllIndex != listAll.length - 1) {
							playAllIndex++
							listAllAss.playAll()
						}
						else {
							listAllAss.pushPlayAll();
						}
					}
}
ListAllAssistant.prototype.pushPlayAll = function(items){
		//albumsAss.controller.get('spinnerSmall').mojo.stop();
		
			audioAss.rewrite();
			
			if(ticketNumArray.length != 0){
				audioAss.deleteSongs();
			}
		listAllAss.controller.stageController.pushScene({
			name: "stream",
			//transition: Mojo.Transition.crossFade,
			disableSceneScroller: true
		}, 'playAll');
		audioAss.setupPlaySong();
		listAllAss.controller.get('scrimSpinner').hide();
		listAllAss.controller.get('spinner').mojo.stop();
}
ListAllAssistant.prototype.divide = function (items) {
	
	//document.getElementById('wrapper').style.borderColor = textColor;
        return items.artist[0].toUpperCase();
}
ListAllAssistant.prototype.handleCommand = function(event){
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
	  //lastScene = 'artists'
		//this.controller.stageController.swapScene(lastScene);
	}
}
ListAllAssistant.prototype.menu = function(event){
	//Mojo.Log.info(Object.toJSON(event))
		this.controller.popupSubmenu({
			onChoose: this.sortHandler,
			placeNear: event.target,
			items: [{
				label: 'Sort by Type',
				command: 'sortByType'
			},	{
				label: 'Sort by Name',
				command: 'sortByName'
			},	{
				label: 'Sort by Artist',
				command: 'sortByArtist'
			},	
			{label: 'Cancel',command: 'cancel'}
			]
		});

}
ListAllAssistant.prototype.sort = function(command){
	
		switch (command) {
		
			case 'sortByArtist':
			accountsAss.sortArray(listAll, this.listModel, 'artist')
				break;
			case 'sortByName':
			accountsAss.sortArray(listAll, this.listModel, 'name')
				break;
			case 'sortByType':
			accountsAss.sortArray(listAll, this.listModel, 'type')
				break;
			case 'cancel':
				break;
		}

}
ListAllAssistant.prototype.artistList = function(transport){
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
ListAllAssistant.prototype.albumList = function(transport){
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
ListAllAssistant.prototype.songList = function(transport){
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