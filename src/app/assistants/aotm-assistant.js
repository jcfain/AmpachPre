function AotmAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	document.getElementById('sceneStyle').style.backgroundImage =  "url(" + backGroundImage + ")";
	document.getElementById('sceneStyle').style.color =  textColor;
	document.getElementById('listBorder').style.border =  "2px solid "+textColor;
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		Mojo.Log.info('Pixi sized')
		document.getElementById('scrollerId').style.height = '260px';
	}
}

AotmAssistant.prototype.setup = function() {	
	aotmAss = this
	this.displayAlbumArtsHandler = this.displayAlbumArts.bind(this)
	this.pushSongsHandler = this.pushSongs.bind(this)
	this.pushAotmHandler = this.albumOfTheMoment.bind(this)
	this.toggleAotm = this.getRandomAlbums.bind(this);
			this.cmdMenuModel = {
  				visible: true,
  					items: [				
							{label: $L(''),icon: 'home',command: 'backToSearch'},
							{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'}, {label: $L(''), icon:'refresh', command:'refresh'},{label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
							{label: $L(''),icon: 'list', command: 'viewPlaylist'},
  							]
						};
		this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass:'no-fade'}, this.cmdMenuModel);
//spinners
   this.controller.setupWidget("spinner",
         this.attributes = {
             spinnerSize: 'large'
         },
         this.model = {
             spinning: false 
         });
	this.controller.setupWidget("aotm", {
        itemTemplate: "aotm/aotmTemplate",
        listTemplate: "aotm/listTemplate",
		fixedHeightItems: true,
		swipeToDelete: false,
		reorderable: false,
		hasNoWidgets: true,
    },  
	this.aotmModel = {
         items : imageArray
    });		   
	this.controller.setupWidget("scrollerId",
         this.scrollerAttributes = {
             mode: 'vertical'
         },
         this.scrollerModel = {
         });
	setTimeout(function(){
				if (listAlbumsArt.length == 0) {
					aotmAss.getAlbumArts();
				}
/*
				else{
					aotmAss.getRandomAlbums();
				}
*/
		},500)
};

AotmAssistant.prototype.activate = function(event) {
		stageAss.listResize()
	Mojo.Event.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	Mojo.Event.listen($('aotm'), Mojo.Event.listTap, this.pushAotmHandler);	
		Mojo.Event.listen(this.controller.window, 'resize', listResizeHandler);
	//Mojo.Event.listen($('aotmRefresh'), Mojo.Event.tap, this.toggleAotm);
};

AotmAssistant.prototype.deactivate = function(event) {
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	Mojo.Event.stopListening($('aotm'), Mojo.Event.listTap, this.pushAotmHandler);
		Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
	//Mojo.Event.stopListening($('aotmRefresh'), Mojo.Event.tap, this.toggleAotm);
};

AotmAssistant.prototype.cleanup = function(event) {
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	Mojo.Event.stopListening($('aotm'), Mojo.Event.listTap, this.pushAotmHandler);
		Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
	//Mojo.Event.stopListening($('aotmRefresh'), Mojo.Event.tap, this.toggleAotm);
};
AotmAssistant.prototype.toggleAlbumArts = function(event){
	if (this.toggleModel.value == 'On') {
		this.controller.get('favs').hide();
		if (listAlbumsArt.length == 0) {
		}
		else{
			this.controller.get('aotm').hide();
			this.controller.get('title').innerHTML = '';
			this.controller.get('aotmRefresh').hide();
			this.controller.get('aotmRefreshText').hide();
			//this.controller.get('aotmSpinner').mojo.start();
			this.getRandomAlbums();
		}
	}
	else if (this.toggleModel.value == 'Off'){
		this.controller.get('aotm').hide();
		this.controller.get('aotmRefresh').hide();
		this.controller.get('aotmRefreshText').hide();
		//this.controller.get('aotmSpinner').mojo.stop();
		this.controller.get('favs').show();
		//this.controller.get('scrollerId').show()
		//this.controller.get('favorites').show()
		//this.controller.get('bookmarksTitle').show();
		this.controller.get('title').innerHTML = 'Bookmarks'
		imageArray.length = 0;
/*
		this.favoritesModel.items = favoritesArray;
		this.controller.modelChanged(this.favoritesModel);
*/
	}
//Mojo.Controller.errorDialog(this.toggleModel.value);
}
AotmAssistant.prototype.getAlbumArts = function(event){
/*
	this.controller.get('aotm').hide();
	this.controller.get('title').innerHTML = '';
	this.controller.get('aotmRefresh').hide();
	this.controller.get('aotmRefreshText').hide();
*/
	//this.controller.get('aotmSpinner').mojo.start();
	this.controller.get('scrimSpinner').show();
	this.controller.get('spinner').mojo.start();
	var filterByAlbumArt = serverUrl + "/server/xml.server.php?action=albums&auth=" + token + "&filter= ";
	var artRequest = new Ajax.Request(filterByAlbumArt,
  	{
    	method:"get",
		evalJSON: "false",
    		onComplete: this.displayAlbumArtsHandler,

    		onFailure: function(){
			Mojo.Controller.errorDialog("There was a problem getting album art.");
			}
	});
}

AotmAssistant.prototype.displayAlbumArts = function(transport){
				var response = transport.responseText || "no response text";
				Mojo.Log.info(response);				
			albumsArt = transport.responseXML.getElementsByTagName('album');
			listAlbumsArt = [];
			for (i = 0; i < albumsArt.length; i++) {
				listAlbumsArt[i] = {
					album: albumsArt[i].getElementsByTagName('name')[0].firstChild.data,
					albumId: albumsArt[i].getAttribute("id"),
					//songs: albumsArt[i].getElementsByTagName('tracks')[0].firstChild.data,
					artist: albumsArt[i].getElementsByTagName('artist')[0].firstChild.data,
					art: albumsArt[i].getElementsByTagName('art')[0].firstChild.data
					}		
				};
				this.getRandomAlbums();
}
AotmAssistant.prototype.getRandomAlbums = function(event){
			albumsTotalRange = listAlbumsArt.length
			imageArray = []
		for (p = 0; p < 12; p++) {
				randomAlbumsIndex = Math.floor(Math.random() * albumsTotalRange);
				imageArray.push(listAlbumsArt[randomAlbumsIndex]);
		}
			
		this.controller.get('scrimSpinner').hide();
		this.controller.get('spinner').mojo.stop();
		this.aotmModel.items = imageArray;
		this.controller.modelChanged(this.aotmModel);
		$('aotm').show()
			
/*
	if (this.toggleModel.value == 'On') {
		this.controller.get('title').innerHTML = 'Albums of the Moment';
		//this.controller.get('aotmSpinner').mojo.stop();
		this.controller.get('aotmRefresh').show();
		this.controller.get('aotmRefreshText').show();
		this.controller.get('aotm').show();
	}
*/
}
AotmAssistant.prototype.albumOfTheMoment = function(event){
	//this.controller.get('aotmTableDiv').hide();
	this.controller.get('scrimSpinner').show();
	this.controller.get('spinner').mojo.start();
	var albumId = imageArray[event.index].albumId;
	album = imageArray[event.index].album		
	albumArt = imageArray[event.index].art;
	var filterSongsUrl = serverUrl + "/server/xml.server.php?action=album_songs&auth=" +token+ "&filter="+albumId;
	var request = new Ajax.Request(filterSongsUrl,
  	{
    	method:"get",
		evalJSON: "false",
    		onComplete: this.pushSongsHandler, 
    		onFailure: function(){
			Mojo.Controller.errorDialog("There was a problem getting album songs.");
			}
	});
}
AotmAssistant.prototype.pushSongs = function(transport){
	var songs = transport.responseXML.getElementsByTagName('song');
	listSongs = [];
	for (i = 0; i < songs.length; i++) {
		/*var url = songs[i].getElementsByTagName('url')[0].firstChild.data, extension = "";
		
		if (url.length != 0) {
			var dotPos = url.lastIndexOf(".");
			if (dotPos != -1) 
				extension = url.substr(dotPos + 1).toLowerCase();
			;
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
			source: 'songs',
			//type: extension
		}
					convert = Math.floor(listSongs[i].time / 60);
					convert2 = listSongs[i].time % 60;
					convertString = convert2.toString()
					if (convertString[1] == "." || convertString[1] == undefined){convertSecs = "0"+convertString[0]}
					else{
						convertSecs = convertString[0]+convertString[1]}
					
					listSongs[i].time = convert + ":" + convertSecs;		
	}
	//Mojo.Controller.errorDialog(this.controller);
//	if (activate == true){
//			Mojo.Controller.stageController.activate('songs')
//	}
//	else if (activate == false) {
	Mojo.Controller.stageController.pushScene({
					name: "songs",
					//transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				});
	this.controller.get('scrimSpinner').hide();
	this.controller.get('spinner').mojo.stop();
//		activate=true;
//	}
}

AotmAssistant.prototype.handleCommand = function(event){
	//this.currentScene=Mojo.Controller.stageController.activeScene();
	if (event.type == Mojo.Event.command) {
		switch (event.command) {
		
			case 'refresh':
				this.getRandomAlbums()
				break;
		}
	}
	if (event.type == Mojo.Event.back){
		//this.controller.stageController.swapScene('search');
	}
}
