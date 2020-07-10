//pingInterval=false;
pingTimerID=false;
errorTextTimeout = null
function LoginAssistant() {
	  /*
if (debug == 'On'){
	  	$('debugHeader').show
	  }else{
	  	$('debugHeader').hide
	  }
*/
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		document.getElementById('scrollerId').style.height = '260px';
	}
}

LoginAssistant.prototype.setup = function(){
	loginAss = this
	//Mojo.Log.addLoggingMethodsToPrototype(Mojo.Controller.SceneController);
		

			
		this.cmdMenuModel = {
  				visible: true,
  					items: [{
    					items: [
    						{items:[{},
							{label: $L('Change Account'),icon: '',command: 'accounts', width: 190},
   							{label: $L(''), icon:'downloads', command:'downloadsNoLogin'},
							{}
							]}
    							]
  							}]
						};
		this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass:'no-fade'}, this.cmdMenuModel);
/*		this.accounts = [              
			{label:$L('Account 1'), value:"account1" 
			}, 
			{label:$L('Account 2'), value:"account2"
			}, 
			{label:$L('Account 3'), value:"account3" 
			},
			{label:$L('Account 4'), value:"account4"
			},
			{label:$L('Account 5'), value:"account5"
			},  						
			 ]
	this.selectorsModel = {currentAccount: "account1"};	
	
	this.accountPickerHandler=this.controller.get('loginAccount');
	Mojo.Event.listen(this.accountPickerHandler, Mojo.Event.propertyChange, this.handleUpdate);
		this.controller.setupWidget('loginAccount', {
		choices: this.accounts, 
		modelProperty:'currentAccount'}, 
		this.selectorsModel);*/
	
	//this.controller.setupWidget(Mojo.Menu.appMenu, accountsAttr, appMenuModel);	

//spinners
   this.controller.setupWidget("spinnerSmall",
         this.attributes = {
             spinnerSize: 'small'
         },
         this.spinnerSmallModel = {
             spinning: false 
         });		
	  this.controller.setupWidget("spinner",
         this.attributes = {
             spinnerSize: 'large'
         },
         this.model = {
             spinning: false 
         });	
		//Login Button
	//this.loginButton = this.controller.get('login');
	//this.loginBind = this.pingEvent.bind(this);
//	Mojo.Event.listen(this.loginButton, Mojo.Event.tap, this.loginBind);


		//Mojo.Controller.errorDialog(loginCreds);
			//Mojo.Controller.errorDialog('this works');

	this.getTimeFailHandler = this.getTimeFail.bind(this)		
	this.failureHandler = this.failure.bind(this)
	this.pushMainHandler = this.pushMain.bind(this)
	this.loginEventHandler = this.loginEvent.bind(this)	
	this.pingEventSuccessHandler = this.pingEventSuccess.bind(this)
	this.pingEventFailHandler = this.pingEventFail.bind(this)
}
LoginAssistant.prototype.activate = function(event){
	pushLoginScene = true
	this.connectionTest();
}
LoginAssistant.prototype.deactivate = function(event){
	pushLoginScene = false
	Mojo.Log.info('LoginAssistant.prototype.deactivate')
}
LoginAssistant.prototype.cleanup = function(event){
	pushLoginScene = false
	clearTimeout(ajaxTimeout)
	clearTimeout(errorTextTimeout)
	Mojo.Log.info('LoginAssistant.prototype.cleanup')
}
LoginAssistant.prototype.connectionTest = function(event){
  loginAss.currentScene=Mojo.Controller.stageController.activeScene();
	if(pushLoginScene == true){
		$('loginStatus').innerHTML = 'Testing Internet Connection'
	}
	//do not subscribe for initial login event.
	loginAss.currentScene.serviceRequest('palm://com.palm.connectionmanager', {
		method: 'getstatus',
		parameters: {subscribe: false},
		onSuccess: function(obj){
			internet = obj.isInternetConnectionAvailable
			wifi = obj.wifi.state
			wifiAccount = false
			ssid = obj.wifi.ssid
			wan = obj.wan.state
			wanNetwork = obj.wan.network
			originalIp = obj.wan.ipAddress
			
		
		if (accountSelected == false) {
			//Mojo.Controller.errorDialog(internet+', '+wifi);
			if (wifi == 'connected') {
				for (i = 0; i < listAccounts.length; i++) {
					Mojo.Log.info(listAccounts[i].wifi+', '+listAccounts[i].ssid == ssid)
					if (listAccounts[i].wifi == 'On' && listAccounts[i].ssid == ssid) {
						Mojo.Log.info(ssid);
						currentAccount = i
						break;
					}else{
						currentAccount = 0
					}
				}
			}else{
				currentAccount = 0
			}
		}else{
			accountSelected = false	
		}
		if (wifi == 'connected') {
			originalState = 'wifi'
		}else{
			originalState = 'wan'
		}
				if (internet == true) {
					if(pushLoginScene == true){
						$('loginStatus').innerHTML = 'Internet Connected'
					}
					Uname = listAccounts[currentAccount].username;
					Pword = listAccounts[currentAccount].password;
					directory = listAccounts[currentAccount].directory
					port = listAccounts[currentAccount].connectionPort
					streamingPort = listAccounts[currentAccount].port
					server = listAccounts[currentAccount].address
					pingInterval = listAccounts[currentAccount].ping
					lastFmUserName = listAccounts[currentAccount].lastFmUN
					lastFmPassWord = listAccounts[currentAccount].lastFmPW
					lastFmAuthToken = loginAss.MD5(lastFmUserName + loginAss.MD5(lastFmPassWord))
					if (blueToothToggled == false) {
						blueToothControls = listAccounts[currentAccount].btC
					}
					if (headphoneToggled == false) {
						headPhoneControls = listAccounts[currentAccount].hpC
					}
					notify = listAccounts[currentAccount].notify
					if (scrobbleToggled == false) {
						scrobble = listAccounts[currentAccount].scrobble
					}
					randomSongFetch = listAccounts[currentAccount].randomSongFetch
					reLogInterval = listAccounts[currentAccount].reLog
					reLogIntervalMins = listAccounts[currentAccount].reLogMin
					backGroundImage = listAccounts[currentAccount].backGroundImage
					backGroundImageNP = listAccounts[currentAccount].backGroundImageNP
					dashboard = listAccounts[currentAccount].dashboard
        			textColor = listAccounts[currentAccount].textColor
        			textColorNP = listAccounts[currentAccount].textColorNP
					setBufferPercentage = listAccounts[currentAccount].bufferPercentage
					listAlbumsArt = []
					loginAss.pingEvent();
					originalInternetState = true
				}
				else {
					Uname = listAccounts[currentAccount].username;
					Pword = listAccounts[currentAccount].password;
					directory = listAccounts[currentAccount].directory
					port = listAccounts[currentAccount].connectionPort
					streamingPort = listAccounts[currentAccount].port
					server = listAccounts[currentAccount].address
					notify = listAccounts[currentAccount].notify
					if (scrobbleToggled == false) {
						scrobble = listAccounts[currentAccount].scrobble
					}
					pingInterval = listAccounts[currentAccount].ping
					lastFmUserName = listAccounts[currentAccount].lastFmUN
					lastFmPassWord = listAccounts[currentAccount].lastFmPW
					lastFmAuthToken = loginAss.MD5(lastFmUserName + loginAss.MD5(lastFmPassWord))
					if (blueToothToggled == false) {
						blueToothControls = listAccounts[currentAccount].btC
					}
					if (headphoneToggled == false) {
						headPhoneControls = listAccounts[currentAccount].hpC
					}
					randomSongFetch = listAccounts[currentAccount].randomSongFetch
					reLogInterval = listAccounts[currentAccount].reLog
					reLogIntervalMins = listAccounts[currentAccount].reLogMin
					backGroundImage = listAccounts[currentAccount].backGroundImage
					backGroundImageNP = listAccounts[currentAccount].backGroundImageNP
					dashboard = listAccounts[currentAccount].dashboard
        			textColor = listAccounts[currentAccount].textColor
        			textColorNP = listAccounts[currentAccount].textColorNP
					setBufferPercentage = listAccounts[currentAccount].bufferPercentage
					listAlbumsArt = []
					if (pushLoginScene == true) {
						$('loginStatus').innerHTML = 'No internet connection.';
					}
					loginAss.cmdMenuModel.items = [{
						items: [{}, {
							label: $L(''),
							icon: 'downloads',
							command: 'downloadsNoLogin'
						}, {}]
					}]
					loginAss.controller.modelChanged(loginAss.cmdMenuModel)
					originalInternetState = false
				}
if (lastFmPassWord != "" && lastFmUserName != "") {
	appMenuModel = {
		visible: true,
		items: [{
			label: "Now Playing",
			command: 'stream'
		},	{
			label: "Now Playing List",
			command: 'nowPlayingList'
		},	{
			label: "Headphone Controls: "+headPhoneControls,
			command: 'toggleHeadPhoneControls'
		},	{
			label: "Scrobbling: "+scrobble,
			command: 'toggleScrobble'
		},	{
			label: "Change Account",
			command: 'accounts'
		},	{
			label: "Refresh Login",
			command: 'reLog'
		},  {
			label: "Last.fm Status", 
			command: 'lastFmStatus'
		},	{
			label: "Downloads",
			command: 'downloads'
		},	{
			label: "Server Info",
			command: 'info'
		},	{
			label: "About",
			command: 'do-myAbout'
		}, ]
	};
}else{
	appMenuModel = {
		visible: true,
		items: [{
			label: "Now Playing",
			command: 'stream'
		},	{
			label: "Now Playing List",
			command: 'nowPlayingList'
		},	{
			label: "Headphone Controls: "+headPhoneControls,
			command: 'toggleHeadPhoneControls'
		},	{
			label: "Change Account",
			command: 'accounts'
		},	{
			label: "Refresh Login",
			command: 'reLog'
		},	{
			label: "Downloads",
			command: 'downloads'
		},	{
			label: "Server Info",
			command: 'info'
		},	{
			label: "About",
			command: 'do-myAbout'
		}, ]
	};
}
		},
		onFailure: function(err){
			Mojo.Controller.errorDialog('Failed internet test: ' + err.errorText)
		}
	});
}
LoginAssistant.prototype.pingEvent = function(event){
		//Mojo.Log.info("Uname: "+Uname+" directory: "+directory+" port: "+port+" streamingPort: "+streamingPort+" notify: "+notify+" pingInterval: "+pingInterval+" lastFmUserName: "+lastFmUserName+" server: "+server)
		serverUrl = listAccounts[currentAccount].protocol + listAccounts[currentAccount].address + listAccounts[currentAccount].connectionPort + '/' + listAccounts[currentAccount].directory
		
		Mojo.Log.info('enter pingEvent');
		ajaxTimeout = setTimeout("loginAss.errDialog('TIME OUT: A unknown error occured. Check your firewall settings or connection port in account settings.')", 30000);
		//Mojo.Controller.errorDialog(loginCreds);
		pingUrl = serverUrl + "/server/xml.server.php?action=ping"
		if(pushLoginScene == true){
			$('loginStatus').innerHTML = 'Enter Ping Event'
			$('accountname').innerHTML = serverUrl + ',<br>Username: ' + Uname;
			loginAss.controller.get('spinnerSmall').mojo.start();
		}
		//Mojo.Controller.errorDialog(pingUrl);
		versionRequest = new Ajax.Request(pingUrl, {
			method: "get",
			evalJSON: "false",
			onComplete: loginAss.pingEventSuccessHandler,
			onFailure: loginAss.pingEventFailHandler
		})
		
		
}

LoginAssistant.prototype.pingEventFail = function(event){
		clearTimeout(ajaxTimeout)
		if(pushLoginScene == true){
			$('loginStatus').innerHTML = 'Ping Fail'
		}
		loginAss.errDialog('PING EVENT FAIL, Check the directory field in account settings, or wrong server,');
}
LoginAssistant.prototype.pingEventSuccess = function(transport){
		if(pushLoginScene == true){
			$('loginStatus').innerHTML = 'Ping Success!'
		}
		Mojo.Log.info('enter pingEventSuccess');
		clearTimeout(ajaxTimeout)	
		pingResponse = transport
		response = transport.responseText || "no response text";
		Mojo.Log.info("PING RESPONSE: "+response);
		ajaxTimeout = setTimeout(function(){
					Mojo.Log.info('Fire 20 second timeOut: ajaxTimeout in LoginAssistant.prototype.pingEventSuccess');
					if(pushLoginScene == true){
						loginAss.controller.get('loginStatus').innerHTML = 'Timed Out'
						loginAss.controller.get('spinnerSmall').mojo.stop();
					}
					//$('loginStatus').innerHTML = ''
					root = pingResponse.responseXML.getElementsByTagName("root")[0].textContent;
					codeElem = pingResponse.responseXML.getElementsByTagName("error")[0]
					if(codeElem != undefined){
						code = codeElem.getAttribute("code")
					}else{
						code = 0
					}
					if(code == 403){
						errorText = "403 - This is a fatal error, the ACL on the Ampache server prevents access from the current source IP Address."
					}else if(code == 501){
						errorText = "501 - This is a fatal error, the Ampache server you have requested does not currently have access control enabled. The API is disabled." 
					}else if(code == 401){
						errorText = "401 - This is a temporary error, this means no valid session was passed or the handshake failed."
					}else if(code == 400){
						errorText = "400 - Used when you have specified a valid method but something about the input is incorrect / invalid. See Error message for details, but do not re-attempt the exact same request."
					}else if(code == 405){
						errorText = "405 - This is a fatal error, the service requested a method that the API does not implement. "
					}else{
						root = "Time Out"
						errorText = "Unknown error, Timed out after ping. If you are you using ampache v3.5.1? Please upgrade to 3.5.2 or greater."
					}
					loginAss.errDialog(root+": "+errorText)
		}, 20000);
		if (response == "no response text") {
			clearTimeout(ajaxTimeout)
				if(pushLoginScene == true){
					loginAss.controller.get('loginStatus').innerHTML = 'no response'
				}
				loginAss.errDialog('NO RESPONSE FROM SERVER, check the server url, internet connection or firewall/port settings and try again.');
		}
		else {
	
			/*
			 errorTextTimeout=setTimeout(function(){
			 loginAss.controller.get('spinnerSmall').mojo.stop();
			 root = transport.responseXML.getElementsByTagName("root")[0].textContent;
			 Mojo.Controller.errorDialog(root);
			 },5000);
			 */
			version = transport.responseXML.getElementsByTagName("version")[0].firstChild.data;
			ampacheVersion = transport.responseXML.getElementsByTagName("server")[0].textContent;
			Mojo.Log.info("ampacheVersion: "+ampacheVersion);
			//$('loginStatus').innerHTML = 'Ampache Version: '+ ampacheVersion
			//response = transport.responseText || "no response text";
			loginAss.getTime()
			Mojo.Log.info("Compatable VERSION: "+version);
			Mojo.Log.info('exit pingEventSuccess');
		}
}
LoginAssistant.prototype.getTime = function(){
		if(pushLoginScene == true){
			$('loginStatus').innerHTML = 'Getting System Time'
		}
		Mojo.Log.info('enter getTime');
		loginAss.currentScene.serviceRequest('palm://com.palm.systemservice/time', {
 				method:"getSystemTime",
 				onComplete: loginAss.loginEventHandler,
 				onFailure: loginAss.getTimeFailHandler
 		});	
}
LoginAssistant.prototype.getTimeFail = function(event){
		if(pushLoginScene == true){
			$('loginStatus').innerHTML = 'System Time Fail'
		}
		Mojo.Controller.errorDialog('getTime Fail');
}
LoginAssistant.prototype.loginEvent = function(transport){
	clearTimeout(ajaxTimeout)
		if(pushLoginScene == true){
			$('loginStatus').innerHTML = 'Get Time Success'
		}
		Mojo.Log.info('enter loginEvent');
		time = transport.utc
		timeRefreshed = transport.localtime.month+"/"+transport.localtime.day+"/"+transport.localtime.year+", "+transport.localtime.hour+":"+transport.localtime.minute+":"+transport.localtime.second 
		Mojo.Log.info(time);
		//Mojo.Controller.errorDialog('success');
		//Mojo.Controller.errorDialog(response);
		//var date = new Date()
		//var milliseconds = date.getTime();
		//var seconds = milliseconds/1000;
		//var timeRem = milliseconds%1000/1000;
		//var time = seconds - timeRem;
		//Mojo.Controller.errorDialog(timeRem + ', '+ seconds+ ', '+ time);
		var key = loginAss.SHA256(Pword);
		var key2 = loginAss.SHA256(time + key);
		var url = serverUrl + "/server/xml.server.php?action=handshake&auth=" + key2 + "&timestamp=" + time + "&version=" + version + "&user=" + Uname;
		//Mojo.Controller.errorDialog(url);
		if(pushLoginScene == true){
			$('loginStatus').innerHTML = 'Sending login Request...'
		}
		request = new Ajax.Request(url, {
			method: "get",
			evalJSON: "false",
			onComplete: loginAss.pushMainHandler,
			onFailure: loginAss.failureHandler
		});
}

LoginAssistant.prototype.pushMain = function(transport){
	if(pushLoginScene == true){
		$('loginStatus').innerHTML = 'Request Success!'
	}
	Mojo.Log.info('enter pushMain');
	// TODO: this function stops, trying to read a non existing tag. It is for reading errorxml if there are any.
	
	response = transport.responseText || "no response text";
	Mojo.Log.info(response);
	errorTextTimeout=setTimeout(function(){
		Mojo.Log.info('Fire 10 sec timeout: errorTextTimeout in LoginAssistant.prototype.pushMain')
		clearTimeout(ajaxTimeout)	
		if(pushLoginScene == true){
			loginAss.controller.get('loginStatus').innerHTML = 'Timed Out After Ping'
			loginAss.controller.get('spinnerSmall').mojo.stop();
		}
		root = transport.responseXML.getElementsByTagName("root")[0].textContent;
		code = transport.responseXML.getElementsByTagName("error")[0].getAttribute("code")
		if(code == 403){
			errorText = "403 - This is a fatal error, the ACL on the Ampache server prevents access from the current source IP Address."
		}else if(code == 501){
			errorText = "501 - This is a fatal error, the Ampache server you have requested does not currently have access control enabled. The API is disabled." 
		}else if(code == 401){
			errorText = "401 - This is a temporary error, this means no valid session was passed or the handshake failed."
		}else if(code == 400){
			errorText = "400 - Used when you have specified a valid method but something about the input is incorrect / invalid. See Error message for details, but do not re-attempt the exact same request."
		}else if(code == 405){
			errorText = "405 - This is a fatal error, the service requested a method that the API does not implement. "
		}
		loginAss.errDialog(root+": "+errorText)
	},10000);

/*
			if (downloadsNoLogin == false) {
				//Mojo.Controller.errorDialog(root);
			}
*/
			token = transport.responseXML.getElementsByTagName("auth")[0].firstChild.data;
			lastUpdate = transport.responseXML.getElementsByTagName("update")[0].firstChild.data;
			lastAdd = transport.responseXML.getElementsByTagName("add")[0].firstChild.data;
			lastClean = transport.responseXML.getElementsByTagName("clean")[0].firstChild.data;
			totalSongs = transport.responseXML.getElementsByTagName("songs")[0].firstChild.data;
			totalAlbums = transport.responseXML.getElementsByTagName("albums")[0].firstChild.data;
			totalArtists = transport.responseXML.getElementsByTagName("artists")[0].firstChild.data;
			totalVideos = transport.responseXML.getElementsByTagName("videos")[0].firstChild.data;
			totalPlaylists = transport.responseXML.getElementsByTagName("playlists")[0].firstChild.data;
			
			Mojo.Controller.getAppController().showBanner('Welcome to '+listAccounts[currentAccount].accountName, {
				source: 'notification'
			});
			
			
		if (LoginTimeOut == false) {
			if (loginRefresh == false) {
				if(pushLoginScene == true){
					$('loginStatus').innerHTML = 'Success!!!'
				}
				downloadsNoLogin = false;
				AmpacheLoggedIn = true
				currentAccountLoggedIn = currentAccount
				if (playItems.length != 0) {
					audioAss.updateUrls();
				}
				if (lastFmPassWord != "" && lastFmUserName != "") {
					accountsAss.lastfmlogin();
				}
				else {
					scrobble = 'Off'
				}
				this.controller.stageController.swapScene({
					name: "search",
					transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				});
				this.controller.get('spinnerSmall').mojo.stop();
			}
			else {
				//$('loginStatus').innerHTML = 'Refreshing Session'
				loginRefresh = false
				clearTimeout(ajaxTimeout)
				clearTimeout(errorTextTimeout)
				searchAss.pingInterval();
				searchAss.reLogInterval();
				if (playItems.length != 0) {
					audioAss.updateUrls();
				}
				if (pushDownloadScene == true) {
					downloadsAss.updateUrls();
				}
				if (lastFmPassWord != "" && lastFmUserName != "") {
					accountsAss.lastfmlogin();
				}
				else {
					scrobble = 'Off'
				}
				//loginAss.controller.get('spinnerSmall').mojo.stop();
			//searchAss.controller.get('sessionInfo').innerHTML = 'Session refreshed on '+timeRefreshed
			}
		}
		//this.controller.stageController.popScene();
		//}
		Mojo.Log.info('exit pushMain');
}


LoginAssistant.prototype.failure = function(transport) {
			//Mojo.Controller.errorDialog('Server timed out: ' +server);
			//request.abort()
			//versionRequest.abort()
	response = transport.responseText || "no response text";
	Mojo.Log.info(response);
		//root = transport.responseXML.getElementsByTagName("root")[0].textContent;
		if(pushLoginScene == true){
			loginAss.controller.get('spinnerSmall').mojo.stop();
		}
			//loginAss.controller.stageController.pushScene("account");
			loginAss.errDialog('Server Response: ' + response);
}


LoginAssistant.prototype.handleCommand = function(event){
	if (event.type == Mojo.Event.command) {
		switch (event.command) {
			case 'login':
				loginAss.connectionTest();
				break;
		}
	}
	if (event.type == Mojo.Event.back){
		//this.controller.stageController.popScenesTo(accounts);
		downloadsNoLogin = true
		LoginTimeOut = true
	}
}
LoginAssistant.prototype.errDialog = function(errText){
	LoginTimeOut = true
	if (pushLoginScene == true) {
		loginAss.controller.get('spinnerSmall').mojo.stop();
	}
	loginAss.currentScene.showAlertDialog({
			onChoose: function(value){
				if (value == "account") {
					loginAss.currentScene.stageController.popScenesTo('accounts');
					loginAss.controller.stageController.pushScene({
						name: "account",
						//transition: Mojo.Transition.crossFade,
						disableSceneScroller: false
					})
				}
				else 
					if (value == "accounts") {
						loginAss.currentScene.stageController.popScenesTo('accounts');
					}
					else 
						if (value == "tryAgain") {
							loginAss.connectionTest();
							LoginTimeOut = false;
						}
			},
			title: $L(errText),
			choices: [{
				label: $L("Try Again"),
				value: "tryAgain"
				},
				{label: $L("Change Account"),
				value: "accounts"
				},
				{
				label: $L("Edit Account"),
				value: "account"
				}]
		});
}

///other functions

/**
*
*  Secure Hash Algorithm (SHA256)
*  http://www.webtoolkit.info/
*
*  Original code by Angel Marin, Paul Johnston.
*
**/

LoginAssistant.prototype.SHA256 = function(s){
 
	var chrsz   = 8;
	var hexcase = 0;
 
	function safe_add (x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	}
 
	function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
	function R (X, n) { return ( X >>> n ); }
	function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
	function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
	function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
	function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
	function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
	function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
 
	function core_sha256 (m, l) {
		var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
		var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
		var W = new Array(64);
		var a, b, c, d, e, f, g, h, i, j;
		var T1, T2;
 
		m[l >> 5] |= 0x80 << (24 - l % 32);
		m[((l + 64 >> 9) << 4) + 15] = l;
 
		for ( var i = 0; i<m.length; i+=16 ) {
			a = HASH[0];
			b = HASH[1];
			c = HASH[2];
			d = HASH[3];
			e = HASH[4];
			f = HASH[5];
			g = HASH[6];
			h = HASH[7];
 
			for ( var j = 0; j<64; j++) {
				if (j < 16) W[j] = m[j + i];
				else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
 
				T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
				T2 = safe_add(Sigma0256(a), Maj(a, b, c));
 
				h = g;
				g = f;
				f = e;
				e = safe_add(d, T1);
				d = c;
				c = b;
				b = a;
				a = safe_add(T1, T2);
			}
 
			HASH[0] = safe_add(a, HASH[0]);
			HASH[1] = safe_add(b, HASH[1]);
			HASH[2] = safe_add(c, HASH[2]);
			HASH[3] = safe_add(d, HASH[3]);
			HASH[4] = safe_add(e, HASH[4]);
			HASH[5] = safe_add(f, HASH[5]);
			HASH[6] = safe_add(g, HASH[6]);
			HASH[7] = safe_add(h, HASH[7]);
		}
		return HASH;
	}
 
	function str2binb (str) {
		var bin = Array();
		var mask = (1 << chrsz) - 1;
		for(var i = 0; i < str.length * chrsz; i += chrsz) {
			bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
		}
		return bin;
	}
 
	function Utf8Encode(string) {
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
 
	function binb2hex (binarray) {
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		for(var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
			hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
		}
		return str;
	}
 
	s = Utf8Encode(s);
	return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
 
}
/**
*
*  MD5 (Message-Digest Algorithm)
*  http://www.webtoolkit.info/
*
**/
 
LoginAssistant.prototype.MD5 = function (string) {
 
	function RotateLeft(lValue, iShiftBits) {
		return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}
 
	function AddUnsigned(lX,lY) {
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
 	}
 
 	function F(x,y,z) { return (x & y) | ((~x) & z); }
 	function G(x,y,z) { return (x & z) | (y & (~z)); }
 	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }
 
	function FF(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function GG(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function HH(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function II(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	};
 
	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	};
 
	function Utf8Encode(string) {
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
	};
 
	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;
 
	string = Utf8Encode(string);
 
	x = ConvertToWordArray(string);
 
	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 
	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}
 
	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
	return temp.toLowerCase();
}