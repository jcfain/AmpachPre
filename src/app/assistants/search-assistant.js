searchTimeout = false
function SearchAssistant() {
	//backGroundImage = 'images/ampachpre-blue.png'
	//textColor = 'white'
	//textColorNP = 'white'
	document.getElementById('sceneStyle').style.backgroundImage =  "url(" + backGroundImage + ")";
	document.getElementById('sceneStyle').style.color = textColor;
	document.getElementById('singleBorder').style.borderColor = textColor;
	
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		Mojo.Log.info('Pixi sized')
		document.getElementById('scrollerId').style.height = '300px';
	}
/*
	ampachPreDark = 'Off'
	if(ampachPreDark == 'On'){
		document.getElementById('homeHeader').style.backgroundImage =  "url(images/dark/AmpachPreHeaderD.png)";
	}
*/
}


SearchAssistant.prototype.setup = function() {
	
	searchAss = this
	//this.controller.get('scrimSpinner').hide();
/*
	this.controller.get('aotmRefresh').hide();
	this.controller.get('aotmRefreshText').hide();
	this.controller.get('aotm').hide();
*/
Mojo.Log.info('backGroundImage: '+backGroundImage)

	this.pingInterval();
	this.reLogInterval();
	//this.aotmHandler = this.getRandomAlbums.bind(this);
	//this.toggleAotm = this.toggleAlbumArts.bind(this);
	this.move=this.OK.bind(this);
	this.onKeyPressHandler = this.onKeyPress.bind(this);
	this.onEnterPressHandler = this.onEnterPress.bind(this);
	this.resultListHandler = this.resultList.bind(this)
	this.cancelSearchHandler = this.cancelSearch.bind(this)
	this.homeListSelectHandler = this.homeListSelect.bind(this)
	this.categorySelectHandler = this.categorySelect.bind(this)
	this.popupHandler = this.popup.bind(this)	
	this.homeListReorderHandler = this.homeListReorder.bind(this)
	this.handleUpdateHandler = this.handleUpdate.bind(this)
	this.homeListDeleteHandler = this.homeListDelete.bind(this)
	this.autoLoginHandler = this.autoLogin.bind(this)
	this.resizeHandler = this.resize.bind(this)
	if (networkChangeSubscribed == false) {
		this.subscribeNetworkChange();
	}
	/*favoritesCookie = new Mojo.Model.Cookie('favorites');
	favoritesArray = favoritesCookie.get();
	if (!favoritesArray){
		favoritesArray = []
	}*/
if (lastFmPassWord != "" && lastFmUserName != "") {
	searchMenuModel = {
		visible: true,
		items: [{
			label: "Now Playing",
			command: 'stream'
		},	{
			label: "Now Playing List",
			command: 'nowPlayingList'
		},	{
			label: "Headphone Controls: "+headPhoneControls,
			command: 'toggleHeadPhoneControlsSearch'
		},	{
			label: "Scrobbling: "+scrobble,
			command: 'toggleScrobbleSearch'
		},	{
			label: "New User Guide",
			command: 'help'
		},  {
			label: "Change Account",
			command: 'accounts'
		},	{
			label: "Refresh Login",
			command: 'reLog'
		},  {
			label: "Last.fm Status", 
			command: 'lastFmStatus'
		},	{
			label: "Server Info",
			command: 'info'
		},	{
			label: "Reset Home Scene",
			command: 'homeListReset'
		},	{
			label: "About",
			command: 'do-myAbout'
		}, ]
	};
}else{
	searchMenuModel = {
		visible: true,
		items: [{
			label: "Now Playing",
			command: 'stream'
		},	{
			label: "Now Playing List",
			command: 'nowPlayingList'
		},	{
			label: "Headphone Controls: "+headPhoneControls,
			command: 'toggleHeadPhoneControlsSearch'
		},	{
			label: "Change Account",
			command: 'accounts'
		},	{
			label: "Refresh Login",
			command: 'reLog'
		},	{
			label: "Server Info",
			command: 'info'
		},	{
			label: "Reset Home Scene",
			command: 'homeListReset'
		},  {
			label: "New User Guide",
			command: 'help'
		},  {
			label: "About",
			command: 'do-myAbout'
		}, ]
	};
}	

	
	this.controller.setupWidget(Mojo.Menu.appMenu, accountsAttr, searchMenuModel);	
	
			/*this.cmdMenuModel = {
  				visible: true,
  					items: [
    						{items:[{label: $L('Exit'), icon:'', command:'exit'},
							{label: $L('Now Playing'),icon: '',command: 'nowPlaying', width: 160},
							{label: $L('vlist'),icon: '', command: 'viewPlaylist'}]}
  							]
						};
		this.controller.setupWidget(Mojo.Menu.commandMenu, undefined, this.cmdMenuModel)*/
/*
		this.viewMenuModel = {
  				visible: true,
  					items: [{
    					items: [
      						{},
      						{},
      						{},
							{label: $L(''),icon: 'search',command: 'search'},
    							]
  							}]
						};
		this.controller.setupWidget(Mojo.Menu.viewMenu, { spacerHeight: 0, menuClass:'no-fade' }, this.viewMenuModel);
*/
/*
		this.cmdMenuModel = {
			visible: true,
			items: [
				{},
				//{label: $L(''),icon: 'list',command: 'viewPlaylist'}, 
				//{label: $L(''),icon: 'lists',command: 'savedPlaylists'}, 
				//{label: $L(''),icon: 'downloads',command: 'downloads'}, 
				//{label: $L(''),icon: 'nowPlaying',command: 'stream'}, 
				//{label: $L(''),icon: 'listNowPlaying',command: 'nowPlayingList'}, 
				{label: $L(''),icon: 'search',command: 'search'}, 
			]
		}
		this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass:'no-fade'}, this.cmdMenuModel);
*/

/*
	this.controller.setupWidget('category', 
		{
			label: $L(''), 
			choices: [         
						{label:$L('All'), value:"all"},              
						{label:$L('Artists'), value:"artists"}, 
						{label:$L('Album'), value:"albums"}, 
						{label:$L('Songs'), value:"songs"},
						{label:$L('Genre'), value:"tags"},
						//{label:$L('Videos'), value:"videos"}, 	 						
			 		], 
			modelProperty:'currentCategory'
		}, 
		this.selectorsModel = {
			currentCategory: "all"
	});
*/

//searchTextField
		this.searchModel = { value: '' };
	    this.controller.setupWidget(
			'searchField', 
				{
					hintText: $L('Enter a Search String...'),
					autoFocus: true,
					//enterSubmits: true,
					multiline: false,
					//modifierState: Mojo.Widget.sentenceCase,
					focusMode: Mojo.Widget.focusSelectMode,
					requiresEnterKey: true,
					changeOnKeyPress: true,
					textCase: Mojo.Widget.steModeLowerCase,
					autoReplace: false
				}, 
				this.searchModel
		);
		
		//$('searchView').hide()
/*	this.searchAttributes = {
		hintText: 'Leave blank for all',
		autoFocus: true,
		enterSubmits: true
		};
	this.searchModel = {		
		value: ""
	 	};
*/
//searchfield

//this.controller.setupWidget('searchField', this.searchAttributes, this.searchModel);
this.searchFieldHandler = this.controller.get('searchField');
//buttons
/*	this.controller.setupWidget("enter",
        this.enterAttributes = {
				type: Mojo.Widget.defaultButton
            },
        this.enterModel = {
            label : "",
            disabled: false
        });
this.searchButtonHandler=this.controller.get('enter')
Mojo.Event.listen(this.searchButtonHandler, Mojo.Event.tap, this.move); */
//this.searchButtonHandler=this.controller.get('searchButton')
//Mojo.Event.listen(this.searchButtonHandler, Mojo.Event.tap, this.move); 
//Mojo.Event.listen($("artist"), Mojo.Event.tap, this.browseByArtist.bind(this));
//Mojo.Event.listen($("album"), Mojo.Event.tap, this.browseByAlbum.bind(this));
//Mojo.Event.listen($("genre"), Mojo.Event.tap, this.browseByGenre.bind(this));

//listpicker
//this.listPickerHandler=this.controller.get('category');

//spinners
   this.controller.setupWidget("spinner",
         this.attributes = {
             spinnerSize: 'large'
         },
         this.model = {
             spinning: false 
         });

//	if (ampachPreDark == 'Off') {
		this.homeModel = {
	         items : homeList
	    }
/*
	}else{
		this.homeModel = {
	         items : homeListD
	    }
	}
*/		 
		 
	this.controller.setupWidget("homeList", {
        itemTemplate: "search/homelistTemplate",
        listTemplate: "search/listTemplate",
		fixedHeightItems: true,
		swipeToDelete: true,
		reorderable: true,
		hasNoWidgets: true,
    },
	this.homeModel
	);	
	    this.controller.setupWidget("scrollerId",
         this.scrollerAttributes = {
             mode: 'vertical'
         },
         this.scrollerModel = {
         });
/*
	this.controller.setupWidget("categoryList", {
        itemTemplate: "search/homelistTemplate",
        listTemplate: "search/listTemplate",
		fixedHeightItems: true,
		//swipeToDelete: true,
		reorderable: true,
		hasNoWidgets: true,
    },  
	this.categoryListModel = {
         items : homeList
    });
	
		 
	this.controller.setupWidget("categoryDrawer",
        this.attributes = {
            modelProperty: 'open',
            unstyled: false
        },
    this.drawerModel = {
            open: true
        }
    );
*/
/*
	   this.controller.setupWidget("aotmSpinner",
         this.attributes = {
             spinnerSize: 'large'
         },
         this.model = {
             spinning: false 
         });
*/	 
/*
    this.controller.setupWidget("scrollerId",
         this.attributes = {
             mode: 'horizontal'
         },
         this.model = {
             //snapElements: {x: [DOMElement, DOMElement, DOMElement, ...]}
         });
*/

/*this.filterAttributes = {
     itemTemplate: 'artist/filterTemplate',
     filterFunction: this.filterFunction.bind(this)
};
this.filterModel = {
};
this.controller.setupWidget($('filterList'), this.filterAttributes, this.filterModel);
//this.controller.get('filterList').mojo.setCount(10);*/
/*
    this.controller.setupWidget("toggleAotm",
         this.toggleAttributes = {
             trueValue: 'On',
             falseValue: 'Off' 
         },
         this.toggleModel = {
             value: false,
             disabled: false
         });
*/
		 

	

	
/*
	 this.controller.setupWidget("booleanCheckbox",
          this.booleanCheckboxAttributes = {
              trueValue: 'exact',
              falseValue: 'filter',
          },
          this.booleanCheckboxModel = {
              value: false,
              disabled: false
          });
*/
	
if (currentVersion != oldVersion) {
	//if (testArray[0].undefinedCheck == false) {
		db.add('version', currentVersion, function(){
			//searchAss.favoritesModel.items = favoritesArray;
			//searchAss.controller.modelChanged(searchAss.favoritesModel);
			Mojo.Log.info("SUCCESS version SAVE");
		}, function(){
			Mojo.Log.error("FAIL version SAVE")
		});
	//}
}
//$('favs').show();
}

SearchAssistant.prototype.activate = function(event) {
//Mojo.Event.listen(this.searchFieldHandler, Mojo.Event.propertyChange, this.OK);
//Mojo.Event.listen($('searchField'), Mojo.Event.propertyChange, this.move);
//Mojo.Event.listen(this.controller.sceneElement, Mojo.Event.keypress, this.onKeyPressHandler);
artistSearch = false;
descending = false
		this.resize()
	Mojo.Event.listen(this.controller.document, Mojo.Event.keydown, this.onKeyPressHandler, true);
	Mojo.Event.listen(this.searchFieldHandler, 'keyup', this.onEnterPressHandler);	
	//Mojo.Event.listen($("toggleAotm"), Mojo.Event.propertyChange, this.toggleAotm)
	Mojo.Event.listen($('cancelSearch'), Mojo.Event.tap, this.cancelSearchHandler);
	Mojo.Event.listen($('toggleCategory'), Mojo.Event.tap, this.categorySelectHandler);
	Mojo.Event.listen($('homeList'), Mojo.Event.listTap, this.homeListSelectHandler);	 
	Mojo.Event.listen($('homeList'), Mojo.Event.listReorder, this.homeListReorderHandler);
	Mojo.Event.listen($('homeList'), Mojo.Event.listDelete, this.homeListDeleteHandler);
	Mojo.Event.listen(this.searchFieldHandler, Mojo.Event.propertyChange, this.handleUpdateHandler);
	Mojo.Event.listen(this.controller.window, 'resize', this.resizeHandler);
	
	if (currentVersion != oldVersion) {
		this.controller.stageController.pushScene({
			name: 'whatsNew',
			//transition: Mojo.Transition.crossFade,
			//disableSceneScroller: true
		});
		//this.alertDialog('Welcome to AmpachPre v'+currentVersion+', These accounts settings have been set to the default values: '+testArrayNames.toString())
	}
}
SearchAssistant.prototype.deactivate = function(event) {
//Mojo.Event.stopListening($('searchField'), Mojo.Event.propertyChange, this.move);
//Mojo.Event.stopListening(this.controller.sceneElement, Mojo.Event.keypress, this.onKeyPressHandler);
//	Mojo.Event.stopListening(this.searchFieldHandler, Mojo.Event.propertyChange, this.OK);
	Mojo.Log.info('Enter SearchAssistant.prototype.deactivate')
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, this.onKeyPressHandler, true);
	Mojo.Event.stopListening(this.searchFieldHandler, 'keyup', this.onEnterPressHandler);	
	//Mojo.Event.stopListening($("toggleAotm"), Mojo.Event.propertyChange, this.toggleAotm);
	Mojo.Event.stopListening($('cancelSearch'), Mojo.Event.tap, this.cancelSearchHandler);
	Mojo.Event.stopListening($('toggleCategory'), Mojo.Event.tap, this.categorySelectHandler);
	Mojo.Event.stopListening($('homeList'), Mojo.Event.listTap, this.homeListSelectHandler);	 
	Mojo.Event.stopListening($('homeList'), Mojo.Event.listReorder, this.homeListSelectHandler);
	Mojo.Event.stopListening($('homeList'), Mojo.Event.listDelete, this.homeListDeleteHandler);
	Mojo.Event.stopListening(this.searchFieldHandler, Mojo.Event.propertyChange, this.handleUpdateHandler);
	Mojo.Event.stopListening(this.controller.window, 'resize', this.resizeHandler);
	Mojo.Log.info('Exit SearchAssistant.prototype.deactivate')
}

SearchAssistant.prototype.cleanup = function(event) {
	 /* favoritesCookie = new Mojo.Model.Cookie('favorites');
	 	favoritesCookie.put(favoritesArray)*/
//Mojo.Event.stopListening($('searchField'), Mojo.Event.propertyChange, this.move);
//Mojo.Event.stopListening(this.controller.sceneElement, Mojo.Event.keypress, this.onKeyPressHandler);
/*
if (this.toggleModel.value == 'On'){
	this.toggleModel.value = 'Off'
	this.controller.modelChanged(this.toggleModel);
}
*/	
	Mojo.Log.info('Enter SearchAssistant.prototype.cleanup')
	
	if (pingInterval > 0) {
		accountsAss.clearPing()
	}
	if (reLogInterval > 0 || reLogIntervalMins > 0) {
		accountsAss.clearReLog()
	}
	networkChangeSubscribed = false
	Mojo.Event.stopListening(this.controller.document, Mojo.Event.keydown, this.onKeyPressHandler, true);
	Mojo.Event.stopListening(this.searchFieldHandler, 'keyup', this.onEnterPressHandler);	
	//Mojo.Event.stopListening($("toggleAotm"), Mojo.Event.propertyChange, this.toggleAotm);
	Mojo.Event.stopListening($('cancelSearch'), Mojo.Event.tap, this.cancelSearchHandler);
	Mojo.Event.stopListening($('toggleCategory'), Mojo.Event.tap, this.categorySelectHandler);
	Mojo.Event.stopListening($('homeList'), Mojo.Event.listTap, this.homeListSelectHandler);	 
	Mojo.Event.stopListening($('homeList'), Mojo.Event.listReorder, this.homeListSelectHandler);
	Mojo.Event.stopListening($('homeList'), Mojo.Event.listDelete, this.homeListDeleteHandler);
	Mojo.Event.stopListening(this.searchFieldHandler, Mojo.Event.propertyChange, this.handleUpdateHandler);
	Mojo.Event.stopListening(this.controller.window, 'resize', this.resizeHandler);
	Mojo.Log.info('Exit SearchAssistant.prototype.cleanup')
}

SearchAssistant.prototype.OK = function(event){
	Mojo.Log.info('category: '+category)
		searchViewVisible = false
		taptoOpenSearch = false
		cancelSearch = false
		//set to false to not have recent filtered items by date
		recentFilter = false
		$('searchView').hide()
		$('homeHeader').show()
		$('searchField').mojo.blur()	
	searchTimeout = false
	//make sure browse by ??? is not true
	if (browseSelected == false) {
		searchString = this.searchModel.value;
	}
	allSelected = false
	if (searchString == "") {
		searchString = " ";
	}

	if (category == 'all') {
		if (this.searchModel.value == "" || this.searchModel.value == " ") {
			this.controller.showAlertDialog({
				onChoose: function(value){
					if (value == "artists") {
						category = "artists"
						allSelected = false
						browseSelected = true
						searchAss.ajaxRequest();
					}
					else 
						if (value == "albums") {
							category = "albums"
							allSelected = false
							browseSelected = true
							searchAss.ajaxRequest();
						}
						else 
							if (value == "songs") {
								category = "songs"
								allSelected = false
								browseSelected = true
								searchAss.ajaxRequest();
							}
							else 
								if (value == "cancel") {
								
								}
				},
				title: $L("Empty search string and category \"All\" selected. If you have a large collection this could exhaust memory. What would you like to do?"),
				choices: [{
					label: $L("Browse Artists"),
					value: "artists"
				}, {
					label: $L("Browse Albums"),
					value: "albums"
				}, {
					label: $L("Browse Songs"),
					value: "songs"
				}, {
					label: $L("Cancel"),
					value: "cancel"
				}]
			});
		}
		else {
			category = "tags"
			allSelected = true
			searchAss.ajaxRequest();
		}
	}
	else 
		if (category == 'downloads') {
			if (allDownloads.length > 0) {
				this.searchDownloads();
			}else{
				Mojo.Controller.errorDialog("No downloads found.");
			}
		}else{
		searchAss.ajaxRequest();
	}
}

SearchAssistant.prototype.ajaxRequest = function(){
if (internet == true) {
	searchAss.controller.get('percentageDone').innerHTML = 'Sending request...'
	this.controller.get('spinner').mojo.start();
	this.controller.get('scrimSpinner').show();
	var search = serverUrl + "/server/xml.server.php?action=" + category + "&auth=" + token + "&filter=" + searchString;
	Mojo.Log.info('Search Url: ' + search);
	
	var request = new Ajax.Request(search, {
		method: "get",
		evalJSON: "false",
		onComplete: this.resultListHandler, //Mojo.Controller.errorDialog("beg"+searchString+"end"),
		onFailure: function(){
			Mojo.Controller.errorDialog("there was a problem.");
		}
	});
}
else {
	Mojo.Controller.errorDialog("No Internet available");
}
}
SearchAssistant.prototype.resultList = function(transport){
Mojo.Log.info('Enter resultList');
/*
if (searchTimeout != true) {
Mojo.Log.info('Setting searchTimeout');
	searchTimeout = setTimeout(function(){
		Mojo.Log.info('Fire searchTimeout');
		searchAss.controller.get('scrimSpinner').hide();
		searchAss.controller.get('spinner').mojo.stop();
		Mojo.Controller.errorDialog("Ajax Timeout")
		searchTimeout = true
		//searchAss.controller.stageController.swapScene('search');
	}, 30000)
}
*/
	searchAss.controller.get('percentageDone').innerHTML = 'Waiting for results...'
	if (allSelected == true) {
		listAll = [];
		category = "all"
		artistAlbumTotal = 0
		totalListAllSongs = 0
		
/*
		Mojo.Log.info("searchDownloadsIndex.length: "+searchDownloadsIndex.length)
		Mojo.Log.info("searchDownloadsIndex: "+searchDownloadsIndex)
		for(i=0; i<searchDownloadsIndex.length; i++){
			Mojo.Log.info("searchDownloadsIndex: "+searchDownloadsIndex)
			listAll.push(downloadLists[searchDownloadsIndex])
			listAll[listAll.length - 1].sourceTypeImage = 'images/downloads.png'
			listAll[listAll.length - 1].sourceType = 'song'
		}
*/
		
		Mojo.Log.info('Enter allSelected == true');
						
		var response = transport.responseText || "no response text";
		Mojo.Log.info('tags response: '+response);

		var tags = transport.responseXML.getElementsByTagName('tag');
			 Mojo.Log.info("tags.length: "+tags.length);
			 for (i = 0; i < tags.length; i++) {
				searchAss.controller.get('percentageDone').innerHTML = 'Building Tag results<br>%'+Math.floor(i/tags.length * 100)
				listAll.push({
					name: tags[i].getElementsByTagName('name')[0].firstChild.data,
					field1: 'Albums: ' +tags[i].getElementsByTagName('albums')[0].firstChild.data,
					field2: 'Songs: '+tags[i].getElementsByTagName('artists')[0].firstChild.data,
					tagId: tags[i].getAttribute("id"),
					albums: tags[i].getElementsByTagName('albums')[0].firstChild.data,
					artists: tags[i].getElementsByTagName('artists')[0].firstChild.data,
					songs: tags[i].getElementsByTagName('songs')[0].firstChild.data,
					sourceTypeImage: 'images/genre.png',
					sourceType: 'tags',
					source: 'listAll'
				 })
				if(cancelSearch == true){
					Mojo.Log.info('cancelSearch: '+cancelSearch)
					break;
				}
				artistAlbumTotal++
				totalListAllSongs = totalListAllSongs+parseFloat(listAll[listAll.length - 1].songs)
			 }
var search = serverUrl + "/server/xml.server.php?action=artists&auth=" + token + "&filter=" + searchString;
Mojo.Log.info('Search tags Url: ' + search);
var request = new Ajax.Request(search, {
	method: "get",
	evalJSON: "false",
	onComplete: function(transport){
		response = transport.responseText || "no response text";
		Mojo.Log.info(response);
		var artists = transport.responseXML.getElementsByTagName('artist');
		for (i = 0; i < artists.length; i++) {
			searchAss.controller.get('percentageDone').innerHTML = 'Building Artists results<br>%'+Math.floor(i/artists.length * 100)
			listAll.push({
				name: artists[i].getElementsByTagName('name')[0].firstChild.data,
				field1: 'Songs: ' +artists[i].getElementsByTagName('songs')[0].firstChild.data,
				field2: 'Albums: ' +artists[i].getElementsByTagName('albums')[0].firstChild.data,
				artist: artists[i].getElementsByTagName('name')[0].firstChild.data,
				artistId: artists[i].getAttribute("id"),
				songs: artists[i].getElementsByTagName('songs')[0].firstChild.data,
				albums: artists[i].getElementsByTagName('albums')[0].firstChild.data,
				sourceTypeImage: 'images/artist.png',
				sourceType: 'artist',
			})
			if(cancelSearch == true){
				Mojo.Log.info('cancelSearch: '+cancelSearch)
				break;
			}
			artistAlbumTotal++
			totalListAllSongs = totalListAllSongs+parseFloat(listAll[listAll.length - 1].songs)
		}
		var search = serverUrl + "/server/xml.server.php?action=albums&auth=" + token + "&filter=" + searchString;
		Mojo.Log.info('Search albums Url: ' + search);
		var request = new Ajax.Request(search, {
			method: "get",
			evalJSON: "false",
			onComplete: function(transport){
				var response = transport.responseText || "no response text";
				//Mojo.Log.info(response);
				albums = transport.responseXML.getElementsByTagName('album');
				artist = "search"
				for (i = 0; i < albums.length; i++) {
					searchAss.controller.get('percentageDone').innerHTML = 'Building Album results<br>%'+Math.floor(i/albums.length * 100)
					listAll.push({
						name: albums[i].getElementsByTagName('name')[0].firstChild.data,
						field1: 'by ' +albums[i].getElementsByTagName('artist')[0].firstChild.data,
						field2: 'Songs: ' +albums[i].getElementsByTagName('tracks')[0].firstChild.data,
						album: albums[i].getElementsByTagName('name')[0].firstChild.data,
						albumId: albums[i].getAttribute("id"),
						songs: albums[i].getElementsByTagName('tracks')[0].firstChild.data,
						artist: albums[i].getElementsByTagName('artist')[0].firstChild.data,
						art: albums[i].getElementsByTagName('art')[0].firstChild.data,
						sourceTypeImage: 'images/cd.png',
						sourceType: 'album',
					})
					if(cancelSearch == true){
						Mojo.Log.info('cancelSearch: '+cancelSearch)
						break;
					}
					artistAlbumTotal++
					totalListAllSongs = totalListAllSongs+parseFloat(listAll[listAll.length - 1].songs)
				}
				
				Mojo.Log.info('allDownloads.length: '+allDownloads.length)
				if (allDownloads.length > 0) {
					searchAss.find(searchString)
				}
				
				var search = serverUrl + "/server/xml.server.php?action=songs&auth=" + token + "&filter=" + searchString;
				Mojo.Log.info('Search songs Url: ' + search);
				var request = new Ajax.Request(search, {
					method: "get",
					evalJSON: "false",
					onComplete: function(transport){
						var response = transport.responseText || "no response text";
						Mojo.Log.info(response);
						var songs = transport.responseXML.getElementsByTagName('song');
						for (i = 0; i < songs.length; i++) {
							searchAss.controller.get('percentageDone').innerHTML = 'Building Song results<br>%'+Math.floor(i/songs.length * 100)
							listAll.push({
								name: songs[i].getElementsByTagName('title')[0].firstChild.data,
								field1: 'by ' +songs[i].getElementsByTagName('artist')[0].firstChild.data,
								field2: '',
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
								sourceTypeImage: 'images/16thNote.png',
								sourceType: 'song',
								source: 'listAll'
							})
							if(cancelSearch == true){
								Mojo.Log.info('cancelSearch: '+cancelSearch)
								break;
							}
							totalListAllSongs = totalListAllSongs+1
							Mojo.Log.info('finish lists"');
							convert = Math.floor(listAll[listAll.length - 1].time / 60);
							convert2 = listAll[listAll.length - 1].time % 60;
							convertString = convert2.toString()
							if (convertString[1] == "." || convertString[1] == undefined) {
								convertSecs = "0" + convertString[0]
							}
							else {
								convertSecs = convertString[0] + convertString[1]
							}
							
							listAll[listAll.length - 1].time = convert + ":" + convertSecs;
							listAll[listAll.length - 1].field2 = convert + ":" + convertSecs;
							Mojo.Log.info('finish time: ' + listAll[listAll.length - 1].time);
						}
						
											
								if (searchTimeout == false && cancelSearch == false) {
									Mojo.Log.info('searchTimeout: '+searchTimeout);
									if (listAll == "") {
										Mojo.Log.info('listAll = ""');
										//clearTimeout(searchTimeout)
										Mojo.Controller.errorDialog("Sorry, nothing with the search string, \"" + searchString + "\" in the category of \"" + category + "\" was found.");
										searchAss.controller.get('scrimSpinner').hide();
										searchAss.controller.get('spinner').mojo.stop();
									}
									else {
										Mojo.Log.info('Push Scene');
										searchAss.controller.stageController.pushScene({
											name: "listAll",
											//transition: Mojo.Transition.crossFade,
											disableSceneScroller: true
										});
										//clearTimeout(searchTimeout)
										searchAss.controller.get('scrimSpinner').hide();
										searchAss.controller.get('spinner').mojo.stop();
									}
								}else{
									Mojo.Log.info('searchTimeout: '+searchTimeout);
									searchTimeout = false
									cancelSearch = false
									searchAss.controller.get('scrimSpinner').hide();
									searchAss.controller.get('spinner').mojo.stop();
								}
							},
							onFailure: function(err){
								Mojo.Controller.errorDialog("there was a problem. "+ err.errorText);
								//clearTimeout(searchTimeout)
								searchAss.controller.get('scrimSpinner').hide();
								searchAss.controller.get('spinner').mojo.stop();
							}
						});
					},
					onFailure: function(err){
						Mojo.Controller.errorDialog("there was a problem. "+ err.errorText);
						//clearTimeout(searchTimeout)
						searchAss.controller.get('scrimSpinner').hide();
						searchAss.controller.get('spinner').mojo.stop();
					}
				});
			},
			onFailure: function(err){
				Mojo.Controller.errorDialog("there was a problem. "+ err.errorText);
				//clearTimeout(searchTimeout)
				searchAss.controller.get('scrimSpinner').hide();
				searchAss.controller.get('spinner').mojo.stop();
			}
		});
		Mojo.Log.info('Exit this.selectorsModel.currentCategory = "all"');
	}
	else 
		if (category == "artists") {
			Mojo.Log.info('Enter category == artists');
			response = transport.responseText || "no response text";
			//Mojo.Controller.errorDialog(response);
			Mojo.Log.info(response);
			artistSearch = true;
			var artists = transport.responseXML.getElementsByTagName('artist');
			list = [];
			for (i = 0; i < artists.length; i++) {
				list[i] = {
					artist: artists[i].getElementsByTagName('name')[0].firstChild.data,
					artistId: artists[i].getAttribute("id"),
					songs: artists[i].getElementsByTagName('songs')[0].firstChild.data,
					albums: artists[i].getElementsByTagName('albums')[0].firstChild.data,
				}
				if(cancelSearch == true){
					cancelSearch = false
					break;
				}
				totalArtistSongs = totalArtistSongs+parseFloat(list[i].songs)
				searchAss.controller.get('percentageDone').innerHTML = 'Building Artists results<br>%'+Math.floor(i/artists.length * 100)
			}
			//Mojo.Controller.errorDialog(list);
			if (searchTimeout != true) {
				if (list == "") {
					//clearTimeout(searchTimeout)
					Mojo.Controller.errorDialog("Sorry, nothing with the search string, \"" + searchString + "\" in the category of " + category + " was found.");
					this.controller.get('scrimSpinner').hide();
					this.controller.get('spinner').mojo.stop();
				}
				else {
					accountsAss.sortArray(list, null, 'artist')
					this.controller.stageController.pushScene({
						name: "artist",
						//transition: Mojo.Transition.crossFade,
						disableSceneScroller: true
					});
					//clearTimeout(searchTimeout)
					this.controller.get('scrimSpinner').hide();
					this.controller.get('spinner').mojo.stop();
				}
			}else{
				searchTimeout = false
			}
			
		}
		else 
			if (category == "albums") {
				albums = transport.responseXML.getElementsByTagName('album');
				listAlbums = [];
				for (i = 0; i < albums.length; i++) {
					listAlbums[i] = {
						album: albums[i].getElementsByTagName('name')[0].firstChild.data,
						albumId: albums[i].getAttribute("id"),
						songs: albums[i].getElementsByTagName('tracks')[0].firstChild.data,
						artist: albums[i].getElementsByTagName('artist')[0].firstChild.data,
						art: albums[i].getElementsByTagName('art')[0].firstChild.data,
						year: albums[i].getElementsByTagName('year')[0].firstChild.data
					}
					if(cancelSearch == true){
						cancelSearch = false
						break;
					}
					totalAlbumsSongs = totalAlbumsSongs+parseFloat(listAlbums[i].songs)
					searchAss.controller.get('percentageDone').innerHTML = 'Building Album results<br>%'+Math.floor(i/albums.length * 100)
				}
				Mojo.Log.info("searchTimeout: "+searchTimeout)
				if (searchTimeout != true) {
					if (listAlbums == "") {
						clearTimeout(searchTimeout)
						Mojo.Controller.errorDialog("Sorry, nothing with the search string, \"" + searchString + "\" in the category of " + category + " was found.");
						this.controller.get('scrimSpinner').hide();
						this.controller.get('spinner').mojo.stop();
					}
					else {
					accountsAss.sortArray(listAlbums, null, 'album')
					//artist = listAlbums.length+" albums"
					artistInfo = listAlbums.length+" albums, "+totalAlbumsSongs+' Songs'
						this.controller.stageController.pushScene({
							name: "albums",
							//transition: Mojo.Transition.crossFade,
							disableSceneScroller: true
						}, listAlbums);
						//clearTimeout(searchTimeout)
						this.controller.get('scrimSpinner').hide();
						this.controller.get('spinner').mojo.stop();
					}
				}else{
					searchTimeout = false
				}
				
				
			}
			else 
				if (category == "songs") {
					countTest =0
					response = transport.responseText || "no response text";
					Mojo.Log.info(response);
					var songs = transport.responseXML.getElementsByTagName('song');
					Mojo.Log.info('songs.length: '+songs.length);
					//Mojo.Controller.errorDialog(songs.length);
					listSongs = [];
					for (i = 0; i < songs.length; i++) {
/*
						var url = songs[i].getElementsByTagName('url')[0].firstChild.data,		
			 			extension = "";
			 
			 			if (url.length != 0) {
							var dotPos = url.lastIndexOf(".");
							if (dotPos != -1)
							extension = url.substr(dotPos + 1).toLowerCase();
						}
*/
						listSongs[i] = {
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
							source: 'songs',
						//type: extension
						}
						if(cancelSearch == true){
							cancelSearch = false
							break;
						}
						convert = Math.floor(listSongs[i].time / 60);
						convert2 = listSongs[i].time % 60;
						convertString = convert2.toString()
						if (convertString[1] == "." || convertString[1] == undefined) {
							convertSecs = "0" + convertString[0]
						}
						else {
							convertSecs = convertString[0] + convertString[1]
						}
						
						listSongs[i].time = convert + ":" + convertSecs;
						countTest++
						Mojo.Log.info('countTest: '+countTest)
						searchAss.controller.get('percentageDone').innerHTML = 'Building Song results<br>%'+Math.floor(i/songs.length * 100)
					}
					
					if (searchTimeout != true) {
						if (listSongs == "") {
						//	clearTimeout(searchTimeout)
							Mojo.Controller.errorDialog("Sorry, nothing with the search string, \"" + searchString + "\" in the category of " + category + " was found.");
							this.controller.get('scrimSpinner').hide();
							this.controller.get('spinner').mojo.stop();
						}
						else {
							accountsAss.sortArray(listSongs, null, 'song')
							albumArt = 'images/folder.jpg'
							album = listSongs.length+' Songs Returned'
							this.controller.stageController.pushScene({
								name: "songs",
								//transition: Mojo.Transition.crossFade,
								disableSceneScroller: true
							});
							//clearTimeout(searchTimeout)
							this.controller.get('scrimSpinner').hide();
							this.controller.get('spinner').mojo.stop();
						}
					}else{
						searchTimeout = false
					}
				}
				else 
					if (category == "tags") {
						var response = transport.responseText || "no response text";
						Mojo.Log.info('tags response: '+response);

						var tags = transport.responseXML.getElementsByTagName('tag');
							 Mojo.Log.info("tags.length: "+tags.length);
							 listTags = [];
							 for (i = 0; i < tags.length; i++) {
								 listTags[i] = {
									 tagId: tags[i].getAttribute("id"),
									 name: tags[i].getElementsByTagName('name')[0].firstChild.data,
									 albums: tags[i].getElementsByTagName('albums')[0].firstChild.data,
									 artists: tags[i].getElementsByTagName('artists')[0].firstChild.data,
									 songs: tags[i].getElementsByTagName('songs')[0].firstChild.data,
								 }	
								searchAss.controller.get('percentageDone').innerHTML = 'Building Tag results<br>%'+Math.floor(i/tags.length * 100)
								if(cancelSearch == true){
									cancelSearch = false
									break;
								}
							 }
							 if (listTags == "") {
								 Mojo.Controller.errorDialog("Sorry, nothing with the search string, \""+ searchString +"\" in the category of " + category + " was found.");
								//clearTimeout(searchTimeout)
								this.controller.get('scrimSpinner').hide();
								this.controller.get('spinner').mojo.stop();
							 }
							 else {
								accountsAss.sortArray(listTags, this.listModel, 'name')
								if(searchString == " "){
									searchString = 'All '+listTags.length
								}
								 //Mojo.Controller.errorDialog(listSongs[0].artist);
								 this.controller.stageController.pushScene({
									 name: "tags",
									 //transition: Mojo.Transition.crossFade,
									 disableSceneScroller: true
								 });
								//clearTimeout(searchTimeout)
								this.controller.get('scrimSpinner').hide();
								this.controller.get('spinner').mojo.stop();
		 					}

					}
					else 
						if (category == "videos") {
							var response = transport.responseText || "no response text";
							Mojo.Log.info(response);
							var videos = transport.responseXML.getElementsByTagName('video');
							//Mojo.Controller.errorDialog(videos.length);
							listVideos = [];
							for (i = 0; i < videos.length; i++) {
								listVideos[i] = {
									video: videos[i].getElementsByTagName('title')[0].firstChild.data,
									videoId: videos[i].getAttribute("id"),
									mime: videos[i].getElementsByTagName('mime')[0].firstChild.data,
									resolution: videos[i].getElementsByTagName('resolution')[0].firstChild.data,
									url: videos[i].getElementsByTagName('url')[0].firstChild.data,
								}
								searchAss.controller.get('percentageDone').innerHTML = 'Building Video results<br>%'+Math.floor(i/videos.length * 100)
							if(cancelSearch == true){
								cancelSearch = false
								break;
							}
							}
							
							if (searchTimeout != true) {
								if (listVideos == "") {
									//clearTimeout(searchTimeout)
									Mojo.Controller.errorDialog("Sorry, nothing with the search string, \"" + searchString + "\" in the category of " + category + " was found.");
									this.controller.get('scrimSpinner').hide();
									this.controller.get('spinner').mojo.stop();
								}
								else {
									//Mojo.Controller.errorDialog(listSongs[0].artist);						
									this.controller.stageController.pushScene({
										name: "videos",
										//transition: Mojo.Transition.crossFade,
										disableSceneScroller: true
									});
									//clearTimeout(searchTimeout)
									this.controller.get('scrimSpinner').hide();
									this.controller.get('spinner').mojo.stop();
								}
							}else{
								searchTimeout = false
							}
						}
						if(browseSelected == true){
							browseSelected = false
							category = 'all'
						}
	Mojo.Log.info('Exit resultList');
}
SearchAssistant.prototype.handleUpdate = function(event) {
	//Mojo.Log.info('this.searchModel.value: '+this.searchModel.value)

if (searchViewVisible == true) {
	if (taptoOpenSearch != true) {
		if (this.searchModel.value == '') {
			searchViewVisible = false
			$('searchView').hide()
			$('homeHeader').show()
			$('searchField').mojo.blur()
		}
	}
}
}


	
SearchAssistant.prototype.browseByArtist = function(event){
	this.controller.get('scrimSpinner').show();
	this.controller.get('spinner').mojo.start();
	var artistBlank = " ";
	//Mojo.Controller.errorDialog(artistBlank);
	var filterByArtist = serverUrl + "/server/xml.server.php?action=artists&auth=" + token + "&filter=" + artistBlank;
	//Mojo.Controller.errorDialog(filterByArtist);
	var ArtistRequest = new Ajax.Request(filterByArtist,
  	{
    	method:"get",
		evalJSON: "false",
    		onComplete: function(transport){
			var browseByArtists = transport.responseXML.getElementsByTagName('artist');
			//Mojo.Controller.errorDialog(browseByArtists);	
			listArtists = [];
			for (i = 0; i < browseByArtists.length; i++) {
				listArtists[i] = {
					artist: artists[i].getElementsByTagName('name')[0].firstChild.data,
					artistId: artists[i].getAttribute("id"),
					songs: artists[i].getElementsByTagName('songs')[0].firstChild.data,
					albums: artists[i].getElementsByTagName('albums')[0].firstChild.data
					}
				}			
			}, 
    		onFailure: function(){
			Mojo.Controller.errorDialog("there was a problem.");
			}
	});
			//Mojo.Controller.errorDialog(listArtists[1].artistId);			
			this.controller.stageController.pushScene({
					name: "artist",
					//transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				}, listArtists);
			this.controller.get('scrimSpinner').hide();
			this.controller.get('spinner').mojo.stop();
}

SearchAssistant.prototype.browseByAlbum = function(){
	this.controller.get('spinner').mojo.start();
	var albumBlank	 = " ";
	var filterByAlbum = serverUrl + "/server/xml.server.php?action=album&auth="+token + "&filter="+albumBlank;
	var request = new Ajax.Request(filterByAlbum,
  	{
    	method:"get",
		evalJSON: "false",
    		onComplete: function(){
			albums = transport.responseXML.getElementsByTagName('album');
			listAlbums = [];
			for (i = 0; i < albums.length; i++) {
				listAlbums[i] = {
					album: albums[i].getElementsByTagName('name')[0].firstChild.data,
					albumId: albums[i].getAttribute("id"),
					songs: albums[i].getElementsByTagName('tracks')[0].firstChild.data,
					artist: albums[i].getElementsByTagName('artist')[0].firstChild.data,
					art: albums[i].getElementsByTagName('art')[0].firstChild.data
					}		
				}
			},
    		onFailure: function(){
			Mojo.Controller.errorDialog("there was a problem.");
			}
	});
					//Mojo.Controller.errorDialog(list[1].artistId);			
			this.controller.stageController.pushScene({
					name: "album",
					//transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				}, listAlbums);
			this.controller.get('albumSpinner').mojo.stop();	
}
SearchAssistant.prototype.browseByGenre = function(){
	this.controller.get('spinner').mojo.start();
	var genreBlank	 = " ";	
	var search = serverUrl + "/server/xml.server.php?action=genres&auth=" +token + "&filter="+genreBlank;
	var request = new Ajax.Request(filterByAlbum,
  	{
    	method:"get",
		evalJSON: "false",
    		onComplete: function(){
			var artists = transport.responseXML.getElementsByTagName('artist');	
			listGenre = [];
			for (i = 0; i < artists.length; i++) {
				listGenre[i] = {
					artist: artists[i].getElementsByTagName('name')[0].firstChild.data,
					artistId: artists[i].getAttribute("id"),
					songs: artists[i].getElementsByTagName('songs')[0].firstChild.data,
					albums: artists[i].getElementsByTagName('albums')[0].firstChild.data,
				}
			}			
			}, 
    		onFailure: function(){
			Mojo.Controller.errorDialog("there was a problem.");
			}
	});
					//Mojo.Controller.errorDialog(list[1].artistId);			
			this.controller.stageController.pushScene({
					name: "album",
					//transition: Mojo.Transition.crossFade,
					disableSceneScroller: true
				}, listGenre);
			this.controller.get('spinner').mojo.stop();		
}
//remove duplicates   NOT NEEDED
/*SearchAssistant.prototype.removeDuplicates = function(arr)
   {
    //get sorted array as input and returns the same array without duplicates.
    var result=new Array();
    var lastValue="";
    for (var i=0; i<arr.length; i++)
    {
  var curValue=arr[i];
  if (curValue != lastValue)
  {
result[result.length] = curValue;
  }
  lastValue=curValue;
    }
    return result;
   }
*/

SearchAssistant.prototype.filterFunction = function(filterString, widget, offset, limit) {
     var matchingSubset = this.getMatches(filterString, offset, limit);
     listWidget.mojo.noticeUpdatedItems(offset, matchingSubset);
     listWidget.mojo.setLength(matchingSubset.length);
}
SearchAssistant.prototype.handleCommand = function(event){
	//this.currentScene=Mojo.Controller.stageController.activeScene();
	if (event.type == Mojo.Event.command) {
		switch (event.command) {
		
			case 'search':
				this.OK();
				break;
			case 'color':
				this.color();
				break;
			case 'homeListReset':
				this.homeListReset();
				break;
			case 'toggleScrobbleSearch':
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
				searchMenuModel.items[3]={label: "Scrobbling: "+scrobble,command: 'toggleScrobbleSearch'}
				this.controller.modelChanged(searchMenuModel);
			break;
			case 'toggleHeadPhoneControlsSearch':
				headphoneToggled = true
				if (headPhoneControls == 'On') {
					headPhoneControls = 'Off'
				}else{
					headPhoneControls = 'On'
				}
				searchMenuModel.items[2]={label: "Headphone Controls: "+headPhoneControls,command: 'toggleHeadPhoneControlsSearch'}
				this.controller.modelChanged(searchMenuModel);
			break;
		}
		
	}
	if (event.type == Mojo.Event.back){
		this.controller.stageController.popScenesTo("accounts");
	}
}

SearchAssistant.prototype.onEnterPress = function(event){
	if (event.keyCode === Mojo.Char.enter) {
		this.move();
		//$('searchView').hide()
	}
}
SearchAssistant.prototype.onKeyPress = function(event){
	Mojo.Log.info('Enter SearchAssistant.prototype.onKeyPress')
	//event.stopPropagation();
	//enterTest = Mojo.Char.isEnterKey(event.originalEvent.keyCode)
	//Mojo.Controller.errorDialog(event.originalEvent.keyCode)
	//Mojo.Controller.errorDialog(enterTest)

//	if(this.searchModel.value !=''){
if(event.originalEvent.keyCode != 57575 && event.originalEvent.keyCode != 27){
	if (searchViewVisible == false) {
		$('homeHeader').hide()
		$('searchView').show()
		$('searchField').mojo.focus()
		searchViewVisible = true
	}else
	if(event.originalEvent.keyCode == 8 && this.searchModel.value == ''){
			searchViewVisible = false
			$('searchView').hide()
			$('homeHeader').show()
			$('searchField').mojo.blur()
	}else{
		$('searchField').mojo.focus()
	}
}
	//Mojo.Log.info('event.originalEvent.keyCode: '+event.originalEvent.keyCode)
/*
else
if (searchViewVisible) {
	if (this.searchModel.value == '') {
		searchViewVisible = false
		$('searchView').hide()
		$('homeHeader').show()
		$('searchField').mojo.blur()	
	}
}
*/
/*
	}else{
		$('searchView').hide()
		$('homeHeader').show()
	}
*/
	Mojo.Log.info('Exit SearchAssistant.prototype.onKeyPress')
}

SearchAssistant.prototype.color = function(event){
			document.getElementsByTagName('body').firstChild.getAttribute("background-color").firstChild = white
}
SearchAssistant.prototype.alertDialog = function(errText){
	this.controller.showAlertDialog({
			onChoose: function(value){
				if (value == "ok") {

				}
			},
			title: $L(errText),
			choices: [{
				label: $L("OK"),
				value: "ok"
				}]
		});
}

SearchAssistant.prototype.cancelSearch = function(event){
	Mojo.Log.info('Enter cancelSearch')

			//clearTimeout(searchTimeout)
			searchTimeout = true
			cancelSearch = true
			if(allSelected==true){
				category = 'all'
			}
			Mojo.Log.info('Set searchTimeout to true: ' + searchTimeout)
			this.controller.get('scrimSpinner').hide();
			this.controller.get('spinner').mojo.stop();
			//this.controller.stageController.swapScene('search');
}
SearchAssistant.prototype.homeListSelect = function(event){
	
					switch(homeList[event.index].command){
						case'aotm':
							this.controller.stageController.pushScene({
								name: "aotm",
								//transition: Mojo.Transition.crossFade,
								disableSceneScroller: true
							});
						break;
						case'bookmarks':
							searchAss.controller.stageController.pushScene({
								name: "bookmarks",
								//transition: Mojo.Transition.crossFade,
								disableSceneScroller: true
							});
						
						break;
						case'playlist':
							stageAss.handleCommand({type:Mojo.Event.command, command:'viewPlaylist'})
						break;
						case'savedPlaylists':
							stageAss.handleCommand({type:Mojo.Event.command, command:'savedPlaylists'})
						break;
						case'downloads':
							stageAss.handleCommand({type:Mojo.Event.command, command:'downloads'})
						break;
						case'nowPlaying':
							stageAss.handleCommand({type:Mojo.Event.command, command:'stream'})
						break;
						case'nowPlayingList':
							stageAss.handleCommand({type:Mojo.Event.command, command:'nowPlayingList'})
						break;
						case'browseByArtist':
							browseSelected = true
							searchString = " ";
							category = 'artists'
							this.OK()
						break;
						case'browseByAlbum':
							browseSelected = true
							searchString = " ";
							category = 'albums'
							this.OK()
						break;
						case'browseBySong':
							browseSelected = true
							searchString = " ";
							category = 'songs'
							this.OK()
						break;
						case'browseByGenre':
							browseSelected = true
							searchString = " ";
							category = 'tags'
							this.OK()
						break;
						case'searchView':
						if (!searchViewVisible) {
							taptoOpenSearch = true
							$('homeHeader').hide()
							$('searchView').show()
							$('searchField').mojo.focus()
							searchViewVisible = true
						}else{
							taptoOpenSearch = false
							$('searchView').hide()
							$('homeHeader').show()
							$('searchField').mojo.blur()	
							searchViewVisible = false
						}
						break;
						case 'randomPlay':
							this.setupRandomAll();
						break;
						case 'recentArtists':
							this.getRecent('artists');
						break;
						case 'recentAlbums':
							this.getRecent('albums');
						break;
						case 'recentSongs':
							this.getRecent('songs');
						break;
					}
}
SearchAssistant.prototype.homeListReorder = function(event){
					move = []
					move = homeList.splice(event.fromIndex, 1) 
					homeList.splice(event.toIndex, 0, move[0])
			db.add('homeList', homeList, function(){
							Mojo.Log.error("Sucess homeList SAVE")
						}, function(){
							Mojo.Log.error("FAIL homeList SAVE")
						});
}
SearchAssistant.prototype.homeListDelete = function(event){
					homeList.splice(event.index, 1)
			db.add('homeList', homeList, function(){
							Mojo.Log.error("Sucess homeList SAVE")
						}, function(){
							Mojo.Log.error("FAIL homeList SAVE")
						});

}
SearchAssistant.prototype.homeListReset = function(event){
//	if (ampachPreDark == 'Off') {
		homeList = [{
			name: 'Search',
			command: 'searchView',
			id: 'homeSearch'
		}, {
			name: 'Albums Of The Moment',
			command: 'aotm',
			id: 'homeAotm'
		}, {
			name: 'Random Play',
			command: 'randomPlay',
			id: 'randomPlay'
		}, {
			name: 'Bookmarks',
			command: 'bookmarks',
			id: 'homeBookmarks'
		}, {
			name: 'Playlist',
			command: 'playlist',
			id: 'homePlaylist'
		}, {
			name: 'Saved Playlists',
			command: 'savedPlaylists',
			id: 'homeSavedPlaylists'
		}, {
			name: 'Downloads',
			command: 'downloads',
			id: 'homeDownloads'
		}, {
			name: 'Now Playing',
			command: 'nowPlaying',
			id: 'homeNowPlaying'
		}, {
			name: 'Now Playing List',
			command: 'nowPlayingList',
			id: 'homeNowPlayingList'
		}, {
			name: 'Browse by Artist',
			command: 'browseByArtist',
			id: 'homeArtist'
		}, {
			name: 'Browse by Album',
			command: 'browseByAlbum',
			id: 'homeAlbum'
		}, {
			name: 'Browse by Song',
			command: 'browseBySong',
			id: 'homeSong'
		}, {
			name: 'Browse by Genre',
			command: 'browseByGenre',
			id: 'homeGenre'
		}, {
			name: 'Recent Artists',
			command: 'recentArtists',
			id: 'homeRecentArtists'
		}, {
			name: 'Recent Albums',
			command: 'recentAlbums',
			id: 'homeRecentAlbums'
		}, {
			name: 'Recent Songs',
			command: 'recentSongs',
			id: 'homeRecentSongs'
		}, ]
		db.add('homeList', homeList, function(){
			Mojo.Log.error("Sucess homeList reset SAVE")
		}, function(){
			Mojo.Log.error("FAIL homeList reset SAVE")
		});
		this.homeModel.items = homeList
		this.controller.modelChanged(this.homeModel)
/*
	}else{
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
					 
					db.add('homeListD', homeListD, function(){
						Mojo.Log.error("Sucess homeList reset SAVE")
					}, function(){
						Mojo.Log.error("FAIL homeList reset SAVE")
					}); 
					this.homeModel.items = homeListD
					this.controller.modelChanged(this.homeModel)
	}
*/

}
SearchAssistant.prototype.categorySelect = function(event){
	this.controller.popupSubmenu({
			onChoose: this.popupHandler,
			placeNear: event.target,
			items: [{
				label: 'All',
				command: 'all'
			}, {
				label: 'Artists',
				command: 'artists'
			}, {
				label: 'Album',
				command: 'albums'
			}, {
				label: 'Songs',
				command: 'songs'
			}, {
				label: 'Genre',
				command: 'tags'
			}, {
				label: 'Downloads',
				command: 'downloads'
			}, 
			{label: 'Videos',command: 'videos'}, 
			//{label: 'Cancel',command: 'cancel'}
				]
		});
}

SearchAssistant.prototype.popup = function(command){
/*
		switch (command) {
		
			case 'all':
*/
				if (command == undefined) {
					category = category
				}
				else {
					category = command
				}
				if(command == 'tags'){
					$('category').innerHTML = 'Genre'
				}else 
				if(command == 'artists'){
					$('category').innerHTML = 'Artists'
				}else 
				if(command == 'albums'){
					$('category').innerHTML = 'Albums'
				}else 
				if(command == 'songs'){
					$('category').innerHTML = 'Songs'
				}else 
				if(command == 'videos'){
					$('category').innerHTML = 'Videos'
				}else 
				if(command == 'all'){
					$('category').innerHTML = ''
				}else
				if(command == 'downloads'){
					$('category').innerHTML = 'downloads'
				}
/*
				break;
			case 'artists':
				tapToAdd = true
				this.swipeAddToPlayList();
				break;
			case 'albums':
				tapToAdd = true
				this.swipeAddToPlayList();
				break;
			case 'songs':
				tapToAdd = true
				this.swipeAddToPlayList();
				break;
			case 'tags':
				tapToAdd = true
				this.swipeAddToPlayList();
				break;
			case 'videos':
				tapToAdd = true
				this.swipeAddToPlayList();
				break;
			case 'cancel':
				//function(){};
				break;
		}
*/
}

SearchAssistant.prototype.setupRandomAll = function(command){
	index=0
	randomAllArray = []
	downloadsPushed = []
	this.randomAll()
}
SearchAssistant.prototype.randomAll = function(command){
	this.controller.get('spinner').mojo.start();
	this.controller.get('scrimSpinner').show();
	if (allDownloads.length > 0) {
		randomDownloadChance = Math.floor(Math.random() * 1000);
		randomDownloadsUid = Math.floor(Math.random() * allDownloads.length);
		Mojo.Log.info('randomDownloadsUid: ' + randomDownloadsUid)
		if (randomDownloadChance < 150 || randomDownloadChance > 850) {
			Mojo.Log.info('randomDownloadChance: ' + randomDownloadChance)
			randomDownloadDuplicate = false
			for(i = 0; i < downloadsPushed.length; i++){
				if(allDownloads[randomDownloadsUid] == downloadsPushed[i]){
					randomDownloadDuplicate = true
				}
			}
			if (randomDownloadDuplicate == false) {
				randomAllArray.push(allDownloads[randomDownloadsUid])
				downloadsPushed.push(allDownloads[randomDownloadsUid])
				index++
			}
		}
	}
		randomSongsUid = Math.floor(Math.random() * totalSongs);
		Mojo.Log.info('randomSongsUid: ' + randomSongsUid)
		var search = serverUrl + "/server/xml.server.php?action=song&auth=" + token + "&filter=" + randomSongsUid;
		Mojo.Log.info('Search Url: ' + search);
		
		var request = new Ajax.Request(search, {
			method: "get",
			evalJSON: "false",
			onComplete: function(transport){
				//countTest =0
				response = transport.responseText || "no response text";
				var songs = transport.responseXML.getElementsByTagName('song');
				
				var artist = transport.responseXML.getElementsByTagName('artist')[0].getAttribute("id")
				Mojo.Log.info('songs.length: ' + songs.length);
				//Mojo.Controller.errorDialog(songs.length);
				/*
			 var url = songs[i].getElementsByTagName('url')[0].firstChild.data,
			 extension = "";
			 
			 if (url.length != 0) {
			 var dotPos = url.lastIndexOf(".");
			 if (dotPos != -1)
			 extension = url.substr(dotPos + 1).toLowerCase();
			 }
			 */
				Mojo.Log.info("artist: " + artist)
				//Mojo.Log.info("response: "+response)
				if (artist == "") {
					Mojo.Log.info("songs = ''")
					index++
					searchAss.randomAll()
				}
				else {
					randomAllArray.push({
						song: songs[0].getElementsByTagName('title')[0].firstChild.data,
						songId: songs[0].getAttribute("id"),
						time: songs[0].getElementsByTagName('time')[0].firstChild.data,
						timeUnformatted: songs[0].getElementsByTagName('time')[0].firstChild.data,
						artist: songs[0].getElementsByTagName('artist')[0].firstChild.data,
						album: songs[0].getElementsByTagName('album')[0].firstChild.data,
						url: songs[0].getElementsByTagName('url')[0].firstChild.data,
						size: songs[0].getElementsByTagName('size')[0].firstChild.data,
						art: songs[0].getElementsByTagName('art')[0].firstChild.data,
						track: songs[0].getElementsByTagName('track')[0].firstChild.data,
						source: 'songs',
					//type: extension
					})
					Mojo.Log.info('randomAllArray.length: ' + randomAllArray.length + ' index: ' + index)
					convert = Math.floor(randomAllArray[randomAllArray.length - 1].time / 60);
					convert2 = randomAllArray[randomAllArray.length - 1].time % 60;
					convertString = convert2.toString()
					if (convertString[1] == "." || convertString[1] == undefined) {
						convertSecs = "0" + convertString[0]
					}
					else {
						convertSecs = convertString[0] + convertString[1]
					}
					
					randomAllArray[randomAllArray.length - 1].time = convert + ":" + convertSecs;
					//countTest++
					//Mojo.Log.info('countTest: '+countTest)
					
					if (searchTimeout == false) {
						if (index >= randomSongFetch) {
							searchAss.controller.get('percentageDone').innerHTML = 'Cloning playlist...'
							if (ticketNumArray.length != 0) {
								audioAss.deleteSongs();
							}
							listIndex = 0
							searchAss.controller.stageController.pushScene({
								name: "stream",
								//transition: Mojo.Transition.crossFade,
								disableSceneScroller: true
							}, 'randomAll');
							audioAss.clone(randomAllArray);
							//clearTimeout(searchTimeout)
							searchAss.controller.get('scrimSpinner').hide();
							searchAss.controller.get('spinner').mojo.stop();
							searchAss.controller.get('percentageDone').innerHTML = ''
						}
						else {
							index++
							searchAss.controller.get('percentageDone').innerHTML = 'Building Playlist<br>%' + Math.floor(index / randomSongFetch * 100)
							searchAss.randomAll()
						}
					}
					else {
						Mojo.Log.info('searchTimeout: ' + searchTimeout);
						searchTimeout = false
						searchAss.controller.get('scrimSpinner').hide();
						searchAss.controller.get('spinner').mojo.stop();
					}
				}
			},
			onFailure: function(){
				Mojo.Controller.errorDialog("there was a problem.");
			}
		});
}


SearchAssistant.prototype.pingInterval = function(){
	Mojo.Log.info('pingInterval: '+pingInterval)
if (pingInterval > 0) {
pingIntervalRequest = this.controller.serviceRequest('palm://com.palm.power/timeout', {
		method: "clear",
		parameters: {
			"key": "net.nucleardecay.ampachpre.ping"
		},
			onSuccess: function(){
				Mojo.Log.info('PingInterval cleared')
					searchAss.controller.serviceRequest("palm://com.palm.power/timeout", {
						method: "set",
						parameters: {
							"wakeup": true,
							"key": "net.nucleardecay.ampachpre.ping",
							"in": "00:" + pingInterval + ":00",
							"uri": "palm://com.palm.applicationManager/launch",
							"params": '{"id":"net.nucleardecay.ampachpre","params":{"action":"ping"}}',
						},
						onSuccess: function(){
							Mojo.Log.info('PingInterval Set')
						},
						onFailure: function(err){
							Mojo.Log.error('PingInterval failed: ' + err.errorText)
							Mojo.Controller.errorDialog('Keep Alive failed: ' + err.errorText);
						}
					});
			},
			onFailure: function(err){
				Mojo.Log.error('PingInterval clear failed: '+err.errorText)
			}
	});
}
		Mojo.Log.info('exit pingInterval');
}

SearchAssistant.prototype.reLogInterval = function(){
	//reLogInterval = 00
if (reLogInterval > 0 || reLogIntervalMins > 0) {
reLogIntervalRequest = this.controller.serviceRequest('palm://com.palm.power/timeout', {
		method: "clear",
		parameters: {
			"key": "net.nucleardecay.ampachpre.reLog"
		},
			onSuccess: function(){
				Mojo.Log.info('relog timeout cleared')
			        searchAss.controller.serviceRequest("palm://com.palm.power/timeout", {
			            method: "set",
			            parameters: {
			                "wakeup": true,
			                "key": "net.nucleardecay.ampachpre.reLog",
			                "in": reLogInterval + ":" + reLogIntervalMins + ":00",
			                "uri": "palm://com.palm.applicationManager/launch",
			                "params": '{"id":"net.nucleardecay.ampachpre","params":{"action":"reLog"}}',
			            },
			            onSuccess: function(){
			                Mojo.Log.info('reLog timeout Set')
			            },
			            onFailure: function(err){
			                Mojo.Log.error('reLog timeout failed: ' + err.errorText)
			                Mojo.Controller.errorDialog('reLog set failed: ' + err.errorText);
			            }
			        });
			},
			onFailure: function(err){
				Mojo.Log.error('relog timeout clear failed: ' + err.errorText)
			}
	});
    }
}

SearchAssistant.prototype.subscribeNetworkChange = function(){
	//subscribe for wifi change.
subscribeNetworkChangeRequest = this.controller.serviceRequest('palm://com.palm.connectionmanager', {
		method: 'getstatus',
		parameters: {
			subscribe: true
		},
		onSuccess: this.autoLoginHandler,
		onFailure: function(err){
			Mojo.Controller.errorDialog('Failed subscribeNetworkChange: ' + err.errorText)
		}
	});
}
SearchAssistant.prototype.autoLogin = function(obj){
	Mojo.Log.info('Enter SearchAssistant.prototype.autoLogin')
			networkChangeSubscribed = true
	//if (pushStreamScene == false || downLoaded == true) {
		if (accountSelected == false) {
			internet = obj.isInternetConnectionAvailable
			wifi = obj.wifi.state
			wifiAccount = false
			ssid = obj.wifi.ssid
			wan = obj.wan.state
			wanNetwork = obj.wan.network
			newIp = obj.wan.ipAddress
			if (wifi == 'connected') {
				wan = 'disconnected'
			}
			
			//Mojo.Controller.errorDialog(wifi + ', ' + wan)
			//if (wifi == 'connected' && wifiConnected == false && evdoConnected == true && internet == true) {
			if (originalState != 'wifi' && wifi == 'connected' && internet == true) {
				Mojo.Log.info('Wifi is now connected, switching accounts...')
				originalState = 'wifi'
				for (i = 0; i < listAccounts.length; i++) {
					Mojo.Log.info(listAccounts[i].wifi + ', ' + listAccounts[i].ssid == ssid)
					if (listAccounts[i].wifi == 'On' && listAccounts[i].ssid == ssid) {
						Mojo.Log.info(ssid);
						currentAccount = i
						loginRefresh = true
						Mojo.Controller.getAppController().showBanner('Logging in to ' + listAccounts[currentAccount].accountName + " Please Wait...", {
							source: 'notification'
						});
						loginAss.connectionTest()
						break;
					}
					else {
					//currentAccount = 0
					//loginAss.pingEvent()
					}
				}
			}
			else 
				if (originalState != 'wan' && wan == 'connected' && internet == true) {
					Mojo.Log.info('Wan is now connected, switching accounts...')
					originalState = 'wan'
					currentAccount = 0
					loginRefresh = true
					Mojo.Controller.getAppController().showBanner('Logging in to ' + listAccounts[currentAccount].accountName + " Please Wait...", {
						source: 'notification'
					});
					loginAss.connectionTest()
				}
				else 
					if (originalIp != newIp && wan == 'connected' && internet == true) {
						Mojo.Log.info('Ip has changed, refreshing login...')
						originalIp = newIp
						originalState = 'wan'
						currentAccount = currentAccountLoggedIn
						loginRefresh = true
						Mojo.Controller.getAppController().showBanner('Ip changed, refreshing account ' + listAccounts[currentAccount].accountName, {
							source: 'notification'
						});
						loginAss.connectionTest()
					//Mojo.Controller.errorDialog('There is nothing true :o')
					}
		}
		else {
			accountSelected = false
		}
/*
		if(wanNetwork == '1x' || wanNetwork == 'edge'){
			setBufferPercentage = 90
		}else{
			setBufferPercentage = 75
		}
*/
		Mojo.Log.info("originalState: " + originalState + ", originalInternetState: " + originalInternetState + ", internet: " + internet + ", wan: " + wan + ", newIp: " + newIp + ", originalIp: " + originalIp + ", wanNetwork: " + wanNetwork)
	Mojo.Log.info('Exit SearchAssistant.prototype.autoLogin')
}
SearchAssistant.prototype.resize = function(event){
	Mojo.Log.info('Enter Resize Event')
		if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
			// on the Pixi
			heightChange = (372 - this.controller.window.innerHeight);
			widthChange = (320 - this.controller.window.innerWidth);
			windowHeight = this.controller.window.innerHeight
			Mojo.Log.info('Pixi widthChange: ' + widthChange + ' Pixi heightChange: ' + heightChange + ' Pixi windowHeight: ' + windowHeight)
			document.getElementById('scrollerId').style.height =  300 - heightChange+'px';
		}
		else {
			// on the Pre 480x320
			heightChange = (452 - this.controller.window.innerHeight);
			widthChange = (320 - this.controller.window.innerWidth);
			windowHeight = this.controller.window.innerHeight
			Mojo.Log.info('Pre widthChange: ' + widthChange + ' Pre heightChange: ' + heightChange + ' Pre windowHeight: ' + windowHeight)
			document.getElementById('scrollerId').style.height =  382 - heightChange+'px';
		}
	Mojo.Log.info('Exit Resize Event')
}

SearchAssistant.prototype.getRecent = function(event){
	searchAss.controller.get('percentageDone').innerHTML = ''
	this.controller.get('spinner').mojo.start();
	this.controller.get('scrimSpinner').show();
	type = event
this.controller.serviceRequest('palm://com.palm.systemservice/time', {
 				method:"getSystemTime",
 				onComplete: function(time){
					year = time.localtime.year
					month = time.localtime.month
					day = time.localtime.day
					yearStart = year
					switch (month){
						case 2:
						case 4:
						case 6:
						case 8:
						case 9:
						case 11:
						case 1:
							if(day < 15){
								day = 31 + day
								dayStart = day - 15
								if (month == 1) {
									yearStart = year - 1
									monthStart = 12
								}
								else {
									monthStart = month - 1
								}
							}else{
								dayStart = day - 15
								monthStart = month
							}
						break;
						case 5:
						case 7:
						case 10:
						case 12:
							if(day < 15){
								day = 30 + day
								dayStart = day - 15
								monthStart = month - 1
							}else{
								dayStart = day - 15
								monthStart = month
							}
						break;
						case 3:
							if(day < 15){
								if (year == 2012 || year == 2016) {
									day = 29 + day
								}
								else {
									day = 28 + day
								}
								dayStart = day - 15
								monthStart = month - 1
							}else{
								dayStart = day - 15
								monthStart = month
							}
						break;
					}
					if(day < 10){
						day = '0'+day
					}
					if(month < 10){
						month = '0'+month
					}
					if(dayStart < 10){
						dayStart = '0'+dayStart
					}
					if(monthStart < 10){
						monthStart = '0'+monthStart
					}
					Mojo.Log.info('year-month-day: '+year+month+day+', yearStart-monthStart-dayStart: '+yearStart+monthStart+dayStart)
					recentFilterDate = yearStart+monthStart+dayStart
					
				if (type == 'artists') {
					var search = serverUrl + "/server/xml.server.php?action=artists&auth=" + token + '&add=' + recentFilterDate;
					Mojo.Log.info('Search tags Url: ' + search);
					var request = new Ajax.Request(search, {
						method: "get",
						evalJSON: "false",
						onComplete: function(transport){
							response = transport.responseText || "no response text";
							Mojo.Log.info(response);
							artistSearch = true;
							var artists = transport.responseXML.getElementsByTagName('artist');
							list = [];
							for (i = 0; i < artists.length; i++) {
								list[i] = {
									artist: artists[i].getElementsByTagName('name')[0].firstChild.data,
									artistId: artists[i].getAttribute("id"),
									songs: artists[i].getElementsByTagName('songs')[0].firstChild.data,
									albums: artists[i].getElementsByTagName('albums')[0].firstChild.data,
								}
								if (cancelSearch == true) {
									cancelSearch = false
									break;
								}
								totalArtistSongs = totalArtistSongs + parseFloat(list[i].songs)
								searchAss.controller.get('percentageDone').innerHTML = 'Building Artists results<br>%' + Math.floor(i / artists.length * 100)
							}
							//Mojo.Controller.errorDialog(list);
							if (searchTimeout != true) {
								if (list == "") {
									//clearTimeout(searchTimeout)
									Mojo.Controller.errorDialog("Sorry, nothing added in the last 15 days.");
									searchAss.controller.get('scrimSpinner').hide();
									searchAss.controller.get('spinner').mojo.stop();
								}
								else {
									recentFilter = true
									accountsAss.sortArray(list, null, 'artist')
									searchAss.controller.stageController.pushScene({
										name: "artist",
										//transition: Mojo.Transition.crossFade,
										disableSceneScroller: true
									});
									//clearTimeout(searchTimeout)
									searchAss.controller.get('scrimSpinner').hide();
									searchAss.controller.get('spinner').mojo.stop();
								}
							}
							else {
								searchTimeout = false
							}
							
						},
						onFailure: function(err){
							Mojo.Log.error('Error: ' + err.errorText)
						}
					});
				}else if(type == 'albums'){
					var search = serverUrl + "/server/xml.server.php?action=albums&auth=" + token + '&add=' + recentFilterDate;
					Mojo.Log.info('Search tags Url: ' + search);
					var request = new Ajax.Request(search, {
						method: "get",
						evalJSON: "false",
						onComplete: function(transport){
								response = transport.responseText || "no response text";
								Mojo.Log.info(response);
								artist = "search"
								albums = transport.responseXML.getElementsByTagName('album');
								listAlbums = [];
								for (i = 0; i < albums.length; i++) {
									listAlbums[i] = {
										album: albums[i].getElementsByTagName('name')[0].firstChild.data,
										albumId: albums[i].getAttribute("id"),
										songs: albums[i].getElementsByTagName('tracks')[0].firstChild.data,
										artist: albums[i].getElementsByTagName('artist')[0].firstChild.data,
										art: albums[i].getElementsByTagName('art')[0].firstChild.data,
										year: albums[i].getElementsByTagName('year')[0].firstChild.data
									}
								if(cancelSearch == true){
									Mojo.Log.info('cancelSearch: '+cancelSearch)
									break;
								}
								totalAlbumsSongs = totalAlbumsSongs+parseFloat(listAlbums[i].songs)
								searchAss.controller.get('percentageDone').innerHTML = 'Building Album results<br>%'+Math.floor(i/albums.length * 100)
							}
							//Mojo.Controller.errorDialog(list);
							if (searchTimeout != true) {
								if (listAlbums == "") {
									//clearTimeout(searchTimeout)
									Mojo.Controller.errorDialog("Sorry, nothing added in the last 15 days.");
									searchAss.controller.get('scrimSpinner').hide();
									searchAss.controller.get('spinner').mojo.stop();
								}
								else {
									recentFilter = true
									artistInfo = listAlbums.length+" albums, "+totalAlbumsSongs+' Songs'
									accountsAss.sortArray(listAlbums, null, 'albums')
									searchAss.controller.stageController.pushScene({name: "albums", disableSceneScroller: true});
									//clearTimeout(searchTimeout)
									searchAss.controller.get('scrimSpinner').hide();
									searchAss.controller.get('spinner').mojo.stop();
								}
							}
							else {
								searchTimeout = false
							}
							
						},
						onFailure: function(err){
							Mojo.Log.error('Error: ' + err.errorText)
						}
					});
				}else{
					var search = serverUrl + "/server/xml.server.php?action=songs&auth=" + token + '&add=' + recentFilterDate;
					Mojo.Log.info('Search recent songs Url: ' + search);
					var request = new Ajax.Request(search, {
						method: "get",
						evalJSON: "false",
						onComplete: function(transport){
												countTest =0
												response = transport.responseText || "no response text";
												Mojo.Log.info(response);
												var songs = transport.responseXML.getElementsByTagName('song');
												Mojo.Log.info('songs.length: '+songs.length);
												listSongs = [];
												for (i = 0; i < songs.length; i++) {
													listSongs[i] = {
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
														source: 'songs',
													//type: extension
													}
													if(cancelSearch == true){
														cancelSearch = false
														break;
													}
													convert = Math.floor(listSongs[i].time / 60);
													convert2 = listSongs[i].time % 60;
													convertString = convert2.toString()
													if (convertString[1] == "." || convertString[1] == undefined) {
														convertSecs = "0" + convertString[0]
													}
													else {
														convertSecs = convertString[0] + convertString[1]
													}
													
													listSongs[i].time = convert + ":" + convertSecs;
													countTest++
													//Mojo.Log.info('countTest: '+countTest)
													searchAss.controller.get('percentageDone').innerHTML = 'Building Song results<br>%'+Math.floor(i/songs.length * 100)
												}
												
												if (searchTimeout != true) {
													if (listSongs == "") {
													//	clearTimeout(searchTimeout)
														Mojo.Controller.errorDialog("Sorry, nothing added in the last 15 days.");
														searchAss.controller.get('scrimSpinner').hide();
														searchAss.controller.get('spinner').mojo.stop();
													}
													else {
														accountsAss.sortArray(listSongs, null, 'song')
														albumArt = 'images/folder.jpg'
														album = listSongs.length+' Songs Returned'
														searchAss.controller.stageController.pushScene({
															name: "songs",
															//transition: Mojo.Transition.crossFade,
															disableSceneScroller: true
														});
														//clearTimeout(searchTimeout)
														searchAss.controller.get('scrimSpinner').hide();
														searchAss.controller.get('spinner').mojo.stop();
													}
												}else{
													searchTimeout = false
												}
						},
						onFailure: function(err){
							Mojo.Log.error('Error: ' + err.errorText)
						}
					});
				}	
			}
 		});	
}
SearchAssistant.prototype.find = function(searchStr) {
  searchStr = searchStr.toLowerCase()
  Mojo.Log.info('searchStr: '+searchStr)
  for (i=0; i<allDownloads.length; i++) {
	searchAss.controller.get('percentageDone').innerHTML = 'Searching downloads <br>%'+Math.floor(i/allDownloads.length * 100)
  	if (allDownloads[i].song.toLowerCase().match(searchStr)) {
		Mojo.Log.info('allDownloads[i].song: '+allDownloads[i].song)
		listAll.push(allDownloads[i])
		listAll[listAll.length - 1].name = allDownloads[i].song
		listAll[listAll.length - 1].field1 = 'by '+allDownloads[i].artist
		listAll[listAll.length - 1].field2 = allDownloads[i].time
		listAll[listAll.length - 1].sourceTypeImage = 'images/downloads22px.png'
		listAll[listAll.length - 1].sourceType = 'song'
		totalListAllSongs = totalListAllSongs+1
  	}else
	if (allDownloads[i].artist.toLowerCase().match(searchStr)) {
		Mojo.Log.info('allDownloads[i].artist: '+allDownloads[i].artist)
		listAll.push(allDownloads[i])
		listAll[listAll.length - 1].name = allDownloads[i].song
		listAll[listAll.length - 1].field1 = 'by '+allDownloads[i].artist
		listAll[listAll.length - 1].field2 = allDownloads[i].time
		listAll[listAll.length - 1].sourceTypeImage = 'images/downloads22px.png'
		listAll[listAll.length - 1].sourceType = 'song'
		totalListAllSongs = totalListAllSongs+1
  	}else 
  	if (allDownloads[i].album.toLowerCase().match(searchStr)) {	
		Mojo.Log.info('allDownloads[i].album: '+allDownloads[i].album)
		listAll.push(allDownloads[i])
		listAll[listAll.length - 1].name = allDownloads[i].song
		listAll[listAll.length - 1].field1 = 'by '+allDownloads[i].artist
		listAll[listAll.length - 1].field2 = allDownloads[i].time
		listAll[listAll.length - 1].sourceTypeImage = 'images/downloads22px.png'
		listAll[listAll.length - 1].sourceType = 'song'
		totalListAllSongs = totalListAllSongs+1
  	} 
  }
}

SearchAssistant.prototype.searchDownloads = function(){
	this.controller.get('spinner').mojo.start();
	this.controller.get('scrimSpinner').show();
	listAll = []
	totalListAllSongs = 0
	searchAss.find(searchString)
	if (searchTimeout == false && cancelSearch == false) {
		Mojo.Log.info('searchTimeout: '+searchTimeout);
		if (listAll == "") {
			Mojo.Log.info('listAll = ""');
			//clearTimeout(searchTimeout)
			Mojo.Controller.errorDialog("Sorry, nothing with the search string, \"" + searchString + "\" in the category of \"" + category + "\" was found.");
			searchAss.controller.get('scrimSpinner').hide();
			searchAss.controller.get('spinner').mojo.stop();
		}
		else {
			Mojo.Log.info('Push Scene');
			searchAss.controller.stageController.pushScene({
				name: "listAll",
				//transition: Mojo.Transition.crossFade,
				disableSceneScroller: true
			});
			//clearTimeout(searchTimeout)
			searchAss.controller.get('scrimSpinner').hide();
			searchAss.controller.get('spinner').mojo.stop();
		}
	}else{
		Mojo.Log.info('searchTimeout: '+searchTimeout);
		searchTimeout = false
		cancelSearch = false
		searchAss.controller.get('scrimSpinner').hide();
		searchAss.controller.get('spinner').mojo.stop();
	}
}