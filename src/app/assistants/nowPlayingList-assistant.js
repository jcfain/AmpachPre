function NowPlayingListAssistant() {
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

NowPlayingListAssistant.prototype.setup = function() {
		nowPlayingListAss = this
		firstOpen = true

if (downloadsNoLogin == false) {
	if (lastFmPassWord != "" && lastFmUserName != "") {
		NowPlayingListModel = {
			visible: true,
			items: [{
				label: "Now Playing",
				command: 'nowPlayingSwap'
			}, {
				label: "Headphone Controls: " + headPhoneControls,
				command: 'toggleHeadPhoneControlsNowPlayingList'
			}, {
				label: "Scrobbling: " + scrobble,
				command: 'toggleScrobbleNowPlayingList'
			}, {
				label: "Clear List",
				command: 'clear'
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
		NowPlayingListModel = {
			visible: true,
			items: [{
				label: "Now Playing",
				command: 'nowPlayingSwap'
			}, {
				label: "Headphone Controls: " + headPhoneControls,
				command: 'toggleHeadPhoneControlsNowPlayingList'
			}, {
				label: "Clear List",
				command: 'clear'
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
				label: "About",
				command: 'do-myAbout'
			}, ]
		};
	}
}
else {
	NowPlayingListModel = {
		visible: true,
		items: [{
			label: "Now Playing",
			command: 'nowPlayingSwap'
		}, {
			label: "Headphone Controls: " + headPhoneControls,
			command: 'toggleHeadPhoneControlsStream'
		}, {
			label: "Clear List",
			command: 'clear'
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
	NowPlayingListAttr = {
		omitDefaultItems: true
	};	
this.controller.setupWidget(Mojo.Menu.appMenu, NowPlayingListAttr, NowPlayingListModel);

		$('error').hide();	
if (downloadsNoLogin == false) {  	
/*
		this.cmdMenuModel = {
  				visible: true,
  					items: [
						{label: $L(''),icon: 'home',command: 'backToSearch'},
						{label: $L('\|\<\<'), icon:'', command:'previous'},
						{label: $L('\<\<'), icon:'', command:'rw'},
						{icon: 'pauseDisabled',command: 'cantPlay'},
						{label: $L('\>\>'), icon:'', command:'ff'},
						{label: $L('\>\>\|'), icon:'', command:'next'},
						{label: $L(''),icon: 'cancelDownload',command: 'clear'}, 
					]   						
		};
*/
	this.cmdMenuModel = {
		visible: true,
		items: [
		{label: $L(''),icon: 'home',command: 'backToSearch'},  //{label: $L(''),icon: 'lists',command: 'savedPlaylists'},
		{label: $L(''), icon:'scrollToNow', command:'scrollToNow'},
		{label: $L(''),icon: 'cancelDownload',command: 'clear'}, 
		]
	
	};
}else{
	this.cmdMenuModel = {
		visible: true,
		items: [{},  //{label: $L(''),icon: 'lists',command: 'savedPlaylists'},
		//{label: $L(''), icon:'downloads', command:'downloads'},
		{label: $L(''), icon:'scrollToNow', command:'scrollToNow'},
		{
			label: $L(''),
			icon: 'cancelDownload',
			command: 'clear'
		}, ]
	
	};
}

		this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass:'no-fade'}, this.cmdMenuModel)
			
	this.controller.setupWidget("listNowPlaying", {
    	itemTemplate: "nowPlayingList/rowTemplate",
    	listTemplate: "nowPlayingList/listTemplate",
		fixedHeightItems: true,
		swipeToDelete: true, 
		reorderable: true, 
		renderLimit: 20,
		onItemRendered: function(listWidget, itemModel, itemNode){
			//Mojo.Log.info('itemModel.uniqueId: '+itemModel.uniqueId+', playItems[listIndex].uniqueId: '+playItems[listIndex].uniqueId)
			if(itemModel.uniqueId == playItems[listIndex].uniqueId){
				$(playItems[listIndex].uniqueId).innerHTML = '<img src=images/currentlyPlaying.png class="listImage">'
			}
			
/*
			this.controller.setupWidget(itemModel.uniqueProgressId,
		        itemModel.uniqueProgressId+'attributes' = {
		            //title: 'Progress Bar',
		            //image: 'images/header-icon.png',
		            modelProperty: "progress"
		        },
		        itemModel.uniqueProgressId+'progressModel' = {
		            //iconPath: "../images/progress-bar-background.png",
		            progress: 0
		    });
*/
		}
    }, 
	this.model = {
        items: playItems
    });
	
	
	//scrim spinner
	this.controller.setupWidget("spinner", 
		this.attributes = {
			spinnerSize: 'large'
		}, this.spinnerModel = {
			spinning: false
		});	
	this.controller.setupWidget("scrollerId",
         this.scrollerAttributes = {
             mode: 'vertical'
         },
         this.scrollerModel = {
         });
		 
    this.playAtIndexHandler = this.playAtIndex.bindAsEventListener(this);
	this.deleteAtIndexHandler = this.deleteAtIndex.bindAsEventListener(this);
	this.moveAtIndexHandler = this.moveAtIndex.bindAsEventListener(this);
	this.popupHandler = this.popup.bind(this)
	this.swapStreamHandler = this.swapStream.bind(this)
/*
	this.listResizeHandler = this.listResize.bind(this)
*/
listindexLastPlayed = 0
};

NowPlayingListAssistant.prototype.activate = function(event) {
	//this.formatTotalPlayListTime();
	pushNowPlayingList = true	
	this.displayNowPlayingListInfo()
	Mojo.Event.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.listen($('listNowPlaying'), Mojo.Event.listTap, this.playAtIndexHandler);
	this.controller.listen($('listNowPlaying'), Mojo.Event.listDelete, this.deleteAtIndexHandler);
	this.controller.listen($('listNowPlaying'), Mojo.Event.listReorder, this.moveAtIndexHandler);
	this.controller.listen($('song'), Mojo.Event.tap, searchLyricsHandler);
	this.controller.listen($('albumArt'), Mojo.Event.tap, this.swapStreamHandler);
		Mojo.Event.listen(this.controller.window, 'resize', listResizeHandler);
			this.model.items=playItems;
			this.controller.modelChanged(this.model);	
};

NowPlayingListAssistant.prototype.deactivate = function(event) {
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.stopListening($('listNowPlaying'), Mojo.Event.listTap, this.playAtIndexHandler);
	this.controller.stopListening($('listNowPlaying'), Mojo.Event.listDelete, this.deleteAtIndexHandler);
	this.controller.stopListening($('listNowPlaying'), Mojo.Event.listReorder, this.moveAtIndexHandler);
	this.controller.stopListening($('song'), Mojo.Event.tap, searchLyricsHandler);	
	this.controller.stopListening($('albumArt'), Mojo.Event.tap, this.swapStreamHandler);
		Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
};

NowPlayingListAssistant.prototype.cleanup = function(event) {
	pushNowPlayingList = false
		Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.stopListening($('listNowPlaying'), Mojo.Event.listTap, this.playAtIndexHandler);
	this.controller.stopListening($('listNowPlaying'), Mojo.Event.listDelete, this.deleteAtIndexHandler);
	this.controller.stopListening($('listNowPlaying'), Mojo.Event.listReorder, this.moveAtIndexHandler);	
	this.controller.stopListening($('song'), Mojo.Event.tap, searchLyricsHandler);	
	this.controller.stopListening($('albumArt'), Mojo.Event.tap, this.swapStreamHandler);
		Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
};

NowPlayingListAssistant.prototype.playAtIndex = function(event){
if (internet == true) {
	//var targetRow = $(event.originalEvent.target);
	//Mojo.Log.info('targetRow: '+targetRow)
	var target = event.originalEvent.target.className;
	popupIndex = event.index;
	// Mojo.Controller.errorDialog(target);
	if (target !== "addFavs") {
		currentAudio.pause();
/*
		this.controller.get('spinner').mojo.start();
		this.controller.get('scrimSpinner').show();
*/
		lastPlayingElement = nowPlayingListAss.controller.get(playItems[listindexLastPlayed].uniqueProgressId)
		if (lastPlayingElement != null) {	
			$(playItems[listindexLastPlayed].uniqueProgressId).innerHTML = ''
			$(playItems[listindexLastPlayed +1].uniqueProgressId).innerHTML = ''
		}
		if (scrobble == 'On') {
			if (currentAudio.currentTime > currentAudio.duration / 2 || currentAudio.currentTime > 260) {
				//rating = "S"
				Mojo.Log.info("Skip Scrobble == true")
				streamAss.scrobble(songDuration, artistName, trackName, lastfmTimeAtPlay, albumName, source, rating, tracknumber, musicBrainz);
			}
		}
		if (listIndex == event.index) {
			if (audioPlaying == true) {
				currentAudio.currentTime = 0
				currentAudio.play()
			}else{
				
				if (trackerTimeout) {
					clearTimeout(trackerTimeout)
				}
				audioAss.setupPlaySong();
			}
			if (lastfmLoggedIn == true) {
				if (internet == true) {
					if (scrobble == 'On' && lastfmLoggedIn == true) {
						streamAss.setLastfmNowPlaying()
					}
				}
			}
		}
		else {
				if (trackerTimeout) {
					clearTimeout(trackerTimeout)
				}
				listIndex = event.index;
				listInfoIndex = listIndex + 1;
				audioAss.setupPlaySong();
		}
		this.displayNowPlayingListInfo() 
	}
	else {
		if (popupIndex != listIndex && popupIndex != listIndex + 1) {
			this.controller.popupSubmenu({
				onChoose: this.popupHandler,
				placeNear: event.originalEvent.target,
				items: [{
					label: 'To Next',
					command: 'toNext'
				}, {
					label: 'To Top',
					command: 'toTop'
				}, {
					label: 'To Bottom',
					command: 'toBottom'
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
					label: 'To Top',
					command: 'toTop'
				}, {
					label: 'To Bottom',
					command: 'toBottom'
				}, {
					label: 'Cancel',
					command: 'cancel'
				}]
			});
		}
	}
}
else {
	Mojo.Controller.errorDialog("No Internet available");
}  
}
NowPlayingListAssistant.prototype.popup = function(command){
		switch (command) {
		
			case 'toNext':
				this.toNext();
				break;
			case 'toTop':
				this.toTop();
				break;
			case 'toBottom':
				this.toBottom();
				break;
			case 'cancel':
				//function(){};
				break;
		}
}
NowPlayingListAssistant.prototype.toNext = function(){
		if(popupIndex < listIndex){
			listIndex = listIndex - 1
		}
		move = []
		move = playItems.splice(popupIndex, 1)
		playItems.splice(listIndex + 1, 0, move[0]) 
/*
		this.model.items=playItems;
		this.controller.modelChanged(this.model);
*/
			if(Math.floor((currentAudio.currentTime/currentAudio.duration)*100) >= setBufferPercentage){
				audioAss.loadNextSong();
			}
		editPlaylist = true
		$('listNowPlaying').mojo.noticeUpdatedItems(0,playItems)
		this.displayNowPlayingListInfo() 
}
NowPlayingListAssistant.prototype.toTop = function(){
		move = []
		move = playItems.splice(popupIndex, 1)
		playItems.unshift(move[0])
/*
		this.model.items=playItems;
		this.controller.modelChanged(this.model);
*/						
					if(listIndex == 0){
						if(!currentAudio.paused){
							audioAss.setupPlaySong();
						}else if(currentAudio.paused){
							audioAss.setupPlaySong();
							currentAudio.pause()
						}
						if(Math.floor((currentAudio.currentTime/currentAudio.duration)*100) >= setBufferPercentage){
							audioAss.loadNextSong();
						}
					}
					else
					if(popupIndex == 1){
						if(Math.floor((currentAudio.currentTime/currentAudio.duration)*100) >= setBufferPercentage){
							audioAss.loadNextSong();
						}
					}
					else if(popupIndex > listIndex){
						listIndex = listIndex + 1
					}
					else if(popupIndex == listIndex){
						listIndex = 0
					}
					editPlaylist = true
		$('listNowPlaying').mojo.noticeUpdatedItems(0,playItems)
					this.displayNowPlayingListInfo() 
}
NowPlayingListAssistant.prototype.toBottom = function(event){
		move = []
		move = playItems.splice(popupIndex, 1)
		playItems.push(move[0])
/*
		this.model.items=playItems;
		this.controller.modelChanged(this.model);	
*/				
					if (listIndex == playItems.length - 1) {
						if(!currentAudio.paused){
							audioAss.setupPlaySong();
						}else if(currentAudio.paused){
							audioAss.setupPlaySong();
							currentAudio.pause()
						}
						if(Math.floor((currentAudio.currentTime/currentAudio.duration)*100) >= setBufferPercentage){
							audioAss.loadNextSong();
						}
					}
					else
					if(popupIndex == listIndex + 1){
						if(Math.floor((currentAudio.currentTime/currentAudio.duration)*100) >= setBufferPercentage){
							audioAss.loadNextSong();
						}
					}
					else if(popupIndex < listIndex){
						listIndex = listIndex - 1
					}
					else if(popupIndex == listIndex){
						listIndex = playItems.length - 1
					}
					editPlaylist = true
		$('listNowPlaying').mojo.noticeUpdatedItems(0,playItems)	
					this.displayNowPlayingListInfo() 
}
NowPlayingListAssistant.prototype.clearList = function(){
if (playItems.length > 0) {
	this.controller.showAlertDialog({
		onChoose: function(value){
			if (value == "clear") {
				audioAss.stop()
			}
			else 
				if (value == "cancel") {
				}
		},
		title: $L("Are you sure you want to clear the current playlist and exit playing? This will not affect the source playlist."),
		choices: [{
			label: $L("Clear"),
			value: "clear",
			type: 'primary'
		}, {
			label: $L("Cancel"),
			value: "cancel",
			type: 'dismiss'
		}]
	});
}
}

NowPlayingListAssistant.prototype.handleCommand = function(event){
	//this.currentScene=Mojo.Controller.stageController.activeScene();
	if (event.type == Mojo.Event.command) {
		switch (event.command) {
		
/*
			case 'clear':
				this.clearList();
				break;
*/
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
			case 'toggleHeadPhoneControlsNowPlayingList':
				if (headPhoneControls == 'On') {
					headPhoneControls = 'Off'
						NowPlayingListModel.items[1]={label: "Headphone Controls: "+headPhoneControls,command: 'toggleHeadPhoneControlsStream'}
						this.controller.modelChanged(NowPlayingListModel);
					
				}else{
					headPhoneControls = 'On'
						NowPlayingListModel.items[1]={label: "Headphone Controls: "+headPhoneControls,command: 'toggleHeadPhoneControlsStream'}
						this.controller.modelChanged(NowPlayingListModel);
				}
				break;
			case 'toggleScrobbleNowPlayingList':
				if(scrobble == 'On'){
					scrobble = 'Off'
				}else{
					scrobble = 'On'
					//streamAss.scrobble();
					if (audioPlaying == true) {
						audioAss.notification()
					}
				}
				NowPlayingListModel.items[2]={label: "Scrobbling: "+scrobble,command: 'toggleScrobbleStream'}
				this.controller.modelChanged(NowPlayingListModel);
				break;
			case 'nowPlayingSwap':
				this.controller.stageController.swapScene({
					name: "stream",
					transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				});
				pushNowPlaying = true
				break;
			case 'scrollToNow':
				if (playItems.length > 0) {
					$('listNowPlaying').mojo.revealItem(listIndex, true)
				}
				break;
		}
	}
	if (event.type == Mojo.Event.back) {

/*
		if (pushNowPlayingListSwap == true) {
			pushNowPlayingListSwap = false
			pushNowPlaying = true
			this.controller.stageController.swapScene({
				name: "stream",
				transition: Mojo.Transition.crossFade,
				disableSceneScroller: true
			});
		}
*/
	}
}
NowPlayingListAssistant.prototype.deleteAtIndex = function(event){
					//playListSum = playListSum - playItems[event.index].timeUnformatted;
					//Mojo.Controller.errorDialog(playItems[event.index].timeUnformatted)
					playItems.splice(event.index, 1)
					//newPlayListIndex = newPlayListIndex-1
					//this.formatTotalPlayListTime();
					//this.controller.get('header').innerHTML = "Playlist Songs: " + playItems.length + ", Runtime: " + totalPlayListTime;
					if(event.index == listIndex){
						Mojo.Log.info('event.index == listIndex: '+ event.index + ', '+listIndex)
						if(!currentAudio.paused){
							currentAudio.src = playItems[listIndex].url
							currentAudio.load()
						}else if(audio.paused){
							currentAudio.src = playItems[listIndex].url
							currentAudio.load()
							currentAudio.pause()
						}
					}else
					if(event.index > listIndex){
						Mojo.Log.info('event.index > listIndex: '+ event.index + ', '+listIndex)
							//listIndex = listIndex + 1
							if (event.index == listIndex + 1) {
								if (Math.floor((currentAudio.currentTime / currentAudio.duration) * 100) >= setBufferPercentage) {
									audioAss.loadNextSong();
								}
							}
						Mojo.Log.info('event.index > listIndex: '+ event.index + ', '+listIndex)
					}else
						if(event.index < listIndex){
							Mojo.Log.info('event.index > listIndex: '+ event.index + ', '+listIndex)
							listIndex = listIndex - 1
/*
							if(Math.floor((currentAudio.currentTime/currentAudio.duration)*100) >= setBufferPercentage){
								audioAss.loadNextSong();
							}
*/
						Mojo.Log.info('event.index > listIndex: '+ event.index + ', '+listIndex)
						}
					editPlaylist = true
					this.displayNowPlayingListInfo()
}
NowPlayingListAssistant.prototype.moveAtIndex = function(event){
					move = []
					move = playItems.splice(event.fromIndex, 1) 
					playItems.splice(event.toIndex, 0, move[0]) 
					
					if(event.fromIndex > listIndex && event.toIndex < listIndex){
						Mojo.Log.info('event.toIndex < listIndex'+', event.fromIndex: '+event.toIndex+' listIndex: '+listIndex)
						listIndex = listIndex + 1
					}else
						if (event.fromIndex < listIndex && event.toIndex > listIndex){
							Mojo.Log.info('event.toIndex > listIndex'+', event.fromIndex: '+event.toIndex+' listIndex: '+listIndex)
							listIndex = listIndex - 1
					}else 
						if (event.fromIndex == listIndex) {
							Mojo.Log.info('event.fromIndex == listIndex'+', event.fromIndex: '+event.fromIndex+' listIndex: '+listIndex)
							listIndex = event.toIndex
							Mojo.Log.info('listIndex: '+listIndex+' listIndexTemp: '+listIndexTemp)
					}
					else 
						if (event.fromIndex < listIndex && event.toIndex == listIndex) {
							Mojo.Log.info('event.toIndex == listIndex'+', event.toIndex: '+event.toIndex+' listIndex: '+listIndex)
							listIndex = listIndex - 1
					}
					else 
						if (event.fromIndex > listIndex && event.toIndex == listIndex) {
							Mojo.Log.info('event.toIndex == listIndex'+', event.toIndex: '+event.toIndex+' listIndex: '+listIndex)
							listIndex = listIndex + 1
					}
					else {
							Mojo.Log.info('Either drag to/frome "less than" or "greater than".')
					}
					if(Math.floor((currentAudio.currentTime/currentAudio.duration)*100) >= setBufferPercentage){
						audioAss.loadNextSong();
					}
					editPlaylist = true
					this.displayNowPlayingListInfo()
					
}
NowPlayingListAssistant.prototype.formatTotalPlayListTime = function(){
	totalDays = 0
	totalHr = 0
	totalMin = Math.floor(playListSum / 60);
	if (totalMin >= 60){
		totalHr = Math.floor(totalMin / 60)
		totalMin = totalMin % 60
	}	
	if (totalHr >= 24){
		totalDays = Math.floor(totalHr / 24)
		totalHr = totalHr % 24
		//totalMin = totalMin % 60
	}
	totalSec = playListSum % 60;
	totalSecString = totalSec.toString()
	totalMinString = totalMin.toString()
	if (totalSecString[1] == "." || totalSecString[1] == undefined){totalSecs = "0"+totalSecString[0]}
	else{totalSecs = totalSecString[0]+totalSecString[1]}
	if (totalMinString[1] == "." || totalMinString[1] == undefined){totalMin = "0"+totalMinString[0]}
	else{totalMin = totalMinString[0]+totalMinString[1]}
	if (totalHr != 0) {
		totalPlayListTime = totalHr + ":" + totalMin + ":" + totalSecs;
	}else if(totalDays != 0){
		totalPlayListTime = totalDays + ":" + totalHr + ":" + totalMin + ":" + totalSecs;
	}
	else {
		totalPlayListTime = totalMin + ":" + totalSecs
	}	
	this.controller.get('header').innerHTML =  playItems.length + " songs" + ", Runtime: " + totalPlayListTime;
}

NowPlayingListAssistant.prototype.displayNowPlayingListInfo = function(){
				Mojo.Log.info('Enter displayNowPlayingListInfo')
	//$('scrollerId').mojo.setSnapIndex(listIndex, true)
	//if (stageDeactivated == false) {
	if (playItems.length > 0) {
		if (editPlaylist == false) {
			$('listNowPlaying').mojo.revealItem(listIndex, true)
		}
		else {
			editPlaylist = false
		}
		//update nowplaying Icon
		//}
		//topNode = $('listNowPlaying').mojo.getNodeByIndex(listIndex)
		
		
		//$('listNowPlaying').mojo.noticeUpdatedItems(listIndex,playItems)
		/*
	 this.model.items=playItems;
	 this.controller.modelChanged(this.model);
	 */
		/*
	 itemByNode = $('listNowPlaying').mojo.getItemByNode(nowPlayingStatus)
	 //topNode.firstChild.getAttribute("id").innerHTML = 'Now Playing'//getAttribute("id")
	 Mojo.Log.info('itemByNode: '+itemByNode)
	 Mojo.Log.info('topNode.firstChild.: '+Object.toJSON(topNode.id.childNodes))
	 //Mojo.Log.info('topNode.firstChild.getElementById: '+topNode.firstChild.getElementById('nowPlayingStatus'))
	 Mojo.Log.info('topNode.id: '+topNode.id)
	 */
		//Mojo.Log.info('Object.toJSON(topNode): '+Object.toJSON(topNode))
		listInfoIndex = listIndex + 1
		$('listInfo').innerHTML = listInfoIndex + "/" + playItems.length;
		$('song').innerHTML = playItems[listIndex].song
		$('albumArt').innerHTML = "<img src=" + playItems[listIndex].art + " height=30px width=30px></img>"
		//Mojo.Log.info("$('albumArt').innerHTML = <img src=" + playItems[listIndex].art + " height=30px width=30px></img>")
		/*
	 if (listIndex + 1 < playItems.length) {
	 $('downloadStatus').innerHTML = "Next: " + playItems[listIndex + 1].song//+ "by, " + playItems[listIndex + 1].artist
	 $('artistCaching').innerHTML = "by " + playItems[listIndex + 1].artist
	 $('percentage').innerHTML = "";
	 }
	 else
	 if (playMode == 'repeatAll') {
	 $('downloadStatus').innerHTML = "Next: " + playItems[0].song//+ "by, " + playItems[listIndex + 1].artist
	 $('artistCaching').innerHTML = "by " + playItems[0].artist
	 $('percentage').innerHTML = "";
	 }
	 else {
	 $('downloadStatus').innerHTML = "End of PlayList"
	 $('artistCaching').innerHTML = ""
	 $('percentage').innerHTML = "";
	 }
	 */
		if (audioPlaying == true) {
			//nowPlayingListAss.controller.get('duration').innerHTML = convert + ":" + convertSecs
			audioAss.timeDisplay()
		}
		if (pushPlayerDash == true) {
			playerDashAss.upDateSongInfo();
		}
		
		//display now playing Icon
		nowPlayingElement = nowPlayingListAss.controller.get(playItems[listIndex].uniqueId)
		lastPlayingElement = nowPlayingListAss.controller.get(playItems[listindexLastPlayed].uniqueId)
		Mojo.Log.info('nowPlayingElement: ' + nowPlayingElement)
		Mojo.Log.info('lastPlayingElement: ' + lastPlayingElement)
		if (nowPlayingElement != null) {
/*
			if (listIndex != listindexLastPlayed) {
				renderedLimitDiff = listindexLastPlayed - listIndex
				Mojo.Log.info('renderedLimitDiff: ' + renderedLimitDiff)
				if (renderedLimitDiff < 0) {
					renderedLimitDiff = renderedLimitDiff * -1
					Mojo.Log.info('renderedLimitDiff < 0: ' + renderedLimitDiff)
				}
			}
			else {
				renderedLimitDiff = 0
			}
*/
			//if (renderedLimitDiff < 20 && renderedLimitDiff != 0) {
				Mojo.Log.info('reset last: listindexLastPlayed: ' + listindexLastPlayed + ', listIndex: ' + listIndex)
			
			if (lastPlayingElement != null) {	
				lastPlayingElement.innerHTML = '<img src=images/16thNote.png class="listImage">'
				nowPlayingListAss.controller.get(playItems[listindexLastPlayed].uniqueTimeId).innerHTML = playItems[listindexLastPlayed].time
			}
			//}
			if (firstOpen == false) {
				$(playItems[listIndex].uniqueId).innerHTML = '<img src=images/currentlyPlaying.png class="listImage">'
			}
			else {
				firstOpen = false
			}
			Mojo.Log.info('listindexLastPlayed: ' + listindexLastPlayed + ', listIndex: ' + listIndex)
		}
		listindexLastPlayed = listIndex
	}
	
				Mojo.Log.info('Exit displayNowPlayingListInfo')
}
NowPlayingListAssistant.prototype.swapStream = function(){
		$('scrim').show();
			this.controller.stageController.swapScene({
				name: "stream",
				transition: Mojo.Transition.crossFade,
				disableSceneScroller: true
			});
			pushNowPlaying = true
		setTimeout(function(){nowPlayingListAss.controller.get('scrim').hide()})
}