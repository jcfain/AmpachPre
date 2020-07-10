function VideosAssistant() {
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

VideosAssistant.prototype.setup = function() {
	// Load the MediaExtension library
this.libs = MojoLoader.require({ name: "mediaextension", version: "1.0"});
 
// If you don't already have one, get a reference to the media element, using its ID
video = this.controller.get("video");
 
// Instantiate the MediaExtension object
this.extObj = this.libs.mediaextension.MediaExtension.getInstance(video);
	
	this.controller.setupWidget(Mojo.Menu.appMenu, accountsAttr, appMenuModel);	
	
	this.controller.setupWidget("listVideosWidget", {
        itemTemplate: "videos/rowTemplate",
        listTemplate: "videos/listTemplate",
		swipeToDelete: false, 
		fixedHeightItems: true, 
		renderLimit: 20,
    },  
	this.model = {
        items: listVideos
    });
	
		this.viewMenuModel = {
				visible: true,
					items: [{
					items: [
							{label: $L('Video Results'),icon: '',command: '', width:260},
      						{label: $L(''),icon: 'menu',command: 'noting'},
							]
							}]
					};
		this.controller.setupWidget(Mojo.Menu.viewMenu, {spacerHeight: 0, menuClass:'no-fade'}, this.viewMenuModel);
	
    this.playVideoHandler = this.playVideo.bindAsEventListener(this);
	this.videoProgressHandler = this.videoProgress.bind(this)
	this.errorhandler = this.error.bind(this)
	this.listVideosWidgetHandler=this.controller.get('listVideosWidget');		
}

VideosAssistant.prototype.activate = function(event) {
		stageAss.listResize()
	//Mojo.Event.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.listen(this.listVideosWidgetHandler, Mojo.Event.listTap, this.playVideoHandler);
		Mojo.Event.listen(this.controller.window, 'resize', listResizeHandler);	
}


VideosAssistant.prototype.deactivate = function(event) {
	  this.controller.stopListening(this.listVideosWidgetHandler, Mojo.Event.listTap, this.playVideoHandler);
		Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
		accountsAss.resetToggleSorts()
}

VideosAssistant.prototype.cleanup = function(event) {
	  this.controller.stopListening(this.listVideosWidgetHandler, Mojo.Event.listTap, this.playVideoHandler);
		Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
}
VideosAssistant.prototype.playVideo = function(event) {
	Mojo.Log.info(listVideos[event.index].url);
	video.addEventListener('progress', this.videoProgressHandler);
	video.addEventListener('error', this.errorhandler);	
	video.src = listVideos[event.index].url
	video.play()
/*
	this.controller.serviceRequest('palm://com.palm.applicationManager', {
     method:      'launch',
	 id: 'com.palm.app.videoplayer',
     parameters:  {
                  	target: listVideos[event.index].url
                  }
     });
*/
}
VideosAssistant.prototype.videoProgress = function(event){
Mojo.Log.info('video progress: '+event.loaded / event.total)
/*
							streamAss.progressModel.progress = event.loaded / event.total// + .02
							streamAss.controller.modelChanged(streamAss.progressModel)
*/
}

VideosAssistant.prototype.error = function(event){				

Mojo.Log.info('Enter VideosAssistant.error')
						//errorDetails.errorClass...errorDetails.errorCode
/*
						if (pushStreamScene == true) {
							streamAss.controller.get('error').show();
						}
						else 
							if (pushNowPlayingList == true) {
								nowPlayingListAss.controller.get('error').show();
							}
*/
						errorCode = video.error.code
						Mojo.Log.info('errorCode: '+errorCode)
						//set error to true so the download status does not get changed
						errorEvent = true
						//audio.removeEventListener('error', streamAss.errorhandler);
						if (errorCode == 1){
/*
							if (pushStreamScene == true) {
								streamAss.controller.get('error').innerHTML = 'MEDIA_ERR_ABORTED -- The fetching process for the media resource was aborted by the user agent at the user\'s request.';
							}else
							if(pushNowPlayingList == true){
								nowPlayingListAss.controller.get('error').innerHTML = 'MEDIA_ERR_ABORTED -- The fetching process for the media resource was aborted by the user agent at the user\'s request.';
							}
							else {
*/
								Mojo.Controller.errorDialog('MEDIA_ERR_ABORTED -- The fetching process for the media resource was aborted by the user agent at the user\'s request.');
							//}
					
					/*
							streamAss.controller.showAlertDialog({
					            onChoose: function(value) {
									if (value == "play"){
										streamAss.playSong();
									} 
									else {}
									},
					            title: $L("Error"),
					            message: $L('MEDIA_ERR_ABORTED -- The fetching process for the media resource was aborted by the user agent at the user\'s request.'),
					            choices:[
								  {label:$L("Try Again?"), value:"play", type:'positive'},
					              {label:$L("Cancel"), value:"", type:'dismiss'},
					            ]
							})
					*/
						}
						else if (errorCode == 2){
/*
							if (pushStreamScene == true) {
								streamAss.controller.get('error').innerHTML = 'MEDIA_ERR_NETWORK -- A network error of some description caused the user agent to stop fetching the media resource, after the resource was established to be usable.';
							}else
							if(pushNowPlayingList == true){
								nowPlayingListAss.controller.get('error').innerHTML = 'MEDIA_ERR_NETWORK -- A network error of some description caused the user agent to stop fetching the media resource, after the resource was established to be usable.';
							}
							else {
*/
								Mojo.Controller.errorDialog('MEDIA_ERR_NETWORK -- A network error of some description caused the user agent to stop fetching the media resource, after the resource was established to be usable.')
							//}
						}
						else if (errorCode == 3){
/*
							if (pushStreamScene == true) {
								streamAss.controller.get('error').innerHTML = 'MEDIA_ERR_DECODE: You might have a file that cannot be played natively by webOS or maybe the stream session expired. Try refreshing the login from the app menu. Then select the song again';
							}else
							if(pushNowPlayingList == true){
								nowPlayingListAss.controller.get('error').innerHTML = 'MEDIA_ERR_DECODE: You might have a file that cannot be played natively by webOS or maybe the stream session expired. Try refreshing the login from the app menu. Then select the song again';
							}
							else {
*/
								
/*
								if(decodeRefresh == false){
									decodeRefresh = true
									audioPlaying = false
									loginRefresh = true
									Mojo.Controller.getAppController().showBanner('MEDIA_ERR_DECODE retrying ' + listAccounts[currentAccount].accountName + " Please Wait...", {
										source: 'notification'
									});
									currentAccount = currentAccountLoggedIn
									accountSelected = true
									loginAss.connectionTest()
								}else{
*/
									Mojo.Controller.errorDialog('MEDIA_ERR_DECODE -- An error of some description occurred while decoding the media resource, after the resource was established to be usable.')
//								}
						//	}
/*
								Mojo.Log.info('Object.toJSON(audio): '+Object.toJSON(audio.errorDetails))
								Mojo.Log.info('Object.toJSON(audio.error): '+Object.toJSON(audio.error))
								Mojo.Log.info('Object.toJSON(event): '+Object.toJSON(event))
*/
					/*
							if (refreshSession != true) {
								Mojo.Controller.getAppController().showBanner('Refreshing Session', {
									source: 'notification'
								});
								loginAss.connectionTest()
								streamAss.cmdMenuModel.items[2] = streamAss.playCmdMenuModel ;
								streamAss.controller.modelChanged(streamAss.cmdMenuModel);
							}
					*/
							
					/*
							var retryUrl = serverUrl + "/server/xml.server.php?action= url_to_song&auth=" + token + "&url=" + playItems[listIndex].url;
					  	//Mojo.Controller.errorDialog(albumArt);
								var request = new Ajax.Request(retryUrl, {
									method: "get",
									evalJSON: "false",
									onComplete: function(transport){
										Mojo.Log.error('Old Url: '+playItems[listIndex].url)
										var response = transport.responseText || "no response text";
										var songs = transport.responseXML.getElementsByTagName('song');
										playItems[listIndex].url = songs[0].getElementsByTagName('url')[0].firstChild.data
										Mojo.Log.error('New Url: '+playItems[listIndex].url)
										Mojo.Log.error(response)
										streamAss.playSong()
									},
									onFailure: function(){
										Mojo.Controller.errorDialog("there was a problem.");
									}
								});
					*/
							//streamAss.playSong();
						}
						else if (errorCode == 4){
/*
							if (pushStreamScene == true) {
								streamAss.controller.get('error').innerHTML = 'MEDIA_ERR_SRC_NOT_SUPPORTED -- The media resource indicated by the src attribute was not suitable.'
							}else
							if(pushNowPlayingList == true){
								nowPlayingListAss.controller.get('error').innerHTML = 'MEDIA_ERR_SRC_NOT_SUPPORTED -- The media resource indicated by the src attribute was not suitable.'
							}
							else {
*/
								Mojo.Controller.errorDialog('MEDIA_ERR_SRC_NOT_SUPPORTED -- The media resource indicated by the src attribute was not suitable.')
							//}
						}
						else{
/*
							if (pushStreamScene == true) {
								streamAss.controller.get('error').innerHTML = 'A unknown error occured';
							}else
							if(pushNowPlayingList == true){
								nowPlayingListAss.controller.get('error').innerHTML = 'A unknown error occured';
							}
							else {
*/
								Mojo.Controller.errorDialog('A unknown error occured')
							//}
						}
					Mojo.Log.info('Exit VideosAssistant.error')
}