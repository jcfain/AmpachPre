//memory usage Saturday, March 27 2010 at login 296 DOM nodes sitting on home scene

//make arrays to prevent crashing.
playListItems = [];
//set playlist index to 0 and increment as needed.
newPlayListIndex = 0;
playListSum = 0;
//Set playItems to 0 empty to display streamscene without playing
listIndex = 0
category = 'all'
//StreamAss variables**********
nextPlayListSong = 0;
playItemsBackup = [];
played=false;
skipped = false;
retry = false
//streamerPlayStatus = 'play'
min=0;
sec=0;
timerID = 0;
//downLoaded = false
randomTimeout = 0
nextSongDownloaded = false
randomPlay = false
repeatSong = false
stageDeactivated = false
errorEvent = false
refreshSession = false
timeout = false
setBookMark = undefined
playMode='standard';
endOfPlaylist = false
loadNextSongFired = false
//*****************************
playItems = [];
playListAllSum = 0
playAll = []
artistArray = []
ticketHandler = 0
ticketNumArray = []
downloadedAlbumArt = []
downLoadedArt = ''
artDownloaded = false
playListArray = []
imageArray = []
downloadsNoLogin = false
downloadsLists = []
urlTest = false;
newAccount = false
tapToAdd = false
accountSelected = false
currentAccount = 0
currentAccountLoggedIn = undefined
LoginTimeOut = false
loginRefresh = false;
pushStreamScene = false
pushDownloadScene = false
pushNowPlaying = false
pushNowPlayingList = false
pushNowPlayingListSwap = false
pushPlayerDash = false	
dashboardActive = false
downLoaded = false
loading = false
downloading = false
lastfmLoggedIn = false
scrobbleQue = []
testArray = []
testArrayNames = []
	testArray[0] = {
		thisIsUndefined: '',
		thisIsUndefinedIndex: '',
		undefinedCheck: false,
	}
i=0;
audioElem = false
lastStream = 'none'
errorArray = []
sessionExpires = 'Not Retrieved'
timerID = undefined
//setBookMark = undefined
trackerTimeout = undefined
blueToothControls = 'Off'
headPhoneControls = 'Off'
headphoneToggled = false
blueToothToggled = false
scrobbleToggled = false
audioPlaying = false
networkChangeSubscribed = false
play = ''
totalArtistSongs = 0
totalAlbumsSongs = 0
descending = false
AmpacheLoggedIn = false
searchViewVisible = false
taptoOpenSearch = false
imageSelected = false
backGroundImage = Mojo.appPath+'images/ampachpre-blue.png'
backGroundImageNP = ''
backGroundIcon = Mojo.appPath+'images/ampachpre-blue.png'
backGroundIconNP = ''
scrobble = 'Off'
browseSelected = false
notificationOpen = false
decodeRefresh = false
//setBufferPercentage = 75
downLoadedArt = ''
editPlaylist = false
allSelected = false
retry = false
currentVersion = '2.1.5'
function StageAssistant() {
}


StageAssistant.prototype.setup = function(){
	stageAss=this
	listResizeHandler = this.listResize.bind(this);
	//Mojo.Controller.SceneController.setDefaultTransition(Mojo.Transition.crossFade) 
db = new Mojo.Depot({name: "ext:downloads"}, function(){
	Mojo.Log.info("SUCCESS RETRIEVE")

		
versionDB = db.get('version', 
		function(fl){
		Mojo.Log.info("SUCCESS version RETRIEVE")		
		if (Object.toJSON(fl) == "{}" || fl === null) {
			oldVersion = '1.8.8'
			Mojo.Log.info('currentVersion: '+currentVersion+', '+'oldVersion: '+oldVersion)
		}
		else {
			oldVersion = fl
			Mojo.Log.info('currentVersion: '+currentVersion+', '+'oldVersion: '+oldVersion)
		}}, function(){Mojo.Log.error("FAIL version SCENEARR")});
		

homeListDB = db.get('homeList', 
		function(fl){
	Mojo.Log.info("SUCCESS homeList RETRIEVE")		
		if (Object.toJSON(fl) == "{}" || fl === null) {
			homeList = [
						 {
						 	name: 'Search',
							command: 'searchView',
							id: 'homeSearch'
						 }, {
						 	name: 'Albums Of The Moment',
							command: 'aotm',
							id: 'homeAotm'
						 },{
						 	name: 'Random Play',
							command: 'randomPlay',
							id: 'randomPlay'
						 },{
						 	name: 'Bookmarks',
							command: 'bookmarks',
							id: 'homeBookmarks'
						 },{
						 	name: 'Playlist',
							command: 'playlist',
							id: 'homePlaylist'
						 },{
						 	name: 'Saved Playlists',
							command: 'savedPlaylists',
							id: 'homeSavedPlaylists'
						 },{
						 	name: 'Downloads',
							command: 'downloads',
							id: 'homeDownloads'
						 },{
						 	name: 'Now Playing',
							command: 'nowPlaying',
							id: 'homeNowPlaying'
						 },{
						 	name: 'Now Playing List',
							command: 'nowPlayingList',
							id: 'homeNowPlayingList'
						 },{
						 	name: 'Browse by Artist',
							command: 'browseByArtist',
							id: 'homeArtist'
						 },{
						 	name: 'Browse by Album',
							command: 'browseByAlbum',
							id: 'homeAlbum'
						 },{
						 	name: 'Browse by Song',
							command: 'browseBySong',
							id: 'homeSong'
						 },{
						 	name: 'Browse by Genre',
							command: 'browseByGenre',
							id: 'homeGenre'
						 },{
						 	name: 'Recently Added',
							command: 'recentArtists',
							id: 'homeRecentArtists'
						 },{
							name: 'Recent Albums',
							command: 'recentAlbums',
							id: 'homeRecentAlbums'
						 },{
							name: 'Recent Songs',
							command: 'recentSongs',
							id: 'homeRecentSongs'
						 },
					  ]
					  Mojo.Log.info('homeList.length: '+homeList.length)
			db.add('homeList', homeList, function(){
							Mojo.Log.info("Sucess new homeList SAVE")
						}, function(){
							Mojo.Log.error("FAIL new homeList SAVE")
						});
		}
		else {
			homeList = fl
			Mojo.Log.info('homeList retrieve: '+homeList.length)
		}}, function(){Mojo.Log.error("FAIL homeList")});
		
/*
homeListDBD = db.get('homeListD', 
		function(fl){
	Mojo.Log.info("SUCCESS homeList RETRIEVE")		
		if (Object.toJSON(fl) == "{}" || fl === null) {
			homeListD = [
						 {
						 	name: 'Search',
							command: 'searchView',
							id: 'homeSearchD'
						 }, {
						 	name: 'Albums Of The Moment',
							command: 'aotm',
							id: 'homeAotmD'
						 },{
						 	name: 'Random Play',
							command: 'randomPlay',
							id: 'randomPlayD'
						 },{
						 	name: 'Bookmarks',
							command: 'bookmarks',
							id: 'homeBookmarksD'
						 },{
						 	name: 'Playlist',
							command: 'playlist',
							id: 'homePlaylistD'
						 },{
						 	name: 'Saved Playlists',
							command: 'savedPlaylists',
							id: 'homeSavedPlaylistsD'
						 },{
						 	name: 'Downloads',
							command: 'downloads',
							id: 'homeDownloadsD'
						 },{
						 	name: 'Now Playing',
							command: 'nowPlaying',
							id: 'homeNowPlayingD'
						 },{
						 	name: 'Now Playing List',
							command: 'nowPlayingList',
							id: 'homeNowPlayingListD'
						 },{
						 	name: 'Browse by Artist',
							command: 'browseByArtist',
							id: 'homeArtistD'
						 },{
						 	name: 'Browse by Album',
							command: 'browseByAlbum',
							id: 'homeAlbumD'
						 },{
						 	name: 'Browse by Song',
							command: 'browseBySong',
							id: 'homeSongD'
						 },{
						 	name: 'Browse by Genre',
							command: 'browseByGenre',
							id: 'homeGenreD'
						 },{
						 	name: 'Recently Added',
							command: 'recentArtists',
							id: 'homeRecentArtistsD'
						 },
					  ]
					  Mojo.Log.info('homeListD.length: '+homeListD.length)
			db.add('homeListD', homeListD, function(){
							Mojo.Log.info("Sucess new homeListD SAVE")
						}, function(){
							Mojo.Log.error("FAIL new homeListD SAVE")
						});
		}
		else {
			homeListD = fl
			Mojo.Log.info('homeListD retrieve: '+homeListD.length)
		}}, function(){Mojo.Log.error("FAIL homeListD")});		
		
*/


		downloadsListsOB = db.get('playListsList', 
			function(fl){		
			if (Object.toJSON(fl) == "{}" || fl === null) {
				downloadsLists = []
				allDownloads = []
			}
			else {
				downloadsLists = fl
				stageAss.setupPullDownloads()
			}
			}, function(){Mojo.Log.error("FAIL SCENEARR")});
			
			
favsListsDB = db.get('favList', 
		function(fl){
			Mojo.Log.info("SUCCESS favs RETRIEVE")		
				if (Object.toJSON(fl) == "{}" || fl === null) {
					favoritesArray = []
				}
				else {
					favoritesArray = fl
		/*
				if (oldVersion != currentVersion) {
		            for (i = 0; i < favoritesArray.length; i++) {
		                Mojo.Log.info('favoritesArray[i].image: ' + favoritesArray[i].image)
		                //favoritesArray[i].listType = undefined
		                //favoritesArray[i].image = undefined
		/*
						if(favoritesArray[i].currentTime == undefined){
							favoritesArray[i].currentTime = 0
						}
		*/
		/*
		                if (favoritesArray[i].image == undefined) {
		                    Mojo.Log.info("favoritesArray[" + i + "].listType == undefined")
		                    if (favoritesArray[i].type == 'artist_albums') {
		                        favoritesArray[i].image = "images/artist50px.png"
		                        favoritesArray[i].textName = favoritesArray[i].artist
		                        favoritesArray[i].textArtist = ""
		                        Mojo.Log.info('artist favoritesArray[i].image: ' + favoritesArray[i].image)
		                    }
		                    else 
		                        if (favoritesArray[i].type == 'album_songs') {
		                            favoritesArray[i].image = "images/album50px.png"
		                            favoritesArray[i].textName = favoritesArray[i].album
		                            favoritesArray[i].textArtist = favoritesArray[i].artist
		                            Mojo.Log.info('album favoritesArray[i].image: ' + favoritesArray[i].image)
		                        }
		                        else 
		                            if (favoritesArray[i].type == 'song') {
		                                favoritesArray[i].image = "images/song50px.png"
		                                favoritesArray[i].textName = favoritesArray[i].song
		                                favoritesArray[i].textArtist = favoritesArray[i].artist
		                                Mojo.Log.info('songs favoritesArray[i].image: ' + favoritesArray[i].image)
		                            }
		                    db.add('favList', favoritesArray, function(){
		                        Mojo.Log.info("SUCCESS update favs SAVE");
		                    }, function(){
		                        Mojo.Log.error("FAIL update favs SAVE")
		                    });
		                }
		            }
		*/
				}
				}, function(){Mojo.Log.error("FAIL favorites SCENEARR")});				
	settingsListsDB = db.get('accountsList', 
		function(fl){	
	Mojo.Log.info("SUCCESS accounts RETRIEVE")	
		if (Object.toJSON(fl) == "{}" || fl === null) {
				listAccounts=[]
				newAccount = true
				currentAccount = 0
			//if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
				stageAss.controller.pushScene({
					name:'accounts', 
					//transition: Mojo.Transition.crossFade, 
					disableSceneScroller:true
				});
				stageAss.controller.pushScene({
					name: "account",
					//transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				});
			/*}else{
				stageAss.controller.pushScene({
					name: "account",
					transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				});}*/
		}
		else {
			listAccounts = fl
		if (oldVersion != currentVersion) {
			for (i = 0; i < listAccounts.length; i++) {
				if (listAccounts[i].randomSongFetch == undefined) {
					listAccounts[i].randomSongFetch = 30
					testArray.push({
						thisIsUndefined: 'Random Song Fetch',
						thisIsUndefinedIndex: i,
						undefinedCheck: true,
					})
					testArray[0].undefinedCheck = true
					testArrayNames.push("<br>"+listAccounts[i].accountName + ': Random Song Fetch: '+listAccounts[i].randomSongFetch)
				}
				if (listAccounts[i].connectionPort == undefined) {
					listAccounts[i].connectionPort = '80'
					testArray.push({
						thisIsUndefined: 'connection port',
						thisIsUndefinedIndex: i,
						undefinedCheck: true,
					})
					testArray[0].undefinedCheck = true
					testArrayNames.push("<br>"+listAccounts[i].accountName + ': connection port: '+listAccounts[i].connectionPort)
				}
				if (listAccounts[i].port == undefined) {
					listAccounts[i].port = '80'
					testArray.push({
						thisIsUndefined: 'streaming port',
						thisIsUndefinedIndex: i,
						undefinedCheck: true,
					})
					testArray[0].undefinedCheck = true
					testArrayNames.push("<br>"+listAccounts[i].accountName + ': streaming port: '+listAccounts[i].port)
				}
				if (listAccounts[i].scrobble == undefined) {
					listAccounts[i].scrobble = 'Off'
					testArray.push({
						thisIsUndefined: 'default scrobble',
						thisIsUndefinedIndex: i,
						undefinedCheck: true,
					})
					testArray[0].undefinedCheck = true
					testArrayNames.push("<br>"+listAccounts[i].accountName + ': default scrobble: '+listAccounts[i].scrobble)
				}
				if (listAccounts[i].notify == undefined) {
					listAccounts[i].notify = 'Off'
					testArray.push({
						thisIsUndefined: 'streaming notifications',
						thisIsUndefinedIndex: i,
						undefinedCheck: true,
					})
					testArray[0].undefinedCheck = true
					testArrayNames.push("<br>"+listAccounts[i].accountName + ': streaming notifications: '+listAccounts[i].notify)
				}
				if (listAccounts[i].ping == undefined) {
					listAccounts[i].ping = '0'
					testArray.push({
						thisIsUndefined: 'ping time out',
						thisIsUndefinedIndex: i,
						undefinedCheck: true,
					})
					testArray[0].undefinedCheck = true
					testArrayNames.push("<br>"+listAccounts[i].accountName + ': ping time out: '+listAccounts[i].ping)
				}
				if (listAccounts[i].lastFmUN == undefined) {
					listAccounts[i].lastFmUN = ''
					testArray.push({
						thisIsUndefined: 'last.fm username',
						thisIsUndefinedIndex: i,
						undefinedCheck: true,
					})
					testArray[0].undefinedCheck = true
					testArrayNames.push("<br>"+listAccounts[i].accountName + ': last.fm username: empty')
				}
				if (listAccounts[i].lastFmPW == undefined) {
					listAccounts[i].lastFmPW = ''
					testArray.push({
						thisIsUndefined: 'last.fm password',
						thisIsUndefinedIndex: i,
						undefinedCheck: true,
					})
					testArray[0].undefinedCheck = true
					testArrayNames.push("<br>"+listAccounts[i].accountName + ': last.fm password: empty')
				}
				if (listAccounts[i].btC == undefined) {
					listAccounts[i].btC = 'Off';
					testArray.push({
						thisIsUndefined: 'bluetooth controls',
						thisIsUndefinedIndex: i,
						undefinedCheck: true,
					})
					testArray[0].undefinedCheck = true
					testArrayNames.push("<br>"+listAccounts[i].accountName + ': bluetooth controls: '+listAccounts[i].btC)
				}
				if (listAccounts[i].hpC == undefined) {
					listAccounts[i].hpC = 'Off';
					testArray.push({
						thisIsUndefined: 'headphone controls',
						thisIsUndefinedIndex: i,
						undefinedCheck: true,
					})
					testArray[0].undefinedCheck = true
					testArrayNames.push("<br>"+listAccounts[i].accountName + ': headphone controls: '+listAccounts[i].hpC)
				}
				if (listAccounts[i].reLog == undefined) {
					listAccounts[i].reLog = "0";
					testArray.push({
						thisIsUndefined: 'Refresh Login hrs',
						thisIsUndefinedIndex: i,
						undefinedCheck: true,
					})
					testArray[0].undefinedCheck = true
					testArrayNames.push("<br>"+listAccounts[i].accountName + ': refresh Login hours: '+listAccounts[i].reLog)
					Mojo.Log.info('Refresh Login hrs changed')
				}
				
				if (listAccounts[i].reLogMin == undefined) {
					listAccounts[i].reLogMin = "0";
					testArray.push({
						thisIsUndefined: 'Refresh Login Mins',
						thisIsUndefinedIndex: i,
						undefinedCheck: true,
					})
					testArray[0].undefinedCheck = true
					testArrayNames.push("<br>"+listAccounts[i].accountName + ': refresh Login minutes: '+listAccounts[i].reLogMin)
					Mojo.Log.info('Refresh Login mins changed')
				}
				if (listAccounts[i].backGroundImage == undefined) {
					listAccounts[i].backGroundImage = Mojo.appPath+'images/ampachpre-blue.png';
					testArray.push({
						thisIsUndefined: 'Background',
						thisIsUndefinedIndex: i,
						undefinedCheck: true,
					})
					testArray[0].undefinedCheck = true
					testArrayNames.push("<br>"+listAccounts[i].accountName + ': Background: '+listAccounts[i].backGroundImage)
					Mojo.Log.info('Background changed')
				}
				if (listAccounts[i].textColor == undefined) {
					listAccounts[i].textColor = 'white';
					testArray.push({
						thisIsUndefined: 'Text Color',
						thisIsUndefinedIndex: i,
						undefinedCheck: true,
					})
					testArray[0].undefinedCheck = true
					testArrayNames.push("<br>"+listAccounts[i].accountName + ': Text Color: '+listAccounts[i].textColor)
					Mojo.Log.info('Background changed')
				}
				if (listAccounts[i].textColorNP == undefined) {
					listAccounts[i].textColorNP = 'white';
					testArray.push({
						thisIsUndefined: 'Now Playing Text Color',
						thisIsUndefinedIndex: i,
						undefinedCheck: true,
					})
					testArray[0].undefinedCheck = true
					testArrayNames.push("<br>"+listAccounts[i].accountName + ': Now Playing Text Color: '+listAccounts[i].textColorNP)
					Mojo.Log.info('Background changed')
				}
				if (listAccounts[i].backGroundIcon == undefined) {
					listAccounts[i].backGroundIcon = Mojo.appPath+'images/ampachpre-blue.png';
					testArray.push({
						thisIsUndefined: 'Background Icon',
						thisIsUndefinedIndex: i,
						undefinedCheck: true,
					})
					testArray[0].undefinedCheck = true
					testArrayNames.push("<br>"+listAccounts[i].accountName + ': Background Icon: '+listAccounts[i].backGroundIcon)
					Mojo.Log.info('Background changed')
				}
				if (listAccounts[i].backGroundImageNP == undefined) {
					listAccounts[i].backGroundImageNP = "";
					testArray.push({
						thisIsUndefined: 'Now Playing Background',
						thisIsUndefinedIndex: i,
						undefinedCheck: true,
					})
					testArray[0].undefinedCheck = true
					testArrayNames.push("<br>"+listAccounts[i].accountName + ': Now Playing Background: empty')
					Mojo.Log.info('Now Playing Background changed')
				}
				if (listAccounts[i].backGroundIconNP == undefined) {
					listAccounts[i].backGroundIconNP = "";
					testArray.push({
						thisIsUndefined: 'Now Playing Background Icon',
						thisIsUndefinedIndex: i,
						undefinedCheck: true,
					})
					testArray[0].undefinedCheck = true
					testArrayNames.push("<br>"+listAccounts[i].accountName + ': Now Playing Background Icon: empty')
					Mojo.Log.info('Now Playing Background changed')
				}
				if (listAccounts[i].dashboard == undefined) {
					listAccounts[i].dashboard = "On";
					testArray.push({
						thisIsUndefined: 'Dashboard',
						thisIsUndefinedIndex: i,
						undefinedCheck: true,
					})
					testArray[0].undefinedCheck = true
					testArrayNames.push("<br>"+listAccounts[i].accountName + ': Dashboard: '+listAccounts[i].dashboard)
					Mojo.Log.info('Dashboard changed')
				}
				if (listAccounts[i].bufferPercentage == undefined) {
					listAccounts[i].bufferPercentage = "75";
					testArray.push({
						thisIsUndefined: 'Buffer Percentage',
						thisIsUndefinedIndex: i,
						undefinedCheck: true,
					})
					testArray[0].undefinedCheck = true
					testArrayNames.push("<br>"+listAccounts[i].accountName + ': Buffer Percentage: '+listAccounts[i].bufferPercentage)
					Mojo.Log.info('Buffer Percentage changed')
				}
			}
		}
			//Mojo.Log.info('testArrayNames.toString(): '+testArrayNames[0])
			if(listAccounts.length == 0){
				//push the new account scene
				//stageAss.controller.pushScene({name:'accounts', transition: Mojo.Transition.crossFade, disableSceneScroller:true});
				newAccount = true
				currentAccount = 0
				stageAss.controller.pushScene({
					name: 'accounts',
					//transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				});
				stageAss.controller.pushScene({
					name: "account",
					//transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				});
			}else {
				if (testArray[0].undefinedCheck == true) {
					//save the accounts array
					db.add('accountsList', listAccounts, function(){
						Mojo.Log.info("SUCCESS listAccounts new account setting null update SAVE");
						stageAss.controller.pushScene({
							name: 'accounts',
							//transition: Mojo.Transition.crossFade,
							disableSceneScroller: true
						});
						stageAss.controller.pushScene({
						name: 'login',
						//transition: Mojo.Transition.crossFade,
						disableSceneScroller: true
						});
						}, function(){
							Mojo.Log.error("FAIL listAccounts  new account setting null update SAVE")
						});
				}else{
					stageAss.controller.pushScene({
						name: 'accounts',
						//transition: Mojo.Transition.crossFade,
						disableSceneScroller: true
					});
					stageAss.controller.pushScene({
						name: 'login',
						//transition: Mojo.Transition.crossFade,
						disableSceneScroller: true
					});
				}
			}
		}
		
	}, function(){Mojo.Log.error("FAIL settings RETRIEVE")});
	}, function(){Mojo.Log.error("FAIL RETRIEVE")});
	
	
		
	accountsAttr = {omitDefaultItems: true};	

	downloadsAttr = {omitDefaultItems: true};	 
	downloadAppMenuModel = {
		visible: true,
  			items: [
			{label: "Now Playing",command: 'stream'},	
			{label: "Now Playing List",command: 'nowPlayingList'},	
			{label: "Change Account", command: 'accounts'},
			{label: "Refresh Login", command: 'reLog'},
			{label: "Delete All", command: 'deleteAll'},
			{label: "Clear List", command: 'clearList'},
			{label: "Clear Que", command: 'clearQue'},
    		{label: "About", command: 'do-myAbout'},
  			]
		};
		dlSceneAttr = {omitDefaultItems: true};	 
	dlSceneAppMenuModel = {
		visible: true,
  			items: [
			{label: "Now Playing",command: 'stream'},	
			{label: "Now Playing List",command: 'nowPlayingList'},	
			{label: "Change Account", command: 'accounts'},
			{label: "Refresh Login", command: 'reLog'},
    		{label: "Enter Url", command: 'urlAdd'},
			{label: "Reset Database", command: 'deleteAll'},
			{label: "Clear Que", command: 'clearQue'},
			//{label: "Server Info",command: 'info'},
    		{label: "About", command: 'do-myAbout'},
  			]
		};
	
	
	
}


StageAssistant.prototype.handleCommand = function(event) {
  currentScene=Mojo.Controller.stageController.activeScene();
    if(event.type == Mojo.Event.command) {

      switch(event.command) {
        case 'do-myAbout':
          currentScene.showAlertDialog({
            onChoose: function(value) {},
            title: $L("AmpachPre v"+currentVersion),
            message: $L("Copyright 2010, Jason C. Fain."),
            choices:[
              {label:$L("OK"), value:""}
            ]
          });
        break;
	case 'do-accountPrefs':
		this.controller.pushScene({name: "account", disableSceneScroller:true});
	break;
	case 'pushHome':
		//currentAccount = '0';
		currentScene.stageController.pushScene({name: "search", disableSceneScroller:true});
	break;			
	case 'backToSearch':
		currentScene.stageController.popScenesTo("search");
		//currentScene.stageController.pushScene({name:"search", transition: Mojo.Transition.crossFade, disableSceneScroller:true});
	break;
	case 'viewPlaylist':
		currentScene.stageController.pushScene({name: "playlist", disableSceneScroller:true});
	break;
	case 'accounts':
	if (errorTextTimeout != null) {
		clearTimeout(errorTextTimeout)
	}
		LoginTimeOut = true
		loginRefresh = false;
	//if (currentScene == 'login') {
			if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
				currentScene.stageController.popScenesTo("accounts");
			}
			else {
				currentScene.stageController.popScenesTo("accounts");
			}
	//}else
		//currentScene.stageController.pushScene({name: 'accounts', transition: Mojo.Transition.crossFade, disableSceneScroller:true});
	break;
	case 'account':
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
	break;
	case 'downloads':
/*
		currentScene.get('spinner').mojo.start();
		currentScene.get('scrimSpinner').show();

*/			if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
				currentScene.stageController.pushScene({
					name: "dlScene",
					//transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				});
			}
			else{
				currentScene.stageController.pushScene({
					name: "dlScene",
					//transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				});
			}
	break;
	case 'downloadsNoLogin':
			if (pushLoginScene == true) {
				currentScene.stageController.swapScene({
					name: "dlScene",
					transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				})
			}else{
				currentScene.stageController.pushScene({
					name: "dlScene",
					//transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				})
			}
			downloadsNoLogin = true
			LoginTimeOut = true
			
	break;
	case 'stream':		
		if(pushPlayerDash == true){
			playerDashAss.controller.window.close();
		}								
		pushNowPlaying = true
		currentScene.stageController.pushScene({name: "stream", disableSceneScroller:true});
	break;
	case 'streamSwap':		
		if(pushPlayerDash == true){
			playerDashAss.controller.window.close();
		}										
		pushNowPlaying = true
		currentScene.stageController.swapScene({name: "stream", disableSceneScroller:true});
	break;
	case 'nowPlayingList':
		pushNowPlayingListSwap = false
		currentScene.stageController.pushScene({name: "nowPlayingList", disableSceneScroller:true});
	break;
	case 'nowPlayingListSwap':
		pushNowPlayingListSwap = true
		currentScene.stageController.swapScene({name: "nowPlayingList", transition: Mojo.Transition.crossFade, disableSceneScroller:true});
	break;
	case 'urlAdd':
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		currentScene.stageController.pushScene({
			name: "urlAdd",
			disableSceneScroller: false
		}, false);
	}else{
		currentScene.stageController.pushScene({
			name: "urlAdd",
			disableSceneScroller: true
		}, false);
	}
	break;
	case 'savedPlaylists':
				currentScene.get('spinner').mojo.start();
				currentScene.get('scrimSpinner').show();
				savePlaylistDB = db.get('savedPlaylistsLists', 
					function(fl){
						Mojo.Log.info("SUCCESS savedPlaylists RETRIEVE")		
						if (Object.toJSON(fl) == "{}" || fl === null) {
							playlistsLists = []
						}
						else {
							playlistsLists = fl
						}
						currentScene.stageController.pushScene({name:"savedPlaylists", disableSceneScroller:true});
						currentScene.get('scrimSpinner').hide();
						currentScene.get('spinner').mojo.stop();
					}, function(){Mojo.Log.error("FAIL savedPlaylists SCENEARR")});
	break;
	case 'toggleScrobble':
		scrobbleToggled = true
		if(scrobble == 'On'){
			scrobble = 'Off'
		}else{
			scrobble = 'On'
			//streamAss.scrobble();
			if (audioPlaying == true) {
				audioAss.notification()
			}
		}
		appMenuModel.items[3]={label: "Scrobbling: "+scrobble,command: 'toggleScrobble'}
		currentScene.modelChanged(appMenuModel);
	break;
	case 'toggleHeadPhoneControls':
		headphoneToggled = true
		if (headPhoneControls == 'On') {
			headPhoneControls = 'Off'
		}else{
			headPhoneControls = 'On'
		}
		appMenuModel.items[2]={label: "Headphone Controls: "+headPhoneControls,command: 'toggleHeadPhoneControls'}
		currentScene.modelChanged(appMenuModel);
	break;
	case 'reLog':
		if (internet == true) {
			loginRefresh = true;
			Mojo.Controller.getAppController().showBanner('Logging in to ' + listAccounts[currentAccount].accountName + " Please Wait...", {
				source: 'notification'
			});
			loginAss.connectionTest();
		}
		else {
			Mojo.Controller.errorDialog("No Internet available");
		}
	break;
	case 'loveTrack':
		if(rating == ""){
			rating = "L"
		}else{
			rating = ""
		}
		streamAss.controller.get('rating').innerHTML = 'Rating is: '+rating
	break;
	case 'lastFmRefresh':
		loginAss.lastfmlogin();
	break;
	case 'lastFmStatus':
		currentScene.showAlertDialog({
            onChoose: function(value) {
				if (value == "ok"){
				} 
				else {}
				},
            title: $L("Last.fm Status"),
            message: $L('logged in = '+lastfmLoggedIn),
            choices:[
			  {label:$L("OK"), value:"ok", type:'positive'},
            ]
		})
	break;
	case 'info':
		currentScene.stageController.pushScene({name: "info", disableSceneScroller:false});
	break;		
	case 'help':
		currentScene.stageController.pushScene({name: "help", disableSceneScroller:false});
	break;		
	case 'clear':
		if (playItems.length > 0) {
			currentScene.showAlertDialog({
				onChoose: function(value){
					if (value == "clear") {
						audioAss.stop()
					}
					else 
						if (value == "cancel") {}
				},
				title: $L("Are you sure you want to clear the current playlist and exit playing? This will not affect the source playlist."),
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
	break;
	case 'bookmarkPosition':
		audioAss.bookMarkSongPosition();
		break;
		
/*
	case 'bookmarkSong':
		audioAss.bookMarkSong();
		break;
*/
	case 'bookMarkNowPlaying':
		audioAss.bookMarkNowPlaying();
		break;
	//case 'do-appHelp':
	//  this.controller.pushScene("myAppHelp");
	//break;
		}
    }
	
};
	
StageAssistant.prototype.find = function(searchStr){
  var returnArray = false;
  for (i=0; i<listAccounts.length; i++) {
    if (typeof(searchStr) == 'function') {
      if (searchStr.test(listAccounts[i])) {
        if (!returnArray) { returnArray = [] }
        returnArray.push(i);
      }
    } else {
      if (listAccounts[i]===searchStr) {
        if (!returnArray) { returnArray = [] }
        returnArray.push(i);
      }
    }
  }
  return returnArray;
}
StageAssistant.prototype.updatePlaylistSource = function(arr, source, dbname){
		neededToUpdate = false
		for(i=0;i<arr.length;i++){
			if(arr[i].source == undefined){
		   		if (source == 'savedPlaylist') {
					protocolTest = arr[i].url.match("http://")
					if (protocolTest == "http://") {
						arr[i].source = 'savedPlaylist'
					}
					else {
						arr[i].source = 'downloads'
					}
				}
				else {
					arr[i].source = source
				}
				Mojo.Log.info('arr[i].source: '+arr[i].source)
				neededToUpdate = true
			}
		}if (neededToUpdate == true){
			db.add(dbname, arr, function(){Mojo.Log.info("SUCCESS update source SAVE");
			neededToUpdate = false}, function(){ Mojo.Log.info("FAIL update source SAVE")});
		}
}
StageAssistant.prototype.listResize = function(){
		Mojo.Log.info('Enter Resize Event')
  currentScene=Mojo.Controller.stageController.activeScene();
		if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
			// on the Pixi
			heightChange = (372 - currentScene.window.innerHeight);
			widthChange = (320 - currentScene.window.innerWidth);
			windowHeight = currentScene.window.innerHeight
			Mojo.Log.info('Pixi widthChange: ' + widthChange + ' Pixi heightChange: ' + heightChange + ' Pixi windowHeight: ' + windowHeight)
			document.getElementById('scrollerId').style.height =  270 - heightChange+'px';
			document.getElementById('listBorder').style.height =  357 - heightChange+'px';
		}
		else {
			// on the Pre 480x320
			widthChange = (320 - currentScene.window.innerWidth);
			windowHeight = currentScene.window.innerHeight
			heightChange = (452 - currentScene.window.innerHeight);
			Mojo.Log.info('Pre widthChange: ' + widthChange + ' Pre heightChange: ' + heightChange + ' Pre windowHeight: ' + windowHeight)
			document.getElementById('scrollerId').style.height =  348 - heightChange+'px';
			document.getElementById('listBorder').style.height =  437 - heightChange+'px';
		}
	Mojo.Log.info('Exit Resize Event')
}

StageAssistant.prototype.setupPullDownloads = function(event){
	if (downloadsLists.length != 0) {
		allDownloads = []
		i = 0
		this.pullDownloads()
	}
}
StageAssistant.prototype.pullDownloads = function(event){
  	playListName = downloadsLists[i].name.replace(/\W/g, '')
					sceneArrayDB = db.get(playListName, function(fl){
						if (Object.toJSON(fl) == "{}" || fl === null) {
							Mojo.Log.info('fl is empty')
						}
						else {
							allDownloads = allDownloads.concat(fl)
							Mojo.Log.info('allDownloads has this many: ' + allDownloads.length)
							Mojo.Log.info('downloadsLists has this many: ' + downloadsLists.length)
						}
						i++
						if (i < downloadsLists.length) {
							stageAss.pullDownloads();
						}
					})
}
