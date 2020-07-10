downloadDownLoaded = ''
downloadDownLoadedArt = ''
stageDeactivated = false
downloadsTicketHandler = null
totalDownloads = 0
downloadIndex = 1
function DownloadsAssistant() {
	document.getElementById('sceneStyle').style.backgroundImage =  "url(" + backGroundImage + ")";
	document.getElementById('sceneStyle').style.color =  textColor;
	document.getElementById('listBorder').style.border =  "2px solid "+textColor;
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		document.getElementById('scrollerId').style.height = '260px';
	}
}

DownloadsAssistant.prototype.setup = function() {
	  downloadsAss = this
	this.controller.get('scrimSpinner').hide();
	stageAss.updatePlaylistSource(sceneArray, 'downloads', playListName);
	this.controller.setupWidget(Mojo.Menu.appMenu, downloadsAttr, downloadAppMenuModel);
	
	$('instructions').hide();
		if (!sceneArray || sceneArray.length == 0){
			sceneArray = []
			$('listDL').hide()
			$('instructions').show()
		}
			path = listAccounts[currentAccount].dl
			if (path == '' || path == undefined){path = 'AmpachPre'}



this.downloadSongsHandler = this.downloadSongs.bind(this)	
this.downloadSuccessHandler = this.downloadSuccess.bind(this);
this.downloadFailHandler = this.downloadFail.bind(this);
this.deleteSuccessHandler = this.deleteSuccess.bind(this);
this.deleteFailHandler = this.deleteFail.bind(this);
this.cancelDownloadHandler = this.cancelDownload.bind(this);
this.cancelSuccessHandler = this.cancelSuccess.bind(this);
this.cancelFailHandler = this.cancelFail.bind(this);
this.listDownloadsHandler = this.controller.get('listDownloads');
this.downloadProgressPillHandler = this.controller.get('downloadProgressPill');	
this.deleteAtIndexHandler = this.deleteAtIndex.bind(this);	
this.deleteAtIndexSuccessHandler = this.deleteAtIndexSuccess.bind(this);
this.deleteAtIndexFailHandler = this.deleteAtIndexFail.bind(this);
this.playAtIndexHandler = this.pushStream.bind(this);
this.moveAtIndexHandler = this.moveAtIndex.bind(this);
this.downloadArtSuccessHandler = this.downloadArtSuccess.bind(this)
this.downloadArtFailHandler = this.downloadArtFail.bind(this)
this.popupHandler = this.popup.bind(this)	
this.activateHandler=this.activateWindow.bind(this);
this.deactivateHandler=this.deactivateWindow.bind(this);



if (downloadsNoLogin == true && playListArray.length > 0) {
    this.cmdMenuModel = {
        visible: true,
        items: [ 
			{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'},{label: $L(''),icon: 'downloadSave', command: 'download'}, {label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
			{label: $L(''),icon: 'www',command: 'urlAdd'}, 
		]
    };
}

else 
    if (downloadsNoLogin == false && playListArray.length > 0) {
        this.cmdMenuModel = {
            visible: true,
            items: [
				{label: $L(''), icon: 'home',command: 'backToSearch'}, 
				{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'},{label: $L(''),icon: 'downloadSave', command: 'download'}, {label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
				{label: $L(''),icon: 'www',command: 'urlAdd'}, 
			]
        };
    }
    else 
        if (downloadsNoLogin == false) {
            this.cmdMenuModel = {
                visible: true,
                items: [
					{label: $L(''), icon: 'home', command: 'backToSearch' }, 
					{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'},{label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
					{label: $L(''), icon: 'www',command: 'urlAdd' }, 
				]
            };
            
        }
        else 
            if (downloadsNoLogin == true) {
                if (internet == true) {
                    this.cmdMenuModel = {
                        visible: true,
                        items: [
							{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'},{label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
							{label: $L(''), icon: 'www',command: 'urlAdd'}, 
						]
                    };
                }
                else {
                    this.cmdMenuModel = {
                        visible: true,
                        items: [
							{},
							{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'},{label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
							{}, 
						]
                    };
                }
            }
	this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass:'no-fade'}, this.cmdMenuModel)

	this.controller.setupWidget("listDownloads", {
    	itemTemplate: "downloads/rowTemplate",
    	listTemplate: "downloads/listTemplate",
		fixedHeightItems: true,
		swipeToDelete: true, 
		reorderable: true, 
		renderLimit: 20,
    }, 
	this.listModel = {
        items: sceneArray
    });
    this.controller.setupWidget("downloadProgressPill",
        this.progressAttributes = {
			title: '',
            //image: 'images/cancelDownload.png',
            modelProperty: "progress",
        },
        this.progressModel = {
			icon: 'cancelDownload',
            //iconPath: "../../images/cancelDownload.png",
            progress: 0,
            title: ''
        });
//spinner
	   this.controller.setupWidget("spinner",
         this.attributes = {
             spinnerSize: 'large'
         },
         this.model = {
             spinning: false 
         });

	this.clone(playListItems)
} 
DownloadsAssistant.prototype.activate = function(event) {
		stageAss.listResize()
	Mojo.Event.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.listen(this.listDownloadsHandler, Mojo.Event.listTap, this.playAtIndexHandler);
	this.controller.listen(this.listDownloadsHandler, Mojo.Event.listDelete, this.deleteAtIndexHandler);
	this.controller.listen(this.listDownloadsHandler, Mojo.Event.listReorder, this.moveAtIndexHandler);	
	this.controller.listen(this.downloadProgressPillHandler, Mojo.Event.progressIconTap, this.cancelDownloadHandler)
	this.controller.listen(this.controller.stageController.document, Mojo.Event.stageActivate, this.activateHandler);
	this.controller.listen(this.controller.stageController.document, Mojo.Event.stageDeactivate, this.deactivateHandler);
	Mojo.Event.listen(this.controller.window, 'resize', listResizeHandler);
	pushDownloadScene = true
	
	//clearTimeout(timeout)  
}

DownloadsAssistant.prototype.deactivate = function(event) {

/*
	this.clearWakeUp();
if (!downloadDownLoaded) {
	this.cancelDownload();
	//this.clearWakeUp();
}
*/
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.stopListening(this.listDownloadsHandler, Mojo.Event.listTap, this.playAtIndexHandler);
	this.controller.stopListening(this.listDownloadsHandler, Mojo.Event.listDelete, this.deleteAtIndexHandler);
	this.controller.stopListening(this.listDownloadsHandler, Mojo.Event.listReorder, this.moveAtIndexHandler);
	this.controller.stopListening(this.downloadProgressPillHandler, Mojo.Event.progressIconTap, this.cancelDownloadHandler);
	this.controller.stopListening(this.controller.stageController.document, Mojo.Event.stageActivate, this.activateHandler);
	this.controller.stopListening(this.controller.stageController.document, Mojo.Event.stageDeactivate, this.deactivateHandler); 
	Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
	pushDownloadScene = false	
}

DownloadsAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	this.clearWakeUp();
	if (!downloadDownLoaded) {
		this.cancelDownload();
		//this.clearWakeUp();
	}
	//sceneArray.length = 0
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.stopListening(this.listDownloadsHandler, Mojo.Event.listTap, this.playAtIndexHandler);
	this.controller.stopListening(this.listDownloadsHandler, Mojo.Event.listDelete, this.deleteAtIndexHandler);
	this.controller.stopListening(this.listDownloadsHandler, Mojo.Event.listReorder, this.moveAtIndexHandler);
	this.controller.stopListening(this.downloadProgressPillHandler, Mojo.Event.progressIconTap, this.cancelDownloadHandler);	
	this.controller.stopListening(this.controller.stageController.document, Mojo.Event.stageActivate, this.activateHandler);
	this.controller.stopListening(this.controller.stageController.document, Mojo.Event.stageDeactivate, this.deactivateHandler);
	Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
	pushDownloadScene = false	

}
DownloadsAssistant.prototype.downloadArt = function(event){
	protocolTest = playListArray[0].art.match("http://")
	protocolFtpTest = playListArray[0].art.match("ftp://")
	if (protocolTest == "http://" || protocolFtpTest == "ftp://") {
				var url = playListArray[0].art,		
					extension = "";
	
				if (url.length != 0) {
					var dotPos = url.lastIndexOf(".");
				if (dotPos != -1) 
					extension = url.substr(dotPos + 1).toLowerCase(); ;
				}
		/*protocolTest = playListArray[0].art.match("https://")
		if (protocolTest == 'https://'){
		//Mojo.Controller.errorDialog(playListArray[0].art+' '+protocolTest)
			playListArray[0].art = playListArray[0].art.replace("https://", "http://");
		}*/
downloadsArtRequest	= this.controller.serviceRequest('palm://com.palm.downloadmanager/', {
		method: 'download',
		parameters: {
			//ticket: ticketNum,
			target: playListArray[0].art,
			//"mime": "audio/mpeg",
			"targetDir": "/media/internal/" + path + "/" + playListName + "/" + artistName + "/" + albumName,
			"targetFilename": 'folder.' + extension,
			//keepFilenameOnRedirect: false,
			subscribe: true
		},
		onSuccess: this.downloadArtSuccessHandler,
		onFailure: this.downloadArtFailHandler
	});
}else{
	downloadDownLoadedArt = true
	this.downloadArtSuccess()
}
}
DownloadsAssistant.prototype.downloadArtSuccess = function(resp){
	if (protocolTest == "http://" || protocolFtpTest == "ftp://") {
		this.progressModel.title = downloadIndex+'/'+totalDownloads+' Art: ' + playListArray[0].album;
		this.progressModel.progress = resp.amountReceived / resp.amountTotal;
		this.controller.modelChanged(this.progressModel);
		downloadDownLoadedArt = resp.completed
		downloadsArtTicketHandler = resp.ticket
		art = resp.target
		//Mojo.Controller.errorDialog(playListArray[0].art)
	}
	else {
		downloadsArtTicketHandler = 00
		art = playListArray[0].art
	}
	if (downloadDownLoadedArt) {
		sceneArray.push({
			song: playListArray[0].song,
			time: playListArray[0].time,
			timeUnformatted: playListArray[0].timeUnformatted,
			artist: playListArray[0].artist,
			album: playListArray[0].album,
			url: URI,
			art: art,
			ticket: downloadsTicketHandler,
			artTicket: downloadsArtTicketHandler,
			size: playListArray[0].size,
			songId: playListArray[0].songId,
			track: playListArray[0].track,
			source: 'downloads',
		})
		db.add(playListName, sceneArray, function(){
			Mojo.Log.info('audioPlaying: '+audioPlaying+' && play: '+play)
			if (audioPlaying == true && play == 'downloads') {
				playItems.push(sceneArray[sceneArray.length - 1])
				if (pushStreamScene == true) {
					streamAss.controller.get('album').innerHTML = playItems[listIndex].album;
					listInfoIndex = listIndex + 1
					streamAss.controller.get('listInfo').innerHTML = listInfoIndex + "/" + playItems.length;
				}else if(pushNowPlayingList == true){
					nowPlayingListAss.controller.get('listInfo').innerHTML = listInfoIndex + "/" + playItems.length;
					nowPlayingListAss.controller.get('listNowPlaying').mojo.noticeUpdatedItems(0,playItems)
/*
					nowPlayingListAss.model.items=playItems;
					nowPlayingListAss.controller.modelChanged(nowPlayingListAss.model);	
*/
				}
			}
			Mojo.Log.info("{downloads} SUCCESS sceneArray SAVE");
		}, function(){
			Mojo.Log.error("{downloads} FAIL sceneArray SAVE")
		});
		downloadsAss.controller.get('listDownloads').mojo.noticeUpdatedItems(0,sceneArray)
/*
		this.listModel.items = sceneArray;
		this.controller.modelChanged(this.listModel);
*/
		
			Mojo.Log.info("playListArray.length = "+playListArray.length)
		playListArray.shift();
		downloadIndex++
		playListSum = playListSum - playListItems[0].timeUnformatted;
		playListItems.shift();
		newPlayListIndex = newPlayListIndex - 1
		
			Mojo.Log.info("playListArray.length = "+playListArray.length)
		if (playListArray.length == 0) {
			this.progressModel.progress = 0;
			this.progressModel.title = 'Downloads Complete';
			this.controller.modelChanged(this.progressModel);
			downloading = false
			this.updateCmdMenu();
			this.clearWakeUp();
			if(stageDeactivated == true){
				Mojo.Controller.getAppController().showBanner("Downloads Complete", {source: 'notification'});
			}
		}
		else {
			this.clearWakeUp();
			this.downloadSongs();
		}
	}
}
DownloadsAssistant.prototype.downloadArtFail = function(resp){
	//Mojo.Controller.errorDialog('Failed to download: '+ playListArray[0].song)//Object.toJSON(event)
	//downloadNext++
	/*
playListArray.shift();
	
	playListSum = playListSum - playListItems[0].timeUnformatted;
	playListItems.shift();
		newPlayListIndex = newPlayListIndex - 1
*/
		
	this.progressModel.progress = 0;
	this.controller.modelChanged(this.progressModel);
	//if (playListArray.length == 0) {
		this.updateCmdMenu();
		this.clearWakeUp();
		this.progressModel.title = 'Download Failed';
		this.controller.modelChanged(this.progressModel);
	//}
}
DownloadsAssistant.prototype.downloadSongs = function(event){
if (internet == true) {
	downloading = true
	//Mojo.Controller.errorDialog(playListArray[0].url)
	this.setWakeUp();
	protocolTest = playListArray[0].url.match("http://")
	protocolFtpTest = playListArray[0].url.match("ftp://")
	if (protocolTest == "http://" || protocolFtpTest == "ftp://") {
	
		this.cmdMenuModel.items = []
		this.controller.modelChanged(this.cmdMenuModel)
		
		$('instructions').hide()
		$('listDL').show()
		
		songName = playListArray[0].song.replace(/\W/g, '-')//.replace(/\s+/g, '-')
		artistName = playListArray[0].artist.replace(/\W/g, '-')//.replace(/\s+/g, '-')
		albumName = playListArray[0].album.replace(/\W/g, '-')//.replace(/\s+/g, '-')
		
/*
				var url = playListArray[0].art,		
					extension = "";
	
				if (url.length != 0) {
					var dotPos = url.lastIndexOf(".");
				if (dotPos != -1) 
					extension = url.substr(dotPos + 1).toLowerCase(); ;
				}
*/
				extension = 'mp3'
		/*songName = songNameNoSpace.replace(/\W/g, '')
		 artistName = artistNameNoSpace.replace(/\W/g, '')
		 albumName = albumNameNoSpace.replace(/\W/g, '')*/
		if (playListArray[0].track == undefined) {
			playListArray[0].track = '00'
		}
		if (stageDeactivated == true) {
			notificationOpen = true
			Mojo.Controller.getAppController().showBanner("Downloading: " + playListArray[0].song, {
				source: 'notification'
			});
			setTimeout(function(){
				notificationOpen = false
				Mojo.Log.info('Downloads notificationOpen: '+notificationOpen)
			},2000)
		}
downloadsSongRequest = this.controller.serviceRequest('palm://com.palm.downloadmanager/', {
			method: 'download',
			parameters: {
				//ticket: ticketNum,
				target: playListArray[0].url,
				"mime": "audio/mpeg",
				"targetDir": "/media/internal/" + path + "/" + playListName + "/" + artistName + "/" + albumName,
				"targetFilename": playListArray[0].track + "-" + songName + "." + extension,
				//keepFilenameOnRedirect: false,
				subscribe: true
			},
			onSuccess: this.downloadSuccessHandler,
			onFailure: this.downloadFailHandler
		});
	}
	else {
		//not a web url
		playListArray.shift();
		
		playListSum = playListSum - playListItems[0].timeUnformatted;
		playListItems.shift();
		newPlayListIndex = newPlayListIndex - 1
		
		if (playListArray.length == 0) {
			this.clearWakeUp();
			this.updateCmdMenu();
			this.progressModel.progress = 0;
			this.progressModel.title = 'Downloads Complete';
			this.controller.modelChanged(this.progressModel);
		}
		else {
			this.clearWakeUp();
			this.downloadSongs();
		}
	}
}
else {
	Mojo.Controller.errorDialog("No Internet available");
}
}
DownloadsAssistant.prototype.downloadSuccess = function(resp){
		downloadsAss.progressModel.title = downloadIndex+'/'+totalDownloads+': ' + playListArray[0].song;
		totalProgress = resp.amountReceived / resp.amountTotal
		downloadsAss.progressModel.progress = resp.amountReceived / resp.amountTotal;
  		downloadsAss.controller.modelChanged(downloadsAss.progressModel);
		downloadDownLoaded = resp.completed
		//Mojo.Controller.errorDialog(downloadDownLoaded)
		downloadsTicketHandler = resp.ticket
		URI = resp.target
		if (downloadDownLoaded){
			this.downloadArt()
		}
}
DownloadsAssistant.prototype.downloadFail = function(event){
	playListArray.shift();
	
	playListSum = playListSum - playListItems[0].timeUnformatted;
	playListItems.shift();
	newPlayListIndex = newPlayListIndex - 1

		
	this.progressModel.progress = 0;
	this.controller.modelChanged(this.progressModel);
	//if (playListArray.length == 0) {
		this.updateCmdMenu();
		this.clearWakeUp();
		this.progressModel.title = 'Download Failed';
		this.controller.modelChanged(this.progressModel);
	//}
/*	
else {
		this.progressModel.title = 'Download Failed';
		this.controller.modelChanged(this.progressModel);
	timeout = setTimeout(function(){downloadsAss.downloadSongs()}, 5000)
}
*/
	this.controller.modelChanged(this.progressModel);
}
DownloadsAssistant.prototype.deleteAtIndex = function(event){
	testIndex = event.index
		this.controller.serviceRequest('palm://com.palm.downloadmanager/', {
			method: 'deleteDownloadedFile',
			parameters: {
				ticket: sceneArray[event.index].ticket
			},
			onSuccess: this.deleteAtIndexSuccessHandler,
			onFailure: this.deleteAtIndexFailHandler
		});	
			albumDupes = false
	for (i = 0; i < sceneArray.length; i++) {
		if (sceneArray.length != 1) {
			if (sceneArray[event.index].album == sceneArray[i].album) {
				albumDupes = true
			}
		}
	}
	if (albumDupes == false) {
		this.controller.serviceRequest('palm://com.palm.downloadmanager/', {
			method: 'deleteDownloadedFile',
			parameters: {
				ticket: sceneArray[event.index].artTicket
			},
			onSuccess: function(){/*Mojo.Controller.errorDialog('delete art success')*/
			},
			onFailure: function(){
				Mojo.Controller.errorDialog('delete art fail')
			}
		});
	}
		
}
DownloadsAssistant.prototype.deleteAtIndexSuccess = function(event){

	this.progressModel.title = 'Delete Success: '+sceneArray[testIndex].song;
  	this.controller.modelChanged(this.progressModel);
	sceneArray.splice(testIndex, 1)
	db.add(playListName, sceneArray, function(){Mojo.Log.info("SUCCESS SAVE");}, function(){ Mojo.Log.error("FAIL SAVE")});
}
DownloadsAssistant.prototype.deleteAtIndexFail = function(event){
	this.progressModel.title = 'Delete Fail: '+sceneArray[testIndex].song;
  	this.controller.modelChanged(this.progressModel);	
	//Mojo.Controller.errorDialog('Delete fail'+ sceneArray[testindex].song)
}
DownloadsAssistant.prototype.deleteSongs = function(event){
	//Mojo.Controller.errorDialog("AmpachPretemp"+listIndex+".mp3"+', '+deleteTicket)
	this.controller.showAlertDialog({
		onChoose: function(value){
			if (value == "delete") {
				index=0
				this.deleteSong()
			}
			else if (value == "cancel") {}
		},
	title: $L("Are you sure you want to DELETE ALL Songs downloaded?"),
		choices: [{
			label: $L("Delete All"),
			value: "delete",
			type: 'primary'
		},{
			label: $L("Cancel"),
			value: "cancel",
			type: 'dismiss'
		}]
	});
}

DownloadsAssistant.prototype.deleteSong = function(event){
		this.controller.get('spinner').mojo.start();
		this.controller.get('scrimSpinner').show();
						this.controller.serviceRequest('palm://com.palm.downloadmanager/', {
							method: 'deleteDownloadedFile',
							parameters: {
							ticket: sceneArray[index].ticket
							},
						onSuccess: this.deleteSuccessHandler,
						onFailure: this.deleteFailHandler
						});	
}
DownloadsAssistant.prototype.deleteSuccess = function(event){
						this.controller.serviceRequest('palm://com.palm.downloadmanager/', {
							method: 'deleteDownloadedFile',
							parameters: {
							ticket: sceneArray[index].artTicket
							},
						onSuccess: function(){
								downloadsAss.progressModel.title = 'Delete success: '+sceneArray[0].song;
  								downloadsAss.controller.modelChanged(downloadsAss.progressModel);
								sceneArray.shift();
/*
								downloadsAss.listModel.items = sceneArray;
								downloadsAss.controller.modelChanged(downloadsAss.listModel);
*/
								downloadsAss.controller.get('listDownloads').mojo.noticeUpdatedItems(0,sceneArray)
								if (sceneArray.length == 0){	
									db.add(playListName, sceneArray, function(){
										downloadsAss.progressModel.title = 'Delete All Success';
							  			downloadsAss.controller.modelChanged(downloadsAss.progressModel);
										downloadsAss.controller.get('scrimSpinner').hide();
										downloadsAss.controller.get('spinner').mojo.stop();
									}, function(){ Mojo.Log.error("FAIL SAVE")});
								}
								else{
									//index++
									downloadsAss.deleteSong()
								}
						},
						onFailure: function(){Mojo.Controller.errorDialog('delete art fail')}
						});		
	//Mojo.Controller.errorDialog('delete success')
}
DownloadsAssistant.prototype.deleteFail = function(event){
	this.progressModel.title = 'Delete All Failed';
  	this.controller.modelChanged(this.progressModel);
	downloadsAss.controller.get('scrimSpinner').hide();
	downloadsAss.controller.get('spinner').mojo.stop();
	Mojo.Controller.errorDialog('Delete '+ sceneArray[p].song +' failed')
}
DownloadsAssistant.prototype.cancelDownload = function(event){
		this.controller.serviceRequest('palm://com.palm.downloadmanager/', {
 				method: 'cancelDownload', 
 				parameters: {
					ticket: downloadsTicketHandler
 			},
  				onSuccess : this.cancelSuccessHandler,
 				onFailure : this.cancelFailHandler
 	});
}
DownloadsAssistant.prototype.cancelSuccess = function(event){
	//Mojo.Controller.errorDialog('cancel success')
	this.clearWakeUp();
	Mojo.Controller.getAppController().showBanner('Downloads Cancelled', {source: 'notification'});
	this.progressModel.progress = 0;
	if (playListArray.length == 1) {
			this.progressModel.title = playListArray.length + ' Download Queued';
	}
	else {
			this.progressModel.title = playListArray.length + ' Downloads Queued';
	}
	this.controller.modelChanged(this.progressModel);
	this.updateCmdMenu();
	//deleteTicket++
}
DownloadsAssistant.prototype.cancelFail = function(event){
	//Mojo.Controller.errorDialog('cancel fail')
	Mojo.Controller.getAppController().showBanner('Downloads failed to Cancel', {source: 'notification'});
	this.progressModel.progress = 0;
	this.progressModel.title = 'Failed to Cancel';
	this.controller.modelChanged(this.progressModel);
	this.updateCmdMenu();
	this.clearWakeUp();
}
DownloadsAssistant.prototype.handleCommand = function(event){
	//this.currentScene=Mojo.Controller.stageController.activeScene();
	if (event.type == Mojo.Event.command) {
		switch (event.command) {
		
			case 'download':
				this.downloadSongs()
				break;
			case 'pushStream':
				this.pushStream();
				break;
			case 'deleteAll':
				this.deleteSongs();	
				break;
			case 'clearList':
				this.clearList();	
				break;
			case 'clearQue':
				this.clearQue();	
				break;
			case 'savePlaylist':
				this.savePlaylist();	
				break;	
		}
	}
	if (event.type == Mojo.Event.back) {
/*
		if (!downloadDownLoadedArt || !downloadDownLoaded){
			this.controller.showAlertDialog({
				onChoose: function(value){
					if (value == "OK") {
						this.controller.stageController.popScene();
					}
					else if (value == "cancel") {}
				},
			title: $L("If you exit the current download will be canceled"),
				choices: [{
					label: $L("OK"),
					value: "OK",
					type: 'primary'
				},{
					label: $L("Cancel"),
					value: "cancel",
					type: 'dismiss'
				}]
			});
		}else{
			this.controller.stageController.popScene();
		}
*/
	}
}

DownloadsAssistant.prototype.toTop = function(){
		move = []
		move = sceneArray.splice(popupIndex, 1)
		sceneArray.unshift(move[0])
		$('listDownloads').mojo.noticeUpdatedItems(0,sceneArray)
/*
		this.listModel.items = sceneArray;
		this.controller.modelChanged(this.listModel);	
*/
		db.add(playListName, sceneArray, function(){Mojo.Log.info("to top: SUCCESS downloads SAVE");}, function(){ Mojo.Log.error("to top: FAIL downloads SAVE")});
}
DownloadsAssistant.prototype.toBottom = function(){
		move = []
		move = sceneArray.splice(popupIndex, 1)
		sceneArray.push(move[0])
		$('listDownloads').mojo.noticeUpdatedItems(0,sceneArray)
/*
		this.listModel.items = sceneArray;
		this.controller.modelChanged(this.listModel);
*/
 		Mojo.Controller.errorDialog(move[0]);
		db.add(playListName, sceneArray, function(){Mojo.Log.info("to bottom: SUCCESS downloads SAVE");}, function(){ Mojo.Log.error("to bottom: FAIL downloads SAVE")});
}
DownloadsAssistant.prototype.pushStream = function(event){
	var target = event.originalEvent.target.className;
	popupIndex = event.index;
	Mojo.Log.info('target: '+target);
	if (target !== "addFavs") {
		this.controller.get('spinner').mojo.start();
		this.controller.get('scrimSpinner').show();
		this.progressModel.title = 'Playing...';
		this.controller.modelChanged(this.progressModel);
		listIndex = event.index
		//playItems = sceneArray
		this.controller.stageController.pushScene({
			name: "stream",
			//transition: Mojo.Transition.crossFade,
			disableSceneScroller: true
		}, 'downloads');
		if(ticketNumArray.length != 0){
			audioAss.deleteSongs();
		}
		audioAss.clone(sceneArray);
		this.controller.get('scrimSpinner').hide();
		this.controller.get('spinner').mojo.stop();
	}
	else {
		this.controller.popupSubmenu({
			onChoose: this.popupHandler,
			placeNear: event.originalEvent.target,
			items: [{
				label: 'Add to Now Playing',
				command: 'addToNow'
			}, {
				label: 'Add to Playlist',
				command: 'addTolist'
			}, {
				label: 'Bookmark Song',
				command: 'bookMarkSong'
			}, {
				label: 'To Top',
				command: 'toTop'
			}, {
				label: 'To Bottom',
				command: 'toBottom'
			}, {
				label: 'Edit Song Info',
				command: 'editInfo'
			}, {
				label: 'Cancel',
				command: 'cancel'
			}]
		});
	}
}		
DownloadsAssistant.prototype.clone = function(arr){
	playListArray = []
for (i = 0; i<arr.length; i++){
			playListArray.push({
					song: arr[i].song,
					songId: arr[i].songId,
					time: arr[i].time,
					timeUnformatted: arr[i].timeUnformatted,
					artist: arr[i].artist,
					album: arr[i].album,
					url: arr[i].url,
					size: arr[i].size,
					art: arr[i].art,
					urlAdd: arr[i].urlAdd
					})
	}
	totalDownloads=playListArray.length
	this.updateUrls();
};
DownloadsAssistant.prototype.moveAtIndex = function(event){
					move = []
					move = sceneArray.splice(event.fromIndex, 1) 
					sceneArray.splice(event.toIndex, 0, move[0]) 
			db.add(playListName, sceneArray, function(){Mojo.Log.info("SUCCESS SAVE");}, function(){ Mojo.Log.error("FAIL SAVE")});
}
DownloadsAssistant.prototype.clearList = function(event){
	this.controller.showAlertDialog({
		onChoose: function(value){
			if (value == "clear") {
					sceneArray.length=0;
					downloadsAss.controller.get('listDownloads').mojo.noticeUpdatedItems(0,sceneArray)
/*
					this.listModel.items = sceneArray;
					this.controller.modelChanged(this.listModel);
*/
					this.progressModel.title = 'Clear Success';
  					this.controller.modelChanged(this.progressModel);
					db.add(playListName, sceneArray, function(){Mojo.Log.info("SUCCESS SAVE");}, function(){ Mojo.Log.error("FAIL SAVE")});
					//Remove the main playlist cookie
					//downloadCookie = new Mojo.Model.Cookie('downloads0');
					//downloadCookie.remove();
			}
			else if (value == "cancel") {}
		},
	title: $L("This will not delete any files downloaded. It will just clear the Playlist you see."),
		choices: [{
			label: $L("Clear"),
			value: "clear",
			type: 'primary'
		},{
			label: $L("Cancel"),
			value: "cancel",
			type: 'dismiss'
		}]
	});
}
DownloadsAssistant.prototype.popup = function(command){
		switch (command) {
		
			case 'addTolist':
				this.addTolist();
				break;
			case 'editInfo':
				this.editInfo();
				break;
			case 'cancel':
				//function(){};
				break;	
			case 'toTop':
				this.toTop();
				break;
			case 'addToNow':
				//tapToAdd = true
				audioAss.addToNowPlaying(sceneArray[popupIndex])
				break;
			case 'toBottom':
				this.toBottom();
				break;
			case 'bookMarkSong':
				audioAss.bookMarkSong(sceneArray[popupIndex]);
				break;		
		}
}
DownloadsAssistant.prototype.addTolist = function(){
			//Mojo.Controller.errorDialog(list[popupIndex].artistId);
		playListItems[newPlayListIndex] = {
			song: sceneArray[popupIndex].song,
			time: sceneArray[popupIndex].time,
			timeUnformatted: sceneArray[popupIndex].timeUnformatted,
			artist: sceneArray[popupIndex].artist,
			album: sceneArray[popupIndex].album,
			url: sceneArray[popupIndex].url,
			art: sceneArray[popupIndex].art,
			size: sceneArray[popupIndex].size,
			songId: sceneArray[popupIndex].songId,
			track: sceneArray[popupIndex].track,
			source: 'downloads',
			urlAdd: false
		}
		playListSum = playListSum + playListItems[newPlayListIndex].timeUnformatted;
		newPlayListIndex=newPlayListIndex+1;
}
DownloadsAssistant.prototype.clearQue = function(){
	if (this.progressModel.progress != 0){
		this.cancelDownload();
	}
			playListItems.length=0;
			playListArray.length = 0
			newPlayListIndex = 0;
			totalPlayListTime = '0:00';
			playListSum = 0;
			this.progressModel.title = 'No Downloads Queued';
			this.controller.modelChanged(this.progressModel);
			this.updateCmdMenu();
}
DownloadsAssistant.prototype.editInfo = function(event){
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		this.controller.stageController.pushScene({
			name: "urlAdd",
			disableSceneScroller: false
		}, true, 'downloads');
	}else{
		this.controller.stageController.pushScene({
			name: "urlAdd",
			disableSceneScroller: true
		}, true, 'downloads');
	}
}
DownloadsAssistant.prototype.updateCmdMenu = function(){
	if (downloadsNoLogin == true && playListArray.length > 0) {
		this.cmdMenuModel.items = [
			{}, 
			{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'}, {label: $L(''),icon: 'downloadSave',command: 'download'},{label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
			{label: $L(''),icon: 'www',command: 'urlAdd'}, 
		]
	}
	
	else 
		if (downloadsNoLogin == false && playListArray.length > 0) {
			this.cmdMenuModel.items = [
				{label: $L(''),icon: 'home',command: 'backToSearch'}, 
				{items: [{	label: $L(''),icon: 'nowPlaying',command: 'stream'}, {label: $L(''),icon: 'downloadSave',command: 'download'}, {label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
				{label: $L(''),icon: 'www',command: 'urlAdd'}, 
			]
		}
		else 
			if (downloadsNoLogin == false) {
				this.cmdMenuModel.items = [
					{label: $L(''),icon: 'home',command: 'backToSearch'}, 
					{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'}, {label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
					{label: $L(''),icon: 'www',command: 'urlAdd'}, 
				]
				
			}
			else 
				if (downloadsNoLogin == true) {
					if (internet == true) {
						this.cmdMenuModel.items = [ 
							{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'}, {label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
							{label: $L(''),icon: 'www',command: 'urlAdd'}, 
						]
					}
					else {
						this.cmdMenuModel.items = [
							{},
						 	{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'}, {label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
							{}, 
							]
					}
				}
			this.controller.modelChanged(this.cmdMenuModel)
}
DownloadsAssistant.prototype.setWakeUp = function(){
activityStartRequest = this.controller.serviceRequest("palm://com.palm.power/com/palm/power", {
			    method: "activityStart",
			    parameters: {
			        id: "net.nucleardecay.ampachpre.stayAwake",
			        duration_ms: '900000'
			    },
			    onSuccess: function(){
								Mojo.Log.info("App serviceRequest activityStart")
							},
			    onFailure: function(err){
								Mojo.Log.error("App serviceRequest activityStart failed: "+err.errorText)}
							}
			);
}
DownloadsAssistant.prototype.clearWakeUp = function(){
activityEndRequest = this.controller.serviceRequest("palm://com.palm.power/com/palm/power", {
			    method: "activityEnd",
			    parameters: {
			        id: "net.nucleardecay.ampachpre.stayAwake",
			    },
			    onSuccess: function(){
								Mojo.Log.info("App serviceRequest activityEnd")
							},
			    onFailure: function(err){
								Mojo.Log.error("App serviceRequest activityEnd fail "+err.errorText)}
							}
			);
}

DownloadsAssistant.prototype.updateProgressModel = function(){
	if (downloadsNoLogin == true && playListArray.length == 0) {
		this.progressModel.title = 'Downloads: Offline Mode';
	}
	else 
		if (playListArray.length != 0) {
			if (playListArray.length == 1) {
				this.progressModel.title = playListArray.length + ' Download Queued';
			}
			else {
				this.progressModel.title = playListArray.length + ' Downloads Queued';
			}
		}
		else 
			if (playListArray.length == 0) {
				this.progressModel.title = 'No Downloads Queued';
			}
			
	this.controller.modelChanged(this.progressModel);
}	
DownloadsAssistant.prototype.activateWindow = function(event){
		stageDeactivated = false
}

DownloadsAssistant.prototype.deactivateWindow = function(event){
		stageDeactivated = true
}
DownloadsAssistant.prototype.updateUrls = function(event){
	for (i = 0; i < playListArray.length; i++) {
		protocolTest = playListArray[i].art.match("http://")
		protocolTestSsl = playListArray[i].art.match("https://")
		if (playListArray[i].urlAdd == false) {
			if (protocolTest == "http://" || protocolTestSsl == "https://") {
				//art url
				serverIndexArt = playListArray[i].art.indexOf('image.php?')
				authIndexArt = playListArray[i].art.indexOf('auth=')
				oidIndexArt = playListArray[i].art.indexOf('&name=')
				urlIdArt = playListArray[i].art.slice(serverIndexArt, authIndexArt)
				urlSecondArt = playListArray[i].art.slice(oidIndexArt)
				playListArray[i].art = "http://" + server + streamingPort + "/" + directory + "/" + urlIdArt + "auth=" + token + urlSecondArt
			}
			protocolTest = playListArray[i].url.match("http://")
			protocolTestSsl = playListArray[i].url.match("https://")
			if (protocolTest == "http://" || protocolTestSsl == "https://") {
				//mp3 urls
				//sidIndex = playItems[i].url.indexOf('sid=')
				oidIndex = playListArray[i].url.indexOf('&oid=')
				//urlFirst = playItems[i].url.slice(0, sidIndex + 4)
				urlSecond = playListArray[i].url.slice(oidIndex)
				namePos = urlSecond.indexOf("&name=");
				//Mojo.Log.info('dotPos: '+dotPos)
				urlSecondNoExtenze = urlSecond.slice(0, namePos)
				//Mojo.Log.info('urlSecondNoExtenze: '+urlSecondNoExtenze)
				if (ampacheVersion == '3.5.2' || ampacheVersion == '3.5.3') {
					playListArray[i].urlBackup = playListArray[i].url
					playListArray[i].url = "http://" + server + streamingPort + "/" + directory + '/play/index.php?sid=' + token + urlSecondNoExtenze.replace(/\s+/g, '%20')
				}
				else {
					playListArray[i].urlBackup = playListArray[i].url
					playListArray[i].url = "http://" + server + streamingPort + "/" + directory + '/play/index.php?ssid=' + token + urlSecondNoExtenze.replace(/\s+/g, '%20')
				}
			}
			
		//Mojo.Controller.errorDialog(playListArray[0].url);
		}
	}
	this.updateProgressModel()
	this.updateCmdMenu()
}