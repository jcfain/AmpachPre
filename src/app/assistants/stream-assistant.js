function StreamAssistant(arg1) {
	play=arg1;
	document.getElementById('sceneStyleNP').style.backgroundImage =  "url(" + backGroundImageNP + ")";
	document.getElementById('sceneStyleNP').style.color =  textColorNP;
	if(pushPlayerDash == true){
		playerDashAss.controller.window.close();
	}
	//document.getElementById('listBorderNP').style.border =  "2px solid "+textColorNP;
}
StreamAssistant.prototype.setup = function() {	

streamAss = this
//this.createImageArtUrls();
listInfoIndex = listIndex + 1
//$('error').hide();
//$('debug').hide();
//this.controller.get('stalled').hide();
//this.controller.get('waiting').hide();
//this.controller.get('scrobbleStatus').innerHTML = 'Scrobbling is: '+scrobble
	//determin if we are playing album or playlist or downloads
/*
	if (play == true){
		this.clone(listSongs)
		//playItems = listSongs
	}
	else if (play == false){
		this.clone(playListItems);
		//playItems = playListItems
	}
	else if (play == 'downloads'){
		//this.clone(sceneArray);
		playItems = sceneArray
	}
	else if (play == 'savedPlaylist'){
		this.clone(savedPlaylistArray);
		//playItems = savedPlaylistArray
	}
	else if (play == 'searchAll'){
		
	}else if(play == 'playAll'){
		//this.clone(playAll);
	}
*/
	


//this.disconnectHandler=this.disconnect.bindAsEventListener(this);
/*
this.spinnerStartHandler = this.spinnerStart.bindAsEventListener(this);
this.spinnerStopHandler = this.spinnerStop.bindAsEventListener(this);
this.sliderChangedHandler = this.sliderChanged.bindAsEventListener(this);
this.spinnerStartWaitingHandler = this.spinnerStartWaiting.bindAsEventListener(this);
this.spinnerStartStalledHandler = this.spinnerStartStalled.bindAsEventListener(this);
this.sliderDragStartHandler = this.sliderDragStart.bindAsEventListener(this);
this.sliderDragEndHandler = this.sliderDragEnd.bindAsEventListener(this);
this.setSrcHandler = this.setSrc.bindAsEventListener(this);
*/
popupHandler = this.popup.bind(this)
playModeHandler = this.playMode.bind(this)
wikiHandler = this.openWiki.bind(this)
swapNowPlayingListHandler = this.swapNowPlayingList.bind(this)
this.resizeHandler = this.resize.bind(this)

    this.controller.setupWidget("ImageId",
        this.imageAttributes = {
            noExtractFS: true,
			panInsetX: 0,
			panInsetY: 0
            },
        this.imageModel = {
            onLeftFunction: previousSongHandler,
            onRightFunction: nextSongHandler
        }
    );

if (downloadsNoLogin == false) {
	if (lastFmPassWord != "" && lastFmUserName != "") {
		streamModel = {
			visible: true,
			items: [{
				label: "Now Playing List",
				command: 'nowPlayingListSwap'
			}, {
				label: "Headphone Controls: " + headPhoneControls,
				command: 'toggleHeadPhoneControlsStream'
			}, {
				label: "Scrobbling: " + scrobble,
				command: 'toggleScrobbleStream'
			}, {
				label: "Bookmark Song",
				command: 'bookMarkNowPlaying'
			}, {
				label: "Bookmark Position",
				command: 'bookmarkPosition'
			}, {
				label: "Back to Search",
				command: 'backToSearch'
			}, {
				label: "Refresh Login",
				command: 'reLog'
			}, {
				label: "Change Account",
				command: 'accounts'
			}, {
				label: "Last.fm Status",
				command: 'lastFmStatus'
			},   /*
			 {
			 label: "Love Track",
			 command: 'loveTrack'
			 },
			 */
			{
				label: "About",
				command: 'do-myAbout'
			}, ]
		};
	}
	else {
		//$('scrobbleStatus').hide()
		streamModel = {
			visible: true,
			items: [{
				label: "Now Playing List",
				command: 'nowPlayingListSwap'
			}, {
				label: "Headphone Controls: " + headPhoneControls,
				command: 'toggleHeadPhoneControlsStream'
			}, {
				label: "Bookmark Song",
				command: 'bookmarkSong'
			}, {
				label: "Bookmark Position",
				command: 'bookmarkPosition'
			}, {
				label: "Back to Search",
				command: 'backToSearch'
			}, {
				label: "Refresh Login",
				command: 'reLog'
			}, {
				label: "Change Account",
				command: 'accounts'
			}, {
				label: "About",
				command: 'do-myAbout'
			}, ]
		};
	}
}else{
	streamModel = {
		visible: true,
		items: [{
			label: "Now Playing List",
			command: 'nowPlayingListSwap'
		}, {
			label: "Headphone Controls: " + headPhoneControls,
			command: 'toggleHeadPhoneControlsStream'
		}, {
			label: "Bookmark Song",
			command: 'bookmarkSong'
		}, {
			label: "Bookmark Position",
			command: 'bookmarkPosition'
		}, {
			label: "Change Account",
			command: 'accounts'
		}, {
			label: "About",
			command: 'do-myAbout'
		}, ]
	}
}
	streamAttr = {
		omitDefaultItems: true
	};	
this.controller.setupWidget(Mojo.Menu.appMenu, streamAttr, streamModel);
	//Mojo.Controller.errorDialog(playItems[listIndex].art)
  	//https://+server+/image.php?id=420&auth=+token+&name=art.jpg
	

	
	//Mojo.Controller.errorDialog(playItems[listIndex].art +'....'+playItems[listIndex].url)


	  	this.cmdMenuModel = {
  				visible: true,
  					items: [
					{label: $L('\|\<\<'), icon:'', command:'previous'},
					{label: $L('\<\<'), icon:'', command:'rw'},
					{icon: 'pauseDisabled',command: 'cantPlay'},
					{label: $L('\>\>'), icon:'', command:'ff'},
					{label: $L('\>\>\|'), icon:'', command:'next'},	
					/*{items:[{icon: 'pauseDisabled',command: 'cantPlay'}]},
					{items:[{label: $L('\|\<\<'), icon:'', command:'previous'},
					{label: $L('\<\<'), icon:'', command:'rw'},
					{icon: 'pauseDisabled',command: 'cantPlay'},
					{label: $L('\>\>'), icon:'', command:'ff'},
					{label: $L('\>\>\|'), icon:'', command:'next'}]},*/					
					//{items:[{label: $L(''), icon: 'standard',command: 'playMode'}]}
					]    						
		};
	  	this.playCmdMenuModel = {items:[{icon: 'play',command: 'play'}]}
		
	  	this.startPlayCmdMenuModel = {items:[{icon: 'play',command: 'startPlay'}]}
	
	  	this.pauseCmdMenuModel = {items:[{icon: 'pause',command: 'play'}]}
		
	  	this.standardCmdMenuModel = {items:[{label: $L(''), icon: 'standard',command: 'playMode'}]}
		
		this.repeatCmdMenuModel = {items:[{label: $L(''), icon: 'repeatSong',command: 'playMode'}]}
		
		this.repeatAllCmdMenuModel = {items:[{label: $L(''), icon: 'repeatAll',command: 'playMode'}]}
		
		this.randomCmdMenuModel = {items:[{label: $L(''), icon: 'random',command: 'playMode'}]}
		
		this.disabledCmdMenuModel =	{items:[{icon: 'pauseDisabled',command: 'cantPlay'}]}
		
		this.standardDisabledCmdMenuModel = {items:[{icon: 'standardDisabled',command: 'cantPlay'}]}
							
		this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass:'no-fade'}, this.cmdMenuModel);
		
		
		$('playModeImg').innerHTML="<img src=images/standard.png width=23 height=23></img>"
		/*this.viewMenuModel = {
  				visible: true,
    					items: [
						    {items:[{label: listInfoIndex + "/" + playItems.length, command:''}]},
						    {items:[{label: playItems[listIndex].artist, command:'', width: 200}]},
      						{items:[{label: $L(''),icon: 'standard',command: 'playMode'}]},
    							]
						};
		this.controller.setupWidget(Mojo.Menu.viewMenu, { spacerHeight: 0, menuClass:'smallText' }, this.viewMenuModel);*/
	
	
/*	this.controller.setupWidget('streamSlider',
        this.sliderAttributes = {
     		sliderProperty: 'value', //property in the model that is changed by user actions
     		progressProperty: 'progress', //property in the model that defines how much progress is made; controlled by the application
     		maxValue: 100,
     		minValue: 0,
			progressStartProperty: 'progressStart', 
			progressProperty: 'progressEnd', 
			round: true, 
			'updateInterval': .4
            },
        this.sliderModel = {
            value: 0,			
     		progress: 0,
            }
    );
this.sliderAttributes = {
     sliderProperty: 'slider',
     progressProperty: 'progress',
     maxValue: 100,
     minValue: 0
};

this.sliderModel = {
     slider: 0,
     progress: 0,
};
this.controller.setupWidget('streamSlider', this.sliderAttributes, this.sliderModel);*/


	 this.controller.setupWidget("progressbarId",
        this.attributes = {
            //title: 'Progress Bar',
            //image: 'images/header-icon.png',
            modelProperty: "progress"
        },
        this.progressModel = {
            //iconPath: "../images/progress-bar-background.png",
            progress: 0
        });
		//this.controller.listen("progressbarId", Mojo.Event.progressIconTap, this.handleUpdate)

	//spinner
   this.controller.setupWidget("spinner",
         this.attributes = {
             spinnerSize: 'large'
         },
         this.model = {
             spinning: false 
         });


}
StreamAssistant.prototype.aboutToActivate = function(event){
	Mojo.Log.info('Enter about to activate')
		$('timer').innerHTML = "0:00"
		$('duration').innerHTML = "0:00"
		pushStreamScene = true
		this.controller.get('ImageId').mojo.manualSize(320, 320);
		//setTimeout(function(){
		//},100);
	Mojo.Log.info('Exit about to activate')
}
StreamAssistant.prototype.activate = function(event) {
	Mojo.Log.info('Enter StreamAssistant.prototype.activate')
	streamAss.displayStreamInfo()
	Mojo.Event.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.listen($('playModeImg'), Mojo.Event.tap, playModeHandler);
	this.controller.listen($('artist'), Mojo.Event.tap, wikiHandler);
	this.controller.listen($('song'), Mojo.Event.tap, searchLyricsHandler);
	this.controller.listen($('playList'), Mojo.Event.tap, swapNowPlayingListHandler);
	Mojo.Event.listen(this.controller.window, 'resize', this.resizeHandler);
	Mojo.Log.info('this.controller.window.innerHeight: '+this.controller.window.innerHeight)
//	this.controller.listen($('streamSlider'), Mojo.Event.propertyChange, this.handleUpdate);
//	this.controller.listen($('streamSlider'), Mojo.Event.sliderDragStart, this.sliderDragStartHandler);
//  this.controller.listen($('streamSlider'), Mojo.Event.sliderDragEnd, this.sliderDragEndHandler);	
//	this.controller.listen($("ImageId") ,Mojo.Event.propertyChange, this.handleUpdate);

	
	//audioSetup = new audioPlayer(this.controller)	
	//accountsAss.audio();
	//Mojo.Controller.errorDialog(listSongs[listIndex].art);  
	Mojo.Log.info('Exit StreamAssistant.prototype.activate')
}
StreamAssistant.prototype.deactivate = function(event) {
	Mojo.Log.info('Enter StreamAssistant.prototype.deactivate')
/*
	if (audioPlaying == true && pushPlayerDash == false) {
		appAss.pushPlayerDashboard(this.controller)
	}
*/
	//pushStreamScene = false
	Mojo.Log.info('pushStreamScene: '+pushStreamScene)
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.stopListening($('playModeImg'), Mojo.Event.tap, playModeHandler);
	this.controller.stopListening($('artist'), Mojo.Event.tap, wikiHandler);
	this.controller.stopListening($('song'), Mojo.Event.tap, searchLyricsHandler);
	this.controller.stopListening($('playList'), Mojo.Event.tap, swapNowPlayingListHandler);
	Mojo.Event.stopListening(this.controller.window, 'resize', this.resizeHandler);
	Mojo.Log.info('Exit StreamAssistant.prototype.deactivate')
}
StreamAssistant.prototype.cleanup = function(event) {
	Mojo.Log.info('Enter StreamAssistant.prototype.cleanup')
	if (audioPlaying == true && pushPlayerDash == false) {
		appAss.pushPlayerDashboard(this.controller)
	}
	pushStreamScene = false
	Mojo.Log.info("Enter cleanup remove event listeners");
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.stopListening($('playModeImg'), Mojo.Event.tap, playModeHandler);
	this.controller.stopListening($('artist'), Mojo.Event.tap, wikiHandler);
	this.controller.stopListening($('song'), Mojo.Event.tap, searchLyricsHandler);
	this.controller.stopListening($('playList'), Mojo.Event.tap, swapNowPlayingListHandler);
	Mojo.Event.stopListening(this.controller.window, 'resize', this.resizeHandler);
	// 	this.controller.stopListening($('streamSlider'), Mojo.Event.propertyChange, this.handleUpdate);
	//	this.controller.stopListening($('streamSlider'), Mojo.Event.sliderDragStart, this.sliderDragStartHandler);
	//  this.controller.stopListening($('streamSlider'), Mojo.Event.sliderDragEnd, this.sliderDragEndHandler);
	//	this.controller.stopListening($("ImageId") ,Mojo.Event.propertyChange, this.handleUpdate);
	Mojo.Log.info("Exit cleanup remove event listeners");
/*
	if (scrobble == 'On') {
		if (audio.currentTime > audio.duration / 2 || audio.currentTime > 260) {
			this.scrobble(songDuration, artistName, trackName, lastfmTimeAtPlay, albumName, source, rating, tracknumber, musicBrainz);
		}
	}	
	
	audioAss.clearTimer();
	loading = false
	this.deleteSongs();
	playMode='standard';
	if (usePreBuffer == 'On') {
		if (!downLoaded){
			this.cancelDownloadNoPlay();
		}
		//if (playMode != 'repeatSong') {
		//}
	}
	if (play != 'downloads'){
		playItems.length = 0; 
	}
		played=false;
		playItemsBackup.length = 0

	if(setBookMark){
		clearInterval(setBookMark)
	}
		//audio events
Mojo.Log.info("cleanup remove audio event listeners");	
			audio.removeEventListener("pause", pauseMenuUpdatehandler);	
			audio.removeEventListener("play", playMenuUpdatehandler);	
			audio.removeEventListener("play", playModeMenuUpdateHandler);	
			audio.removeEventListener("play", countTimerBind);	
			audio.removeEventListener("play", timeDisplayhandler);
			audio.removeEventListener('error', errorhandler);	
			audio.removeEventListener('progress', songProgressHandler);
			audio.removeEventListener("canplay", notificationHandler);
			audio.removeEventListener('canplay', setBookmarkedTimeHandler);
			if (usePreBuffer == 'On') {
				audio.removeEventListener('load', downloadNextSongHandler);
			}
			audio.removeEventListener('ended', endSong);
*/
	Mojo.Log.info('Exit StreamAssistant.prototype.cleanup')
}

StreamAssistant.prototype.displayStreamInfo = function(event){
	//display stream scene
	Mojo.Log.info('playItems.length: '+playItems.length)
	
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		//this.controller.get('ImageId').mojo.manualSize(240 , 240);
		setTimeout(function(){
			streamAss.controller.get('ImageId').mojo.manualSize(240 - (372 - streamAss.controller.window.innerHeight), 240 - (372 - streamAss.controller.window.innerHeight));
		},500);
	}else{
		//this.controller.get('ImageId').mojo.manualSize(320, 320);
		setTimeout(function(){
			streamAss.controller.get('ImageId').mojo.manualSize(320 - (452 - streamAss.controller.window.innerHeight), 320 - (452 - streamAss.controller.window.innerHeight))
		},500);
	}
	if (playItems.length == 0) {
		this.controller.get('song').innerHTML = 'Silence';
		this.controller.get('artist').innerHTML = 'No one';
		this.controller.get('album').innerHTML = 'Greatest Hits 0/0';
		//$('listInfo').innerHTML = "0/0";
		this.controller.get('ImageId').mojo.centerUrlProvided(Mojo.appPath + 'images/folder.png');
	}
	else {
		$('ImageId').mojo.centerUrlProvided(playItems[listIndex].art);
		Mojo.Log.info('Center Load playItems[listIndex].art: '+playItems[listIndex].art)
		this.controller.get('song').innerHTML = playItems[listIndex].song;
		this.controller.get('artist').innerHTML = playItems[listIndex].artist;
		this.controller.get('album').innerHTML = playItems[listIndex].album
		listInfoIndex = listIndex + 1
		this.controller.get('listInfo').innerHTML = listInfoIndex + "/" + playItems.length;
		//$('listInfo').innerHTML = listInfoIndex + "/" + playItems.length;
		//ImageView
		if (listIndex == 0 && playItems.length > 1) {
			this.controller.get('ImageId').mojo.leftUrlProvided(playItems[playItems.length - 1].art);
			this.controller.get('ImageId').mojo.rightUrlProvided(playItems[listIndex + 1].art);
		}
		else //if playlist is greater than one or not the last song. set the right art as the next song index preventing adding a element that doesnt exist.	
 			if (listIndex == playItems.length - 1 && playItems.length > 1) {
				this.controller.get('ImageId').mojo.leftUrlProvided(playItems[listIndex - 1].art);
				this.controller.get('ImageId').mojo.rightUrlProvided(playItems[0].art);
			}
			else 
				if (playItems.length > 1) {
					this.controller.get('ImageId').mojo.leftUrlProvided(playItems[listIndex - 1].art);
					this.controller.get('ImageId').mojo.rightUrlProvided(playItems[listIndex + 1].art);
				}
		
/*
		if (listIndex + 1 < playItems.length) {
			//$('downloadStatus').innerHTML = "Next: " + playItems[listIndex + 1].song+" by, " + playItems[listIndex + 1].artist
			//$('artistCaching').innerHTML = "by " + playItems[listIndex + 1].artist
			//$('percentage').innerHTML = "";
		}
		else 
			if (playMode == 'repeatAll') {
						if (listIndex < playItems.length - 1) {
							//$('downloadStatus').innerHTML = 'Next: ' + playItems[listIndex + 1].song+" by, " + playItems[listIndex + 1].artist 
							//$('artistCaching').innerHTML = "by "+playItems[listIndex + 1].artist
							//$('percentage').innerHTML = "";
						}else{
							//$('downloadStatus').innerHTML = 'Next: ' + playItems[0].song +" by, " + playItems[0].artist
							//$('artistCaching').innerHTML = "by "+playItems[0].artist
							//$('percentage').innerHTML = "";
						}
			}
			else {
				//$('downloadStatus').innerHTML = "End of PlayList"
				//$('artistCaching').innerHTML = ""
				//$('percentage').innerHTML = "";
			}
*/
		
		//update the playmode ICON;
		if (playMode == 'standard') {
			//streamAss.viewMenuModel.items[2]=streamAss.standardCmdMenuModel;
			this.controller.get('playModeImg').innerHTML = "<img src=images/standard.png width=23 height=23></img>"
		}
		else 
			if (playMode == 'repeatSong') {
				//streamAss.viewMenuModel.items[2]=streamAss.repeatCmdMenuModel;
				this.controller.get('playModeImg').innerHTML = "<img src=images/repeatSong.png width=23 height=23></img>"
			}
			else 
				if (playMode == 'repeatAll') {
					//streamAss.viewMenuModel.items[2]=streamAss.repeatAllCmdMenuModel;
					this.controller.get('playModeImg').innerHTML = "<img src=images/repeatAll.png width=23 height=23></img>"
				}
				else 
					if (playMode == 'random') {
						//streamAss.viewMenuModel.items[2]=streamAss.randomCmdMenuModel;
						this.controller.get('playModeImg').innerHTML = "<img src=images/random.png width=23 height=23></img>"
					}
		
		
		//TODO: make this hack a not so much of a hack
		Mojo.Log.info('pushNowPlaying:' + pushNowPlaying)
		//Mojo.Log.info('currentAudio.paused: '+currentAudio.paused)
		if (pushNowPlaying == true) {
			pushNowPlaying = false
			if (audioPlaying == true) {
				Mojo.Log.info('audioPlaying: ' + audioPlaying)
					audioAss.timeDisplay();
/*
				setTimeout(function(){
					Mojo.Log.info('audioPlaying: ' + audioPlaying)
					streamAss.controller.get('duration').innerHTML = convert + ":" + convertSecs
				}, 500)
*/
				if (currentAudio.paused) {
					streamAss.cmdMenuModel.items[2] = streamAss.playCmdMenuModel;
					streamAss.controller.modelChanged(streamAss.cmdMenuModel);
				}
				else 
					if (!currentAudio.paused) {
						streamAss.cmdMenuModel.items[2] = streamAss.pauseCmdMenuModel;
						streamAss.controller.modelChanged(streamAss.cmdMenuModel);
					}
			}else 
				if(playItems.length > 0){
					streamAss.cmdMenuModel.items[2] = streamAss.startPlayCmdMenuModel ;
					streamAss.controller.modelChanged(streamAss.cmdMenuModel);
			}
		}
	}
}

StreamAssistant.prototype.setLastfmNowPlaying = function(){
		requestNP = new Ajax.Request(lastFmUrlNP, {
			method: "POST",
			parameters: "s=" + sessionId + "&t=" + trackName + "&a=" + artistName + "&b=" + albumName + "&l=" + songDuration,
			onComplete: function(transport){
				response = transport.responseText || "no response text";
				Mojo.Log.info("Last.fm Now playing response: " + response)
				if (response == 'BADSESSION') {
					Mojo.Log.error("Re-trying Handshake")
					//errorArray.push('Stream assistant: Re-trying Last fm Handshake<br>')
					request = new Ajax.Request(lastfmHandShakeUrl, {
						method: "get",
						evalJSON: "true",
						onComplete: function(transport){
							Mojo.Log.info("enter ajax lastfm retry handshake")
							response = transport.responseText || "no response text";
							Mojo.Log.error("Last.fm handshake: " + response)
							testSuccessIndex = response.indexOf('OK')
							sessionIdIndex = response.indexOf('http')
							server1Index = response.indexOf('http')
							server2Index = response.lastIndexOf("http")
							Mojo.Log.error("Last.fm testSuccessIndex: " + testSuccessIndex + ", sessionIdIndex: " + sessionIdIndex + ", server1Index: " + server1Index + ", server2Index: " + server2Index)
							status = response.slice(0, 2)
							if (status == 'OK') {
								Mojo.Log.info("Last.fm handshake status: " + status)
								sessionId = response.slice(3, sessionIdIndex - 1)
								lastFmUrlNP = response.slice(server1Index, server2Index - 1)
								lastFmUrlScrob = response.slice(server2Index, response.length - 1)
								Mojo.Log.info("lastFmUrlNP: " + lastFmUrlNP + ", lastFmUrlScrob: " + lastFmUrlScrob + ", sessionId: " + sessionId)
							}
							else {
								sessionId = ""
								lastFmUrlNP = ""
								lastFmUrlScrob = ""
								Mojo.Log.error("Last.fm Handshake error: " + response)
							}
							Mojo.Log.info("exit ajax lastfm retry handshake")
						},
						onFailure: function(){
							Mojo.Log.error("ajax handshake fail")
						}
					});
				}
			},
			onFailure: function(){
				Mojo.Log.error("ajax submit now playing fail")
			}
		});
		
		
		Mojo.Log.info("exit StreamAssistant.prototype.notification")
}
StreamAssistant.prototype.scrobble = function(songDuration, artistName, trackName, lastfmTimeAtPlay, albumName, source, rating, tracknumber, musicBrainz){
	if (songDuration > 30) {
		var scrobbleSongDuration = songDuration
		var scrobbleArtistName = artistName
		var scrobbleTrackName = trackName
		var scrobbleAlbumName = albumName
		var scrobbleSource = source
		var scrobbleRating = rating
		var scrobbleTracknumber = tracknumber
		var scrobbleMusicBrainz = musicBrainz
		var scrobbleLastfmTimeAtPlay = lastfmTimeAtPlay
		
		if (lastfmLoggedIn == true) {
			//scrobbleTimeout = setTimeout(function(){
				postScrob = new Ajax.Request(lastFmUrlScrob, {
					method: "POST",
					parameters: "s=" + sessionId + "&a[0]=" + scrobbleArtistName + "&t[0]=" + scrobbleTrackName + "&i[0]=" + scrobbleLastfmTimeAtPlay + "&o[0]=" + scrobbleSource + "&r[0]=" + scrobbleRating + "&l[0]=" + scrobbleSongDuration + "&b[0]=" + scrobbleAlbumName + "&n[0]=" + scrobbleTracknumber + "&",
					onComplete: function(transport){
						response = transport.responseText || "no response text";
						Mojo.Log.info("Scrob response: " + response + ", lastfmTimeAtPlay: " + lastfmTimeAtPlay)
						//Mojo.Log.info("s=" + sessionId + "&a[0]=" + scrobbleArtistName + "&t[0]=" + scrobbleTrackName + "&i[0]=" + scrobbleLastfmTimeAtPlay + "&o[0]=" + scrobbleSource + "&r[0]=" + scrobbleRating + "&l[0]=" + scrobbleSongDuration + "&b[0]=" + scrobbleAlbumName + "&n[0]=" + scrobbleTracknumber + "&")
						//Mojo.Log.info(scrobbleSongDuration)
						rating = ""
						//streamAss.controller.get('rating').innerHTML = 'Rating is: '+rating
					},
					onFailure: function(){
						Mojo.Log.error("ajax submit scrob fail")
					}
				});
			//}, 15000)
		}
		else{

			scrobbleQue.push({
				scrobbleSongDuration: scrobbleSongDuration,
				scrobbleArtistName: scrobbleArtistName,
				scrobbleTrackName: scrobbleTrackName,
				scrobbleAlbumName: scrobbleAlbumName,
				scrobbleSource: scrobbleSource,
				scrobbleRating: scrobbleRating,
				scrobbleTracknumber: scrobbleTracknumber,
				scrobbleMusicBrainz: scrobbleMusicBrainz,
				scrobbleLastfmTimeAtPlay: scrobbleLastfmTimeAtPlay
			})
			
				db.add('scrobbleQue', scrobbleQue, function(){
												Mojo.Log.info("SUCCESS scrobbleQue SAVE");
												Mojo.Log.info("scrobbleQue.length: "+ scrobbleQue.length)
												rating = ""
												//streamAss.controller.get('rating').innerHTML = 'Rating is: '+rating
											}, function(){
												Mojo.Log.error("FAIL scrobbleQue SAVE")
											});

		}
	}
}
StreamAssistant.prototype.handleCommand = function(event){
	//this.currentScene=Mojo.Controller.stageController.activeScene();
	if (event.type == Mojo.Event.command) {
		switch (event.command) {
		
			case 'play':
				audioAss.playPauseSong();
				break;
/*
			case 'list':
				this.addToPlayList();
				break;
*/
			case 'next':
				audioAss.nextSong();
				break;
			case 'previous':
				audioAss.previousSong();
				break;
			case 'rw':
				audioAss.rw();
				break;
			case 'ff':
				audioAss.ff();
				break;
			case 'startPlay':
				audioAss.setupPlaySong();
				this.disableMenu();
				break;
			case 'toggleHeadPhoneControlsStream':
				headphoneToggled = true
				if (headPhoneControls == 'On') {
					headPhoneControls = 'Off'
						streamModel.items[1]={label: "Headphone Controls: "+headPhoneControls,command: 'toggleHeadPhoneControlsStream'}
						streamAss.controller.modelChanged(streamModel);
					
				}else{
					headPhoneControls = 'On'
						streamModel.items[1]={label: "Headphone Controls: "+headPhoneControls,command: 'toggleHeadPhoneControlsStream'}
						streamAss.controller.modelChanged(streamModel);
				}
				break;
			case 'toggleScrobbleStream':
				if(scrobble == 'On'){
					scrobble = 'Off'
				}else{
					scrobble = 'On'
					//streamAss.scrobble();
					if (audioPlaying == true) {
						audioAss.notification()
					}
				}
				streamModel.items[2]={label: "Scrobbling: "+scrobble,command: 'toggleScrobbleStream'}
				streamAss.controller.modelChanged(streamModel);
				break;
				
/*
			case 'list':
				    streamAss.controller.popupSubmenu({
      					onChoose: streamAss.popupHandler,
      					placeNear: event.target,
      					items: playItems
    				});
				break;
*/
		}
		
	}
/*
		if (event.type == Mojo.Event.back){
			//allScenes = Mojo.Controller.StageController.getScenes() 
			streamScene = this.controller.stageController.activeScene()
				Mojo.Log.info(streamScene)
			allScenes = this.controller.stageController.getScenes() 
				Mojo.Log.info(allScenes.length)
				Mojo.Log.info(allScenes[0].scene)
		//this.controller.stageController.deactivate();	
		//this.controller.stageController.pushScene('search');
		this.controller.stageController.pushScene({
					name: 'search',
					transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				});
	}
*/
}
StreamAssistant.prototype.playMode = function(event){
	//Mojo.Controller.errorDialog('hmm')
	//event.originalEvent.target
	this.controller.popupSubmenu({
		onChoose: popupHandler,
		placeNear: event.target,
		items: [{
			label: 'Standard',
			command: 'standard'
		}, {
			label: 'Repeat Song',
			command: 'repeatSong'
		}, {
			label: 'Repeat All',
			command: 'repeatAll'
		}, {
			label: 'Random',
			command: 'random'
		}]
	});
}
StreamAssistant.prototype.popup = function(command){
			switch (command) {
			
				case 'standard':
						playMode = 'standard'
						//this.viewMenuModel.items.pop();
						//this.viewMenuModel.items[2]= this.standardCmdMenuModel;
						//this.controller.modelChanged(this.viewMenuModel);
						$('playModeImg').innerHTML="<img src=images/standard.png width=23 height=23></img>"
						if(randomPlay == true){
							listIndex = listIndexBackup
							listInfoIndex = listInfoIndexBackup
							this.clone(playItemsBackup)
							randomPlay = false
						}
						if(repeatSong == true){
							repeatSong = false
							if(audioOnePlaying == true){
								audioAss.audioOneSongTracker();
								audio.addEventListener("play", songTrackerHandlerOne);
							}else{
								audioAss.audioTwoSongTracker();
								audio2.addEventListener("play", songTrackerHandlerTwo);
							}
						}
						if (pushNowPlayingList == true) {
							if (listIndex < playItems.length - 1) {
								nowPlayingListAss.controller.get('downloadStatus').innerHTML = 'Next: ' + playItems[listIndex + 1].song
								nowPlayingListAss.controller.get('artistCaching').innerHTML = "by " + playItems[listIndex + 1].artist
								nowPlayingListAss.controller.get('percentage').innerHTML = "";
							}
							else {
								nowPlayingListAss.controller.get('downloadStatus').innerHTML = "End of playList"
								nowPlayingListAss.controller.get('artistCaching').innerHTML = ""
								nowPlayingListAss.controller.get('percentage').innerHTML = "";
							}
						}else if(pushStreamScene == true){
							this.controller.get('album').innerHTML = playItems[listIndex].album;
							listInfoIndex = listIndex + 1
							this.controller.get('listInfo').innerHTML = listInfoIndex + "/" + playItems.length;
						}
						if (pushPlayerDash == true) {
							playerDashAss.upDateSongInfo()
						}
					break;
				case 'repeatSong':
						playMode = 'repeatSong'
						clearTimeout(trackerTimeout)
						repeatSong = true
						if(audioOnePlaying == true){
							audio.removeEventListener("play", songTrackerHandlerOne);
						}else{
							audio2.removeEventListener("play", songTrackerHandlerTwo);
						}
						//this.viewMenuModel.items.pop();
						//this.viewMenuModel.items[2]= this.repeatCmdMenuModel;
						//this.controller.modelChanged(tthis.viewMenuModel);
						$('playModeImg').innerHTML="<img src=images/repeatSong.png width=23 height=23></img>"
						if(randomPlay == true){
							listIndex = listIndexBackup
							listInfoIndex = listInfoIndexBackup
							this.clone(playItemsBackup)
							randomPlay = false
						}
						if (pushNowPlayingList == true) {
							nowPlayingListAss.controller.get('downloadStatus').innerHTML = "Next: " + playItems[listIndex].song
							nowPlayingListAss.controller.get('artistCaching').innerHTML = ""
							nowPlayingListAss.controller.get('percentage').innerHTML = "";
						}else if(pushStreamScene == true){
							this.controller.get('album').innerHTML = playItems[listIndex].album;
							listInfoIndex = listIndex + 1
							this.controller.get('listInfo').innerHTML = listInfoIndex + "/" + playItems.length;
						}
						if (pushPlayerDash == true) {
							playerDashAss.upDateSongInfo()
						}
					break;
				case 'repeatAll':
						playMode = 'repeatAll'
						//this.viewMenuModel.items.pop();
						//this.viewMenuModel.items[2]= this.repeatAllCmdMenuModel;
						//this.controller.modelChanged(this.viewMenuModel);
						$('playModeImg').innerHTML="<img src=images/repeatAll.png width=23 height=23></img>"
						if(randomPlay == true){
							listIndex = listIndexBackup
							listInfoIndex = listInfoIndexBackup
							this.clone(playItemsBackup)
							randomPlay = false
						}

						if (repeatSong == true) {
							repeatSong = false
							if (audioOnePlaying == true) {
								audioAss.audioOneSongTracker();
								audio.addEventListener("play", songTrackerHandlerOne);
							}
							else {
								audioAss.audioTwoSongTracker();
								audio2.addEventListener("play", songTrackerHandlerTwo);
							}
						}
						if (pushNowPlayingList == true) {
							if (listIndex < playItems.length - 1) {
								nowPlayingListAss.controller.get('downloadStatus').innerHTML = 'Next: ' + playItems[listIndex + 1].song
								nowPlayingListAss.controller.get('artistCaching').innerHTML = "by " + playItems[listIndex + 1].artist
								nowPlayingListAss.controller.get('percentage').innerHTML = "";
							}
							else {
								nowPlayingListAss.controller.get('downloadStatus').innerHTML = "End of playList"
								nowPlayingListAss.controller.get('artistCaching').innerHTML = ""
								nowPlayingListAss.controller.get('percentage').innerHTML = "";
							}
						}else if(pushStreamScene == true){
							this.controller.get('album').innerHTML = playItems[listIndex].album;
							listInfoIndex = listIndex + 1
							this.controller.get('listInfo').innerHTML = listInfoIndex + "/" + playItems.length;
						}
						if (pushPlayerDash == true) {
							playerDashAss.upDateSongInfo()
						}
					break;
				case 'random':
						playMode = 'random'
						//this.viewMenuModel.items.pop();
						listIndexBackup = listIndex
						listInfoIndexBackup = listInfoIndex
						//this.viewMenuModel.items[2]= this.randomCmdMenuModel;
						//this.controller.modelChanged(this.viewMenuModel);
						$('playModeImg').innerHTML="<img src=images/random.png width=23 height=23></img>"
						if (playItems.length > 2) {
							streamAss.playItemsBackup()
						}
						randomPlay = true
						//this.viewMenuModel.items[0] = {items:[{label: listInfoIndex + "/" + playItems.length, command:''}]}
						//this.controller.modelChanged(this.viewMenuModel);
					break;
			}
			//audioAss.setNextIndex();
}
StreamAssistant.prototype.sliderChanged = function(event) {
    /* Mojo.Log.info("The user dragged the slider to a new location with value a new value of "
                        + this.sliderModel.slider + ". The same update is available in event " + propertyChangeEvent.value);*/
		/*	var pos = event.value;
			var secs = Math.round((pos / 100) * audio.duration);

			this.updateCounters(secs);*/
}
StreamAssistant.prototype.loadStart = function(event){
//Mojo.Log.info("song loading")
//$('duration').innerHTML = event.loaded+ ', ' +event.total+ '.' +event.lengthComputable
}



StreamAssistant.prototype.disableMenu = function(){
	streamAss.cmdMenuModel.items[2]=streamAss.disabledCmdMenuModel;
	streamAss.controller.modelChanged(streamAss.cmdMenuModel);
/*

	streamAss.cmdMenuModel.items[2]=streamAss.playCmdMenuModel;
	streamAss.controller.modelChanged(streamAss.cmdMenuModel);
*/
}
StreamAssistant.prototype.disconnect = function(){
Mojo.Controller.errorDialog("You have been disconnected.");
}
StreamAssistant.prototype.spinnerStart = function(){
//streamAss.controller.get('scrimSpinner').show();
//streamAss.controller.get('spinner').mojo.start();
}
StreamAssistant.prototype.spinnerStop = function(){
//streamAss.controller.get('scrimSpinner').hide();
streamAss.controller.get('stalled').hide();
streamAss.controller.get('waiting').hide();
streamAss.controller.get('duration').show();
//streamAss.controller.get('spinner').mojo.stop();
}
StreamAssistant.prototype.spinnerStartStalled = function(){
$('stalled').innerHTML = 'Stalled... ';
//streamAss.controller.get('scrimSpinner').hide();
//streamAss.controller.get('duration').hide();
streamAss.controller.get('waiting').hide();
streamAss.controller.get('stalled').show();
}
StreamAssistant.prototype.spinnerStartWaiting = function(){
$('waiting').innerHTML = 'Waiting... ';
//streamAss.controller.get('scrimSpinner').hide();
streamAss.controller.get('stalled').hide();
streamAss.controller.get('waiting').show();
//streamAss.controller.get('duration').hide();
}
StreamAssistant.prototype.sliderDragStart = function(){
}
StreamAssistant.prototype.sliderDragEnd = function(){
}


StreamAssistant.prototype.pickRandomIndex = function(){
			range = playItems.length
			listIndex = Math.floor(Math.random() * range);
				i=0
			if (randomPlayed.length <= playItems.length) {
				while (i < randomPlayed.length) {
					p = i
					i = i + 1
					while (listIndex == randomPlayed[p]) {
						listIndex = Math.floor(Math.random() * range);
						i = 0
					}
				}
				Mojo.Log.info("pickRandomIndex executed");
				listInfoIndex = listIndex + 1
				streamAss.playSong();
			}
}
StreamAssistant.prototype.restartDownload = function(){
		if (percentageDone == NaN && downLoaded == undefined){
			retry = true
			audioAss.cancelDownloadNoPlay();
			//streamAss.downloadNextSong();
		}
}
StreamAssistant.prototype.playItemsBackup = function(){
	playItemsBackup = []
	for (i = 0; i < playItems.length; i++) {
		playItemsBackup[i] = {
			song: playItems[i].song,
			songId: playItems[i].songId,
			time: playItems[i].time,
			artist: playItems[i].artist,
			album: playItems[i].album,
			url: playItems[i].url,
			size: playItems[i].size,
			art: playItems[i].art,
			uniqueId: playItems[i].uniqueId,
			uniqueProgressId: playItems[i].uniqueProgressId,
			uniqueTimeId: playItems[i].uniqueTimeId,
		}
	}
	playItems.length = 0
	playItems.push(playItemsBackup[listIndex])
	randomPlayed = []
	randomPlayed.push(listIndex)
	for (i = 0; i < playItemsBackup.length; i++) {
		range = playItemsBackup.length
		listIndexRandom = Math.floor(Math.random() * range);
		i = 0
		//if (playItemsBackup.length > 2) {
			while (i < randomPlayed.length) {
				p = i
				i = i + 1
				while (listIndexRandom == randomPlayed[p]) {
					listIndexRandom = Math.floor(Math.random() * range);
					i = 0
				}
			}
			playItems.push(playItemsBackup[listIndexRandom]);
			randomPlayed.push(listIndexRandom)
		//}else{}
	}
	
			if (!downLoadedArt) {
				//retry = true
				audioAss.cancelDownloadNoPlay();
				//streamAss.downloadNextSong();
			}
/*
			else{
				streamAss.downloadNextSong();
			}
*/
	/*for  (i=0;i<playItems.length;i++){
		Mojo.Log.info('PlayItems; '+playItems[i].song)
	}
	
	for  (i=0;i<randomPlayed.length;i++){
		Mojo.Log.info('Randomplayed; '+randomPlayed[i])
	}*/
	listIndex = 0
	listInfoIndex = 1
	if (pushNowPlayingList == true) {
		if (listIndex < playItems.length - 1) {
			nowPlayingListAss.controller.get('downloadStatus').innerHTML = 'Next: ' + playItems[listIndex + 1].song
			nowPlayingListAss.controller.get('artistCaching').innerHTML = "by " + playItems[listIndex + 1].artist
			nowPlayingListAss.controller.get('percentage').innerHTML = "";
		}
		else if(playMode == 'repeatAll'){
			nowPlayingListAss.controller.get('downloadStatus').innerHTML = "Next: " + playItems[0].song
			nowPlayingListAss.controller.get('artistCaching').innerHTML = "by "+playItems[0].artist
			nowPlayingListAss.controller.get('percentage').innerHTML = "";
		}
		else {
			nowPlayingListAss.controller.get('downloadStatus').innerHTML = "End of playList"
			nowPlayingListAss.controller.get('artistCaching').innerHTML = ""
			nowPlayingListAss.controller.get('percentage').innerHTML = "";
		}
	}else if(pushStreamScene == true){
/*
		this.controller.get('song').innerHTML = playItems[listIndex].song;
		this.controller.get('artist').innerHTML = playItems[listIndex].artist;
		this.controller.get('album').innerHTML = playItems[listIndex].album
*/
	this.controller.get('listInfo').innerHTML = listInfoIndex + "/" + playItems.length;
	}
	if (pushPlayerDash == true) {
		playerDashAss.upDateSongInfo()
	}
						if (repeatSong == true) {
							repeatSong = false
							if (audioOnePlaying == true) {
								audioAss.audioOneSongTracker();
								audio.addEventListener("play", songTrackerHandlerOne);
							}
							else {
								audioAss.audioTwoSongTracker();
								audio2.addEventListener("play", songTrackerHandlerTwo);
							}
						}
	//$('listInfo').innerHTML = listInfoIndex + "/" + playItems.length;
/*
			reset=setTimeout(function(){
								if (pushNowPlayingList == true) {
									if (listIndex + 1 < playItems.length) {
										nowPlayingListAss.controller.get('downloadStatus').innerHTML = "Next: " + playItems[listIndex + 1].song
										nowPlayingListAss.controller.get('artistCaching').innerHTML = "by "+playItems[listIndex + 1].artist
										nowPlayingListAss.controller.get('percentage').innerHTML = "";
									}
									else if(playMode == 'repeatAll'){
										nowPlayingListAss.controller.get('downloadStatus').innerHTML = "Next: " + playItems[0].song
										nowPlayingListAss.controller.get('artistCaching').innerHTML = "by "+playItems[0].artist
										nowPlayingListAss.controller.get('percentage').innerHTML = "";
									}
									else{
										nowPlayingListAss.controller.get('downloadStatus').innerHTML = "End of playList"
										nowPlayingListAss.controller.get('artistCaching').innerHTML = ""
										nowPlayingListAss.controller.get('percentage').innerHTML = "";
									}
								}
							},1000);
*/
	//Mojo.Controller.errorDialog(playItemsBackup.length +' '+playItems.length)
}

StreamAssistant.prototype.clone = function(arr){
					Mojo.Log.info('Enter clone to playItems')
					playItems.length=0
						for (i=0; i<arr.length; i++){
							playItems[i]={
									song: arr[i].song,
									songId: arr[i].songId,
									time: arr[i].time,
									timeUnformatted: parseFloat(arr[i].timeUnformatted),
									artist: arr[i].artist,
									album: arr[i].album,
									url: arr[i].url,
									size: arr[i].size,
									art: arr[i].art,
									source: arr[i].source,
									currentTime: arr[i].currentTime
								}
						}
						
					audioAss.rewrite();
				
					Mojo.Log.info('playItems.length: '+playItems.length)
					playItemsBackup.length = 0
					Mojo.Log.info('Exit clone to playItems')
}

StreamAssistant.prototype.openWiki = function(){
	artistName = playItems[listIndex].artist.replace(/\s+/g, '%20')//.replace(/\W/g, '')
	streamAss.controller.serviceRequest("palm://com.palm.applicationManager", {
  		method: "open",
 		 parameters:  {
      		id: 'com.palm.app.browser',
     		params: {
          	target: "http://en.m.wikipedia.org/wiki/Special:Search?search="+artistName
      		}
  		}
	});
}
StreamAssistant.prototype.swapNowPlayingList = function(){
					
	$('playList').innerHTML = '<div align="right"><img src=images/listNowPlaying-depressed.png></img></div>'
	setTimeout(function(){
		if(pushStreamScene == true){
			streamAss.controller.get('playList').innerHTML = '<div align="right"><img src=images/listNowPlaying.png></img></div>'
		}
	},500)
	
	pushNowPlayingListSwap = true
	this.controller.stageController.swapScene({name: "nowPlayingList", transition: Mojo.Transition.crossFade, disableSceneScroller:true});
}
StreamAssistant.prototype.utf8encode = function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
}
StreamAssistant.prototype.resize = function(event){
	Mojo.Log.info('Enter Resize Event')
//	if (notificationOpen == false) {
		if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
			// on the Pixi
			heightChange = (372 - this.controller.window.innerHeight);
			widthChange = (320 - this.controller.window.innerWidth);
			windowHeight = this.controller.window.innerHeight
			Mojo.Log.info('Pixi widthChange: ' + widthChange + ' Pixi heightChange: ' + heightChange + ' Pixi windowHeight: ' + windowHeight)
			this.controller.get('ImageId').mojo.manualSize(240 - heightChange, 240 - heightChange);
		}
		else {
			// on the Pre 480x320
			heightChange = (452 - this.controller.window.innerHeight);
			widthChange = (320 - this.controller.window.innerWidth);
			windowHeight = this.controller.window.innerHeight
			Mojo.Log.info('Pre widthChange: ' + widthChange + ' Pre heightChange: ' + heightChange + ' Pre windowHeight: ' + windowHeight)
			this.controller.get('ImageId').mojo.manualSize(320 - heightChange, 320 - heightChange);
		}
/*
	}else{
		this.controller.get('ImageId').mojo.manualSize(320, 320);
	}
*/
	Mojo.Log.info('Exit Resize Event')
}