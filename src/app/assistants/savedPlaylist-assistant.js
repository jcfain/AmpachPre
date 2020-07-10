function SavedPlaylistAssistant() {
	document.getElementById('sceneStyle').style.backgroundImage =  "url(" + backGroundImage + ")";
	document.getElementById('sceneStyle').style.color =  textColor;
	document.getElementById('listBorder').style.border =  "2px solid "+textColor;
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		document.getElementById('scrollerId').style.height = '260px';
	}
}

SavedPlaylistAssistant.prototype.setup = function() {
	
	savedPlaylistAss = this
	stageAss.updatePlaylistSource(savedPlaylistArray, 'savedPlaylist', playListName);
	//this.clone(playListItems)
	if (savedPlaylistArray.length == 0 && playListItems.length != 0) {
		$('status').innerHTML = 'Save ' + playListItems.length + ' songs to playlist'
		this.cmdMenuModel = {
			visible: true,
			items: [
			{label: $L(''),icon: 'home',command: 'backToSearch'},
			{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'},{label: $L(''),icon: 'downloadSave',command: 'savePlaylist'},{label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
			{label: $L(''),icon: 'cancelDownload',command: 'clearList'},
			]
		};
	}
	else 
		if (savedPlaylistArray.length != 0 && playListItems.length != 0) {
			$('status').innerHTML = 'Add ' + playListItems.length + ' songs to current playlist'
			this.cmdMenuModel = {
				visible: true,
				items: [
				{label: $L(''),icon: 'home',command: 'backToSearch'},
				{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'},{label: $L(''),icon: 'downloadSave',command: 'savePlaylist'},{label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
				{label: $L(''),icon: 'cancelDownload',command: 'clearList'},
				]
			};
		}
		else {
			$('status').innerHTML = nameAtIndex
			this.cmdMenuModel = {
				visible: true,
				items: [ 
				{label: $L(''),icon: 'home',command: 'backToSearch'},
				{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'},{label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
				{label: $L(''),icon: 'cancelDownload',command: 'clearList'},
				]
			};
		};

this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass:'no-fade'}, this.cmdMenuModel)

	savedplaylistModel = {
		visible: true,
		items: [{
			label: "Now Playing",
			command: 'stream'
		},	{
			label: "Now Playing List",
			command: 'nowPlayingList'
		},	{
			label: "Change Account",
			command: 'accounts'
		}, {
			label: "Refresh Login", 
			command: 'reLog'
		}, {
			label: "Back to Search",
			command: 'backToSearch'
		},{
			label: "Download Playlist",
			command: 'downloadPlaylist'
		},{
			label: "About",
			command: 'do-myAbout'
		}, ]
	};
	savedplaylistAttr = {
		omitDefaultItems: true
	};	
this.controller.setupWidget(Mojo.Menu.appMenu, savedplaylistAttr, savedplaylistModel);

	this.controller.setupWidget("listPlaylist", {
    	itemTemplate: "savedPlaylist/rowTemplate",
    	listTemplate: "savedPlaylist/listTemplate",
		fixedHeightItems: true,
		swipeToDelete: true, 
		reorderable: true, 
		renderLimit: 20,
    }, 
	this.listModel = {
        items: savedPlaylistArray
    });
	
//spinner
	   this.controller.setupWidget("spinner",
         this.attributes = {
             spinnerSize: 'large'
         },
         this.model = {
             spinning: false 
         });

this.listPlaylistHandler = this.controller.get('listPlaylist');
this.playAtIndexHandler = this.pushStream.bind(this);
this.deleteAtIndexHandler = this.deleteAtIndex.bind(this)
this.moveAtIndexHandler = this.moveAtIndex.bind(this);
this.popupHandler = this.popup.bind(this)	
}

SavedPlaylistAssistant.prototype.activate = function(event) {
		stageAss.listResize()
	Mojo.Event.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.listen(this.listPlaylistHandler, Mojo.Event.listTap, this.playAtIndexHandler);
	this.controller.listen(this.listPlaylistHandler, Mojo.Event.listDelete, this.deleteAtIndexHandler);
	this.controller.listen(this.listPlaylistHandler, Mojo.Event.listReorder, this.moveAtIndexHandler); 
	Mojo.Event.listen(this.controller.window, 'resize', listResizeHandler);
}


SavedPlaylistAssistant.prototype.deactivate = function(event) {
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.stopListening(this.listPlaylistHandler, Mojo.Event.listTap, this.playAtIndexHandler);
	this.controller.stopListening(this.listPlaylistHandler, Mojo.Event.listDelete, this.deleteAtIndexHandler);
	this.controller.stopListening(this.listPlaylistHandler, Mojo.Event.listReorder, this.moveAtIndexHandler);
	Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
}

SavedPlaylistAssistant.prototype.cleanup = function(event) {
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.stopListening(this.listPlaylistHandler, Mojo.Event.listTap, this.playAtIndexHandler);
	this.controller.stopListening(this.listPlaylistHandler, Mojo.Event.listDelete, this.deleteAtIndexHandler);
	this.controller.stopListening(this.listPlaylistHandler, Mojo.Event.listReorder, this.moveAtIndexHandler);
	Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
}
SavedPlaylistAssistant.prototype.clone = function(arr){
	savedPlaylistArrayTemp = []
for (i = 0; i<arr.length; i++){
			savedPlaylistArrayTemp.push({
					song: arr[i].song,
					songId: arr[i].songId,
					time: arr[i].time,
					artist: arr[i].artist,
					album: arr[i].album,
					url: arr[i].url,
					size: arr[i].size,
					art: arr[i].art
					})
	}
	//newPlayListIndex = 0;
	//totalPlayListTime = '0:00';
	//playListSum = 0;
	//PlaylistAssistant.prototype.clearList()
};
SavedPlaylistAssistant.prototype.handleCommand = function(event){
	//this.currentScene=Mojo.Controller.stageController.activeScene();
	if (event.type == Mojo.Event.command) {
		switch (event.command) {
			case 'clearList':
				this.clearList();	
				break;
			case 'savePlaylist':
				this.savePlaylist();	
				break;
			case 'downloadPlaylist':
				this.downloadPlaylist();	
				break;				
		}
	}
}
SavedPlaylistAssistant.prototype.savePlaylist = function(event){
		$('status').innerHTML = 'Saving...'
	for(i=0; i<playListItems.length; i++){
		savedPlaylistArray.push(playListItems[i])
		
    protocolTest = playListItems[i].url.match("http://")
	
   		if (protocolTest == "http://") {
			savedPlaylistArray[i].source = 'savedPlaylist'
		}else{
			savedPlaylistArray[i].source = 'downloads'
		}
	}
	//Mojo.Controller.errorDialog(savedPlaylistArray.length)
		db.add(playListName, savedPlaylistArray, function(){
			Mojo.Log.info("SUCCESS SAVE");
			savedPlaylistAss.listModel.items = savedPlaylistArray
			savedPlaylistAss.controller.modelChanged(savedPlaylistAss.listModel)
		$('status').innerHTML = 'Playlist Saved!'
		
			savedPlaylistAss.cmdMenuModel.items = [ 
				{label: $L(''),icon: 'home',command: 'backToSearch'},
				{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'},{label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
				{label: $L(''),icon: 'cancelDownload',command: 'clearList'},
				];
			savedPlaylistAss.controller.modelChanged(savedPlaylistAss.cmdMenuModel)
			playListItems.length=0;
			newPlayListIndex = 0;
			totalPlayListTime = '0:00';
			playListSum = 0;
		}, function(){ Mojo.Log.info("FAIL SAVE")});
}
SavedPlaylistAssistant.prototype.moveAtIndex = function(event){
					move = []
					move = savedPlaylistArray.splice(event.fromIndex, 1) 
					savedPlaylistArray.splice(event.toIndex, 0, move[0]) 
			db.add(playListName, savedPlaylistArray, function(){Mojo.Log.info("SUCCESS SAVE");}, function(){ Mojo.Log.info("FAIL SAVE")});
}
SavedPlaylistAssistant.prototype.deleteAtIndex = function(event){
	savedPlaylistArray.splice(event.index, 1)
	db.add(playListName, savedPlaylistArray, function(){Mojo.Log.info("SUCCESS SAVE");}, function(){ Mojo.Log.info("FAIL SAVE")});
}
SavedPlaylistAssistant.prototype.pushStream = function(event){	
if (internet == true) {
	var target = event.originalEvent.target.className;
	popupIndex = event.index;
	// Mojo.Controller.errorDialog(target);
	if (target !== "addFavs") {
		this.controller.get('spinner').mojo.start();
		this.controller.get('scrimSpinner').show();
		listIndex = event.index
		if(ticketNumArray.length != 0){
			audioAss.deleteSongs();
		}
		this.controller.stageController.pushScene({
			name: "stream",
			//transition: Mojo.Transition.crossFade,
			disableSceneScroller: true
		}, 'savedPlaylist');
		audioAss.clone(savedPlaylistArray);
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
				label: 'To Top',
				command: 'toTop'
			}, {
				label: 'To Bottom',
				command: 'toBottom'
			}, {
				label: 'Edit',
				command: 'edit'
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
SavedPlaylistAssistant.prototype.popup = function(command){
		switch (command) {
		
			case 'addTolist':
				this.addTolist();
				break;
			case 'toTop':
				this.toTop();
				break;
			case 'toBottom':
				this.toBottom();
				break;
			case 'edit':
				this.edit()
				break;
			case 'addToNow':
				//tapToAdd = true
				audioAss.addToNowPlaying(savedPlaylistArray[popupIndex])
				break;
			case 'cancel':
				//function(){};
				break;
		}
}
SavedPlaylistAssistant.prototype.toTop = function(){
		move = []
		move = savedPlaylistArray.splice(popupIndex, 1)
		savedPlaylistArray.unshift(move[0])
/*
		this.listModel.items = savedPlaylistArray;
		this.controller.modelChanged(this.listModel);	
*/
		savedPlaylistAss.controller.get('listPlaylist').mojo.noticeUpdatedItems(0,savedPlaylistArray)
		db.add(playListName, savedPlaylistArray, function(){Mojo.Log.info("SUCCESS SAVE");}, function(){ Mojo.Log.info("FAIL SAVE")});
}
SavedPlaylistAssistant.prototype.toBottom = function(){
		move = []
		move = savedPlaylistArray.splice(popupIndex, 1)
		savedPlaylistArray.push(move[0])
/*
		this.listModel.items = savedPlaylistArray;
		this.controller.modelChanged(this.listModel);
*/
		savedPlaylistAss.controller.get('listPlaylist').mojo.noticeUpdatedItems(0,savedPlaylistArray)
		db.add(playListName, savedPlaylistArray, function(){Mojo.Log.info("SUCCESS SAVE");}, function(){ Mojo.Log.info("FAIL SAVE")});
}
SavedPlaylistAssistant.prototype.clearList = function(event){
if (savedPlaylistArray.length > 0) {
	this.controller.showAlertDialog({
		onChoose: function(value){
			if (value == "clear") {
				savedPlaylistArray.length = 0;
/*
				this.listModel.items = savedPlaylistArray;
				this.controller.modelChanged(this.listModel);
*/
		savedPlaylistAss.controller.get('listPlaylist').mojo.noticeUpdatedItems(0,savedPlaylistArray)
				db.add(playListName, savedPlaylistArray, function(){
					Mojo.Log.info("SUCCESS SAVE");
				}, function(){
					Mojo.Log.info("FAIL SAVE")
				});
				//Remove the main playlist cookie
				//downloadCookie = new Mojo.Model.Cookie('downloads0');
				//downloadCookie.remove();
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

SavedPlaylistAssistant.prototype.edit = function(event){
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		this.controller.stageController.pushScene({
			name: "urlAdd",
			disableSceneScroller: false
		}, true, 'savedPlaylist');
	}else{
		this.controller.stageController.pushScene({
			name: "urlAdd",
			disableSceneScroller: true
		}, true, 'savedPlaylist');
	}
}
SavedPlaylistAssistant.prototype.downloadPlaylist = function(event){
for (i = 0; i<savedPlaylistArray.length; i++){
			playListItems.push({
					song: savedPlaylistArray[i].song,
					songId: savedPlaylistArray[i].songId,
					time: savedPlaylistArray[i].time,
					timeUnformatted: savedPlaylistArray[i].timeUnformatted,
					artist: savedPlaylistArray[i].artist,
					album: savedPlaylistArray[i].album,
					url: savedPlaylistArray[i].url,
					size: savedPlaylistArray[i].size,
					art: savedPlaylistArray[i].art,
					urlAdd: savedPlaylistArray[i].urlAdd,
					source: 'savedPlaylist',
					})
	playListSum = playListSum + playListItems[newPlayListIndex].timeUnformatted;
	newPlayListIndex++
	}
	stageAss.handleCommand({type:Mojo.Event.command, command:'downloads'})
}

SavedPlaylistAssistant.prototype.addTolist = function(){
			//Mojo.Controller.errorDialog(list[popupIndex].artistId);
			playListItems.push({
					song: savedPlaylistArray[popupIndex].song,
					songId: savedPlaylistArray[popupIndex].songId,
					time: savedPlaylistArray[popupIndex].time,
					timeUnformatted: savedPlaylistArray[popupIndex].timeUnformatted,
					artist: savedPlaylistArray[popupIndex].artist,
					album: savedPlaylistArray[popupIndex].album,
					url: savedPlaylistArray[popupIndex].url,
					size: savedPlaylistArray[popupIndex].size,
					art: savedPlaylistArray[popupIndex].art,
					urlAdd: savedPlaylistArray[popupIndex].urlAdd,
					source: 'savedPlaylist'
					})
	playListSum = playListSum + playListItems[newPlayListIndex].timeUnformatted;
	newPlayListIndex++
}