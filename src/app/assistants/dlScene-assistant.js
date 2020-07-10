function DlSceneAssistant() {
	document.getElementById('sceneStyle').style.backgroundImage =  "url(" + backGroundImage + ")";
	document.getElementById('sceneStyle').style.color =  textColor;
	document.getElementById('listBorder').style.border =  "2px solid "+textColor;
	//document.getElementById('name').style.color =  textColor;
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		document.getElementById('scrollerId').style.height = '260px';
	}
}

DlSceneAssistant.prototype.setup = function() {
/*	listDownloadIndex = 0
	listDownloadname = 'downloads'
	listDownloadTotal = listDownloadname + listDownloadIndex
	do{	
		listDownloadTotal = listDownloadname + listDownloadIndex
		openCookie = new Mojo.Model.Cookie(listDownloadTotal);
		downloadsLists = openCookie.get();
		listDownloadIndex++
		downloadsLists.push({
			name: downloadsLists.name
			
		})
		}
	while (downloadsLists);*/
	dlSceneAss = this
	$('scrimSpinner').hide()
this.controller.setupWidget(Mojo.Menu.appMenu, dlSceneAttr, dlSceneAppMenuModel);
	if (downloadsNoLogin == false) {
		this.cmdMenuModel = {
			visible: true,
			items: [					
					{label: $L(''),icon: 'home',command: 'backToSearch'},
					{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'},{label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
					{label: $L(''),icon: 'www',command: 'urlAdd'},
			]
		};
	}else{
		this.cmdMenuModel = {
			visible: true,
			items: [
					{items: [{label: $L(''),icon: 'nowPlaying',command: 'stream'},{label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}]}, 
					{label: $L(''),icon: 'www',command: 'urlAdd'},]
			};
	}
		this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass:'no-fade'}, this.cmdMenuModel);
		//openCookie = new Mojo.Model.Cookie('downloadsList');
		//downloadsLists = openCookie.get();
		if (!downloadsLists){
			downloadsLists = []
		}
	
	this.controller.setupWidget("listDownloadsList", {
    	itemTemplate: "dlScene/rowTemplate",
    	listTemplate: "dlScene/listTemplate",
		fixedHeightItems: true,
		swipeToDelete: true,
		addItemLabel: $L('Add ...'),
		reorderable: true, 
		renderLimit: 20,
    }, 
	this.listModel = {
        items: downloadsLists
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
	
this.pushdownloadsListHandler = this.pushdownloadsList.bind(this);
this.moveAtIndexHandler = this.moveAtIndex.bind(this);
this.deleteAtIndexHandler = this.deleteAtIndex.bind(this);	
this.deleteAtIndexHandlerSuccess = this.deleteAtIndexSuccess.bind(this);
this.deleteAtIndexFailHandler = this.deleteAtIndexFail.bind(this);
this.addToListHandler = this.addToList.bind(this);
this.listHandler = this.controller.get('listDownloadsList');
this.deleteSuccessHandler = this.deleteSuccess.bind(this);
this.deleteFailHandler = this.deleteFail.bind(this);
this.popupHandler = this.popup.bind(this)
//this.editButton = this.controller.get('edit')
//this.editPlayListInfo = this.addToList.bind(this)
}

DlSceneAssistant.prototype.activate = function(event) {
		stageAss.listResize()
	Mojo.Event.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.listen(this.listHandler, Mojo.Event.listTap, this.pushdownloadsListHandler);
	this.controller.listen(this.listHandler, Mojo.Event.listDelete, this.deleteAtIndexHandler);
	this.controller.listen(this.listHandler, Mojo.Event.listReorder, this.moveAtIndexHandler);
	this.controller.listen(this.listHandler, Mojo.Event.listAdd, this.addToListHandler);
		Mojo.Event.listen(this.controller.window, 'resize', listResizeHandler);
	//this.controller.listen(this.editButton, Mojo.Event.tap, this.editPlayListInfo);
	this.listModel.items = downloadsLists;
	this.controller.modelChanged(this.listModel);		 	  
}


DlSceneAssistant.prototype.deactivate = function(event) {
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.stopListening(this.listHandler, Mojo.Event.listTap, this.pushdownloadsListHandler);
	this.controller.stopListening(this.listHandler, Mojo.Event.listDelete, this.deleteAtIndexHandler);
	this.controller.stopListening(this.listHandler, Mojo.Event.listReorder, this.moveAtIndexHandler);
	this.controller.stopListening(this.listHandler, Mojo.Event.listAdd, this.addToListHandler);		
		Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);	
}

DlSceneAssistant.prototype.cleanup = function(event) {
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	this.controller.stopListening(this.listHandler, Mojo.Event.listTap, this.pushdownloadsListHandler);
	this.controller.stopListening(this.listHandler, Mojo.Event.listDelete, this.deleteAtIndexHandler);
	this.controller.stopListening(this.listHandler, Mojo.Event.listReorder, this.moveAtIndexHandler);
	this.controller.stopListening(this.listHandler, Mojo.Event.listAdd, this.addToListHandler);	
	Mojo.Event.stopListening(this.controller.window, 'resize', listResizeHandler);
	//downloadsLists.length = 0
	//downloadCookie = new Mojo.Model.Cookie('downloadsList');
	//downloadCookie.put(downloadsLists);
}
DlSceneAssistant.prototype.deleteAtIndex = function(event){
	index = event.index
	this.controller.showAlertDialog({
		onChoose: function(value){
			
if (value == "delete") {
		
		/*playListDeleteName = downloadsLists[event.index].name.replace(/\W/g, '')
		db = new Mojo.Depot({name: "ext:downloads"}, function(){Mojo.Log.info("SUCCESS RETRIEVE")}, function(){Mojo.Log.info("FAIL RETRIEVE")});
		sceneArrayOB = db.get(playListDeleteName, function(fl){		
			if (Object.toJSON(fl) == "{}" || fl === null) {
				sceneArray = []
			}
			else {
				sceneArray = fl
				this.deleteSongs();
			}}, function(){Mojo.Log.info("FAIL SCENEARR")});*/
			playListDeleteName = downloadsLists[index].name.replace(/\W/g, '')
			//db = new Mojo.Depot({name: "ext:downloads"}, function(){Mojo.Log.info("SUCCESS RETRIEVE")}, function(){Mojo.Log.info("FAIL RETRIEVE")});
			db.discard(playListDeleteName, function(){Mojo.Log.info("SUCCESS delete database "+playListDeleteName)}, function(){Mojo.Log.info("FAIL delete")}) 
			downloadsLists.splice(index, 1);
			db.add('playListsList', downloadsLists, function(){Mojo.Log.info("SUCCESS SAVE");}, function(){ Mojo.Log.info("FAIL SAVE")});			
			}
			else if (value == "cancel") {}
		},
	title: $L("This will not delete the songs just the list item!! That function should be coming later. For now use \"delete all\" first, in the menu on the playlist."),
		choices: [{
			label: $L("Delete"),
			value: "delete",
			type: 'primary'
		},{
			label: $L("Cancel"),
			value: "cancel",
			type: 'dismiss'
		}]
	});
}
DlSceneAssistant.prototype.deleteSongs = function(event){
	/*for (i = 0; i < sceneArray.length; i++) {
		p = i
		this.controller.serviceRequest('palm://com.palm.downloadmanager/', {
			method: 'deleteDownloadedFile',
			parameters: {
				ticket: sceneArray[i].artTicket
			},
			onSuccess: function(){
				Mojo.Controller.errorDialog('delete art success')
			},
			onFailure: function(){
				Mojo.Controller.errorDialog('delete art fail')
			}
		});
		this.controller.serviceRequest('palm://com.palm.downloadmanager/', {
			method: 'deleteDownloadedFile',
			parameters: {
				ticket: sceneArray[i].ticket
			},
			onSuccess: this.deleteSuccessHandler,
			onFailure: this.deleteFailHandler
		});
	}*/
}
DlSceneAssistant.prototype.deleteSuccess = function(event){
	Mojo.Controller.errorDialog('delete success')
	//deleteTicket++
}
DlSceneAssistant.prototype.deleteFail = function(event){
	Mojo.Controller.errorDialog('Delete failed')
}
DlSceneAssistant.prototype.deleteAtIndexSuccess = function(event){
	Mojo.Controller.errorDialog('delete success')
	//deleteTicket++
}
DlSceneAssistant.prototype.deleteAtIndexFail = function(event){
	Mojo.Controller.errorDialog('Delete fail')
}
DlSceneAssistant.prototype.addToList = function(event){
	editIndex = event.index
  	edit = false
	this.controller.stageController.pushScene({name: "dlListAdd", disableSceneScroller:true});
	
 /*   this.controller.showDialog({
          template: 'dlScene/addList',
          assistant: new AddListAssistant(this),
          //wisdom: randomLorem(),
          //preventCancel:true
    });*/
}
DlSceneAssistant.prototype.pushdownloadsList = function(event){
  var target = event.originalEvent.target.className;
	popupIndex = event.index
 // Mojo.Controller.errorDialog(target);
  if (target !== "addFavs") {
  	$('spinner').mojo.start();
  	$('scrimSpinner').show()
  	Mojo.Log.info('spinnerstart')
  	playListName = downloadsLists[event.index].name.replace(/\W/g, '')
  	Mojo.Log.info('playlistname')
/*
  	downloadsDb = new Mojo.Depot({
  		name: "ext:downloads"
  	}, function(){
*/
  				Mojo.Log.info('enter database success')
				sceneArrayDB = db.get(playListName, function(fl){
					if (Object.toJSON(fl) == "{}" || fl === null) {
						sceneArray = new Array();
  						Mojo.Log.info('fl is empty')
					}
					else {
						sceneArray = fl
  						Mojo.Log.info('fl has this many: '+fl.length)
					}
				dlSceneAss.controller.stageController.pushScene({
					name: "downloads",
					//transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				});
					dlSceneAss.controller.get('scrimSpinner').hide()
					dlSceneAss.controller.get('spinner').mojo.stop();
  					Mojo.Log.info('exit database success')
				}, function(){
					Mojo.Log.info("FAIL SCENEARR")
					Mojo.Controller.errorDialog("FAIL SCENEARR")
				});
/*
			}, function(error){
  				Mojo.Log.info('enter database fail')
				Mojo.Controller.errorDialog("Failed to get database: " + error.code)
				dlSceneAss.controller.get('scrimSpinner').hide()
				dlSceneAss.controller.get('spinner').mojo.stop();
  				Mojo.Log.info('exit database fail')
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
DlSceneAssistant.prototype.popup = function(command){
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
				this.controller.stageController.pushScene({name: "dlListAdd", disableSceneScroller:true});
				break;
			case 'cancel':
				//function(){};
				break;
		}

}
DlSceneAssistant.prototype.moveAtIndex = function(event){
					move = []
					move = downloadsLists.splice(event.fromIndex, 1) 
					downloadsLists.splice(event.toIndex, 0, move[0]) 
					db.add('playListsList', downloadsLists, function(){Mojo.Log.info("SUCCESS SAVE");}, function(){ Mojo.Log.info("FAIL SAVE")});		  

}
DlSceneAssistant.prototype.deleteAll = function(event){
	this.controller.showAlertDialog({
		onChoose: function(value){
			if (value == "delete") {
			db.removeAll(function(){
				Mojo.Log.info("SUCCESS delete All");
					db = new Mojo.Depot({name: "ext:downloads"}, function(){
					Mojo.Log.info("SUCCESS RETRIEVE")
					downloadsListsOB = db.get('playListsList', 
					function(fl){		
					if (Object.toJSON(fl) == "{}" || fl === null) {
						downloadsLists = []
						this.listModel.items = downloadsLists;
						this.controller.modelChanged(this.listModel);
					}
					else {
						downloadsLists = fl
						this.listModel.items = downloadsLists;
						this.controller.modelChanged(this.listModel);
					}}, function(){Mojo.Log.info("FAIL SCENEARR")});
					}, function(){Mojo.Log.info("FAIL RETRIEVE")});	
			}, function(){Mojo.Log.info("FAIL delete All");}) 
			}
			else if (value == "cancel") {}
		},
	title: $L("This will not delete any files downloaded. It will just delete the main bucket."),
		choices: [{
			label: $L("Delete"),
			value: "delete",
			type: 'primary'
		},{
			label: $L("Cancel"),
			value: "cancel",
			type: 'dismiss'
		}]
	});
}
DlSceneAssistant.prototype.handleCommand = function(event){
	//this.currentScene=Mojo.Controller.stageController.activeScene();
	if (event.type == Mojo.Event.command) {
		switch (event.command) {
			case 'deleteAll':
				this.deleteAll();
				break;
			case 'clearQue':
				this.clearQue();	
				break;
		}
	}
}

DlSceneAssistant.prototype.clearQue = function(){
			playListItems.length=0;
			newPlayListIndex = 0;
			totalPlayListTime = '0:00';
			playListSum = 0;
}
DlSceneAssistant.prototype.addToPlayList = function(event){
	playListName = downloadsLists[popupIndex].name.replace(/\W/g, '')
	db = new Mojo.Depot({
		name: "ext:downloads"
	}, function(){
		sceneArrayOB = db.get(playListName, function(fl){
			if (Object.toJSON(fl) == "{}" || fl === null) {
					Mojo.Controller.errorDialog("Empty Playlist")
			}
			else {
				sceneArray = fl
			}
				for (i=0;i<sceneArray.length;i++){
					playListItems.push(sceneArray[i])
					playListSum = playListSum + sceneArray[i].timeUnformatted;
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