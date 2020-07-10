audioPlayer = Class.create({
	
initialize: function(controller){
				imdeController = controller
				//downloadNextSongHandler = this.downloadNextSong.bind(this);
				//downloadNextArtHandler = this.downloadNextArt.bind(this);
				downloadSuccessHandler = this.downloadSuccess.bind(this);
				downloadFailHandler = this.downloadFail.bind(this);
				notificationHandler = this.notification.bind(this);
				//deleteSuccessHandler = this.deleteSuccess.bind(this);
				//deleteFailHandler = this.deleteFail.bind(this);
				cancelSuccessHandler = this.cancelSuccess.bind(this);
				cancelFailHandler = this.cancelFail.bind(this);
				previousSongHandler = this.previousSong.bind(this)
				nextSongHandler = this.nextSong.bind(this)
				errorhandler = this.error.bind(this);
				pauseMenuUpdatehandler = this.pauseMenuUpdate.bind(this);
				playMenuUpdatehandler = this.playMenuUpdate.bind(this);
				timeDisplayhandler = this.timeDisplay.bind(this);
				countTimerBind = this.countTimer.bind(this);
				songProgressHandler = this.songProgress.bind(this);
				//setBookmarkedTimeHandler = this.setBookmarkedTime.bind(this)
				searchLyricsHandler = this.searchLyrics.bind(this)
				playNextSongHandler = this.playNextSong.bind(this)
				loadHandler = this.audioLoaded.bind(this)
				songTrackerHandlerOne = this.audioOneSongTracker.bind(this)
				songTrackerHandlerTwo = this.audioTwoSongTracker.bind(this)
				loadNextSongHandler = this.loadNextSong.bind(this);
				//timeUpdateHandler = this.timeUpdate.bind(this)
//playModeMenuUpdateHandler = this.playModeMenuUpdate.bind(this);
},

clone: function(arr){
					Mojo.Log.info('Enter clone to playItems')
					
					if (playMode == 'random' || playMode == 'repeatSong') {
						playMode = 'standard'
					}
					decodeRefresh = false
					if(audioPlaying == true){
						currentAudio.pause()
					}
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
					Mojo.Log.info('playItems.length: '+playItems.length)
					
					this.rewrite();
					this.setupPlaySong()
					
					Mojo.Log.info('Exit clone to playItems')
},

setupPlaySong: function(){
					Mojo.Log.info('Enter setupPlaySong')
					if(audioPlaying == true){
						Mojo.Log.info('audioPlaying = true, removing event listeners')
						audio.removeEventListener("pause", pauseMenuUpdatehandler);
						audio.removeEventListener("play", playMenuUpdatehandler);
						audio.removeEventListener("play", countTimerBind);
						audio.removeEventListener("play", timeDisplayhandler);
						audio.removeEventListener("play", notificationHandler);
						audio.removeEventListener("play", songTrackerHandlerOne);
						//audio.removeEventListener("timeupdate", timeUpdateHandler);
						audio.removeEventListener('ended', playNextSongHandler);	
						audio.removeEventListener('load', loadNextSongHandler);
						audio2.removeEventListener("pause", pauseMenuUpdatehandler);
						audio2.removeEventListener("play", playMenuUpdatehandler);
						audio2.removeEventListener("play", countTimerBind);
						audio2.removeEventListener("play", timeDisplayhandler);
						audio2.removeEventListener("play", notificationHandler);
						audio2.removeEventListener("play", songTrackerHandlerTwo);
						//audio2.removeEventListener("timeupdate", timeUpdateHandler);
						audio2.removeEventListener('ended', playNextSongHandler);
						audio.removeEventListener('load', loadHandler);
						audio.removeEventListener('error', errorhandler);
						audio.removeEventListener('progress', songProgressHandler);
						audio2.removeEventListener('load', loadHandler);
						audio2.removeEventListener('error', errorhandler);
						audio2.removeEventListener('progress', songProgressHandler);	
						audio2.removeEventListener('load', loadNextSongHandler);
						
/*
						audio2 = new Audio()
						audioElem = audioLibs.mediaextension.MediaExtension.getInstance(audio2);
						audio2.mojo.audioClass = "media";
*/
					}
						loaded = false
						loading = false
						firstSong = true
						audioOnePlaying = true
						audio.addEventListener("pause", pauseMenuUpdatehandler);	
						audio.addEventListener("play", playMenuUpdatehandler);	
						audio.addEventListener("play", countTimerBind);	
						audio.addEventListener("play", timeDisplayhandler);
						audio.addEventListener("play", notificationHandler);
						if (playMode != 'repeatSong') {
							audio.addEventListener("play", songTrackerHandlerOne);
							//audio.addEventListener("timeupdate", timeUpdateHandler);	
						}
						audio.addEventListener('ended', playNextSongHandler);	
/*
						audio.addEventListener('load', loadHandler);
						audio.addEventListener('error', errorhandler);	
						audio.addEventListener('progress', songProgressHandler);
*/
						//currentAudio.addEventListener("play", playModeMenuUpdateHandler);	
						//audio.addEventListener(Media.Event.PLAY, this.spinnerStopHandler);
						//audio.addEventListener('waiting', this.spinnerStartWaitingHandler);
						//audio.addEventListener('stalled', this.spinnerStartStalledHandler);
						//audio.addEventListener('loadstart', this.spinnerStartHandler);
/*
						if (playItems[listIndex].currentTime != undefined) {
							audio.addEventListener('canplay', setBookmarkedTimeHandler);
						}
*/
					listIndexTemp = listIndex	
					Mojo.Log.info('setupPlaySong listIndex: '+listIndex+' listIndexTemp: '+listIndexTemp)
					currentAudio = audio
					this.clearTimer();
					this.playSong();
					Mojo.Log.info('Exit setupPlaySong')
},

playSong: function(event) {
					Mojo.Log.info('Enter PlaySong')
					Mojo.Log.info('playSong listIndex: '+listIndex+' listIndexTemp: '+listIndexTemp)
					//lastStream = playItems[listIndex].url;
					Mojo.Log.info("add event listeners");	

					audio2.removeEventListener('load', loadHandler);
					audio2.removeEventListener('error', errorhandler);
					audio2.removeEventListener('progress', songProgressHandler);
					audio.addEventListener('load', loadHandler);
					audio.addEventListener('error', errorhandler);
					audio.addEventListener('progress', songProgressHandler);
					protocolTest = playItems[listIndexTemp].url.match("http://")
					audio.src = playItems[listIndexTemp].url;
					audio.load();
					if(firstSong==true){
						firstSong=false
						if (playItems[listIndexTemp].currentTime != undefined) {
							this.setBookmarkedTime();
						}
					}
					else{
						audio.pause();
					}
					audioPlaying = true
					loadNextSongFired = true
/*
					if (playMode != 'repeatSong') {
						this.audioOneSongTracker();
					}
*/
					Mojo.Log.info("audio src set: "+playItems[listIndexTemp].url);
				Mojo.Log.info("Exit add event listeners");	
		
				//set played to true so listInfoIndex does not increase twice.
				played=true;
			
				//listIndexBackup = listIndex
					Mojo.Log.info('Exit PlaySong')
},

timeUpdate:function(event){
	Mojo.Log.info('timeUpdate currentAudio.currentTime: '+currentAudio.currentTime)
	Mojo.Log.info('Math.floor((currentAudio.currentTime / currentAudio.duration) * 100: '+Math.floor((currentAudio.currentTime / currentAudio.duration) * 100))
							if (Math.floor((currentAudio.currentTime / currentAudio.duration) * 100) >= setBufferPercentage) {
								//clearInterval(songPosition)
								//Mojo.Log.info("clearInterval(songPosition): "+songPosition);
								currentAudio.removeEventListener("timeupdate", timeUpdateHandler);
								audioAss.loadNextSong();
							}
},

audioOneSongTracker: function(){
	if (audio.duration < 30) {
		trackTime = 1000
		Mojo.Log.info("audio trackTime: " + trackTime+" audio.duration: " + audio.duration);
	}
	else 
		if (audio.duration >= 30 && audio.duration <= 120 ) {
			trackTime = 5000
			Mojo.Log.info("audio trackTime: " + trackTime+" audio.duration: " + audio.duration);
		}
		else 
			if (audio.duration >= 1200 ) {
				trackTime = 60000
				Mojo.Log.info("audio trackTime: " + trackTime+" audio.duration: " + audio.duration);
			}
			else{
				trackTime = 10000
				Mojo.Log.info("audio trackTime: " + trackTime+" audio.duration: " + audio.duration);
			}	
/*
				if (setBufferPercentage == 0 ) {
					Mojo.Log.info("setBufferPercentage: " + setBufferPercentage);
					audio2.removeEventListener('load', loadNextSongHandler);
					audio.addEventListener('load', loadNextSongHandler);
				}
				else{
*/
					Mojo.Log.info("audio trackTime: " + trackTime+" audio.duration: " + audio.duration);
					Mojo.Log.info('audio.currentTime/audio.duration*100: ' + Math.floor((audio.currentTime / audio.duration) * 100)+ " setBufferPercentage: "+setBufferPercentage);
							if (Math.floor((audio.currentTime / audio.duration) * 100) >= setBufferPercentage) {
								audioAss.loadNextSong();
							}else if(playItems.length==0){
								Mojo.Log.info("playItems.length=0 audio.currentTime: "+audio.currentTime+ "setBufferPercentage: "+setBufferPercentage);	
							}
/*
							else if(skipped == true){
								Mojo.Log.info("skipped == true");	
							}
*/
							else{
								trackerTimeout = setTimeout('audioAss.audioOneSongTracker()',trackTime)
							}	
/*
					Mojo.Log.info("Enter Song Tracker");	
					Mojo.Log.info("audio songPosition: "+songPosition);	
					if (!songPosition) {
						Mojo.Log.info("!songPosition: "+songPosition);	
						songPosition = setInterval(function(){
							loadNextSongFired = false
							Mojo.Log.info('audio.currentTime/audio.duration*100: ' + Math.floor((audio.currentTime / audio.duration) * 100));
							if (Math.floor((audio.currentTime / audio.duration) * 100) >= setBufferPercentage) {
								clearInterval(songPosition)
								Mojo.Log.info("clearInterval(songPosition): "+songPosition);
								audioAss.loadNextSong();
							}
						}, trackTime)
					}
					else {
						clearInterval(songPosition)
						Mojo.Log.info("clearInterval(songPosition): "+songPosition);	
						songPosition = setInterval(function(){
							loadNextSongFired = false
							Mojo.Log.info('audio.currentTime/audio.duration*100: ' + Math.floor((audio.currentTime / audio.duration) * 100));
							if (Math.floor((audio.currentTime / audio.duration) * 100) >= setBufferPercentage) {
								clearInterval(songPosition)
								Mojo.Log.info("clearInterval(songPosition): "+songPosition);
								audioAss.loadNextSong();
							}
						}, trackTime)
					}
*/
					Mojo.Log.info("Exit Song Tracker");
},

playSong2: function(event) {
					Mojo.Log.info('Enter PlaySong2')
					Mojo.Log.info('PlaySong2 listIndex: '+listIndex+' listIndexTemp: '+listIndexTemp)
					//lastStream = playItems[listIndex].url;
					
					Mojo.Log.info("add event listeners");	
					audio.removeEventListener('load', loadHandler);
					audio.removeEventListener('error', errorhandler);
					audio.removeEventListener('progress', songProgressHandler);
					audio2.addEventListener('load', loadHandler);
					audio2.addEventListener('error', errorhandler);
					audio2.addEventListener('progress', songProgressHandler);
					protocolTest = playItems[listIndexTemp].url.match("http://")
					audio2.src = playItems[listIndexTemp].url;
					audio2.load();
					audio2.pause();
					audioPlaying = true
					loadNextSongFired = true
/*
					if (playMode != 'repeatSong') {
						this.audioTwoSongTracker();
					}
*/
					Mojo.Log.info("audio2 src set: "+playItems[listIndexTemp].url);	
					//Mojo.Log.info("audio2 songPosition: "+songPosition);	
					
				Mojo.Log.info("Exit add event listeners");	
		
				//set played to true so listInfoIndex does not increase twice.
				played=true;
			
				//listIndexBackup = listIndex
					Mojo.Log.info('Exit PlaySong2')
},

audioTwoSongTracker: function(){
					Mojo.Log.info("Enter Song Tracker");
	if(audio2.duration < 30){
		trackTime = 1000
		Mojo.Log.info("audio2 trackTime: " + trackTime+" audio2.duration: " + audio2.duration);
	}
	else 
		if (audio2.duration >= 30 && audio2.duration <= 120 ) {
			trackTime = 5000
			Mojo.Log.info("audio2 trackTime: " + trackTime+" audio2.duration: " + audio2.duration);
		}
		else 
			if (audio2.duration >= 1200 ) {
				trackTime = 60000
				Mojo.Log.info("audio2 trackTime: " + trackTime+" audio2.duration: " + audio2.duration);
		}
			else{
				trackTime = 10000
				Mojo.Log.info("audio2 trackTime: " + trackTime+" audio2.duration: " + audio2.duration);
			}	
/*
				if (setBufferPercentage == 0) {
					audio.removeEventListener('load', loadNextSongHandler);
					audio2.addEventListener('load', loadNextSongHandler);
				}
				else {
*/
					Mojo.Log.info('audio2.currentTime/audio2.duration*100: ' + Math.floor((audio2.currentTime / audio2.duration) * 100)+ " setBufferPercentage: "+setBufferPercentage);
					if (Math.floor((audio2.currentTime / audio2.duration) * 100) >= setBufferPercentage) {
						audioAss.loadNextSong();
					}
					else 
						if (playItems.length == 0) {
							Mojo.Log.info("playItems.length=0");
						}
						/*
	 else if(skipped == true){
	 skipped = false
	 Mojo.Log.info("skipped == true");
	 }
	 */
						else {
							trackerTimeout = setTimeout('audioAss.audioTwoSongTracker()', trackTime)
						}
/*
					Mojo.Log.info("audio songPosition: "+songPosition);	
					if (!songPosition) {
						Mojo.Log.info("!songPosition: "+songPosition);	
						songPosition = setInterval(function(){
							loadNextSongFired = false
							Mojo.Log.info('audio2.currentTime/audio2.duration*100: ' + Math.floor((audio2.currentTime / audio2.duration) * 100));
							if (Math.floor((audio2.currentTime / audio2.duration) * 100) >= setBufferPercentage) {
								clearInterval(songPosition)
								Mojo.Log.info("clearInterval(songPosition): "+songPosition);
								audioAss.loadNextSong();
							}
						}, trackTime)
					}
					else {
						clearInterval(songPosition)
						Mojo.Log.info("clearInterval(songPosition): "+songPosition);	
						songPosition = setInterval(function(){
							loadNextSongFired = false
							Mojo.Log.info('audio2.currentTime/audio2.duration*100: ' + Math.floor((audio2.currentTime / audio2.duration) * 100));
							if (Math.floor((audio2.currentTime / audio2.duration) * 100) >= setBufferPercentage) {
								clearInterval(songPosition)
								Mojo.Log.info("clearInterval(songPosition): "+songPosition);
								audioAss.loadNextSong();
							}
						}, trackTime)
					}
*/
					Mojo.Log.info("Exit Song Tracker");
},

playNextSong: function(event){
/*
				if (downloading == true) {
					Mojo.Log.info("downloading: "+downloading);	
					this.cancelDownloadNoPlay();
				}
*/

				Mojo.Log.info('enter Play Next Song')
/*
			for(i=0;i<playItems.length;i++){
				Mojo.Log.info(i+': '+playItems[i].song)
			}		
*/
		loaded = false
		loading = false
		if (scrobble == 'On') {
			streamAss.scrobble(songDuration, artistName, trackName, lastfmTimeAtPlay, albumName, source, rating, tracknumber, musicBrainz);
		}
		if (playMode != 'repeatSong') {
			listIndex = listIndexTemp
			Mojo.Log.info('endOfPlaylist: '+endOfPlaylist)
			if (endOfPlaylist == false) {
				if (audioOnePlaying == true) {
					Mojo.Log.info('audioOnePlaying: ' + audioOnePlaying)
					audioOnePlaying = false
					audio.removeEventListener("pause", pauseMenuUpdatehandler);
					audio.removeEventListener("play", playMenuUpdatehandler);
					audio.removeEventListener("play", countTimerBind);
					audio.removeEventListener("play", timeDisplayhandler);
					audio.removeEventListener("play", notificationHandler);
					audio.removeEventListener("play", songTrackerHandlerOne);
					//audio.removeEventListener("timeupdate", timeUpdateHandler);
					audio.removeEventListener('ended', playNextSongHandler);
					audio2.addEventListener("pause", pauseMenuUpdatehandler);
					audio2.addEventListener("play", playMenuUpdatehandler);
					audio2.addEventListener("play", countTimerBind);
					audio2.addEventListener("play", timeDisplayhandler);
					audio2.addEventListener("play", notificationHandler);
					if (playMode != 'repeatSong') {
						audio2.addEventListener("play", songTrackerHandlerTwo);
						//audio2.addEventListener("timeupdate", timeUpdateHandler);
					}
					audio2.addEventListener('ended', playNextSongHandler);
					//currentAudio.addEventListener("play", playModeMenuUpdateHandler);	
					//audio.addEventListener(Media.Event.PLAY, this.spinnerStopHandler);
					//audio.addEventListener('waiting', this.spinnerStartWaitingHandler);
					//audio.addEventListener('stalled', this.spinnerStartStalledHandler);
					//audio.addEventListener('loadstart', this.spinnerStartHandler);
					currentAudio = audio2
				}
				else 
					if (audioOnePlaying == false) {
						Mojo.Log.info('audioOnePlaying: ' + audioOnePlaying)
						audioOnePlaying = true
						audio2.removeEventListener("pause", pauseMenuUpdatehandler);
						audio2.removeEventListener("play", playMenuUpdatehandler);
						audio2.removeEventListener("play", countTimerBind);
						audio2.removeEventListener("play", timeDisplayhandler);
						audio2.removeEventListener("play", notificationHandler);
						audio2.removeEventListener("play", songTrackerHandlerTwo);
						//audio2.removeEventListener("timeupdate", timeUpdateHandler);
						audio2.removeEventListener('ended', playNextSongHandler);
						audio.addEventListener("pause", pauseMenuUpdatehandler);
						audio.addEventListener("play", playMenuUpdatehandler);
						audio.addEventListener("play", countTimerBind);
						audio.addEventListener("play", timeDisplayhandler);
						audio.addEventListener("play", notificationHandler);
						if (playMode != 'repeatSong') {
							audio.addEventListener("play", songTrackerHandlerOne);
							//audio.addEventListener("timeupdate", timeUpdateHandler);	
						}
						audio.addEventListener('ended', playNextSongHandler);
						//currentAudio.addEventListener("play", playModeMenuUpdateHandler);	
						//audio.addEventListener(Media.Event.PLAY, this.spinnerStopHandler);
						//audio.addEventListener('waiting', this.spinnerStartWaitingHandler);
						//audio.addEventListener('stalled', this.spinnerStartStalledHandler);
						//audio.addEventListener('loadstart', this.spinnerStartHandler);
						currentAudio = audio
					}
				this.clearTimer();
				if (pushStreamScene == true) {
					//streamAss.controller.get('downloadStatus').innerHTML = ""
					//streamAss.controller.get('artistCaching').innerHTML = ""
					//streamAss.controller.get('percentage').innerHTML = "";
					/*
			 streamAss.progressModel.progress = 0
			 streamAss.controller.modelChanged(streamAss.progressModel)
			 */
					streamAss.disableMenu();
					streamAss.displayStreamInfo();
				}
				else 
					if (pushNowPlayingList == true) {
/*
						nowPlayingListAss.controller.get('downloadStatus').innerHTML = ""
						nowPlayingListAss.controller.get('artistCaching').innerHTML = ""
						nowPlayingListAss.controller.get('percentage').innerHTML = "";
*/
						nowPlayingListAss.displayNowPlayingListInfo()
					}
				if (pushPlayerDash == true) {
					playerDashAss.upDateSongInfo()
				}
				if (playItems[listIndex].currentTime != undefined) {
					//audio.addEventListener('canplay', setBookmarkedTimeHandler);
					this.setBookmarkedTime();
				}
				else {
					currentAudio.play();
				}
				
			}
			else {
				audioAss.cleanup();
				if (pushPlayerDash == true) {
					playerDashAss.controller.window.close();
				}
				if (pushStreamScene == true) {
					streamAss.controller.stageController.popScene();
				}
				else 
					if (pushNowPlayingList == true) {
						nowPlayingListAss.controller.stageController.popScene();
					}
				
				if (stageDeactivated == true) {
					if (notify == 'On') {
						Mojo.Controller.getAppController().showBanner('Playlist Ended', {
							source: 'notification'
						});
					}
				}
			}
			
		}else{
			currentAudio.currentTime = 0
			currentAudio.play()
		}
/*
					if (pushStreamScene == true || pushNowPlayingList == true) {
						this.clearTimer();
					}
*/	
			Mojo.Log.info('exit Play Next Song: ')
},

loadNextSong: function(){
				Mojo.Log.info("Enter loadNextSong");
				//audio = audio2; 
				//firstSong = false
				//this.downloadNextSong();

				Mojo.Log.info("playMode: " + playMode);
						//Mojo.Controller.errorDialog(listIndex)
								//streamAss.displayStreamInfo();
							if (playMode == 'standard') {
								Mojo.Log.info("listIndexTemp: " + listIndexTemp);
								listIndexTemp = listIndex + 1;
								//listInfoIndex = listIndexTemp + 1;
								if (listIndexTemp < playItems.length) {
									endOfPlaylist = false
									if (audioOnePlaying == true) {
										Mojo.Log.info("listIndexTemp: " + listIndexTemp);
										Mojo.Log.info("audioOnePlaying: " + audioOnePlaying);
										audioAss.playSong2();
									}
									else {
										Mojo.Log.info("listIndexTemp: " + listIndexTemp);
										Mojo.Log.info("audioOnePlaying: " + audioOnePlaying);
										audioAss.playSong();
									}
									if (wanNetwork != '1x' && wanNetwork != 'edge') {
										this.downloadNextArt()
									}
								}else{
									endOfPlaylist = true
								}
							}
								else 
									if (playMode == 'repeatAll') {
										endOfPlaylist = false
										listIndexTemp = listIndex + 1;
										//listInfoIndex = listIndexTemp + 1;
										if (listIndexTemp == playItems.length) {
											listIndexTemp = 0;
											listInfoIndex = 1;
										}
										if (audioOnePlaying == true) {
											Mojo.Log.info("listIndexTemp: " + listIndexTemp);
											Mojo.Log.info("current audio = audio audioOnePlaying: " + audioOnePlaying);
											audioAss.playSong2();
										}
										else {
											Mojo.Log.info("listIndexTemp: " + listIndexTemp);
											Mojo.Log.info("current audio = audio2 audioOnePlaying: " + audioOnePlaying);
											audioAss.playSong();
										}
										if (wanNetwork != '1x' && wanNetwork != 'edge') {
											this.downloadNextArt()
										}
									}
									else 
										if (playMode == 'random') {
											listIndexTemp = listIndex + 1
											listInfoIndex = listIndexTemp + 1;
											if (listIndex < playItems.length) {
												endOfPlaylist = false
												if (audioOnePlaying == true) {
													Mojo.Log.info("listIndexTemp: " + listIndexTemp);
													Mojo.Log.info("current audio = audio audioOnePlaying: " + audioOnePlaying);
													audioAss.playSong2();
												}
												else {
													Mojo.Log.info("listIndexTemp: " + listIndexTemp);
													Mojo.Log.info("current audio = audio2 audioOnePlaying: " + audioOnePlaying);
													audioAss.playSong();
												}
												if (wanNetwork != '1x' && wanNetwork != 'edge') {
													this.downloadNextArt()
												}
											}else{
												endOfPlaylist = true
											}
										}
								Mojo.Log.info("Exit loadNextSong");	
},

songProgress: function(event){
					loading = true
					loaded = false
			       //if (event.lengthComputable != 0 && event.total != 0) { // size is known, not zero;
			
					//Mojo.Log.info("StreamAssistant.prototype.songProgress :audio.bufferingRate: "+audio.bufferingRate)
					//Mojo.Log.info("StreamAssistant.prototype.songProgress :audio.contentLength: "+audio.contentLength)
					//Mojo.Log.info("StreamAssistant.prototype.songProgress :audio.buffered: "+audio.buffered)
					//Mojo.Log.info("StreamAssistant.prototype.songProgress :audio.buffered: "+Object.toJSON(audio.buffered))
					//Mojo.Log.info('songProgress listIndex: '+listIndex+' listIndexTemp: '+listIndexTemp)
					//Mojo.Log.info('playItems[listIndex].url: '+playItems[listIndex].url+' playItems[listIndex].art: '+playItems[listIndex].art)
					if (protocolTest == "http://") {
						if (pushStreamScene == true) {
							streamAss.progressModel.progress = event.loaded / event.total// + .02
							streamAss.controller.modelChanged(streamAss.progressModel)
							Mojo.Log.info('event.loaded / event.total: '+event.loaded / event.total)
							//progresstotal = Math.floor((event.loaded / event.total) * 100)
							//streamAss.controller.get('downloadStatus').innerHTML = 'Buffering: ' + playItems[listIndex].song+ " by, " + playItems[listIndex].artist +' %' + progresstotal;
							//streamAss.controller.get('artistCaching').innerHTML = "by " + playItems[listIndex].artist+' %' + progresstotal
						}
						else 
							if (pushNowPlayingList == true) {
								nowPlayingBufferElement = nowPlayingListAss.controller.get(playItems[listIndex].uniqueProgressId)
								//Mojo.Log.info('nowPlayingBufferElement: ' + nowPlayingBufferElement)
								if (nowPlayingBufferElement != null) {
									progresstotal = Math.floor((event.loaded / event.total) * 100)
									if (listIndex == listIndexTemp) {
										nowPlayingListAss.controller.get(playItems[listIndex].uniqueProgressId).innerHTML = progresstotal+'%'+'&nbsp;'
									}
									else {
										nowPlayingListAss.controller.get(playItems[listIndexTemp].uniqueProgressId).innerHTML = progresstotal+'%'+'&nbsp;'
									}
								}
/*
								nowPlayingListAss.controller.get('downloadStatus').innerHTML = 'Buffering: ' + playItems[listIndexTemp].song//+ " by, " + playItems[listIndex].artist +' %' + progresstotal;
								nowPlayingListAss.controller.get('artistCaching').innerHTML = "by " + playItems[listIndexTemp].artist;
								nowPlayingListAss.controller.get('percentage').innerHTML = "%" + progresstotal;
*/
							}
					}
},

audioLoaded: function(){
				Mojo.Log.info("Enter audioLoaded");
	loaded = true
	loading = false
						if (pushStreamScene == true) {
							streamAss.progressModel.progress = 1
							streamAss.controller.modelChanged(streamAss.progressModel)
						}
						else 
							if (pushNowPlayingList == true) {
								if (listIndex == listIndexTemp) {
									nowPlayingListAss.controller.get(playItems[listIndex].uniqueProgressId).innerHTML = ''
								}
								else {
									nowPlayingListAss.controller.get(playItems[listIndexTemp].uniqueProgressId).innerHTML = ''
								}
							}
/*
						else 
							if (pushNowPlayingList == true) {
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
							}
*/
				Mojo.Log.info("Exit audioLoaded");
},

nextSong: function(event){	
				Mojo.Log.info("Enter nextSong");
							skipped = true;		
							clearTimeout(trackerTimeout)
							Mojo.Log.info('nextSong listIndex: '+listIndex+' listIndexTemp: '+listIndexTemp)
							if (scrobble == 'On') {
								if (currentAudio.currentTime > currentAudio.duration / 2 || currentAudio.currentTime > 260) {
									//rating = "S"
									//Mojo.Log.info("currentAudio.currentTime > currentAudio.duration / 2 || currentAudio.currentTime > 260")
									Mojo.Log.info("currentAudio.currentTime: "+currentAudio.currentTime+", currentAudio.duration / 2:"+currentAudio.duration / 2)
									Mojo.Log.info("Skip Scrobble == true")
									streamAss.scrobble(songDuration, artistName, trackName, lastfmTimeAtPlay, albumName, source, rating, tracknumber, musicBrainz);
								}
							}
							//$('progressbarId').reset()
							currentAudio.removeEventListener('pause', pauseMenuUpdatehandler);
							currentAudio.pause();
			
							listIndex = listIndex + 1;
							listInfoIndex = listIndex + 1
							
							if (listIndex == playItems.length) {
								listInfoIndex = 1;
								listIndex = 0;
							}
							
							this.clearTimer();
							if (timeout != false) {
								clearTimeout(timeout)
								timeout = false
							}
							if (pushStreamScene == true) {
								//streamAss.controller.get('downloadStatus').innerHTML = ""
								//streamAss.controller.get('artistCaching').innerHTML = ""
								//streamAss.controller.get('percentage').innerHTML = "";
/*
								streamAss.progressModel.progress = 0
								streamAss.controller.modelChanged(streamAss.progressModel)
*/
								streamAss.disableMenu();
								streamAss.displayStreamInfo();
							}
							else 
								if (pushNowPlayingList == true) {
/*
									nowPlayingListAss.controller.get('downloadStatus').innerHTML = ""
									nowPlayingListAss.controller.get('artistCaching').innerHTML = ""
									nowPlayingListAss.controller.get('percentage').innerHTML = "";
*/
									if (listIndex == listIndexTemp) {
										nowPlayingListAss.controller.get(playItems[listIndex].uniqueProgressId).innerHTML = ''
									}
									else {
										nowPlayingListAss.controller.get(playItems[listIndexTemp].uniqueProgressId).innerHTML = ''
									}
									nowPlayingListAss.displayNowPlayingListInfo()
								}
							if (pushPlayerDash == true) {
								playerDashAss.upDateSongInfo()
							}
							timeout = setTimeout(function(){
									Mojo.Log.info('nextSong loading: '+loading+' loaded: '+loaded)
									if (Math.floor((currentAudio.currentTime / currentAudio.duration) * 100) >= setBufferPercentage && loadNextSongFired == true) {
										if (audioOnePlaying == true) {
											Mojo.Log.info('audioOnePlaying: ' + audioOnePlaying)
											audioOnePlaying = false
											audio.removeEventListener("pause", pauseMenuUpdatehandler);
											audio.removeEventListener("play", playMenuUpdatehandler);
											audio.removeEventListener("play", countTimerBind);
											audio.removeEventListener("play", timeDisplayhandler);
											audio.removeEventListener("play", notificationHandler);
											audio.removeEventListener("play", songTrackerHandlerOne);
											//audio.removeEventListener("timeupdate", timeUpdateHandler);
											audio.removeEventListener('ended', playNextSongHandler);
											audio2.addEventListener("pause", pauseMenuUpdatehandler);
											audio2.addEventListener("play", playMenuUpdatehandler);
											audio2.addEventListener("play", countTimerBind);
											audio2.addEventListener("play", timeDisplayhandler);
											audio2.addEventListener("play", notificationHandler);
											if (playMode != 'repeatSong') {
												audio2.addEventListener("play", songTrackerHandlerTwo);
												//audio2.addEventListener("timeupdate", timeUpdateHandler);
											}
											audio2.addEventListener('ended', playNextSongHandler);
											currentAudio = audio2
										}
										else if(audioOnePlaying == false){
											Mojo.Log.info('audioOnePlaying: ' + audioOnePlaying)
											audioOnePlaying = true
											audio2.removeEventListener("pause", pauseMenuUpdatehandler);
											audio2.removeEventListener("play", playMenuUpdatehandler);
											audio2.removeEventListener("play", countTimerBind);
											audio2.removeEventListener("play", timeDisplayhandler);
											audio2.removeEventListener("play", notificationHandler);
											audio2.removeEventListener("play", songTrackerHandlerTwo);
											//audio2.removeEventListener("timeupdate", timeUpdateHandler);
											audio2.removeEventListener('ended', playNextSongHandler);
											audio.addEventListener("pause", pauseMenuUpdatehandler);
											audio.addEventListener("play", playMenuUpdatehandler);
											audio.addEventListener("play", countTimerBind);
											audio.addEventListener("play", timeDisplayhandler);
											audio.addEventListener("play", notificationHandler);
											if (playMode != 'repeatSong') {
												audio.addEventListener("play", songTrackerHandlerOne);
												//audio.addEventListener("timeupdate", timeUpdateHandler);
											}
											audio.addEventListener('ended', playNextSongHandler);
											currentAudio = audio
										}
										audioAss.clearTimer();
										if (playItems[listIndex].currentTime != undefined) {
											//audio.addEventListener('canplay', setBookmarkedTimeHandler);
											audioAss.setBookmarkedTime();
										}
										else {
											currentAudio.play();
										}
									}
									else {
										audioAss.setupPlaySong()
									}
							}, 500)
				Mojo.Log.info("Exit nextSong");
},

previousSong: function(event){
				Mojo.Log.info("Enter previousSong");
						skipped = true;
						clearTimeout(trackerTimeout)
						Mojo.Log.info('previousSong listIndex: '+listIndex+' listIndexTemp: '+listIndexTemp)
						//audio.currentTime = 0;
						currentAudio.removeEventListener('pause', pauseMenuUpdatehandler);
						currentAudio.pause();
			
						if (currentAudio.currentTime > 10) {
							this.clearTimer();
								if (pushStreamScene == true) {
									streamAss.progressModel.progress = 0
									streamAss.controller.modelChanged(streamAss.progressModel)
									streamAss.disableMenu();
									streamAss.displayStreamInfo();
								}
							//streamAss.displayStreamInfo();
							currentAudio.currentTime = 0
							currentAudio.play()
							//timeout = setTimeout("streamAss.playSong()", 500)
						}
						else {
							if (listIndex > 0) {
								listIndex = listIndex - 1;
								listInfoIndex = listIndex + 1
							}
							else {
								//play last song in array
								//streamAss.controller.stageController.popScene();
								listIndex = playItems.length - 1;
								listInfoIndex = playItems.length;
							}
							this.clearTimer();
							if (timeout != false) {
								clearTimeout(timeout)
								timeout = false
							}
							
						if (pushStreamScene == true) {
							//streamAss.controller.get('downloadStatus').innerHTML = ""
							//streamAss.controller.get('artistCaching').innerHTML = ""
							//streamAss.controller.get('percentage').innerHTML = "";
							streamAss.progressModel.progress = 0
							streamAss.controller.modelChanged(streamAss.progressModel)
							streamAss.disableMenu();
							streamAss.displayStreamInfo();
						}
						else 
							if (pushNowPlayingList == true) {
/*
								nowPlayingListAss.controller.get('downloadStatus').innerHTML = ""
								nowPlayingListAss.controller.get('artistCaching').innerHTML = ""
								nowPlayingListAss.controller.get('percentage').innerHTML = "";
*/
								
								if (listIndex == listIndexTemp) {
									nowPlayingListAss.controller.get(playItems[listIndex].uniqueProgressId).innerHTML = ''
								}
								else {
									nowPlayingListAss.controller.get(playItems[listIndexTemp].uniqueProgressId).innerHTML = ''
								}
								nowPlayingListAss.displayNowPlayingListInfo()
							}
						if (pushPlayerDash == true) {
							playerDashAss.upDateSongInfo()
						}	
							timeout = setTimeout(function(){
								audioAss.setupPlaySong()
							}, 500)
						}
				Mojo.Log.info("Exit previousSong");
},

rw: function(){
		if (currentAudio.currentTime >= 12) {
			currentAudio.currentTime = currentAudio.currentTime - 10
		}
},

ff: function(){
		if (currentAudio.currentTime < currentAudio.duration - 12) {
			currentAudio.currentTime = currentAudio.currentTime + 10
		}
},

downloadNextSong: function(event){
					loading = false
					if (retry == false) {
						
				if (pushStreamScene == true) {
					streamAss.progressModel.progress = 0;
					streamAss.controller.modelChanged(streamAss.progressModel)
				}
							if (playMode == 'random') {
								if (listIndex < playItems.length - 1) {
									listIndexTemp = listIndex + 1;
								}
							}
								else 
									if (playMode == 'standard') {
										if (listIndex < playItems.length - 1) {
											listIndexTemp = listIndex + 1;
										}
									}
								else 
									if (playMode == 'repeatAll') {
										//listIndexTemp = listIndex + 1
										if (listIndex < playItems.length - 1) {
											listIndexTemp = listIndex + 1;
										}
										else {
											listIndexTemp = 0
										}
									}
								else 
									if (playMode == 'repeatSong') {
										listIndexTemp = listIndex
									}
					}
					retry = false
					
					
				//if (listIndex < playItems.length - 1 || playMode == 'repeatAll') {
/*
				if (ticketNumArray.length != playItems.length) {
					//playItemSongName = playItems[listIndexTemp].song
					protocolTest = playItems[listIndexTemp].url.match("http://")
					protocolTestSsl = playItems[listIndexTemp].url.match("https://")
					if (protocolTest == "http://" || protocolTestSsl == "https://") {
					downloadedSongName = playItems[listIndexTemp].song.replace(/\W/g, '').toLowerCase()
					Mojo.Log.info('downloadedSongName: ' +downloadedSongName)
						songBackup = playItems[listIndexTemp].song
								imdeController.serviceRequest('palm://com.palm.downloadmanager/', {
									method: 'download',
									parameters: {
										//ticket: ticketNum,
										target: playItems[listIndexTemp].url,
										mime: "audio/mpeg",
										targetDir: "/media/internal/.AmpachPreTmp",
										targetFilename: "song-"+downloadedSongName,
										keepFilenameOnRedirect: false,
										subscribe: true
									},
									onSuccess: downloadSuccessHandler,
									onFailure: downloadFailHandler
								});
					}
					else {
						//listIndexTemp = null
						//streamAss.controller.get('downloadStatus').show()
					}
				}
*/
},

downloadSuccess: function(resp){
					downloading = true
					if (pushStreamScene == true) {
						streamAss.progressModel.progress = resp.amountReceived / resp.amountTotal;
						streamAss.controller.modelChanged(streamAss.progressModel)
						//percentageDone = Math.floor((resp.amountReceived / resp.amountTotal) * 100)
						//streamAss.controller.get('downloadStatus').innerHTML = 'Caching: ' + playItems[listIndexTemp].song+" by, " + playItems[listIndexTemp].artist+' %' + percentageDone;
						//streamAss.controller.get('artistCaching').innerHTML = "by " + playItems[listIndexTemp].artist+' %' + percentageDone;
					}
/*
					else 
					if(pushNowPlayingList == true){
						percentageDone = Math.floor((resp.amountReceived / resp.amountTotal) * 100)
						nowPlayingListAss.controller.get('downloadStatus').innerHTML = 'Caching: ' + playItems[listIndexTemp].song
						nowPlayingListAss.controller.get('artistCaching').innerHTML = "by " + playItems[listIndexTemp].artist
						nowPlayingListAss.controller.get('percentage').innerHTML = "%" + percentageDone;
					}
*/
						//Mojo.Controller.errorDialog(resp.ticket)
						//Mojo.Controller.errorDialog('Downloading')
						Mojo.Log.info("resp.ticket: " + resp.ticket)
						downLoaded = resp.completed
						ticketHandler = resp.ticket
						Mojo.Log.info("downloaded: " +downLoaded)
						if (downLoaded){
							ticketNumArray.push(ticketHandler);
							Mojo.Log.info("ticketHandler: " + ticketHandler)
							downloadedFileSize = resp.amountTotal//resp.size
							Mojo.Log.info("playItems[listIndexTemp].url: " + playItems[listIndexTemp].url)
							if (songBackup == playItems[listIndexTemp].song) {
								playItems[listIndexTemp].url = resp.target
							}
							Mojo.Log.info("playItems[listIndexTemp].url: " + playItems[listIndexTemp].url)
							Mojo.Log.info("resp.target: " + resp.target)
							this.downloadNextArt()
							//Mojo.Controller.errorDialog(resp.size)
						}
						//Mojo.Controller.errorDialog(downLoaded)
},

downloadNextArt: function(){
					Mojo.Log.info('enter downloadNextArt')
					Mojo.Log.info("playItems[listIndex].art: " + playItems[listIndex].art)
					
/*
								var url = playItems[listIndexTemp].art,		
									extension = "";
					
								if (url.length != 0) {
									var dotPos = url.lastIndexOf(".");
								if (dotPos != -1) 
									extension = url.substr(dotPos + 1).toLowerCase(); ;
								}
*/
			if(downLoadedArt == undefined){
				this.cancelDownloadNoPlay();
			}		
			
					protocolTest = playItems[listIndexTemp].art.match("http://")
					protocolTestSsl = playItems[listIndexTemp].art.match("https://")
					if (protocolTest == "http://" || protocolTestSsl == "https://") {
						downloadedAlbumArtName = playItems[listIndexTemp].album.replace(/\W/g, '').toLowerCase()
						Mojo.Log.info('downloadedAlbumArtName: ' + downloadedAlbumArtName)
						
						for (i = 0; i < downloadedAlbumArt.length; i++) {
							if (downloadedAlbumArtName == downloadedAlbumArt[i]) {
								//downloadedAlbumArtName = downloadedAlbumArt[i]
								artDownloaded = true
								break
							}
							else {
								artDownloaded = false
							}
						}
						if (artDownloaded == false) {
							Mojo.Log.info('artDownloaded:' + artDownloaded)
						imageArtRequest = imdeController.serviceRequest('palm://com.palm.downloadmanager/', {
								method: 'download',
								parameters: {
									//ticket: ticketNum,
									target: playItems[listIndexTemp].art,
									//mime: "audio/mpeg",
									targetDir: "/media/internal/.AmpachPreTmp",
									targetFilename: "art-" + downloadedAlbumArtName,
									keepFilenameOnRedirect: false,
									subscribe: true
								},
								onSuccess: function(resp){
									Mojo.Log.info('enter Download art Success')
									downloading = true
									ticketHandler = resp.ticket
									downLoadedArt = resp.completed
									Mojo.Log.info("downLoadedArt: " + downLoadedArt)
									
									if (downLoadedArt) {
										downloading = false
										downLoadedArt = ''
										Mojo.Log.info("ticketHandler Art: " + ticketHandler)
										ticketNumArray.push(ticketHandler);
										downloadedAlbumArt.push(downloadedAlbumArtName)
										playItems[listIndexTemp].art = resp.target
										Mojo.Log.info("playItems[listIndexTemp].art: " + playItems[listIndexTemp].art)
										Mojo.Log.info("resp.target: " + resp.target)
									}
									Mojo.Log.info('exit Download art Success')
								},
								onFailure: function(){
									downloading = false
									Mojo.Log.error('Download art fail')
								},
							});
						}
						else {
							Mojo.Log.info('artDownloaded: ' + artDownloaded)
							artDownloaded = false
							Mojo.Log.info('playItems[listIndex].art: ' + playItems[listIndexTemp].art)
							playItems[listIndexTemp].art = "/media/internal/.AmpachPreTmp/" + "art-" + downloadedAlbumArtName
							Mojo.Log.info('playItems[listIndex].art: ' + playItems[listIndexTemp].art)
						}
					}
},

downloadFail: function(resp){
				if (pushStreamScene == true) {
					//streamAss.controller.get('downloadStatus').innerHTML = 'failed download: ' + resp.completionStatusCode
					//streamAss.controller.get('artistCaching').innerHTML = "";
					//streamAss.controller.get('percentage').innerHTML = "";
				}
/*
				else 
					if (pushNowPlayingList == true) {
						nowPlayingListAss.controller.get('downloadStatus').innerHTML = 'failed download: ' + resp.completionStatusCode
						nowPlayingListAss.controller.get('artistCaching').innerHTML = "";
						nowPlayingListAss.controller.get('percentage').innerHTML = "";
					}
*/
				percentageDone = 'fail'
				Mojo.Log.error('Stream: failed download: '+resp.completionStatusCode)
},

cancelDownloadNoPlay: function(event){	
				imdeController.serviceRequest('palm://com.palm.downloadmanager/', {
			 				method: 'cancelDownload', 
			 				parameters: {
								ticket: ticketHandler
			 			},
			  				onSuccess : function(){
											Mojo.Log.info('Enter cancelDownloadNoPlay Success')
													downloading = false
											Mojo.Log.info('Exit cancelDownloadNoPlay Success')
										},
			 				onFailure : function(){
											Mojo.Log.info('Enter cancelDownloadNoPlay FAIL')
													downloading = false
											Mojo.Log.error('Exit cancelDownloadNoPlay FAIL')
										}
			 	});
},

cancelDownload: function(event){	
					imdeController.serviceRequest('palm://com.palm.downloadmanager/', {
			 				method: 'cancelDownload', 
			 				parameters: {
								ticket: ticketHandler
			 			},
			  				onSuccess : cancelSuccessHandler,
			 				onFailure : cancelFailHandler
			 		});
},

cancelSuccess: function(event){	
					downloading = false
					Mojo.Log.info('Cancel download success')
					if (pushStreamScene == true) {
						//streamAss.controller.get('downloadStatus').innerHTML = "Download Canceled"
						//streamAss.controller.get('artistCaching').innerHTML = ""
						//streamAss.controller.get('percentage').innerHTML = "";
						streamAss.disableMenu();
						streamAss.progressModel.progress = 0;
						streamAss.controller.modelChanged(streamAss.progressModel)
					}
/*
					else 
						if (pushNowPlayingList == true) {
							nowPlayingListAss.controller.get('downloadStatus').innerHTML = 'Download Canceled'
							nowPlayingListAss.controller.get('artistCaching').innerHTML = "";
							nowPlayingListAss.controller.get('percentage').innerHTML = "";
						}
*/
					//timeout=setTimeout("audioAss.playSong()",500);
					//streamAss.displayStreamInfo();
					audioAss.playSong();
				//deleteTicket++
},

cancelFail: function(event){
					downloading = false
					Mojo.Log.error('Cancel Download Failed')
					if (pushStreamScene == true) {						
						//streamAss.controller.get('downloadStatus').innerHTML = "Download Cancel Fail"
						//streamAss.controller.get('artistCaching').innerHTML = ""
						//streamAss.controller.get('percentage').innerHTML = "";
						streamAss.disableMenu();
						streamAss.progressModel.progress = 0;
						streamAss.controller.modelChanged(streamAss.progressModel)
					}
/*
					else 
						if (pushNowPlayingList == true) {
							nowPlayingListAss.controller.get('downloadStatus').innerHTML = 'Download Cancel fail'
							nowPlayingListAss.controller.get('artistCaching').innerHTML = "";
							nowPlayingListAss.controller.get('percentage').innerHTML = "";
						}
*/
					audioAss.playSong()
},

deleteSongsCleanup: function(event){	
			if (downloading == true) {
				this.cancelDownloadNoPlay();
			}
			for (i = 0; i < ticketNumArray.length; i++) {
				imdeController.serviceRequest('palm://com.palm.downloadmanager/', {
					method: 'deleteDownloadedFile',
					parameters: {
						ticket: ticketNumArray[i]
					},
					onSuccess: function(){
						Mojo.Log.info('Delete cleanup success')
					},
					onFailure: function(){
						Mojo.Log.info('Delete cleanup fail')
					}
				});
			}
},

deleteSongs: function(event){
			if (downloading == true) {
				this.cancelDownloadNoPlay();
			}
			for (i = 0; i < ticketNumArray.length; i++) {
				imdeController.serviceRequest('palm://com.palm.downloadmanager/', {
					method: 'deleteDownloadedFile',
					parameters: {
						ticket: ticketNumArray[i]
					},
					onSuccess: function(){
						Mojo.Log.info('Delete cleanup success')
					},
					onFailure: function(){
						Mojo.Log.info('Delete cleanup fail')
					}
				});
			}
/*
				if (downloading == true) {
					this.cancelDownloadNoPlay();
				}
				index = 0
				this.deleteSong();
*/
},

deleteSong: function(event){
					Mojo.Log.info('enter deleteSong')
					Mojo.Log.info('ticketNumArray[index] + index: '+ticketNumArray[index]+', '+index)
					//Mojo.Controller.errorDialog("AmpachPretemp"+listIndex+".mp3"+', '+deleteTicket)
						imdeController.serviceRequest('palm://com.palm.downloadmanager/', {
							method: 'deleteDownloadedFile',
							parameters: {
								ticket: ticketNumArray[index]
							},
							onSuccess: deleteSuccessHandler,
							onFailure: deleteFailHandler
						});
},

deleteSuccess: function(event){
					Mojo.Log.info('Delete success ticket: '+event.ticket)
					if (index >= ticketNumArray.length - 1) {
						ticketNumArray.length = 0
						downloadedAlbumArt.length = 0
					}else{
						index++
						this.deleteSong();
					}
					//deleteTicket++
},

deleteFail: function(event){
					Mojo.Log.error('Delete fail ticket: '+event.ticket)
					Mojo.Log.error('Delete fail code: '+event.errorCode)
					if (index >= ticketNumArray.length - 1) {
						ticketNumArray.length = 0
						downloadedAlbumArt.length = 0
					}else{
						index++
						this.deleteSong();
					}
},

notification: function(event){
					Mojo.Log.info("enter StreamAssistant.prototype.notification")
					skipped = false	
					decodeRefresh = false
/*
					if (pushStreamScene == true) {
						streamAss.controller.get('error').hide();
					}else 
*/
						if (pushNowPlayingList == true) {
							nowPlayingListAss.controller.get('error').hide();
						}
						//audio.play()
						//downLoaded = undefined
						//streamAss.controller.get('debug').innerHTML = 'Current Audio Src: ' + playItems[listIndex].url
						
					Mojo.Log.info('currentAudio.currentTime = '+currentAudio.currentTime)
					if (currentAudio.currentTime < 5 || playItems[listIndexTemp].currentTime != undefined) {
						Mojo.Log.info('currentAudio.currentTime < 5 || playItems[listIndexTemp].currentTime != undefined: '+currentAudio.currentTime+', '+playItems[listIndexTemp].currentTime)
						if (stageDeactivated == true) {
							Mojo.Log.info('stageDeactivated = '+stageDeactivated)
							if (notify == 'On') {
								Mojo.Log.info('notify = '+notify)
								Mojo.Log.info('notificationOpen: ' + notificationOpen)
								notificationOpen = true
								Mojo.Log.info('notification listIndex: ' + listIndex + ' listIndexTemp: ' + listIndexTemp)
								Mojo.Controller.getAppController().showBanner(playItems[listIndex].song + ', by ' + playItems[listIndex].artist, {
									source: 'notification'
								});
								Mojo.Log.info('notificationOpen: ' + notificationOpen)
								setTimeout(function(){
									notificationOpen = false
									Mojo.Log.info('notificationOpen: ' + notificationOpen)
								}, 2000)
							}
						}
						Mojo.Log.info('scrobble = '+scrobble)
						if (scrobble == 'On') {
							songDuration = Math.floor(currentAudio.duration / 1)
							Mojo.Log.info('songDuration = '+songDuration)
							artistName = playItems[listIndex].artist.replace("&", "and");
							trackName = playItems[listIndex].song.replace("&", "and");
							albumName = playItems[listIndex].album.replace("&", "and");
							source = "P"
							rating = ""
							tracknumber = ""
							musicBrainz = ""
							imdeController.serviceRequest('palm://com.palm.systemservice/time', {
								method: "getSystemTime",
								onComplete: function(transport){
									lastfmTimeAtPlay = transport.utc
								},
								onFailure: function(){
									Mojo.Log.error("scrob get time fail")
								}
							});
							if (lastfmLoggedIn == true && internet == true) {
								streamAss.setLastfmNowPlaying()
							}
						}
					}
},

error: function(event){
						Mojo.Log.info('Enter audioAss.error')
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
						errorCode = currentAudio.error.code
						if (timerID) {
							clearInterval(timerID);
						}
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
								imdeController.serviceRequest("palm://com.palm.audio/systemsounds", {
									    method: "playFeedback",
									    parameters: {
									        name: "error_01" 	
									    },
								});
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
								imdeController.serviceRequest("palm://com.palm.audio/systemsounds", {
									    method: "playFeedback",
									    parameters: {
									        name: "error_02" 	
									    },
								});
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
								
								if(decodeRefresh == false){
									decodeRefresh = true
									audioPlaying = false
									loginRefresh = true
									Mojo.Controller.getAppController().showBanner('MEDIA_ERR_DECODE retrying', {
										source: 'notification'
									});
/*
									newSongXmlUrl = serverUrl + "/server/xml.server.php?action=url_to_song&url=" + playItems[listIndex].urlBackup;
									Mojo.Log.info('newSongXmlUrl: '+newSongXmlUrl);
									songRequest = new Ajax.Request(newSongXmlUrl, {
										method: "get",
										evalJSON: "false",
										onSuccess: function(transport){
											var response = transport.responseText || "no response text";
											Mojo.Log.info(response);
											var songs = transport.responseXML.getElementsByTagName('song');
											Mojo.Log.info('songs.length: '+songs.length);
											newSong = [];
											for (i = 0; i < songs.length; i++) {
												newSong[i] = {
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
												}
												convert = Math.floor(newSong[i].time / 60);
												convert2 = newSong[i].time % 60;
												convertString = convert2.toString()
												if (convertString[1] == "." || convertString[1] == undefined) {
													convertSecs = "0" + convertString[0]
												}
												else {
													convertSecs = convertString[0] + convertString[1]
												}
												
												newSong[i].time = convert + ":" + convertSecs;
											}
												playItems[listIndex] = newSong[0]
												Mojo.Log.info("playItems[listIndex].url: "+playItems[listIndex].urlBackup+ ", newSong[0].url: "+newSong[0].url);
												audioAss.setupPlaySong()
										},
										onFailure: function(){
											Mojo.Log.error('get song fail')
										}
									})
*/
									loginAss.connectionTest()
								}else{
									Mojo.Controller.errorDialog('MEDIA_ERR_DECODE -- An error of some description occurred while decoding the media resource, after the resource was established to be usable.')
									imdeController.serviceRequest("palm://com.palm.audio/systemsounds", {
									    method: "playFeedback",
									    parameters: {
									        name: "error_03" 	
									    }
								});
								}
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
								
								imdeController.serviceRequest("palm://com.palm.audio/systemsounds", {
									    method: "playFeedback",
									    parameters: {
									        name: "error_01" 	
									    }
								});
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
								imdeController.serviceRequest("palm://com.palm.audio/systemsounds", {
									    method: "playFeedback",
									    parameters: {
									        name: "error_02" 	
									    }
								});
							//}
						}
					Mojo.Log.info('Exit audioAss.error')
},

playPauseSong: function(){
						if (!currentAudio.paused) {
							currentAudio.pause();
						}
						else 
							if (currentAudio.paused) {
								currentAudio.play();
/*
								if (audioOnePlaying == true) {
									this.audioOneSongTracker();
								}else{
									this.audioTwoSongTracker();
								}
*/
							}
	Mojo.Log.info('currentAudio.paused: '+currentAudio.paused)
},

pauseMenuUpdate: function(){
						clearInterval(timerID);
						clearTimeout(trackerTimeout)
					if (pushStreamScene == true) {	
							streamAss.cmdMenuModel.items[2] = streamAss.playCmdMenuModel ;
							streamAss.controller.modelChanged(streamAss.cmdMenuModel);
					}
					if(pushPlayerDash == true){	
						playerDashAss.controller.get('playPause').innerHTML = "<img src=" + Mojo.appPath + "images/dashBoard-play.png  width=25 height=23></img>"
					}
/*
					else if (pushNowPlayingList == true) {
							nowPlayingListAss.cmdMenuModel.items[2] = streamAss.playCmdMenuModel ;
							nowPlayingListAss.controller.modelChanged(streamAss.cmdMenuModel);
					}
*/
},

playMenuUpdate: function(){
					if (pushStreamScene == true) {
						streamAss.cmdMenuModel.items[2] = streamAss.pauseCmdMenuModel;
						streamAss.controller.modelChanged(streamAss.cmdMenuModel);
					}
					if(pushPlayerDash == true){	
						playerDashAss.controller.get('playPause').innerHTML = "<img src=" + Mojo.appPath + "images/dashBoard-pause.png  width=25 height=23></img>"
					}
/*
					else 
						if (pushNowPlayingList == true) {
							nowPlayingListAss.cmdMenuModel.items[2] = streamAss.pauseCmdMenuModel;
							nowPlayingListAss.controller.modelChanged(streamAss.cmdMenuModel);
						}
*/
},	

countTimer: function(){
					timerID = setInterval(function(){
					if (pushStreamScene == true || pushNowPlayingList == true || dashboardActive == true) {
						convertTimer = Math.floor(currentAudio.currentTime / 60);
						convertTimer2 = currentAudio.currentTime % 60;
						convertTimerString = convertTimer2.toString()
						
						if (convertTimerString[1] == "." || convertTimerString[1] == undefined){
							convertTimerSecs = "0"+convertTimerString[0]
						}
						else{
							convertTimerSecs = convertTimerString[0]+convertTimerString[1]
						}
						if (pushPlayerDash == true) {
							playerDashAss.controller.get('timer').innerHTML = convertTimer + ":" + convertTimerSecs+"/"+convert + ":" + convertSecs
						}
						if(convert == 'NaN'){
							audioAss.timeDisplay();
						}
						//Mojo.Controller.errorDialog(convertString)
						if (pushStreamScene == true) {
							streamAss.controller.get('timer').innerHTML = convertTimer + ":" + convertTimerSecs
						}
						else 
							if (pushNowPlayingList == true) {
								nowPlayingTimeElement = nowPlayingListAss.controller.get(playItems[listIndex].uniqueTimeId)
								//Mojo.Log.info('nowPlayingTimeElement: ' + nowPlayingTimeElement)
								if (nowPlayingTimeElement != null) {
									nowPlayingTimeElement.innerHTML = convertTimer + ":" + convertTimerSecs + "/" + convert + ":" + convertSecs
								}
							}
					}
					}, 1000);
},

timeDisplay: function(){
	Mojo.Log.info('Enter audio TimeDisplay')
	Mojo.Log.info('pushStreamScene: '+pushStreamScene)
					if (pushStreamScene == true || pushNowPlayingList == true) {
						convert = Math.floor(currentAudio.duration / 60);
						convert2 = currentAudio.duration % 60;
						convertString = convert2.toString()
						//Mojo.Controller.errorDialog(convertString)
						if (convertString[1] == "." || convertString[1] == undefined) {
							convertSecs = "0" + convertString[0]
						}
						else {
							convertSecs = convertString[0] + convertString[1]
						}
						if (pushStreamScene == true) {
							Mojo.Log.info('Set pushStreamScene Time: '+pushStreamScene)
							streamAss.controller.get('duration').innerHTML = convert + ":" + convertSecs
						}
/*
						else 
							if (pushNowPlayingList == true) {
								nowPlayingListAss.controller.get('duration').innerHTML = convert + ":" + convertSecs
							}
*/
/*
						if (pushPlayerDash == true) {
							playerDashAss.controller.get('duration').innerHTML = convert + ":" + convertSecs
						}
*/
					}
					if (play == 'downloads'){
							this.setDownloadedTime();
					}
					
	Mojo.Log.info('Exit audio TimeDisplay')
},

setDownloadedTime: function(){
						if (sceneArray[listIndex].time == 'Unknown') {
							sceneArray[listIndex].time = convert + ":" + convertSecs
							sceneArray[listIndex].timeUnformatted = audio.duration
							db.add(playListName, sceneArray, function(){
								Mojo.Log.info("{stream} SUCCESS sceneArray SAVE");
							}, function(){
								Mojo.Log.error("{stream} FAIL sceneArray SAVE")
							});
						}
},

setBookmarkedTime: function(event){
	Mojo.Log.info("enter StreamAssistant.prototype.setBookmarkedTime")
	Mojo.Log.info("Book marked time: " + playItems[listIndex].currentTime);
//if (playItems[listIndex].currentTime != undefined) {
	//audio.removeEventListener('canplay', setBookmarkedTimeHandler);
	currentAudio.pause()
	setBookMark = setInterval(function(){
		Mojo.Log.info("currentAudio.readyState: " + currentAudio.readyState);
		if (currentAudio.readyState >= 4) {
			//Mojo.Log.info("setBookMark: " + setBookMark);
			clearInterval(setBookMark)
			//Mojo.Log.info("setBookMark: " + setBookMark);
			currentAudio.currentTime = playItems[listIndex].currentTime
			currentAudio.play();
			if (pushNowPlayingList == true) {
				if (listIndex == listIndexTemp) {
					nowPlayingListAss.controller.get(playItems[listIndex].uniqueProgressId).innerHTML = ''
				}
				else {
					nowPlayingListAss.controller.get(playItems[listIndexTemp].uniqueProgressId).innerHTML = ''
				}
			}
			Mojo.Log.info("Book marked time set: " + playItems[listIndex].currentTime);
		}
	}, 1000)
//}
	Mojo.Log.info("exit StreamAssistant.prototype.setBookmarkedTime")
},

rewrite: function(){
					Mojo.Log.info('Enter rewrite')
				        for (i = 0; i < playItems.length; i++) {
				                //Mojo.Log.info('input art:  '+playItems[i].art)	
				                protocolTest = playItems[i].art.match("http://")
				                protocolTestSsl = playItems[i].art.match("https://")
				                if (protocolTest == "http://" || protocolTestSsl == "https://") {
				                    //art url
				                    serverIndexArt = playItems[i].art.indexOf('image.php?')
				                    authIndexArt = playItems[i].art.indexOf('auth=')
				                    oidIndexArt = playItems[i].art.indexOf('&name=')
				                    urlIdArt = playItems[i].art.slice(serverIndexArt, authIndexArt)
				                    urlSecondArt = playItems[i].art.slice(oidIndexArt)
				                    playItems[i].artBackup = "http://" + server + streamingPort + "/" + directory + "/" + urlIdArt + "auth=" + token + urlSecondArt
				                    playItems[i].art = "http://" + server + streamingPort + "/" + directory + "/" + urlIdArt + "auth=" + token + urlSecondArt
				                }
				            	//Mojo.Log.info('output art: '+playItems[i].art)
				            //if (playItems[i].source == 'savedPlaylist') {
				            	Mojo.Log.info('input url: '+playItems[i].url)
				                protocolTest = playItems[i].url.match("http://")
				                protocolTestSsl = playItems[i].url.match("https://")
				                if (protocolTest == "http://" || protocolTestSsl == "https://") {
				                    //mp3 urls
				                    oidIndex = playItems[i].url.indexOf('&oid=')
				            		//Mojo.Log.info('oidIndex: '+oidIndex)
				                    urlSecond = playItems[i].url.slice(oidIndex)
				            		//Mojo.Log.info('urlSecond: '+urlSecond)
									namePos = urlSecond.indexOf("&name=");
				            		//Mojo.Log.info('namePos: '+namePos)
									urlSecondNoExtenze = urlSecond.slice(0, namePos)
				            		//Mojo.Log.info('urlSecondNoExtenze: '+urlSecondNoExtenze)
									if (ampacheVersion == '3.5.2' || ampacheVersion == '3.5.3') {
										playItems[i].urlBackup = "http://" + server + streamingPort + "/" + directory + '/play/index.php?sid=' + token + urlSecond
										playItems[i].url = "http://" + server + streamingPort + "/" + directory + '/play/index.php?sid=' + token + urlSecondNoExtenze.replace(/\s+/g, '%20')
									}
									else {
										playItems[i].urlBackup = "http://" + server + streamingPort + "/" + directory + '/play/index.php?ssid=' + token + urlSecond
										playItems[i].url = "http://" + server + streamingPort + "/" + directory + '/play/index.php?ssid=' + token + urlSecondNoExtenze.replace(/\s+/g, '%20')
									}
				                }
								playItems[i].uniqueId = playItems[i].song.replace(/\W/g, '')+i
								playItems[i].uniqueProgressId = playItems[i].song.replace(/\W/g, '')+i+'Progress'
								playItems[i].uniqueTimeId = playItems[i].song.replace(/\W/g, '')+i+'Time'
				            	Mojo.Log.info('output url: '+playItems[i].url)
				            //}
				       }
					Mojo.Log.info('Exit rewrite')
},

addToNowPlaying: function(element){   
							//Mojo.Log.info('input art:  '+element.art)	
				                protocolTest = element.art.match("http://")
				                protocolTestSsl = element.art.match("https://")
				                if (protocolTest == "http://" || protocolTestSsl == "https://") {
				                    //art url
				                    serverIndexArt = element.art.indexOf('image.php?')
				                    authIndexArt = element.art.indexOf('auth=')
				                    oidIndexArt = element.art.indexOf('&name=')
				                    urlIdArt = element.art.slice(serverIndexArt, authIndexArt)
				                    urlSecondArt = element.art.slice(oidIndexArt)
				                    element.art = "http://" + server + streamingPort + "/" + directory + "/" + urlIdArt + "auth=" + token + urlSecondArt
				                }
				            	//Mojo.Log.info('output art: '+element.art)
				            //if (playItems[i].source == 'savedPlaylist') {
				            	//Mojo.Log.info('input url: '+element.url)
				                protocolTest = element.url.match("http://")
				                protocolTestSsl = element.url.match("https://")
				                if (protocolTest == "http://" || protocolTestSsl == "https://") {
									//mp3 urls
									oidIndex = element.url.indexOf('&oid=')
									//Mojo.Log.info('oidIndex: '+oidIndex)
									urlSecond = element.url.slice(oidIndex)
									//Mojo.Log.info('urlSecond: '+urlSecond)
									namePos = urlSecond.indexOf("&name=");
									//Mojo.Log.info('dotPos: '+dotPos)
									urlSecondNoExtenze = urlSecond.slice(0, namePos)
									//Mojo.Log.info('urlSecondNoExtenze: '+urlSecondNoExtenze)
									if (ampacheVersion == '3.5.2' || ampacheVersion == '3.5.3') {
										element.urlBackup = "http://" + server + streamingPort + "/" + directory + '/play/index.php?sid=' + token + urlSecond
										element.url = "http://" + server + streamingPort + "/" + directory + '/play/index.php?sid=' + token + urlSecondNoExtenze.replace(/\s+/g, '%20')
									}
									else {
										element.urlBackup = "http://" + server + streamingPort + "/" + directory + '/play/index.php?sid=' + token + urlSecond
										element.url = "http://" + server + streamingPort + "/" + directory + '/play/index.php?ssid=' + token + urlSecondNoExtenze.replace(/\s+/g, '%20')
									}
								}
				            	//Mojo.Log.info('output url: '+element.url)
								element.uniqueId = element.song.replace(/\W/g, '')+playItems.length
								element.uniqueProgressId = element.song.replace(/\W/g, '')+i+'Progress'
								element.uniqueTimeId = element.song.replace(/\W/g, '')+i+'Time'
							playItems.push(element)
},

updateUrls: function(event){
				Mojo.Log.info('UPDATEURLS: enter')
				this.rewrite();
				if (audioPlaying == true) {
						Mojo.Log.info('UPDATEURLS: audioPlaying == true')
						//audio.src=playItems[listIndex].url
						if (pushStreamScene == true) {
							streamAss.progressModel.progress = 0
							streamAss.controller.modelChanged(streamAss.progressModel)
						}
						if(Math.floor((currentAudio.currentTime/currentAudio.duration)*100) >= setBufferPercentage){
							audioAss.loadNextSong();
						}
				}else if(decodeRefresh == true){
						Mojo.Log.info('UPDATEURLS: audio.paused, restarting load')
						this.setupPlaySong();
				}
				Mojo.Log.info('UPDATEURLS: exit')
},

bookMarkNowPlaying: function(){
favoritesArray.push({
					type: 'song',
					song: playItems[listIndex].song,
					songId: playItems[listIndex].songId,
					time: playItems[listIndex].time,
					timeUnformatted: parseFloat(playItems[listIndex].timeUnformatted),
					artist: playItems[listIndex].artist,
					album: playItems[listIndex].album,
					url: playItems[listIndex].urlBackup,
					size: playItems[listIndex].size,
					art: playItems[listIndex].artBackup,
					image: "images/song50px.png",
					textName: playItems[listIndex].song,
					textArtist: playItems[listIndex].artist,
	})
		db.add('favList', favoritesArray, function(){
/*
			searchAss.favoritesModel.items = favoritesArray;
			searchAss.controller.modelChanged(searchAss.favoritesModel);
*/
			Mojo.Log.info("SUCCESS SAVE");
			}, function(){ Mojo.Log.error("FAIL SAVE")});	
},

bookMarkSong: function(element){
	
favoritesArray.push({
					type: 'song',
					song: element.song,
					songId: element.songId,
					time: element.time,
					timeUnformatted: parseFloat(element.timeUnformatted),
					artist: element.artist,
					album: element.album,
					url: element.url,
					size: element.size,
					art: element.art,
					image: "images/song50px.png",
					textName: element.song,
					textArtist: element.artist,
	})
		db.add('favList', favoritesArray, function(){
/*
			searchAss.favoritesModel.items = favoritesArray;
			searchAss.controller.modelChanged(searchAss.favoritesModel);
*/
			Mojo.Log.info("SUCCESS SAVE");
			}, function(){ Mojo.Log.error("FAIL SAVE")});	
},

bookMarkSongPosition: function(){
	bookedMarkedTime = currentAudio.currentTime
	convertBookmarkedTimer = Math.floor(bookedMarkedTime / 60);
	convertBookmarkedTimer2 = bookedMarkedTime % 60;
	convertBookmarkedTimerString = convertBookmarkedTimer2.toString()
	//Mojo.Controller.errorDialog(convertString)
	if (convertBookmarkedTimerString[1] == "." || convertBookmarkedTimerString[1] == undefined){
		convertBookmarkedTimerSecs = "0"+convertBookmarkedTimerString[0]
	}
	else{
		convertBookmarkedTimerSecs = convertBookmarkedTimerString[0]+convertBookmarkedTimerString[1]
	}
	bookmarkedTimeFormatted = convertBookmarkedTimer + ":" + convertBookmarkedTimerSecs
favoritesArray.push({
					type: 'song',
					song: playItems[listIndex].song,
					songId: playItems[listIndex].songId,
					time: playItems[listIndex].time,
					timeUnformatted: parseFloat(playItems[listIndex].timeUnformatted),
					artist: playItems[listIndex].artist,
					album: playItems[listIndex].album,
					url: playItems[listIndex].urlBackup,
					size: playItems[listIndex].size,
					art: playItems[listIndex].artBackup,
					image: "images/song50px.png",
					textName: playItems[listIndex].song +', '+bookmarkedTimeFormatted,
					textArtist: playItems[listIndex].artist,
					currentTime: bookedMarkedTime,
	})
		db.add('favList', favoritesArray, function(){
			searchAss.favoritesModel.items = favoritesArray;
			searchAss.controller.modelChanged(searchAss.favoritesModel);
			Mojo.Log.info("SUCCESS SAVE");
			}, function(){ Mojo.Log.error("FAIL SAVE")});
},

clearTimer: function(){
				clearInterval(timerID);
		/*
				sec = 0
				min = 0
		*/
		if (pushStreamScene == true) {
				streamAss.controller.get('timer').innerHTML = "0:00"
				streamAss.controller.get('duration').innerHTML = "0:00"
		}
/*
		else if(pushNowPlayingList == true){
				nowPlayingListAss.controller.get('timer').innerHTML = "0:00"
				nowPlayingListAss.controller.get('duration').innerHTML = "0:00"
		}
*/
},

searchLyrics: function(event){
	songName = playItems[listIndex].song.replace(/\W/g, '%20')
	artistName = playItems[listIndex].artist.replace(/\W/g, '%20')
	imdeController.serviceRequest("palm://com.palm.applicationManager", {
  		method: "open",
 		 parameters:  {
      		id: 'com.palm.app.browser',
     		params: {
          		target: "http://www.google.com/m/search?client=ms-palm-webOS&channel=iss&q="+artistName+"%20"+songName+"%20lyrics"
      		}
  		}
	});	
},

stop: function(event){
					Mojo.Log.info('Enter audioAss.stop')
					clearTimeout(trackerTimeout)
					clearInterval(setBookMark)
					clearInterval(timerID);
					audio.removeEventListener("pause", pauseMenuUpdatehandler);
					//audio.removeEventListener("play", playModeMenuUpdateHandler);
					audio.removeEventListener("play", countTimerBind);
					audio.removeEventListener("play", timeDisplayhandler);
					audio.removeEventListener("play", notificationHandler);
					audio.removeEventListener("play", playMenuUpdatehandler);
					audio.removeEventListener("play", songTrackerHandlerOne);
					//audio.removeEventListener("timeupdate", timeUpdateHandler);
					audio.removeEventListener('error', errorhandler);
					audio.removeEventListener('progress', songProgressHandler);
					audio.removeEventListener('load', loadHandler);
					audio.removeEventListener('ended', playNextSongHandler);	
					audio2.removeEventListener("pause", pauseMenuUpdatehandler);
					audio2.removeEventListener("play", playMenuUpdatehandler);
					audio2.removeEventListener("play", countTimerBind);
					audio2.removeEventListener("play", timeDisplayhandler);
					audio2.removeEventListener("play", notificationHandler);
					audio2.removeEventListener("play", songTrackerHandlerOne);
					//audio2.removeEventListener("timeupdate", timeUpdateHandler);
					//audio.removeEventListener("play", playModeMenuUpdateHandler);
					audio2.removeEventListener('error', errorhandler);
					audio2.removeEventListener('progress', songProgressHandler);
					audio2.removeEventListener('load', loadHandler);
					audio2.removeEventListener('ended', playNextSongHandler);
					//clearInterval(songPosition)
					if (pushPlayerDash == true) {
						Mojo.Log.info('playerDashAss.controller.window.close')
						playerDashAss.controller.window.close();
					}
					if (pushNowPlayingList == true) {
						Mojo.Log.info('nowPlayingListAss.controller.stageController.popScene')
						nowPlayingListAss.controller.stageController.popScene();
					}
					else 
						if(pushStreamScene == true){
						Mojo.Log.info('streamAss.controller.stageController.popScene')
						streamAss.controller.stageController.popScene();
					}
					play = ''
					endOfPlaylist = false
					audioPlaying = false
					loading = false
					//this.clearTimer();
					//playMode = 'standard';
					listIndex = 0
					playItems.length = 0;
					downloadedAlbumArt.length = 0
					
					audio2.src = Mojo.appPath+'stop.mp3';
					audio2.load()
					audio.src = Mojo.appPath+'stop.mp3';
					audio.load()
					
					if (ticketNumArray.length > 0) {
						this.deleteSongs();
					}
					if (!downLoadedArt) {
						this.cancelDownloadNoPlay();
					}
					
					clearInterval(songPosition)
					Mojo.Log.info('Exit audioAss.stop')
},

cleanup: function(event){
					Mojo.Log.info('Enter audioAss.cleanup')
					//if (setBufferPercentage != 0) {
						clearTimeout(trackerTimeout)
					//}
					clearInterval(setBookMark)
					clearInterval(timerID);
					
					this.deleteSongs();
					if (!downLoadedArt) {
						this.cancelDownloadNoPlay();
					}
					
					//audio events
					Mojo.Log.info("cleanup remove audio event listeners");
					audio.removeEventListener("pause", pauseMenuUpdatehandler);
					//audio.removeEventListener("play", playModeMenuUpdateHandler);
					audio.removeEventListener("play", countTimerBind);
					audio.removeEventListener("play", timeDisplayhandler);
					audio.removeEventListener("play", notificationHandler);
					//audio.removeEventListener("play", playMenuUpdatehandler);
					audio.removeEventListener("play", songTrackerHandlerOne);
					//audio.removeEventListener("timeupdate", timeUpdateHandler);
					audio.removeEventListener('error', errorhandler);
					audio.removeEventListener('progress', songProgressHandler);
					audio.removeEventListener('load', loadHandler);
					audio.removeEventListener('ended', playNextSongHandler);	
					audio.removeEventListener('load', loadNextSongHandler);
					audio2.removeEventListener("pause", pauseMenuUpdatehandler);
					audio2.removeEventListener("play", playMenuUpdatehandler);
					audio2.removeEventListener("play", countTimerBind);
					audio2.removeEventListener("play", timeDisplayhandler);
					audio2.removeEventListener("play", notificationHandler);
					audio2.removeEventListener("play", songTrackerHandlerOne);
					//audio2.removeEventListener("timeupdate", timeUpdateHandler);
					//audio.removeEventListener("play", playModeMenuUpdateHandler);
					audio2.removeEventListener('error', errorhandler);
					audio2.removeEventListener('progress', songProgressHandler);
					audio2.removeEventListener('load', loadHandler);
					audio2.removeEventListener('ended', playNextSongHandler);	
					audio2.removeEventListener('load', loadNextSongHandler);
					
					if (endOfPlaylist == false) {
						if (scrobble == 'On') {
							if (currentAudio.currentTime > currentAudio.duration / 2 || currentAudio.currentTime > 260) {
								streamAss.scrobble(songDuration, artistName, trackName, lastfmTimeAtPlay, albumName, source, rating, tracknumber, musicBrainz);
							}
						}
					}
					play = ''
					endOfPlaylist = false
					audioPlaying = false
					loading = false
					//this.clearTimer();
					//playMode = 'standard';
					listIndex = 0
					playItems.length = 0;
					downloadedAlbumArt.length = 0
/*
					if (play != 'downloads') {
						playItems.length = 0;
					}
					played = false;
					playItemsBackup.length = 0
*/
					
					
					
					Mojo.Log.info('Exit audioAss.cleanup')
},

})
