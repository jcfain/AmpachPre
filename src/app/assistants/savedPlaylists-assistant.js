function SavedPlaylistsAssistant() {
	document.getElementById('sceneStyle').style.backgroundImage =  "url(" + backGroundImage + ")";
	document.getElementById('sceneStyle').style.color =  textColor;
	document.getElementById('listBorder').style.border =  "2px solid "+textColor;
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		document.getElementById('scrollerId').style.height = '260px';
	}
}
SavedPlaylistsAssistant.prototype.setup = function() {
	savedPlaylistsAss = this	
	
if (lastFmPassWord != "" && lastFmUserName != "") {
	savedPlaylistsMenuModel = {
		visible: true,
		items: [{
			label: "Now Playing",
			command: 'stream'
		},	{
			label: "Now Playing List",
			command: 'nowPlayingList'
		},	{
			label: "Headphone Controls: "+headPhoneControls,
			command: 'savedPlaylistsToggleHeadPhoneControls'
		},	{
			label: "Scrobbling: "+scrobble,
			command: 'savedPlaylistsToggleScrobble'
		},	{
			label: "Get Playlists",
			command: 'getPlaylists'
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
	savedPlaylistsMenuModel = {
		visible: true,
		items: [{
			label: "Now Playing",
			command: 'stream'
		},	{
			label: "Now Playing List",
			command: 'nowPlayingList'
		},	{
			label: "Headphone Controls: "+headPhoneControls,
			command: 'savedPlaylistsToggleHeadPhoneControls'
		},	{
			label: "Get Playlists",
			command: 'getPlaylists'
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
	
	this.controller.setupWidget(Mojo.Menu.appMenu, accountsAttr, savedPlaylistsMenuModel);
	
	$('scrimSpinner').hide()
	this.cmdMenuModel = {
			visible: true,
			items: [
					{label: $L(''),icon: 'home',command: 'backToSearch'},
					{},
					{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'},{label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]},
					]
		};
	this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass:'no-fade'}, this.cmdMenuModel);
	
	this.controller.setupWidget("listPlaylistsList", {
    	itemTemplate: "savedPlaylists/rowTemplate",
    	listTemplate: "savedPlaylists/listTemplate",
		fixedHeightItems: true,
		swipeToDelete: true,
		addItemLabel: $L('Add ...'),
		reorderable: true, 
		renderLimit: 20,
    }, 
	
	this.listModel = {
        items: playlistsLists
    });
	
	    this.controller.setupWidget("scrollerId",
         this.scrollerAttributes = {
             mode: 'vertical'
         },
         this.scrollerModel = {
         });

//spinner
	   this.controller.setupWidget("spinner",
         this.attributes = {
             spinnerSize: 'large'
         },
         this.model = {
             spinning: false 
         });
		 
		 
		 
this.pushplaylistListHandler = this.pushplaylistList.bind(this);
this.moveAtIndexHandler = this.moveAtIndex.bind(this);
this.deleteAtIndexHandler = this.deleteAtIndex.bind(this);
this.addToListHandler = this.addToList.bind(this);
this.listHandler = this.controller.get('listPlaylistsList');
this.popupHandler = this.popup.bind(this)
this.resultListHandler = this.resultList.bind(this)
		 
}

SavedPlaylistsAssistant.prototype.activate = function(event) {
		stageAss.listResize()
	Mojo.Event.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.listen(this.listHandler, Mojo.Event.listTap, this.pushplaylistListHandler);
	this.controller.listen(this.listHandler, Mojo.Event.listDelete, this.deleteAtIndexHandler);
	this.controller.listen(this.listHandler, Mojo.Event.listReorder, this.moveAtIndexHandler);
	this.controller.listen(this.listHandler, Mojo.Event.listAdd, this.addToListHandler);
	//this.controller.listen(this.editButton, Mojo.Event.tap, this.editPlayListInfo);
		Mojo.Event.listen(this.controller.window, 'resize', listResizeHandler);
	this.listModel.items = playlistsLists;
	this.controller.modelChanged(this.listModel);		 	  
	  
}


SavedPlaylistsAssistant.prototype.deactivate = function(event) {
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.stopListening(this.listHandler, Mojo.Event.listTap, this.pushplaylistListHandler);
	this.controller.stopListening(this.listHandler, Mojo.Event.listDelete, this.deleteAtIndexHandler);
	this.controller.stopListening(this.listHandler, Mojo.Event.listReorder, this.moveAtIndexHandler);
	this.controller.stopListening(this.listHandler, Mojo.Event.listAdd, this.addToListHandler);	
		Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
}

SavedPlaylistsAssistant.prototype.cleanup = function(event) {
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.stopListening(this.listHandler, Mojo.Event.listTap, this.pushplaylistListHandler);
	this.controller.stopListening(this.listHandler, Mojo.Event.listDelete, this.deleteAtIndexHandler);
	this.controller.stopListening(this.listHandler, Mojo.Event.listReorder, this.moveAtIndexHandler);
	this.controller.stopListening(this.listHandler, Mojo.Event.listAdd, this.addToListHandler);	
		Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
	playlistsLists.length = 0
	  
}
SavedPlaylistsAssistant.prototype.addToList = function(event){
	editIndex = event.index
  	edit = false
	this.controller.stageController.pushScene({name: "playlistAdd", disableSceneScroller:true});
}
SavedPlaylistsAssistant.prototype.deleteAtIndex = function(event){
			playListDeleteName = playlistsLists[event.index].dbName.replace(/\W/g, '')
			db.discard(playListDeleteName, function(){Mojo.Log.info("SUCCESS delete database "+playListDeleteName)}, function(){Mojo.Log.info("FAIL delete")}) 
			playlistsLists.splice(event.index, 1);
			db.add('savedPlaylistsLists', playlistsLists, function(){Mojo.Log.info("SUCCESS SAVE");}, function(){ Mojo.Log.info("FAIL SAVE")});	
}
SavedPlaylistsAssistant.prototype.pushplaylistList = function(event){
  var target = event.originalEvent.target.className;
 // Mojo.Controller.errorDialog(target);
 popupIndex = event.index
  if (target !== "addFavs") {
  edit = false
  	$('spinner').mojo.start();
  	$('scrimSpinner').show()
	nameAtIndex = playlistsLists[event.index].name
  	playListName = playlistsLists[event.index].dbName.replace(/\W/g, '')
/*
  	db = new Mojo.Depot({
  		name: "ext:downloads"
  	}, function(){
*/
				sceneArrayOB = db.get(playListName, function(fl){
					if (Object.toJSON(fl) == "{}" || fl === null) {
						savedPlaylistArray = new Array();
					}
					else {
						savedPlaylistArray = fl
					}
					savedPlaylistsAss.controller.stageController.pushScene({
					name: "savedPlaylist",
					//transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				});
					$('scrimSpinner').hide()
					$('spinner').mojo.stop();
				}, function(){
					Mojo.Log.info("FAIL SCENEARR")
					Mojo.Controller.errorDialog("FAIL SCENEARR")
				});
/*
			}, function(error){
				Mojo.Log.info("FAIL RETRIEVE")
				Mojo.Controller.errorDialog("Failed to get database: " + error.code)
				$('scrimSpinner').hide()
				$('spinner').mojo.stop();
			});
*/
		//setTimeout(function(){	
		//},2000)
		}
		
  else {
    this.controller.popupSubmenu({
      onChoose: this.popupHandler,
      placeNear: event.originalEvent.target,
      items: [
        {label: 'Add to Playlist', command: 'addToList'},
        //{label: 'Add to Favorites', command: 'addToFavs'},
        {label: 'Edit Info', command: 'edit'},
        {label: 'Cancel', command: 'cancel'}
		]
    });
  } 
}
SavedPlaylistsAssistant.prototype.popup = function(command){
		switch (command) {
		
			case 'addToFavs':
				this.addToFavs();
				break;
			case 'addToList':
				tapToAdd = true
				this.addToPlayList();
				break;
			case 'edit':
  				edit = true
				editIndex = popupIndex
				this.controller.stageController.pushScene({name: "playlistAdd", transition: Mojo.Transition.crossFade, disableSceneScroller:true});
				break;
			case 'cancel':
				//function(){};
				break;
		}

}
SavedPlaylistsAssistant.prototype.moveAtIndex = function(event){
					move = []
					move = playlistsLists.splice(event.fromIndex, 1) 
					playlistsLists.splice(event.toIndex, 0, move[0]) 
					db.add('savedPlaylistsLists', playlistsLists, function(){Mojo.Log.info("SUCCESS SAVE");}, function(){ Mojo.Log.info("FAIL SAVE")});		  

}
SavedPlaylistsAssistant.prototype.addToPlayList = function(event){
  	playListName = playlistsLists[popupIndex].dbName.replace(/\W/g, '')
	db = new Mojo.Depot({
		name: "ext:downloads"
	}, function(){
		sceneArrayOB = db.get(playListName, function(fl){
			if (Object.toJSON(fl) == "{}" || fl === null) {
					Mojo.Controller.errorDialog("Empty Playlist")
			}
			else {
				savedPlaylistArray = fl
			}
				for (i=0;i<savedPlaylistArray.length;i++){
					playListItems.push(savedPlaylistArray[i])
					playListSum = playListSum + playListItems[newPlayListIndex].timeUnformatted;
					newPlayListIndex++
				}
			//$('scrimSpinner').hide()
			//$('spinner').mojo.stop();
		}, function(){
			Mojo.Log.info("FAIL SCENEARR")
			Mojo.Controller.errorDialog("FAIL SCENEARR")
		});
	}, function(error){
		Mojo.Log.info("FAIL RETRIEVE")
		Mojo.Controller.errorDialog("Failed to get database: " + error.code)
	});
}

SavedPlaylistsAssistant.prototype.syncPlaylists = function(event){
Mojo.Log.info('Enter sync Playlists')
if (internet == true) {
	if (totalPlaylists > 0) {
		this.controller.get('spinner').mojo.start();
		this.controller.get('scrimSpinner').show();
		syncPlaylistsLengthChanged = 0
		index = playlistsLists.length
		var search = serverUrl + "/server/xml.server.php?action=playlists&auth=" + token + "&filter= ";
		Mojo.Log.info('Search Url: ' + search);
		savedPlaylistsAss.controller.get('status').innerHTML = 'Sending Playlist Request'
		var request = new Ajax.Request(search, {
			method: "get",
			evalJSON: "false",
			onComplete: this.resultListHandler, //Mojo.Controller.errorDialog("beg"+searchString+"end"),
			onFailure: function(){
				Mojo.Controller.errorDialog("there was a problem.");
			}
		});
	}else{
		Mojo.Controller.errorDialog("No Playlists Available");
	}
}
else {
	Mojo.Controller.errorDialog("No Internet available");
}
Mojo.Log.info('Exit sync Playlists')
}

SavedPlaylistsAssistant.prototype.resultList = function(transport){
Mojo.Log.info('Enter sync Playlists results')
		response = transport.responseText || "no response text";
		Mojo.Log.info(response);
		var playlists = transport.responseXML.getElementsByTagName('playlist');
		savedPlaylistsAss.controller.get('status').innerHTML = 'Playlist request success: '+ playlists.length + 'playlists.'
			Mojo.Log.info('playlists.length: '+playlists.length)
			syncPlaylists = [];
			for (i = 0; i < playlists.length; i++) {
				syncPlaylists.push({
					name: playlists[i].getElementsByTagName('name')[0].firstChild.data,
					playListId: playlists[i].getAttribute("id"),
				})
			}
			savedPlaylistsAss.controller.get('status').innerHTML = 'Testing for duplicates'
			i=0
			while (i < syncPlaylists.length) {
				Mojo.Log.info('i: '+i)
				for (p = 0; p < playlistsLists.length; p++) {
					Mojo.Log.info('p: '+p)
					if(playlistsLists[p].name.toLowerCase() == syncPlaylists[i].name.toLowerCase()){
						Mojo.Log.info('playlistsLists[p].name: '+playlistsLists[p].name.toLowerCase()+', syncPlaylists[i].name: '+syncPlaylists[i].name.toLowerCase())
						nameDuplicate = true
						syncPlaylists.splice(i, 1)
						break;
					}else{
						Mojo.Log.info('playlistsLists[p].name: '+playlistsLists[p].name.toLowerCase()+', syncPlaylists[i].name: '+syncPlaylists[i].name.toLowerCase())
						nameDuplicate = false
					}
				}
					Mojo.Log.info('nameDuplicate: '+nameDuplicate)
					if (nameDuplicate == false) {
						playlistsLists.push({
							name: syncPlaylists[i].name,
							dbName: syncPlaylists[i].name.replace(/\W/g, '') + 'savedPlaylist',
							notes: '',
						})
						i++
						syncPlaylistsLengthChanged++
					}
			}
			if (index < playlistsLists.length) {
				savedPlaylistsAss.controller.get('status').innerHTML = 'Saving list names'
				Mojo.Log.info('index: '+ index+', playlistsLists.length: '+playlistsLists.length)
				syncPlaylistsLength = 0
				db.add('savedPlaylistsLists', playlistsLists, function(){
					Mojo.Log.info("SUCCESS SAVE");
					savedPlaylistsAss.controller.get('status').innerHTML = 'Saving list names SUCCESS'
					savedPlaylistsAss.listModel.items = playlistsLists;
					savedPlaylistsAss.controller.modelChanged(savedPlaylistsAss.listModel);
					savedPlaylistsAss.getPlaylistSongs()
				}, function(){
					Mojo.Log.error("FAIL SAVE")
				});
			}else{
				savedPlaylistsAss.controller.get('scrimSpinner').hide();
				savedPlaylistsAss.controller.get('spinner').mojo.stop();
				Mojo.Controller.errorDialog("Nothing changed: Probably because all the playlists have been synced. If you have changed any playlist in Ampache try deleting them in AmpachPre and issue \"Get Playlists\" again..");
			}
Mojo.Log.info('Exit sync Playlists results')
}
SavedPlaylistsAssistant.prototype.getPlaylistSongs = function(){
Mojo.Log.info('Enter getPlaylistSongs')
Mojo.Log.info('syncPlaylistsLength: '+ syncPlaylistsLength)
Mojo.Log.info('index: '+ index)
	savedPlaylistsAss.controller.get('status').innerHTML = 'Sending songs request for playlist: '+syncPlaylists[syncPlaylistsLength].name
	var search = serverUrl + "/server/xml.server.php?action=playlist_songs&auth=" + token + "&filter="+syncPlaylists[syncPlaylistsLength].playListId;
	Mojo.Log.info('Search Url: ' + search);
	
	var request = new Ajax.Request(search, {
		method: "get",
		evalJSON: "false",
		onComplete: function(transport){
			var songs = transport.responseXML.getElementsByTagName('song');
			tempPlaylist = [];
			for (i = 0; i < songs.length; i++) {
				/*var url = songs[i].getElementsByTagName('url')[0].firstChild.data,		
					extension = "";
	
				if (url.length != 0) {
					var dotPos = url.lastIndexOf(".");
				if (dotPos != -1) 
					extension = url.substr(dotPos + 1).toLowerCase(); ;
				}*/
				savedPlaylistsAss.controller.get('status').innerHTML = 'Building songs list: '+songs[i].getElementsByTagName('title')[0].firstChild.data

				tempPlaylist[i] = {
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
					urlAdd: false,
					source: 'savedPlaylist',
					//type: extension
				}
				convert = Math.floor(tempPlaylist[i].time / 60);
				convert2 = tempPlaylist[i].time % 60;
				convertString = convert2.toString()
				if (convertString[1] == "." || convertString[1] == undefined){convertSecs = "0"+convertString[0]}
				else{convertSecs = convertString[0]+convertString[1]}
				tempPlaylist[i].time = convert + ":" + convertSecs;
				
			}
  				playListName = playlistsLists[index].dbName.replace(/\W/g, '')
				db.add(playListName, tempPlaylist, function(){
					Mojo.Log.info("SUCCESS sync Playlist SAVE");
					savedPlaylistsAss.controller.get('status').innerHTML = 'Playlist saved: '+syncPlaylists[syncPlaylistsLength].name
					tempPlaylist.length=0;
					if (syncPlaylistsLength == syncPlaylistsLengthChanged - 1) {
						if (syncPlaylistsLengthChanged > 1) {
							Mojo.Controller.getAppController().showBanner('Downloaded ' + syncPlaylistsLengthChanged + ' playlists', {
								source: 'notification'
							});
						}else{
							Mojo.Controller.getAppController().showBanner('Downloaded ' + syncPlaylistsLengthChanged + ' playlist', {
								source: 'notification'
							});
						}
						savedPlaylistsAss.controller.get('scrimSpinner').hide();
						savedPlaylistsAss.controller.get('spinner').mojo.stop();
					}else{
						syncPlaylistsLength++
						index++
						savedPlaylistsAss.getPlaylistSongs()
					}
				}, function(){ Mojo.Log.info("FAIL sync Playlist SAVE")});
		}, //Mojo.Controller.errorDialog("beg"+searchString+"end"),
		onFailure: function(){
			Mojo.Controller.errorDialog("there was a problem.");
		}
	});
Mojo.Log.info('Exit getPlaylistSongs')
}

SavedPlaylistsAssistant.prototype.handleCommand = function(event){
	if (event.type == Mojo.Event.command) {
		switch (event.command) {
			case 'getPlaylists':
				this.syncPlaylists()
			break;
			case 'savedPlaylistsToggleHeadPhoneControls':
				headphoneToggled = true
				if (headPhoneControls == 'On') {
					headPhoneControls = 'Off'
						savedPlaylistsMenuModel.items[2]={label: "Headphone Controls: "+headPhoneControls,command: 'savedPlaylistsToggleHeadPhoneControls'}
						savedPlaylistsAss.controller.modelChanged(savedPlaylistsMenuModel);
					
				}else{
					headPhoneControls = 'On'
						savedPlaylistsMenuModel.items[2]={label: "Headphone Controls: "+headPhoneControls,command: 'savedPlaylistsToggleHeadPhoneControls'}
						savedPlaylistsAss.controller.modelChanged(savedPlaylistsMenuModel);
				}
			break;
			case 'savedPlaylistsToggleScrobble':
				if(scrobble == 'On'){
					scrobble = 'Off'
				}else{
					scrobble = 'On'
					//streamAss.scrobble();
					if (audioPlaying == true) {
						audioAss.notification()
					}
				}
				savedPlaylistsMenuModel.items[3]={label: "Scrobbling: "+scrobble,command: 'savedPlaylistsToggleScrobble'}
				savedPlaylistsAss.controller.modelChanged(savedPlaylistsMenuModel);
			break;
		}
	}
}