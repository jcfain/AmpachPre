function WhatsNewAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

WhatsNewAssistant.prototype.setup = function() {
		this.cmdMenuModel = {
  				visible: true,
  					items: [
							{label: $L('OK'),icon: '',command: 'ok'},
							{label: $L('New User Guide'),icon: '',command: 'helpSwap'}
							]
  							
						};
		this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass:'no-fade'}, this.cmdMenuModel);
if(testArrayNames.length == 0){
	//$('listChanges').hide()
	$('settingsChangeInfo').hide()
}
$('version').innerHTML = currentVersion
$('listChanges').innerHTML = testArrayNames.toString()
}

WhatsNewAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
	//Mojo.Event.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
}


WhatsNewAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
	//Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
}

WhatsNewAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	//Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
}

WhatsNewAssistant.prototype.handleCommand = function(event){


	if (event.type == Mojo.Event.command) {
		switch (event.command) {
		
			case 'helpSwap':
				this.controller.stageController.swapScene('help')
			break;
			case 'ok':
			if (oldVersion != currentVersion) {
				oldVersion = currentVersion
			}
				this.controller.stageController.popScene();
			break;
		}
		
	}else if(event.type == Mojo.Event.back){
		
			if (oldVersion != currentVersion) {
				oldVersion = currentVersion
			}
	}
}