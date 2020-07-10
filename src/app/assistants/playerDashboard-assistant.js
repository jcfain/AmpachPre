function PlayerDashboardAssistant() {
	 // playList = arr
	//document.getElementById('sceneStyle').style.backgroundImage =  "url(" + backGroundImage + ")";
	//document.getElementById('sceneStyle').style.color =  textColor;
}

PlayerDashboardAssistant.prototype.setup = function() {
	playerDashAss = this
		this.pushStreamHandler = this.pushStream.bind(this)
		this.activateStageHandler = this.activateStage.bindAsEventListener(this);
		this.deactivateStageHandler = this.deactivateStage.bindAsEventListener(this);
		this.previousHandler = this.previous.bind(this)
		this.pausePlayHandler = this.playPause.bind(this)
		this.nextHandler = this.next.bind(this)
};

PlayerDashboardAssistant.prototype.aboutToActivate = function(event){
		pushPlayerDash = true
	  	playerDashAss.upDateSongInfo();
}
PlayerDashboardAssistant.prototype.activate = function(event) {
	//pushPlayerDash = true
	  	//playerDashAss.upDateSongInfo();
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
	//Mojo.Event.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
		this.controller.listen(this.controller.get('nowPlayingArt'), Mojo.Event.tap, this.pushStreamHandler);
		this.controller.listen(this.controller.get('previous'), Mojo.Event.tap, this.previousHandler);
		this.controller.listen(this.controller.get('playPause'), Mojo.Event.tap, this.pausePlayHandler);
		this.controller.listen(this.controller.get('next'), Mojo.Event.tap, this.nextHandler);
		this.controller.listen(this.controller.stageController.document, Mojo.Event.stageActivate, this.activateStageHandler);
		this.controller.listen(this.controller.stageController.document, Mojo.Event.stageDeactivate, this.deactivateStageHandler);
/*
		setTimeout(function(){
			if(pushStreamScene == true){
				playerDashAss.controller.window.close();
			}
		},1000)
*/

};

PlayerDashboardAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
	//Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
		this.controller.stopListening(this.controller.get('nowPlayingArt'), Mojo.Event.tap, this.pushStreamHandler);
		this.controller.stopListening(this.controller.get('previous'), Mojo.Event.tap, this.previousHandler);
		this.controller.stopListening(this.controller.get('playPause'), Mojo.Event.tap, this.pausePlayHandler);
		this.controller.stopListening(this.controller.get('next'), Mojo.Event.tap, this.nextHandler);
};

PlayerDashboardAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	//Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
		pushPlayerDash = false
		this.controller.stopListening(this.controller.get('nowPlayingArt'), Mojo.Event.tap, this.pushStreamHandler);
		this.controller.stopListening(this.controller.get('previous'), Mojo.Event.tap, this.previousHandler);
		this.controller.stopListening(this.controller.get('playPause'), Mojo.Event.tap, this.pausePlayHandler);
		this.controller.stopListening(this.controller.get('next'), Mojo.Event.tap, this.nextHandler);
		this.controller.stopListening(this.controller.stageController.document, Mojo.Event.stageActivate, this.activateStageHandler);
		this.controller.stopListening(this.controller.stageController.document, Mojo.Event.stageDeactivate, this.deactivateStageHandler);
};
PlayerDashboardAssistant.prototype.pushStream = function(event){
	if (pushStreamScene == false) {
		if (pushNowPlayingList == true) {
		//this.controller.window.close();
			appAss.handleLaunch({
				action: "pushStreamSwap"
			});		
		}
		else {
		//this.controller.window.close();
			appAss.handleLaunch({
				action: "pushStream"
			});
		}
		if(stageDeactivated == true){
			window.focus()
		}
	}else{
		//this.controller.window.close();
		window.focus()
	}

}
PlayerDashboardAssistant.prototype.upDateSongInfo = function(event){
	this.controller.get('nowPlayingArt').innerHTML = '<img src=' + playItems[listIndex].art + ' style="border-style:outset; border-width:3px; float:center;" width=43 height=43>'
	this.controller.get('song').innerHTML = playItems[listIndex].song
	this.controller.get('artist').innerHTML = 'by '+playItems[listIndex].artist
	this.controller.get('next').innerHTML = "<img src=images/dashBoard-next.png  width=25 height=23></img>"
	this.controller.get('previous').innerHTML = "<img src=images/dashBoard-previous.png  width=25 height=23></img>"
	this.controller.get('playPause').innerHTML = "<img src=images/dashBoard-pause.png  width=25 height=23></img>"
}
PlayerDashboardAssistant.prototype.activateStage = function() {
    Mojo.Log.info("Dashboard stage Activation");
    //this.upDateSongInfo();
	dashboardActive = true
	this.upDatePlayPause()
};
PlayerDashboardAssistant.prototype.deactivateStage = function() {
    Mojo.Log.info("Dashboard stage Deactivation");
	dashboardActive = false
	this.upDatePlayPause()
};

PlayerDashboardAssistant.prototype.previous = function() {
	this.controller.get('previous').innerHTML = "<img src=images/dashBoard-previous-grey.png  width=25 height=23></img>"
	audioAss.previousSong();			
	setTimeout(function(){playerDashAss.controller.get('previous').innerHTML = "<img src=images/dashBoard-previous.png  width=25 height=23></img>"},500)
};
PlayerDashboardAssistant.prototype.playPause = function() {
	audioAss.playPauseSong();
	//this.upDatePlayPause()
};
PlayerDashboardAssistant.prototype.next = function() {
	this.controller.get('next').innerHTML = "<img src=images/dashBoard-next-grey.png  width=25 height=23></img>"
	audioAss.nextSong();					
	setTimeout(function(){playerDashAss.controller.get('next').innerHTML = "<img src=images/dashBoard-next.png  width=25 height=23></img>"},500)
};

PlayerDashboardAssistant.prototype.upDatePlayPause = function(){
					if(currentAudio.paused){
						//audio.play()
						playerDashAss.controller.get('playPause').innerHTML = "<img src=" + Mojo.appPath + "images/dashBoard-play.png  width=25 height=23></img>"
					}
					else
						if(!currentAudio.paused){
							//audio.pause()
							playerDashAss.controller.get('playPause').innerHTML = "<img src=" + Mojo.appPath + "images/dashBoard-pause.png  width=25 height=23></img>"
						}
					else
						if(playItems.Length >0 && audioPlaying == false){
/*
									audioAss.playSong();
									if (pushStreamScene == true) {
										streamAss.disableMenu();
									}
*/
							playerDashAss.controller.get('playPause').innerHTML = "<img src=" + Mojo.appPath + "images/dashBoard-play.png  width=25 height=23></img>"
						}
}