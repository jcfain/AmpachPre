notes = ""
function DlListAddAssistant() {
	document.getElementById('sceneStyle').style.backgroundImage =  "url(" + backGroundImage + ")";
	document.getElementById('sceneStyle').style.color =  textColor;
	document.getElementById('listBorder').style.border =  "2px solid "+textColor;
}

DlListAddAssistant.prototype.setup = function() {
	
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
    this.controller.setupWidget('notes', this.notesAttributes, this.notesModel);
    this.notesPropertyChange = this.setNotesValue.bind(this);
    this.notesField = this.controller.get('notes');
}

DlListAddAssistant.prototype.activate = function(event) {
	//Mojo.Event.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	Mojo.Event.listen(this.nameField, Mojo.Event.propertyChange, this.namePropertyChange);
	Mojo.Event.listen(this.notesField, Mojo.Event.propertyChange, this.notesPropertyChange);
		if (edit == true) {
			this.nameModel.disabled = true
			this.notesModel.value = downloadsLists[editIndex].notes
			this.nameModel.value = downloadsLists[editIndex].name
			this.controller.modelChanged(this.nameModel);
			this.controller.modelChanged(this.notesModel);
		}
		
}


DlListAddAssistant.prototype.deactivate = function(event) {
	//Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	Mojo.Event.stopListening(this.nameField, Mojo.Event.propertyChange, this.namePropertyChange);
	Mojo.Event.stopListening(this.notesField, Mojo.Event.propertyChange, this.notesPropertyChange);
}

DlListAddAssistant.prototype.cleanup = function(event){
	//Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	Mojo.Event.stopListening(this.nameField, Mojo.Event.propertyChange, this.namePropertyChange);
	Mojo.Event.stopListening(this.notesField, Mojo.Event.propertyChange, this.notesPropertyChange);
	if (this.nameModel.value != "" && edit == false) {
		downloadsLists.push({
			name: name,
			notes: notes
		})
	}else if (edit == true){
		downloadsLists[editIndex].name=this.nameModel.value
		downloadsLists[editIndex].notes=this.notesModel.value
	}
  	edit = false
	db.add('playListsList', downloadsLists, function(){Mojo.Log.info("SUCCESS SAVE");}, function(){ Mojo.Log.info("FAIL SAVE")});		  

}
DlListAddAssistant.prototype.setNameValue = function(event) {
	name =  this.nameModel.value
}
DlListAddAssistant.prototype.setNotesValue = function(event) {
	notes =  this.notesModel.value
}