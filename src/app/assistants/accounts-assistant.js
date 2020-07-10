function AccountsAssistant() {
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		document.getElementById('scrollerId').style.height = '260px';
	}
	//document.getElementById('sceneStyle').style.backgroundImage =  "url(" + backGroundImage + ")";
}

AccountsAssistant.prototype.setup = function() {
	//this.controller.setupWidget(Mojo.Menu.appMenu, accountsAttr, appMenuModel);
	accountsAss = this
	
    this.accountHandler = this.account.bind(this);
	//this.addAccountHandler = this.addAccount.bindAsEventListener(this);
	this.listAccountsWidgetHandler=this.controller.get('listAccountsWidget');	
	
	this.deleteAccountHandler=this.deleteAccount.bind(this);
	this.moveAtIndexHandler = this.moveAtIndex.bind(this);
	this.addToListHandler = this.addToList.bind(this);
	activateHandler=this.activateWindow.bind(this);
	deactivateHandler=this.deactivateWindow.bind(this);
	blueToothResponseHandler = this.blueToothResponse.bind(this)
	blueToothFailureHandler = this.blueToothFailure.bind(this)
	handleResponseheadphone = this.handleResponse.bind(this)
	handleFailureHeadphone = this.handleFailure.bind(this)
	onKeyPressHandler = this.onKeyPress.bind(this)
	
		audioLibs = MojoLoader.require({ name: "mediaextension", version: "1.0"});
		
		audio = new Audio()//this.controller.get('playAudio')
		audioElem = audioLibs.mediaextension.MediaExtension.getInstance(audio); 

		audio2 = new Audio()//this.controller.get('playAudio2')
		audioElem = audioLibs.mediaextension.MediaExtension.getInstance(audio2);
		
 		audio.mojo.audioClass = "media";
		audio2.mojo.audioClass = "media";
 		
		
		currentAudio = audio
		audioAss = new audioPlayer(this.controller)
		
volumeKeyLock = this.controller.serviceRequest(
				"palm://com.palm.audio/media",
				{
					method: 'lockVolumeKeys',					
					onSuccess: function(event){Mojo.Log.info('lockVolumeKeys subscribed')},
					parameters: {
						subscribe: true,
						foregroundApp: true
					}
				}
			);
/*
displaySub = this.controller.serviceRequest('palm://com.palm.display', {
			    method:'status',
			    parameters:{
					subscribe: true
				},
				onSuccess: function(event){
					Object.toJSON(event)
					displayLight = event.event
					Mojo.Log.info('displayLight: '+displayLight)
				}
			 });
*/
/*
		this.controller.serviceRequest(
				'palm://com.palm.mediaevents',
				{
					method: 'mediaEvents',
					onSuccess: function(event){Mojo.Log.info('mediaEvents subscribed: '+Object.toJSON(event))},
					parameters: {
						appName: Mojo.appName,
						subscribe: "true"
					}

				}, true
			);
*/
	headSetKeys = this.controller.serviceRequest('palm://com.palm.keys/headset', {
		method: 'status',
		parameters: {
			subscribe: true
		},
		onSuccess: handleResponseheadphone,
		onFailure: handleFailureHeadphone
	});
	
	blueToothKeys = this.controller.serviceRequest('palm://com.palm.keys/media', {
		method: 'status',
		parameters: {
			subscribe: true
		},
		onSuccess: blueToothResponseHandler,
		onFailure: blueToothFailureHandler
	});
/*
	this.controller.serviceRequest('palm://com.palm.keys/audio', {
	  method:'status',
		parameters: {
			subscribe: true
		},
		onSuccess: function(event){
			Mojo.Log.info("event.key: "+event.key)
			if(event.key == 'volume_up'){
				if (event.state == 'up') {
					if (audio.volume < 1 && audio.volume > 0.049999844282865524) {
						audio.volume = audio.volume + 0.05
						Mojo.Log.info("event.state: " + event.state + ', audio.volume: ' + audio.volume)
					}else{
						audio.volume = audio.volume + 0.04999984428286
					}
				}
			}else if(event.key == 'volume_down'){
				if (event.state == 'up') {
					if (audio.volume > 0.049999844282865524) {
						audio.volume = audio.volume - 0.05
						Mojo.Log.info("event.state: " + event.state + ', audio.volume: ' + audio.volume)
					}else{
						audio.volume = 0
						Mojo.Log.info("event.state: " + event.state + ', audio.volume: ' + audio.volume)
					}
				}
			}
			
		},
		onFailure:  function(){
			Mojo.Log.error('Volume keys sub fail.')
		}
	});
*/
	//this.controller.listen(this.controller.stageController.document, Mojo.Event.keypress, onKeyPressHandler);
	this.controller.listen(this.controller.stageController.document, Mojo.Event.stageActivate, activateHandler);
	this.controller.listen(this.controller.stageController.document, Mojo.Event.stageDeactivate, deactivateHandler);	
	//this.controller.listen(this.controller.stageController.window, Mojo.Event.keyup, onKeyPressHandler, true);			
	/*accountsCookie = new Mojo.Model.Cookie('accounts');
	listAccounts = accountsCookie.get();*/
	//this.readAccounts();
		this.cmdMenuModel = {
			visible: true,
			items: [
					{}, 
					{label: $L(''),icon: 'downloads',command: 'downloadsNoLogin'}, 
					]
		};
		this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass:'no-fade'}, this.cmdMenuModel);
	 
	this.menuModel = {
		visible: true,
  			items: [
					{label: "What's new?", command: 'whatsNew'},
    				{label: "About", command: 'do-myAbout'},
  					]
		};
		
	this.menuAttr = {omitDefaultItems: true};	
	this.controller.setupWidget(Mojo.Menu.appMenu, this.menuAttr, this.menuModel);	
	
	this.controller.setupWidget("listAccountsWidget", {
        itemTemplate: "accounts/rowTemplate",
        listTemplate: "accounts/listTemplate",
		swipeToDelete: true, 
		addItemLabel: 'Add Account',
		reorderable: true
    },  
	this.accountsModel = {
        items: listAccounts
    });
	//spinner

		this.controller.setupWidget("spinner", this.attributes = {
			spinnerSize: 'large'
		}, this.spinnerModel = {
			spinning: false
		});			
	
		accountsAss.resetToggleSorts()
	
}

AccountsAssistant.prototype.activate = function(event) {
			this.accountsModel.items=listAccounts;
			this.controller.modelChanged(this.accountsModel);	
			this.updateCommandMenuModel();
				wifiConnected = false
				evdoConnected = false
	this.controller.listen(this.listAccountsWidgetHandler, Mojo.Event.listTap, this.accountHandler);	
	this.controller.listen(this.listAccountsWidgetHandler, Mojo.Event.listDelete, this.deleteAccountHandler);
	this.controller.listen(this.listAccountsWidgetHandler, Mojo.Event.listReorder, this.moveAtIndexHandler);
	this.controller.listen(this.listAccountsWidgetHandler, Mojo.Event.listAdd, this.addToListHandler);		
	//this.controller.listen(this.listAccountsWidgetHandler, Mojo.Event.listReorder, this.readAccountsHandler);	  
}


AccountsAssistant.prototype.deactivate = function(event) {
	this.controller.stopListening(this.listAccountsWidgetHandler, Mojo.Event.listTap, this.accountHandler);
	this.controller.stopListening(this.listAccountsWidgetHandler, Mojo.Event.listDelete, this.deleteAccountHandler);
	this.controller.stopListening(this.listAccountsWidgetHandler, Mojo.Event.listReorder, this.moveAtIndexHandler);
	this.controller.stopListening(this.listAccountsWidgetHandler, Mojo.Event.listAdd, this.addToListHandler);		 

}

AccountsAssistant.prototype.cleanup = function(event) {
	//this.controller.stopListening(this.controller.stageController.document, Mojo.Event.keypress, onKeyPressHandler);
	this.controller.stopListening(this.listAccountsWidgetHandler, Mojo.Event.listTap, this.accountHandler);
	this.controller.stopListening(this.listAccountsWidgetHandler, Mojo.Event.listDelete, this.deleteAccountHandler);
	this.controller.stopListening(this.listAccountsWidgetHandler, Mojo.Event.listReorder, this.moveAtIndexHandler);
	this.controller.stopListening(this.listAccountsWidgetHandler, Mojo.Event.listAdd, this.addToListHandler);
	this.controller.stopListening(this.controller.stageController.document, Mojo.Event.stageActivate, activateHandler);
	this.controller.stopListening(this.controller.stageController.document, Mojo.Event.stageDeactivate, deactivateHandler);
	//this.controller.stopListening(this.controller.stageController.window, Mojo.Event.keyup, onKeyPressHandler, true);			
	audioAss.cleanup();

}
AccountsAssistant.prototype.account = function(event){
  var target = event.originalEvent.target.className;
    popupIndex = event.index;
 //Mojo.Controller.errorDialog(target);
  if (target !== "addFavs") {
    AmpacheLoggedIn = false
	LoginTimeOut = false;
	loginRefresh = false;
	//reset toggle freezes for account selection.
	headphoneToggled = false
	blueToothToggled = false
	scrobbleToggled = false
	accountSelected = true
	currentAccount = event.index
  	this.controller.stageController.pushScene({
					name: "login",
					//transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				});
  }
  else{
  	currentAccount = event.index
			//if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
				this.controller.stageController.pushScene({
					name: "account",
					//transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				});
			/*}else{
				this.controller.stageController.pushScene({
					name: "account",
					transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				});}*/
  }
}
AccountsAssistant.prototype.resetAccPrefs = function(event){
	loginCookie.remove();
}
AccountsAssistant.prototype.deleteAccount = function(event){
		listAccounts.splice(event.index, 1)
		db.add('accountsList', listAccounts, function(){Mojo.Log.info("SUCCESS SAVE");}, function(){ Mojo.Log.info("FAIL SAVE")});
		/*accountsCookie = new Mojo.Model.Cookie('accounts');
		accountsCookie.put(listAccounts)*/
		
		/*deleteAccountAtIndex=event.index+1;
		accountToDeleteHandler = 'account'+deleteAccountAtIndex;
		deleteAccountCookie = new Mojo.Model.Cookie(accountToDeleteHandler);
		//accountToDelete = deleteAccountCookie.get();
		//listAccounts.splice(event.index-1,1)
		deleteAccountCookie.remove()*/
		
}
AccountsAssistant.prototype.moveAtIndex = function(event){
					move = []
					move = listAccounts.splice(event.fromIndex, 1) 
					listAccounts.splice(event.toIndex, 0, move[0])
		db.add('accountsList', listAccounts, function(){Mojo.Log.info("SUCCESS SAVE");}, function(){ Mojo.Log.error("FAIL SAVE")});
		/*accountsCookie = new Mojo.Model.Cookie('accounts');
		accountsCookie.put(listAccounts)*/	  

}
AccountsAssistant.prototype.addToList = function(event){
	newAccount=true
  	currentAccount = listAccounts.length
			//if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
				this.controller.stageController.pushScene({
					name: "account",
					//transition: Mojo.Transition.crossFade,
					disableSceneScroller: false
				});
			/*}else{
				this.controller.stageController.pushScene({
					name: "account",
					transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				});}*/
 /*   this.controller.showDialog({
          template: 'dlScene/addList',
          assistant: new AddListAssistant(this),
          //wisdom: randomLorem(),
          //preventCancel:true
    });*/
}

AccountsAssistant.prototype.clearPing = function(){
pingTimeout = this.controller.serviceRequest('palm://com.palm.power/timeout', {
		method: "clear",
		parameters: {
			"key": "net.nucleardecay.ampachpre.ping"
		},
			onSuccess: function(){
				Mojo.Log.info('PingInterval cleared')
			},
			onFailure: function(err){
				Mojo.Log.error('PingInterval clear failed: '+err.errorText)
			}
	});
}
AccountsAssistant.prototype.clearReLog = function(){
reLogTimeout = this.controller.serviceRequest('palm://com.palm.power/timeout', {
		method: "clear",
		parameters: {
			"key": "net.nucleardecay.ampachpre.reLog"
		},
			onSuccess: function(){
				Mojo.Log.info('relog timeout cleared')
			},
			onFailure: function(err){
				Mojo.Log.error('relog timeout clear failed: ' + err.errorText)
			}
	});
}
AccountsAssistant.prototype.handleCommand = function(event){
	if (event.type == Mojo.Event.command) {
		switch (event.command) {
		
			case 'whatsNew':
				this.controller.stageController.pushScene({
					name: 'whatsNew',
					//transition: Mojo.Transition.crossFade,
				//disableSceneScroller: true
				});
				break;
		}
	}
	
}

AccountsAssistant.prototype.activateWindow = function(event){
		stageDeactivated = false
	if(pushPlayerDash == true && pushStreamScene == true && notificationOpen == false){
		Mojo.Log.info('Close dashboard')
		playerDashAss.controller.window.close();
	}
		Mojo.Log.info('stageDeactivated: '+stageDeactivated)
}

AccountsAssistant.prototype.deactivateWindow = function(event){
		stageDeactivated = true
	if (audioPlaying == true && pushPlayerDash == false) {
		Mojo.Log.info('Open dashboard')
		appAss.pushPlayerDashboard(this.controller)
	}
		Mojo.Log.info('stageDeactivated: '+stageDeactivated)
}
AccountsAssistant.prototype.handleResponse = function(event){
	if (headPhoneControls == 'On') {
		if (event.state == "single_click") {
			audioAss.playPauseSong();
		}
		else 
			if (event.state == "double_click") {
				audioAss.nextSong();
			}
			else 
				if (event.state == "hold") {
					//streamAss.nextSong();
					audioAss.previousSong();
				}
		Mojo.Log.info('HeadPhone controls: ' + event.state)
	}
}
AccountsAssistant.prototype.handleFailure = function(event){
Mojo.Log.error("There was a headset error.")
}
AccountsAssistant.prototype.blueToothResponse = function(event){
	if (blueToothControls == 'On') {
		if (event.key == "play" && event.state == "up") {
			audioAss.playPauseSong();
		}
		else 
			if (event.key == "pause" && event.state == "up") {
				audioAss.playPauseSong();
			}
			else 
				if (event.key == "stop" && event.state == "up") {
					//audio.currentTime = 0; 
					//audio.pause(); 
					//audioAss.clearTimer();
					audioAss.playPauseSong();
				}
				else 
					if (event.key == "next" && event.state == "up") {
						audioAss.nextSong();
					}
					else 
						if (event.key == "prev" && event.state == "up") {
							audioAss.previousSong();
						}
		Mojo.Log.info('Bluetooth Controls: ' + event.key)
	}
}
AccountsAssistant.prototype.blueToothFailure = function(event){
Mojo.Log.error("There was a bluetooth error.")
}
AccountsAssistant.prototype.onKeyPress = function(event){
	Mojo.Log.info("AccountsAssistant.prototype.onKeyPress :event: "+event.originalEvent.keyCode)
	if (event.originalEvent.keyCode == 32) {
		audioAss.playPauseSong();
	}
	else 
		if (event.originalEvent.keyCode == 190) {
			//period key
			audioAss.ff();
		}
		else 
			if (event.originalEvent.keyCode == 48) {
				//@ key
				audioAss.rw();
			}
			else 
				if (event.originalEvent.keyCode == 16) {
					//shift key
					audioAss.previousSong();
					
				}
				else 
					if (event.originalEvent.keyCode == 17) {
						//Sym key
						audioAss.nextSong();
					}
					else 
						if (event.originalEvent.keyCode == 67 || event.originalEvent.keyCode == 83) {
							//c or s
							stageAss.handleCommand({type:Mojo.Event.command, command:'clear'})
						}
					else 
						if (event.originalEvent.keyCode == 72) {
							//h
							stageAss.handleCommand({type:Mojo.Event.command, command:'backToSearch'})
						}
					else 
						if (event.originalEvent.keyCode == 78) {
							//n
							if(pushStreamScene == false && pushNowPlayingList == false){
								stageAss.handleCommand({type:Mojo.Event.command, command:'stream'})
							}else if(pushStreamScene == false && pushNowPlayingList == true){
								stageAss.handleCommand({type:Mojo.Event.command, command:'streamSwap'})
							}
						}
					else 
						if (event.originalEvent.keyCode == 76) {
							//l
							if(pushStreamScene == false && pushNowPlayingList == false){
								stageAss.handleCommand({type:Mojo.Event.command, command:'nowPlayingList'})
							}else if(pushStreamScene == true && pushNowPlayingList == false){
								stageAss.handleCommand({type:Mojo.Event.command, command:'nowPlayingListSwap'})
							}
						}
					else 
						if (event.originalEvent.keyCode == 63) {
							//?
							stageAss.handleCommand({type:Mojo.Event.command, command:'help'})
						}
}

AccountsAssistant.prototype.resetToggleSorts = function(sortCategory){
	
	descendingName = false
	descendingArtist = false
	descendingAlbum = false
	descendingSong = false
	descendingYear = false
	descendingArtists = false
	descendingAlbums = false
	descendingSongs = false
	descendingTrack = false
	descendingTime = false
	descendingSize = false
	descendingType = false
}


AccountsAssistant.prototype.sortArray = function(array, model, command){
	this.currentScene=Mojo.Controller.stageController.activeScene();
	this.model = model
Mojo.Log.info('descendingArtist: '+descendingArtist)
		switch (command) {
			case 'name':
				if (descendingName == true) {
					this.resetToggleSorts()
					descendingName = false
					array.sort(function(a, b){
						var x = a.name.toLowerCase();
						var y = b.name.toLowerCase();
						return ((x < y) ? 1 : ((x > y) ? -1 : 0));
					})
				}else{
					this.resetToggleSorts()
					descendingName = true
					array.sort(function(a, b){
						var x = a.name.toLowerCase();
						var y = b.name.toLowerCase();
						//sort acending
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					})
				}
				break;
			case 'artist':
				if (descendingArtist == true) {
					this.resetToggleSorts()
					descendingArtist = false
					array.sort(function(a, b){
						var x = a.artist.toLowerCase();
						var y = b.artist.toLowerCase();
						return ((x < y) ? 1 : ((x > y) ? -1 : 0));
					})
				}else{
					this.resetToggleSorts()
					descendingArtist = true
					array.sort(function(a, b){
						var x = a.artist.toLowerCase();
						var y = b.artist.toLowerCase();
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					})
				}
				break;
			case 'album':
				if (descendingAlbum == true) {
					this.resetToggleSorts()
					descendingAlbum = false
					array.sort(function(a, b){
						var x = a.album.toLowerCase();
						var y = b.album.toLowerCase();
						return ((x < y) ? 1 : ((x > y) ? -1 : 0));
					})
				}else{
					this.resetToggleSorts()
					descendingAlbum = true
					array.sort(function(a, b){
						var x = a.album.toLowerCase();
						var y = b.album.toLowerCase();
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					})
				}
				break;
			case 'song':
				if (descendingSong == true) {
					this.resetToggleSorts()
					descendingSong = false
					array.sort(function(a, b){
						var x = a.song.toLowerCase();
						var y = b.song.toLowerCase();
						return ((x < y) ? 1 : ((x > y) ? -1 : 0));
					})
				}else{
					this.resetToggleSorts()
					descendingSong = true
					array.sort(function(a, b){
						var x = a.song.toLowerCase();
						var y = b.song.toLowerCase();
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					})
				}
				break;
			case 'type':
				if (descendingType == true) {
					this.resetToggleSorts()
					descendingType = false
					array.sort(function(a, b){
						var x = a.sourceType.toLowerCase();
						var y = b.sourceType.toLowerCase();
						return ((x < y) ? 1 : ((x > y) ? -1 : 0));
					})
				}else{
					this.resetToggleSorts()
					descendingType = true
					array.sort(function(a, b){
						var x = a.sourceType.toLowerCase();
						var y = b.sourceType.toLowerCase();
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					})
				}
				break;
				//reverse direction (decending) for numerical items
			case 'year':
				if (descendingYear == true) {
					this.resetToggleSorts()
					descendingYear = false
					array.sort(function(a, b){
						var x = a.year.toLowerCase();
						var y = b.year.toLowerCase();
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					})
				}else{
					this.resetToggleSorts()
					descendingYear = true
					array.sort(function(a, b){
						var x = a.year.toLowerCase();
						var y = b.year.toLowerCase();
						return ((x < y) ? 1 : ((x > y) ? -1 : 0));
					})
				}
				break;
			case 'artists':
				if (descendingArtists == true) {
					this.resetToggleSorts()
					descendingArtists = false
					array.sort(function(a, b){
						var x = parseFloat(a.artists)
						var y = parseFloat(b.artists)
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					})
				}else{
					this.resetToggleSorts()
					descendingArtists = true
					array.sort(function(a, b){
						var x = parseFloat(a.artists)
						var y = parseFloat(b.artists)
						return ((x < y) ? 1 : ((x > y) ? -1 : 0));
					})
				}
				break;
			case 'albums':
				if (descendingAlbums == true) {
					this.resetToggleSorts()
					descendingAlbums = false
					array.sort(function(a, b){
						var x = parseFloat(a.albums)
						var y = parseFloat(b.albums)
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					})
				}else{
					this.resetToggleSorts()
					descendingAlbums = true
					array.sort(function(a, b){
						var x = parseFloat(a.albums)
						var y = parseFloat(b.albums)
						return ((x < y) ? 1 : ((x > y) ? -1 : 0));
					})
				}
				break;
			case 'songs':
				if (descendingSongs == true) {
					this.resetToggleSorts()
					descendingSongs = false
					array.sort(function(a, b){
						var x = parseFloat(a.songs)
						var y = parseFloat(b.songs)
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					})
				}else{
					this.resetToggleSorts()
					descendingSongs = true
					array.sort(function(a, b){
						var x = parseFloat(a.songs)
						var y = parseFloat(b.songs)
						return ((x < y) ? 1 : ((x > y) ? -1 : 0));
					})
				}
				break;
			case 'track':
				if (descendingTrack == true) {
					this.resetToggleSorts()
					descendingTrack = false
					array.sort(function(a, b){
						var x = parseFloat(a.track)
						var y = parseFloat(b.track)
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					})
				}else{
					this.resetToggleSorts()
					descendingTrack = true
					array.sort(function(a, b){
						var x = parseFloat(a.track)
						var y = parseFloat(b.track)
						return ((x < y) ? 1 : ((x > y) ? -1 : 0));
					})
				}
				break;
			case 'time':
				if (descendingTime == true) {
					this.resetToggleSorts()
					descendingTime = false
					array.sort(function(a, b){
						var x = parseFloat(a.timeUnformatted)
						var y = parseFloat(b.timeUnformatted)
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					})
				}else{
					this.resetToggleSorts()
					descendingTime = true
					array.sort(function(a, b){
						var x = parseFloat(a.timeUnformatted)
						var y = parseFloat(b.timeUnformatted)
						return ((x < y) ? 1 : ((x > y) ? -1 : 0));
					})
				}
				break;
			case 'size':
				if (descendingSize == true) {
					this.resetToggleSorts()
					descendingSize = false
					array.sort(function(a, b){
						var x = parseFloat(a.size)
						var y = parseFloat(b.size)
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					})
				}else{
					this.resetToggleSorts()
					descendingSize = true
					array.sort(function(a, b){
						var x = parseFloat(a.size)
						var y = parseFloat(b.size)
						return ((x < y) ? 1 : ((x > y) ? -1 : 0));
					})
				}
				break;
		}
		if (this.model != null) {
			this.model.items = array
			this.currentScene.modelChanged(this.model);
		}
}

AccountsAssistant.prototype.updateCommandMenuModel = function(){
	Mojo.Log.info('AmpacheLoggedIn: '+AmpacheLoggedIn)
	if (AmpacheLoggedIn == false) {
		this.cmdMenuModel.items = [{}, {
				label: $L(''),
				icon: 'downloads',
				command: 'downloadsNoLogin'
			},]
	}
	else {
		this.cmdMenuModel.items = [{
				label: $L(''),
				icon: 'home',
				command: 'pushHome'
			}, {
				label: $L(''),
				icon: 'downloads',
				command: 'downloadsNoLogin'
			}, ]
	}
	this.controller.modelChanged(this.cmdMenuModel)	
}
AccountsAssistant.prototype.lastfmlogin = function(){
	secret = "a3fe465cccd9f5f1e74db919547d25c7"
	signature = loginAss.MD5("api_key5da255b519ac48089620239c4f310110authToken"+lastFmAuthToken+"methodauth.getMobileSessionusername"+lastFmUserName + secret)
	//apiSig = loginAss.MD5()
	lastfmLoginUrl = "http://ws.audioscrobbler.com/2.0/?method=auth.getMobileSession&api_key=5da255b519ac48089620239c4f310110&authToken="+lastFmAuthToken+"&username="+lastFmUserName+"&api_sig="+signature
	//lastfmLoginUrl2 = "http://www.last.fm/api/auth/?method=auth.getMobileSession&api_key=5da255b519ac48089620239c4f310110&api_sig="+signature+"&token="+lastFmAuthToken+"&username="+lastFmUserName	
	
	
lastFmTimeRequest = this.controller.serviceRequest('palm://com.palm.systemservice/time', {
 				method:"getSystemTime",
 				parameters:{},
 				onComplete: function(transport){
					lastfmTime = transport.utc
					Mojo.Log.info("lastfmTime: "+lastfmTime)
					
					request = new Ajax.Request(lastfmLoginUrl, {
							method: "get",
							evalJSON: "true",
							onComplete: function(transport){
								Mojo.Log.info("enter ajax lastfm login request")
								response = transport.responseText || "no response";
								Mojo.Log.info("response: "+response)
								lfm_status = transport.responseXML.getElementsByTagName("lfm")[0].getAttribute("status");
								Mojo.Log.info("lfm_status: "+lfm_status)
								if (lfm_status == "failed") {
									error = transport.responseXML.getElementsByTagName("error")[0].textContent;
									Mojo.Controller.errorDialog('last.fm error: ' + error);
									scrobbling = 'Off'
									lastfmLoggedIn = false
								}
								else {
									sessionKey = transport.responseXML.getElementsByTagName("key")[0].textContent;
									lastFmAuthToken = loginAss.MD5(secret + lastfmTime)
									lastfmHandShakeUrl = "http://post.audioscrobbler.com/?hs=true&p=1.2.1&c=app&v=1.0&u=" + lastFmUserName + "&t=" + lastfmTime + "&a=" + lastFmAuthToken + "&format=json&api_key=5da255b519ac48089620239c4f310110" + "&sk=" + sessionKey
									Mojo.Log.info("exit ajax lastfm login request")
									request = new Ajax.Request(lastfmHandShakeUrl, {
										method: "get",
										evalJSON: "true",
										onComplete: function(transport){
											Mojo.Log.info("enter ajax lastfm handshake")
											response = transport.responseText || "no response";
											Mojo.Log.info("handshake: " + response)
											testSuccessIndex = response.indexOf('OK')
											sessionIdIndex = response.indexOf('http')
											server1Index = response.indexOf('http')
											server2Index = response.lastIndexOf("http")
											Mojo.Log.info("testSuccessIndex: " + testSuccessIndex + ", sessionIdIndex: " + sessionIdIndex + ", server1Index: " + server1Index + ", server2Index: " + server2Index)
											status = response.slice(0, 2)
											if (status == 'OK') {
												lastfmLoggedIn = true
												Mojo.Log.info("Last.fm handshake status: " + status)
												sessionId = response.slice(3, sessionIdIndex - 1)
												lastFmUrlNP = response.slice(server1Index, server2Index - 1)
												lastFmUrlScrob = response.slice(server2Index, response.length - 1)
												Mojo.Log.info("lastFmUrlNP: " + lastFmUrlNP + ", lastFmUrlScrob: " + lastFmUrlScrob + ", sessionId: " + sessionId)
												accountsAss.scrobbleQue();
											}
											else {
												sessionId = ""
												lastFmUrlNP = ""
												lastFmUrlScrob = ""
												Mojo.Log.error("Last.fm Handshake error: " + response)
												Mojo.Controller.errorDialog("Last.fm Handshake error: " + response);
												lastfmLoggedIn = false
											}
											Mojo.Log.info("exit ajax lastfm handshake")
										},
										onFailure: function(){
											Mojo.Log.error("ajax handshake fail")
										}
									});
								}
							},
							onFailure: function(){
								Mojo.Log.error("Last fm login ajax request fail")
							}
					});
				},
				onFailure: function(){
					Mojo.Log.error("get time fail")
				}
 		});	
}
AccountsAssistant.prototype.scrobbleQue = function(event){

	if (internet == true) {
		scrobbleQueDB = db.get('scrobbleQue', function(fl){
			Mojo.Log.info("SUCCESS scrobbleQue RETRIEVE")
			if (Object.toJSON(fl) == "{}" || fl === null) {
				scrobbleQue = []
				Mojo.Log.info("scrobbleQue fl empty" + scrobbleQue.length)
			}
			else {
				scrobbleQue = fl
				Mojo.Log.info("scrobbleQue = fl: " + scrobbleQue.length)
				accountsAss.submitScrobbleQue();
			}
		}, function(){
			Mojo.Log.error("FAIL savedPlaylists SCENEARR")
		});
	}
}
AccountsAssistant.prototype.submitScrobbleQue = function(event){
				if (scrobbleQue.length != 0) {
					i=0
							postScrob = new Ajax.Request(lastFmUrlScrob, {
								method: "POST",
								parameters: "s=" + sessionId + "&a[" + i + "]=" + scrobbleQue[0].scrobbleArtistName + "&t[" + i + "]=" + scrobbleQue[0].scrobbleTrackName + "&i[" + i + "]=" + scrobbleQue[0].scrobbleLastfmTimeAtPlay + "&o[" + i + "]=" + scrobbleQue[0].scrobbleSource + "&r[" + i + "]=" + scrobbleQue[0].scrobbleRating + "&l[" + i + "]=" + scrobbleQue[0].scrobbleSongDuration + "&b[" + i + "]=" + scrobbleQue[0].scrobbleAlbumName + "&n[" + i + "]=" + scrobbleQue[0].scrobbleTracknumber + "&",
								onComplete: function(transport){
									response = transport.responseText || "no response text";
									Mojo.Log.info("Scrob response from scrobbleQue: " + response + ", scrobbleQue[0].scrobbleLastfmTimeAtPlay: " + scrobbleQue[0].scrobbleLastfmTimeAtPlay)
									//Mojo.Log.info("s=" + sessionId + "&a[0]=" + scrobbleArtistName + "&t[0]=" + scrobbleTrackName + "&i[0]=" + scrobbleLastfmTimeAtPlay + "&o[0]=" + scrobbleSource + "&r[0]=" + scrobbleRating + "&l[0]=" + scrobbleSongDuration + "&b[0]=" + scrobbleAlbumName + "&n[0]=" + scrobbleTracknumber + "&")
									//Mojo.Log.info(scrobbleSongDuration)
									scrobbleQue.shift()
									Mojo.Log.info("scrobbleQue.length: "+ scrobbleQue.length)
									if (scrobbleQue.length > 0) {
										i++
										accountsAss.submitScrobbleQue();
									}else{
											db.add('scrobbleQue', scrobbleQue, function(){
												Mojo.Log.info("SUCCESS scrobbleQue SAVE");
												Mojo.Log.info("scrobbleQue.length: "+ scrobbleQue.length)
											}, function(){
												Mojo.Log.error("FAIL scrobbleQue SAVE")
											});
									}
								},
								onFailure: function(){
									Mojo.Log.error("fail scrobbleQue post")
								}
							});
				}		
}
