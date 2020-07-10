notes = ""
function PlaylistAddAssistant() {
	document.getElementById('sceneStyle').style.backgroundImage =  "url(" + backGroundImage + ")";
	document.getElementById('sceneStyle').style.color =  textColor;
}

PlaylistAddAssistant.prototype.setup = function() {
	playListAddAss = this
	this.nameAttributes = {
        hintText: 'Downloaded Playlist Name',
        changeOnKeyPress: true,
        enterSubmits: true,
		autoFocus: true,
    };
    this.nameModel = {
        value: "",
        disabled: false
    };
    this.controller.setupWidget('name', this.nameAttributes, this.nameModel);
    this.namePropertyChange = this.setNameValue.bind(this);
    this.nameField = this.controller.get('name');
	
	
	this.notesAttributes = {
        hintText: 'Notes here...',
        changeOnKeyPress: true,
        enterSubmits: false,
		multiline: true,
		
    };
    this.notesModel = {
        value: "",
        //disabled: false
    };
	
	this.controller.setupWidget("spinnerSmall", 
		this.spinnerSmallAttributes = {
			spinnerSize: 'small'
		}, 
		this.spinnerSmallModel = {
			spinning: false
		});	
	
    this.controller.setupWidget('notes', this.notesAttributes, this.notesModel);
    this.notesPropertyChange = this.setNotesValue.bind(this);
    this.notesField = this.controller.get('notes');
	this.saveHandeler = this.save.bind(this)

}

PlaylistAddAssistant.prototype.activate = function(event) {
	//Mojo.Event.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	  	Mojo.Event.listen(this.nameField, Mojo.Event.propertyChange, this.namePropertyChange);
	  	Mojo.Event.listen(this.notesField, Mojo.Event.propertyChange, this.notesPropertyChange);
    	this.controller.listen($('save'), Mojo.Event.tap, this.saveHandeler);
		if (edit == true) {
			//this.nameModel.disabled = true
			this.notesModel.value = playlistsLists[editIndex].notes
			nameBackup = playlistsLists[editIndex].name
			this.nameModel.value = playlistsLists[editIndex].name
			this.controller.modelChanged(this.nameModel);
			this.controller.modelChanged(this.notesModel);
		}	  
}


PlaylistAddAssistant.prototype.deactivate = function(event) {
	//Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	  Mojo.Event.stopListening(this.nameField, Mojo.Event.propertyChange, this.namePropertyChange);
	  Mojo.Event.stopListening(this.notesField, Mojo.Event.propertyChange, this.notesPropertyChange);	  
}

PlaylistAddAssistant.prototype.cleanup = function(event) {
	//Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	Mojo.Event.stopListening(this.nameField, Mojo.Event.propertyChange, this.namePropertyChange);
	Mojo.Event.stopListening(this.notesField, Mojo.Event.propertyChange, this.notesPropertyChange);
    this.controller.stopListening($('save'), Mojo.Event.tap, this.saveHandeler);
	if (edit = true){
  		edit = false
	}
}
PlaylistAddAssistant.prototype.setNameValue = function(event) {
	name =  this.nameModel.value
}
PlaylistAddAssistant.prototype.setNotesValue = function(event) {
	notes =  this.notesModel.value
}
PlaylistAddAssistant.prototype.save = function(event){
	Mojo.Log.info("Enter save")
	this.controller.get('spinnerSmall').mojo.start();
	if (this.nameModel.value != "" && edit == false) {
		Mojo.Log.info("Enter save new playlist")
		playlistsLists.push({
			name: name,
			dbName: name + 'savedPlaylist',
			notes: notes
		})
		db.add('savedPlaylistsLists', playlistsLists, function(){
			playListAddAss.controller.get('spinnerSmall').mojo.stop();
			playListAddAss.controller.stageController.popScene();
			Mojo.Log.info("SUCCESS new playlist SAVE");
		}, function(){
			Mojo.Log.info("FAIL new playlist SAVE")
		});
		Mojo.Log.info("Exit save new playlist")
	}
	else 
		if (edit == true) {
		Mojo.Log.info("Enter save editing")
			if (nameBackup != this.nameModel.value) {
				this.renameDatabase()
			}
			else {
				//playlistsLists[editIndex].name = this.nameModel.value
				//playlistsLists[editIndex].dbName = name + 'savedPlaylist'
				playlistsLists[editIndex].notes = this.notesModel.value
				db.add('savedPlaylistsLists', playlistsLists, function(){
					playListAddAss.controller.get('spinnerSmall').mojo.stop();
					playListAddAss.controller.stageController.popScene();
					Mojo.Log.info("SUCCESS SAVE");
				}, function(){
					Mojo.Log.info("FAIL SAVE")
				});
			}
		Mojo.Log.info("Exit save editing")	
		}
		else 
			if (this.nameModel.value == "") {
				this.controller.get('spinnerSmall').mojo.stop();
				Mojo.Controller.errorDialog("There is no playlist name!")
			}
}
PlaylistAddAssistant.prototype.renameDatabase = function(event){
	Mojo.Log.info("Enter renameDatabase")
	//update old database name if it exists
	if(playlistsLists[editIndex].dbName == undefined){
		playlistsLists[editIndex].dbName = this.nameModel.value
	}
  	playListName = playlistsLists[editIndex].dbName.replace(/\W/g, '')
	playListDeleteName = playListName
	//get original playlist	
	sceneArrayOB = db.get(playListName, function(fl){
					Mojo.Log.info("Enter get database")
					if (Object.toJSON(fl) == "{}" || fl === null) {
						savedPlaylistArray = new Array();
					}
					else {
						savedPlaylistArray = fl
					}
						//rename database
						playlistsLists[editIndex].dbName = playListAddAss.nameModel.value + 'savedPlaylist'
						playListName = playlistsLists[editIndex].dbName.replace(/\W/g, '')
						//save after renaming
						db.add(playListName, savedPlaylistArray, function(){
							Mojo.Log.info("Enter save savedPlaylist")
							//delete old database
							db.discard(playListDeleteName, function(){
								Mojo.Log.info("SUCCESS delete database "+playListDeleteName)
								//save playlists database
								playlistsLists[editIndex].name = playListAddAss.nameModel.value
								playlistsLists[editIndex].notes = playListAddAss.notesModel.value
								db.add('savedPlaylistsLists', playlistsLists, function(){
									Mojo.Log.info("SUCCESS rename playlist SAVE");
									playListAddAss.controller.get('spinnerSmall').mojo.stop();
									playListAddAss.controller.stageController.popScene();
								}, function(){
									playListAddAss.controller.get('spinnerSmall').mojo.stop();
									Mojo.Log.info("FAIL rename playlist SAVE")
								});
							}, function(){
									playListAddAss.controller.get('spinnerSmall').mojo.stop();
									Mojo.Log.error("FAIL delete database "+playListDeleteName)
							}) 
						}, function(){
									playListAddAss.controller.get('spinnerSmall').mojo.stop();
									Mojo.Log.error("FAIL rename playlist SAVE")
						});
				}, function(){
					playListAddAss.controller.get('spinnerSmall').mojo.stop();
					Mojo.Log.error("FAIL SCENEARR")
					//Mojo.Controller.errorDialog("FAIL SCENEARR")
				});
	Mojo.Log.info("Exit renameDatabase")
}