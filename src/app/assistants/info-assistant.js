function InfoAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

InfoAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed */
	
	/* setup widgets here */
	
	/* add event handlers to listen to events from widgets */
	
	
	$('ampacheVersion').innerHTML = ampacheVersion
	$('apiCompatible').innerHTML = version
	$('serverUrl').innerHTML = serverUrl
	$('streamUrl').innerHTML = "http://" + server + streamingPort + "/" + directory
	$('username').innerHTML = Uname
	$('serverSongs').innerHTML = totalSongs
	$('serverAlbums').innerHTML = totalAlbums
	$('playLists').innerHTML = totalPlaylists
	$('videos').innerHTML = totalVideos
	$('ApiSessionExpire').innerHTML = sessionExpires
	$('lastLoginRefresh').innerHTML = timeRefreshed
	$('lastUpdate').innerHTML = lastUpdate
	$('lastAdd').innerHTML = lastAdd
	$('lastClean').innerHTML = lastClean
	$('serverArtists').innerHTML = totalArtists
	$('lastStream').innerHTML = lastStream
	
};

InfoAssistant.prototype.activate = function(event) {
	Mojo.Event.listen(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

InfoAssistant.prototype.deactivate = function(event) {
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

InfoAssistant.prototype.cleanup = function(event) {
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, onKeyPressHandler, true);
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};
