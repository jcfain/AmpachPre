function AppAssistant(appController) {
	Mojo.Log.info("AppAssistant Start");
	
}




AppAssistant.prototype.setup = function() {
	Mojo.Log.info("Enter AppAssistant.prototype.setup");
	
	appAss = this;
	

	Mojo.Log.info("Exit AppAssistant.prototype.setup");
}


AppAssistant.prototype.handleLaunch = function(launchParams){
	
	Mojo.Log.info("Enter AppAssistant handleLaunch");
/*
    var cardStageProxy = this.controller.getStageProxy('search'); 
    var cardStageController = this.controller.getStageController('search'); 
    var appController = Mojo.Controller.getAppController(); 
    var dashboardStage = this.controller.getStageProxy("playerDashboard"); 
	
*/
    if (!launchParams) {
/*
		// FIRST LAUNCH 
		// Look for an existing main stage by name. 
		if (cardStageController) {
			// If it exists, just bring it to the front by focusing its window. 
			cardStageController.popScenesTo("search");
			cardStageController.window.focus();
		}
		else {
			// Create a callback function to set up the new main stage 
			// once it is done loading. It is passed the new stage controller 
			// as the first parameter. 
			var pushMainScene = function(stageController){
				stageController.pushScene('search');
			};
			var stageArguments = {
				name: 'search',
				lightweight: true
			};
			this.controller.createStageWithCallback(stageArguments, pushMainScene.bind(this), "card");
		}
*/
	}
	else {
		switch (launchParams.action) {
			// ping 
			case 'ping':
					pingUrl = serverUrl + "/server/xml.server.php?action=ping&auth=" + token;
					versionRequest = new Ajax.Request(pingUrl, {
						method: "get",
						evalJSON: "false",
						onSuccess: function(transport){
							var response = transport.responseText || "no response text";
							Mojo.Log.info(response);
							sessionExpires = transport.responseXML.getElementsByTagName("session_expire")[0].textContent;
							//searchAss.controller.get('sessionInfo').innerHTML = 'API Session Expires<br>' +sessionExpires
							Mojo.Log.info('Session Extended..ping Successful');
							//pingInterval = true
							searchAss.pingInterval()
						},
						onFailure: function(){
							searchAss.controller.get('sessionInfo').innerHTML = 'API Session Expires<br>Session not Extended..ping failed'
							Mojo.Log.error('Session not Extended..ping failed');
						}
					})
			break;
			case 'reLog':
					Mojo.Log.info('enter AppAss reLog')
					Mojo.Log.info('play:' +play)
					Mojo.Log.info('audioPlaying:' +audioPlaying)
					if (audioPlaying == false && play != 'downloads') {
						Mojo.Controller.getAppController().showBanner('Refreshing login: ' + listAccounts[currentAccount].accountName + " Please Wait...", {
							source: 'notification'
						});
						//accountsAss.clearPing()
						loginRefresh = true;
						reLogInterval = listAccounts[currentAccount].reLog
						reLogIntervalMins = listAccounts[currentAccount].reLogMin
						loginAss.connectionTest();
						//searchAss.reLogInterval();
					}
/*
					else{
						Mojo.Log.info('audio loading or downloading, retrying in 5 mins...')
						reLogInterval = '00'
						reLogIntervalMins = '05'
					}
*/
					Mojo.Log.info('exit AppAss reLog')
			break;
			case 'pushStream':
				if(pushPlayerDash == true){
					playerDashAss.controller.window.close();
				}			
					accountsAss.controller.stageController.pushScene({
							name: 'stream',
							//transition: Mojo.Transition.crossFade,
							disableSceneScroller: true
						});
				pushNowPlaying = true
			break;
			case 'pushStreamSwap':				
				if(pushPlayerDash == true){
					playerDashAss.controller.window.close();
				}		
					accountsAss.controller.stageController.swapScene({
						name: "stream",
						transition: Mojo.Transition.crossFade,
						disableSceneScroller: true
					});
				pushNowPlaying = true
			break;
		}
	}
	Mojo.Log.info("Exit AppAssistant handleLaunch");	
}
AppAssistant.prototype.pushPlayerDashboard = function(_controller){
	//thisController = _controller
	Mojo.Log.info('dashboard: '+dashboard)
	if (dashboard == 'On') {
		var appController = Mojo.Controller.getAppController();
		/*
	 var message = 0;
	 this.dashboardcount = 0;
	 this.dashboardcount = this.dashboardcount + 1;
	 var count = this.dashboardcount;
	 */
		var dashboardStage = appController.getStageProxy("playerDashboard");
		if (dashboardStage) {
			//dashboardStage.delegateToSceneAssistant("playerDashboard");
		}
		else {
			/*
		 this.dashboardcount = 1;
		 count = this.dashboardcount;
		 */
			var pushDashboard = function(stageController){
				stageController.pushScene('playerDashboard');
			};
			appController.createStageWithCallback({
				name: "playerDashboard",
				lightweight: true,
				assistant: "playerDashboard"
			}, pushDashboard, 'dashboard');
		}
	}
}
