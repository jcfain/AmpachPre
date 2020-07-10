function PlaylistAssistant() {
	document.getElementById('sceneStyle').style.backgroundImage =  "url(" + backGroundImage + ")";
	document.getElementById('sceneStyle').style.color =  textColor;
	document.getElementById('listBorder').style.border =  "2px solid "+textColor;
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		document.getElementById('scrollerId').style.height = '260px';
	}
}
PlaylistAssistant.prototype.setup = function() {
	playlistAss = this
	this.controller.setupWidget(Mojo.Menu.appMenu, accountsAttr, appMenuModel);
		
		this.cmdMenuModel = {
  				visible: true,
  					items: [
							{label: $L(''),icon: 'home',command: 'backToSearch'},
							//{label: $L(''),icon: 'lists',command: 'savedPlaylists'},
							{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'},{label: $L(''),icon: 'addNowPlaying',command: 'addNowPlaying'},{label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
   							//{label: $L(''), icon:'downloads', command:'downloads'},
							{label: $L(''),icon: 'cancelDownload',command: 'clearPlaylist'},
							]
  							
						};
		this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass:'no-fade'}, this.cmdMenuModel)
			
	this.controller.setupWidget("listPlayList", {
    	itemTemplate: "playlist/rowTemplate",
    	listTemplate: "playlist/listTemplate",
		fixedHeightItems: true,
		swipeToDelete: true, 
		reorderable: true, 
		renderLimit: 20,
    }, 
	this.model = {
        items: playListItems
    });
	
	
	this.controller.setupWidget("scrollerId",
         this.scrollerAttributes = {
             mode: 'vertical'
         },
         this.scrollerModel = {
         });
		 
		this.controller.setupWidget("spinner", this.attributes = {
			spinnerSize: 'large'
		}, this.spinnerModel = {
			spinning: false
		});		
			 
    this.playAtIndexHandler = this.playAtIndex.bindAsEventListener(this);
	this.listPlayListHandler = this.controller.get('listPlayList');	
	this.deleteAtIndexHandler = this.deleteAtIndex.bindAsEventListener(this);
	this.moveAtIndexHandler = this.moveAtIndex.bindAsEventListener(this);
	this.popupHandler = this.popup.bind(this)
}
PlaylistAssistant.prototype.activate = function(event) {
	this.formatTotalPlayListTime();
		stageAss.listResize()
	Mojo.Event.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.listen(this.listPlayListHandler, Mojo.Event.listTap, this.playAtIndexHandler);
	this.controller.listen(this.listPlayListHandler, Mojo.Event.listDelete, this.deleteAtIndexHandler);
	this.controller.listen(this.listPlayListHandler, Mojo.Event.listReorder, this.moveAtIndexHandler);
		Mojo.Event.listen(this.controller.window, 'resize', listResizeHandler);
/*
			this.model.items=playListItems;
			this.controller.modelChanged(this.model);	
*/ 	 	  
		playlistAss.controller.get('listPlayList').mojo.noticeUpdatedItems(0,playListItems)	 
}


PlaylistAssistant.prototype.deactivate = function(event) {
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.stopListening(this.listPlayListHandler, Mojo.Event.listTap, this.playAtIndexHandler);
	this.controller.stopListening(this.listPlayListHandler, Mojo.Event.listDelete, this.deleteAtIndexHandler);
	this.controller.stopListening(this.listPlayListHandler, Mojo.Event.listReorder, this.moveAtIndexHandler);	 
		Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);	 	 
}

PlaylistAssistant.prototype.cleanup = function(event) {
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.stopListening(this.listPlayListHandler, Mojo.Event.listTap, this.playAtIndexHandler);
	this.controller.stopListening(this.listPlayListHandler, Mojo.Event.listDelete, this.deleteAtIndexHandler);
	this.controller.stopListening(this.listPlayListHandler, Mojo.Event.listReorder, this.moveAtIndexHandler);	
		Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler); 	 
	//playList.put({savedPlayList: playListItems})
}

PlaylistAssistant.prototype.playAtIndex = function(event){
if (internet == true) {
	var target = event.originalEvent.target.className;
	popupIndex = event.index;
	// Mojo.Controller.errorDialog(target);
	if (target !== "addFavs") {
		this.controller.get('spinner').mojo.start();
		this.controller.get('scrimSpinner').show();
		listIndex = event.index;
		this.controller.stageController.pushScene({
			name: "stream",
			//transition: Mojo.Transition.crossFade,
			disableSceneScroller: true
		}, false);
		if(ticketNumArray.length != 0){
			audioAss.deleteSongs();
		}
		audioAss.clone(playListItems);
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
else {
	Mojo.Controller.errorDialog("No Internet available");
}  
}
PlaylistAssistant.prototype.popup = function(command){
		switch (command) {
		
			case 'toTop':
				this.toTop();
				break;
			case 'toBottom':
				this.toBottom();
				break;
			case 'addToNow':
				//tapToAdd = true
				audioAss.addToNowPlaying(playListItems[popupIndex])
				break;
			case 'cancel':
				//function(){};
				break;
		}
}
PlaylistAssistant.prototype.toTop = function(){
		move = []
		move = playListItems.splice(popupIndex, 1)
		playListItems.unshift(move[0])
/*
		this.model.items=playListItems;
		this.controller.modelChanged(this.model);
*/
		playlistAss.controller.get('listPlayList').mojo.noticeUpdatedItems(0,playListItems)	 
}
PlaylistAssistant.prototype.toBottom = function(){
		move = []
		move = playListItems.splice(popupIndex, 1)
		playListItems.push(move[0])
/*
		this.model.items=playListItems;
		this.controller.modelChanged(this.model);
*/	 
		playlistAss.controller.get('listPlayList').mojo.noticeUpdatedItems(0,playListItems)	 
}
PlaylistAssistant.prototype.clearList = function(){
if (playListItems.length > 0) {
	this.controller.showAlertDialog({
		onChoose: function(value){
			if (value == "clear") {
				playListItems.length = 0;
				newPlayListIndex = 0;
				totalPlayListTime = '0:00';
				playListSum = 0;
				this.controller.get('header').innerHTML = "Playlist Songs: " + playListItems.length + ", Runtime: " + totalPlayListTime;
				this.model.items = playListItems;
				this.controller.modelChanged(this.model);
			}
			else 
				if (value == "cancel") {
				}
		},
		title: $L("Are you sure you want to clear the current playlist? This action cannot be undone."),
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

PlaylistAssistant.prototype.handleCommand = function(event){
	//this.currentScene=Mojo.Controller.stageController.activeScene();
	if (event.type == Mojo.Event.command) {
		switch (event.command) {
		
			case 'clearPlaylist':
				this.clearList();
				break;
			case 'addNowPlaying':
				this.addNowPlaying();
				break;
		}
	}
}
PlaylistAssistant.prototype.deleteAtIndex = function(event){
					playListSum = playListSum - playListItems[event.index].timeUnformatted;
					//Mojo.Controller.errorDialog(playListItems[event.index].timeUnformatted)
					playListItems.splice(event.index, 1)
					newPlayListIndex = newPlayListIndex-1
					this.formatTotalPlayListTime();
					this.controller.get('header').innerHTML = "Playlist Songs: " + playListItems.length + ", Runtime: " + totalPlayListTime;
}
PlaylistAssistant.prototype.moveAtIndex = function(event){
					move = []
					move = playListItems.splice(event.fromIndex, 1) 
					playListItems.splice(event.toIndex, 0, move[0]) 
}
PlaylistAssistant.prototype.formatTotalPlayListTime = function(){
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
	this.controller.get('header').innerHTML =  playListItems.length + " songs" + ", Runtime: " + totalPlayListTime;
}

PlaylistAssistant.prototype.addNowPlaying = function(event){
	for(i=0;i<playListItems.length;i++){
		audioAss.addToNowPlaying(playListItems[i])
	}
		Mojo.Controller.getAppController().showBanner(playListItems.length+' songs added to playlist.', {
			source: 'notification'
		});	
}
