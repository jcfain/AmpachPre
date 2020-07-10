mp3UrlArtist = ""
mp3UrlAlbum = ""
mp3UrlSong = ""
mp3UrlArt = ""
function UrlAddAssistant(arg, which) {
	  edit = arg
	  whichToSave = which
	document.getElementById('sceneStyle').style.backgroundImage =  "url(" + backGroundImage + ")";
	document.getElementById('sceneStyle').style.color =  textColor;
}

UrlAddAssistant.prototype.setup = function() {
	urlAddAss = this
	$('save').hide()
	if(edit==true){
    	this.saveButton = this.controller.get('save');
		this.saveHandeler = this.saveEdit.bind(this)
		$('searchAll').hide()
		this.saveButton.show()
	}else{
    	this.searchAllButton = this.controller.get('searchAll');
		this.searchAllHandeler = this.searchAll.bind(this)
		this.searchAllButton.show()
	}
	
	
	
	//url
	this.urlAttributes = {
        hintText: 'Mp3 Url...Required',
        changeOnKeyPress: true,
        enterSubmits: true,
		textCase: Mojo.Widget.steModeLowerCase,
		focusMode: Mojo.Widget.focusSelectMode,
		preventResize: true
		
    };
    this.urlModel = {
        value: "",
        disabled: false
    };
    this.controller.setupWidget('mp3Url', this.urlAttributes, this.urlModel);
    this.mp3UrlPropertyChange = this.setMp3UrlValue.bind(this);
    this.mp3UrlField = this.controller.get('mp3Url');
	
	//artist
	this.artistAttributes = {
        hintText: 'Artist Name',
        changeOnKeyPress: true,
        enterSubmits: true,
		focusMode: Mojo.Widget.focusSelectMode,
		preventResize: true
		
    };
    this.artistModel = {
        value: "",
        //disabled: false
    };
    this.controller.setupWidget('artist', this.artistAttributes, this.artistModel);
    this.artistPropertyChange = this.setArtistValue.bind(this);
    this.artistField = this.controller.get('artist');
	
	//album
	this.albumAttributes = {
        hintText: 'Album Name',
        changeOnKeyPress: true,
        enterSubmits: true,
		focusMode: Mojo.Widget.focusSelectMode,
		preventResize: true
		
    };
    this.albumModel = {
        value: "",
        //disabled: false
    };
    this.controller.setupWidget('album', this.albumAttributes, this.albumModel);
    this.albumPropertyChange = this.setAlbumValue.bind(this);
    this.albumField = this.controller.get('album');
	
	//song
	this.songAttributes = {
        hintText: 'Song Name',
        changeOnKeyPress: true,
        enterSubmits: true,
		focusMode: Mojo.Widget.focusSelectMode,
		preventResize: true
		
    };
    this.songModel = {
        value: "",
        //disabled: false
    };
    this.controller.setupWidget('song', this.songAttributes, this.songModel);
    this.songPropertyChange = this.setSongValue.bind(this);
    this.songField = this.controller.get('song');
	
	//art
	this.artAttributes = {
        hintText: 'Album Art Url',
        changeOnKeyPress: true,
        enterSubmits: true,
		textCase: Mojo.Widget.steModeLowerCase,
		focusMode: Mojo.Widget.focusSelectMode,
		preventResize: true
		
    };
    this.artModel = {
        value: "",
        //disabled: false
    };
    this.controller.setupWidget('art', this.artAttributes, this.artModel);
    this.artPropertyChange = this.setArtValue.bind(this);
    this.artField = this.controller.get('art');
	this.searchArtButton = this.controller.get('searchArt')	
	this.searchArtHandler = this.searchArt.bind(this)
	this.searchSongButton = this.controller.get('searchSong')	
	this.searchSongHandler = this.searchSong.bind(this)
	this.searchAlbumButton = this.controller.get('searchAlbum')	
	this.searchAlbumHandler = this.searchAlbum.bind(this)
	this.searchArtistButton = this.controller.get('searchArtist')	
	this.searchArtistHandler = this.searchArtist.bind(this)

}

UrlAddAssistant.prototype.activate = function(event) {
	//Mojo.Event.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	  	this.controller.listen(this.mp3UrlField, Mojo.Event.propertyChange, this.mp3UrlPropertyChange);
	  	this.controller.listen(this.artistField, Mojo.Event.propertyChange, this.artistPropertyChange);		
	  	this.controller.listen(this.albumField, Mojo.Event.propertyChange, this.albumPropertyChange);
	  	this.controller.listen(this.songField, Mojo.Event.propertyChange, this.songPropertyChange);
	  	this.controller.listen(this.artField, Mojo.Event.propertyChange, this.artPropertyChange);
		this.controller.listen(this.searchArtButton, Mojo.Event.tap, this.searchArtHandler);
		this.controller.listen(this.searchSongButton, Mojo.Event.tap, this.searchSongHandler);
		this.controller.listen(this.searchAlbumButton, Mojo.Event.tap, this.searchAlbumHandler);
		this.controller.listen(this.searchArtistButton, Mojo.Event.tap, this.searchArtistHandler);
	if (edit == true){
		
		if (whichToSave == 'downloads') {
			this.urlModel.value = sceneArray[popupIndex].url
			this.artistModel.value = sceneArray[popupIndex].artist
			this.albumModel.value = sceneArray[popupIndex].album
			this.songModel.value = sceneArray[popupIndex].song
			this.artModel.value = sceneArray[popupIndex].art
			this.controller.modelChanged(this.urlModel);
			this.controller.modelChanged(this.artistModel);
			this.controller.modelChanged(this.albumModel);
			this.controller.modelChanged(this.songModel);
			this.controller.modelChanged(this.artModel);
		}
		else if(whichToSave == 'savedPlaylist'){
			this.urlModel.value = savedPlaylistArray[popupIndex].url
			this.artistModel.value = savedPlaylistArray[popupIndex].artist
			this.albumModel.value = savedPlaylistArray[popupIndex].album
			this.songModel.value = savedPlaylistArray[popupIndex].song
			this.artModel.value = savedPlaylistArray[popupIndex].art
			this.controller.modelChanged(this.urlModel);
			this.controller.modelChanged(this.artistModel);
			this.controller.modelChanged(this.albumModel);
			this.controller.modelChanged(this.songModel);
			this.controller.modelChanged(this.artModel);
		}
    	this.controller.listen(this.saveButton, Mojo.Event.tap, this.saveHandeler);
		$('warning').innerHTML = 'When editing the Track info DO NOT edit the mp3 url!!!<br />unless you know what you are doing.'
	}else{
    	this.controller.listen(this.searchAllButton, Mojo.Event.tap, this.searchAllHandeler);
	}
}


UrlAddAssistant.prototype.deactivate = function(event) {
	  if(edit==true){
    	this.controller.stopListening(this.saveButton, Mojo.Event.tap, this.saveHandeler);
	  }else
		if (edit == false) {
			if (this.urlModel.value != "") {
				if (mp3UrlArtist == "") {
					mp3UrlArtist = "Unknown Artist"
				}
				if (mp3UrlAlbum == "") {
					mp3UrlAlbum = "Unknown Album"
				}
				if (mp3UrlSong == "") {
					mp3UrlSong = "Unknown Song"
				}
				if (mp3UrlArt == "") {
					mp3UrlArt = "images/folder.png"
				}
				playListItems.push({
					artist: mp3UrlArtist,
					time: 'Unknown',
					timeUnformatted: 00,
					album: mp3UrlAlbum,
					song: mp3UrlSong,
					url: mp3Url,
					art: mp3UrlArt,
					ticket: 00,
					artTicket: 00,
					size: 00,
					songId: 00,
					track: 00,
					source: 'urlAdd',
					urlAdd: true
				})
			}
			mp3UrlArtist = ""
			mp3UrlAlbum = ""
			mp3UrlSong = ""
			mp3Url = ""
			mp3UrlArt = ""
    	this.controller.stopListening(this.searchAllButton, Mojo.Event.tap, this.searchAllHandeler);
		}
	//Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
			this.controller.stopListening(this.mp3UrlField, Mojo.Event.propertyChange, this.mp3UrlPropertyChange);
			this.controller.stopListening(this.artistField, Mojo.Event.propertyChange, this.artistPropertyChange);
			this.controller.stopListening(this.albumField, Mojo.Event.propertyChange, this.albumPropertyChange);
			this.controller.stopListening(this.songField, Mojo.Event.propertyChange, this.songPropertyChange);
			this.controller.stopListening(this.artField, Mojo.Event.propertyChange, this.artPropertyChange);
		this.controller.stopListening(this.searchArtButton, Mojo.Event.tap, this.searchArtHandler);
		this.controller.stopListening(this.searchSongButton, Mojo.Event.tap, this.searchSongHandler);
		this.controller.stopListening(this.searchAlbumButton, Mojo.Event.tap, this.searchAlbumHandler);
		this.controller.stopListening(this.searchArtistButton, Mojo.Event.tap, this.searchArtistHandler);
}

UrlAddAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	//Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	  	this.controller.stopListening(this.mp3UrlField, Mojo.Event.propertyChange, this.mp3UrlPropertyChange);
	  	this.controller.stopListening(this.artistField, Mojo.Event.propertyChange, this.artistPropertyChange);		
	  	this.controller.stopListening(this.albumField, Mojo.Event.propertyChange, this.albumPropertyChange);
	  	this.controller.stopListening(this.songField, Mojo.Event.propertyChange, this.songPropertyChange);
	  	this.controller.stopListening(this.artField, Mojo.Event.propertyChange, this.artPropertyChange);
		this.controller.stopListening(this.searchArtButton, Mojo.Event.tap, this.searchArtHandler);
		this.controller.stopListening(this.searchSongButton, Mojo.Event.tap, this.searchSongHandler);
		this.controller.stopListening(this.searchAlbumButton, Mojo.Event.tap, this.searchAlbumHandler);
		this.controller.stopListening(this.searchArtistButton, Mojo.Event.tap, this.searchArtistHandler);
}
UrlAddAssistant.prototype.setMp3UrlValue = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	mp3Url =  this.urlModel.value.replace(/\s+/g, '%20')
}
UrlAddAssistant.prototype.setArtistValue = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	mp3UrlArtist =  this.artistModel.value
}
UrlAddAssistant.prototype.setAlbumValue = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	mp3UrlAlbum =  this.albumModel.value
}
UrlAddAssistant.prototype.setSongValue = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	mp3UrlSong =  this.songModel.value
}
UrlAddAssistant.prototype.setArtValue = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	mp3UrlArt =  this.artModel.value.replace(/\s+/g, '%20')
}
UrlAddAssistant.prototype.saveEdit = function(event){
	if (this.urlModel.value != "") {
	if (whichToSave == 'downloads') {
		sceneArray[popupIndex].url = this.urlModel.value
		sceneArray[popupIndex].artist = this.artistModel.value
		sceneArray[popupIndex].album = this.albumModel.value
		sceneArray[popupIndex].song = this.songModel.value
		sceneArray[popupIndex].art = this.artModel.value
		db.add(playListName, sceneArray, function(){
			Mojo.Log.info("UrlAddAssistant SUCCESS sceneArray SAVE");
		downloadsAss.controller.get('listDownloads').mojo.noticeUpdatedItems(0,sceneArray)
/*
			downloadsAss.listModel.items = sceneArray;
			downloadsAss.controller.modelChanged(downloadsAss.listModel);
*/
			urlAddAss.controller.stageController.popScene();
		}, function(){
			Mojo.Log.error("UrlAddAssistant sceneArray FAIL SAVE")
		});
	}else if(whichToSave == 'savedPlaylist'){
		savedPlaylistArray[popupIndex].url = this.urlModel.value
		savedPlaylistArray[popupIndex].artist = this.artistModel.value
		savedPlaylistArray[popupIndex].album = this.albumModel.value
		savedPlaylistArray[popupIndex].song = this.songModel.value
		savedPlaylistArray[popupIndex].art = this.artModel.value
		db.add(playListName, savedPlaylistArray, function(){
			Mojo.Log.info("UrlAddAssistant SUCCESS savedPlaylistArray SAVE");
/*
			savedPlaylistAss.listModel.items = savedPlaylistArray;
			savedPlaylistAss.controller.modelChanged(savedPlaylistAss.listModel);
*/
			savedPlaylistAss.controller.get('listPlaylist').mojo.noticeUpdatedItems(0,savedPlaylistArray)
			urlAddAss.controller.stageController.popScene();
		}, function(){ Mojo.Log.error("UrlAddAssistant savedPlaylistArray FAIL SAVE")});
	}
	}
}
UrlAddAssistant.prototype.searchArt = function(event){
	albumArtName = this.albumModel.value.replace(/\W/g, '+')
	artistName = this.artistModel.value.replace(/\W/g, '+')
	this.controller.serviceRequest("palm://com.palm.applicationManager", {
  		method: "open",
 		 parameters:  {
      		id: 'com.palm.app.browser',
     		params: {
          	target: "http://www.google.com/m/search?site=images&gl=us&client=ms-palm-webOS&source=mog&aq=&oq=&aqi=&fkt=&q="+artistName+"%20"+albumArtName
      		}
  		}
	});	
}
UrlAddAssistant.prototype.searchSong = function(event){
	songName = this.songModel.value.replace(/\W/g, '%20')
	this.controller.serviceRequest("palm://com.palm.applicationManager", {
  		method: "open",
 		 parameters:  {
      		id: 'com.palm.app.browser',
     		params: {
          	target: "http://beemp3.com/index.php?q="+songName+"&st=song"
      		}
  		}
	});	
}
UrlAddAssistant.prototype.searchArtist = function(event){
	artistName = this.artistModel.value.replace(/\W/g, '%20')
	this.controller.serviceRequest("palm://com.palm.applicationManager", {
  		method: "open",
 		 parameters:  {
      		id: 'com.palm.app.browser',
     		params: {
          	target: "http://beemp3.com/index.php?q="+artistName+"&st=artist"
      		}
  		}
	});
}
UrlAddAssistant.prototype.searchAlbum = function(event){
	albumName = this.albumModel.value.replace(/\W/g, '%20')
	this.controller.serviceRequest("palm://com.palm.applicationManager", {
  		method: "open",
 		 parameters:  {
      		id: 'com.palm.app.browser',
     		params: {
          	target: "http://beemp3.com/index.php?q="+albumName+"&st=artist"
      		}
  		}
	});
}
UrlAddAssistant.prototype.searchAll = function(event){
	songName = this.songModel.value.replace(/\W/g, '%20')
	albumName = this.albumModel.value.replace(/\W/g, '%20')
	artistName = this.artistModel.value.replace(/\W/g, '%20')
	this.controller.serviceRequest("palm://com.palm.applicationManager", {
  		method: "open",
 		 parameters:  {
      		id: 'com.palm.app.browser',
     		params: {
          	target: "http://beemp3.com/index.php?q="+songName+"%20"+albumName+"%20"+artistName
      		}
  		}
	});	
}