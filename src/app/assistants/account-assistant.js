function AccountAssistant(){
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		document.getElementById('scrollerId').style.height = '260px';
	}

}

AccountAssistant.prototype.setup = function(){
    accountAss = this
	$('sceneContent').hide()
    accountsAttr = {
        omitDefaultItems: true
    };
    accountMenuModel = {
        visible: true,
        items: [{
            label: "Change Account",
            command: 'accounts'
        }, {
            label: "Refresh Login",
            command: 'reLog'
        }, {
            label: "Downloads",
            command: 'downloadsNoLogin'
        }, {
            label: "About",
            command: 'do-myAbout'
        }, ]
    };
    this.controller.setupWidget(Mojo.Menu.appMenu, accountsAttr, accountMenuModel);
		this.controller.setupWidget("scrollerId",
         this.scrollerAttributes = {
             mode: 'vertical'
         },
         this.scrollerModel = {
         });
    /*		this.accounts = [              
     {label:$L('Default'), value:"account1"
     },
     {label:$L('Slot 2'), value:"account2"
     },
     {label:$L('Slot 3'), value:"account3"
     },
     {label:$L('Slot 4'), value:"account4"
     },
     {label:$L('Slot 5'), value:"account5"
     },
     ]
     this.selectorsModel = {currentAccount: "account1"};
     
     this.accountPickerHandler=this.controller.get('account');
     Mojo.Event.listen(this.accountPickerHandler, Mojo.Event.propertyChange, this.handleUpdate);
     this.controller.setupWidget('account',
     {label: $L('Choose Account'),
     choices: this.accounts,
     modelProperty:'currentAccount'},
     this.selectorsModel);*/
	
	
   this.controller.setupWidget("spinner",
         this.attributes = {
             spinnerSize: 'large'
         },
         this.model = {
             spinning: false 
         });
	
	
    this.cmdMenuModel = {
        visible: true,
        items: [{}, {
            label: $L('Save Account'),
            icon: '',
            command: 'save',
            width: 170
        }, {}, ]
    };
    this.controller.setupWidget(Mojo.Menu.commandMenu, {
        menuClass: 'no-fade'
    }, this.cmdMenuModel)
    //account name
    this.nameAttributes = {
        hintText: 'example, Wifi',
        changeOnKeyPress: true,
        //textCase: Mojo.Widget.steModeLowerCase,
    };
    this.nameModel = {
        value: "",
        //disabled: false
    };
    
    this.controller.setupWidget('accountName', this.nameAttributes, this.nameModel);
    this.accountNameField = this.controller.get('accountName');
    
    
    //username
    this.UNattributes = {
        hintText: 'Enter Your User ID',
        changeOnKeyPress: true,
        textCase: Mojo.Widget.steModeLowerCase,
    };
    this.userModel = {
        value: "",
        //disabled: false
    };
    
    this.controller.setupWidget('username', this.UNattributes, this.userModel);
    this.usernameField = this.controller.get('username');
    
    
    
    //pasword
    this.PWattributes = {
        hintText: 'Enter Password',
        changeOnKeyPress: true,
        enterSubmits: true,
        textCase: Mojo.Widget.steModeLowerCase,
    };
    this.passModel = {
        value: "",
        //disabled: false
    };
    this.controller.setupWidget('password', this.PWattributes, this.passModel);
    this.passwordField = this.controller.get('password');
    
    
    
    //Server Address
    this.addressAttributes = {
        hintText: 'domain.com',
        changeOnKeyPress: true,
        enterSubmits: true,
        textCase: Mojo.Widget.steModeLowerCase,
    };
    this.addressModel = {
        value: "",
        //disabled: false
    };
    this.controller.setupWidget('address', this.addressAttributes, this.addressModel);
    this.addressField = this.controller.get('address');
    
    
    //directory
    this.directoryAttributes = {
        hintText: 'example, ampache-3.5.2',
        changeOnKeyPress: true,
        //enterSubmits: true,
        textCase: Mojo.Widget.steModeLowerCase,
    };
    this.directoryModel = {
        value: "",
        //disabled: false
    };
    this.controller.setupWidget('directory', this.directoryAttributes, this.directoryModel);
    
    //http port
    this.portAttributes = {
        hintText: 'default 80',
        changeOnKeyPress: true,
        //enterSubmits: true,
        modifierState: Mojo.Widget.numLock,
    };
    this.portModel = {
        value: "",
        //disabled: false
    };
    this.controller.setupWidget('port', this.portAttributes, this.portModel);
    
    //https port
    this.connectionPortAttributes = {
        hintText: 'default 80/443',
        changeOnKeyPress: true,
        //enterSubmits: true,
        modifierState: Mojo.Widget.numLock,
    };
    this.connectionPortModel = {
        value: "",
        //disabled: false
    };
    this.controller.setupWidget('connectionPort', this.connectionPortAttributes, this.connectionPortModel);
    
    //Download path
    this.pathAttributes = {
        hintText: 'default: AmpachPre',
        changeOnKeyPress: true,
        //enterSubmits: true,
        textCase: Mojo.Widget.steModeLowerCase,
    };
    this.pathModel = {
        value: "",
        //disabled: false
    };
    this.controller.setupWidget('path', this.pathAttributes, this.pathModel);
    this.pathField = this.controller.get('path');
    
    //pingInterval time
    this.pingIntervalAttributes = {
        hintText: 'In minutes, 0 for none',
        changeOnKeyPress: true,
        //enterSubmits: true,
        modifierState: Mojo.Widget.numLock,
    };
    this.pingIntervalModel = {
        value: "",
        //disabled: false
    };
    this.controller.setupWidget('pingInterval', this.pingIntervalAttributes, this.pingIntervalModel);
    
    //reLogInterval time hrs
    this.reLogIntervalAttributes = {
        hintText: '0',
        changeOnKeyPress: true,
        //enterSubmits: true,
        modifierState: Mojo.Widget.numLock,
    };
    this.reLogIntervalModel = {
        value: "",
        //disabled: false
    };
    this.controller.setupWidget('reLogInterval', this.reLogIntervalAttributes, this.reLogIntervalModel);
    
    //reLogInterval time mins
    this.reLogIntervalMinsAttributes = {
        hintText: '0',
        changeOnKeyPress: true,
        //enterSubmits: true,
        modifierState: Mojo.Widget.numLock,
    };
    this.reLogIntervalMinsModel = {
        value: "",
        //disabled: false
    };
    this.controller.setupWidget('reLogIntervalMin', this.reLogIntervalMinsAttributes, this.reLogIntervalMinsModel);
    
    //last.fm Username
    this.lastfmUsernameAttributes = {
        hintText: 'last.fm username',
        changeOnKeyPress: true,
        //enterSubmits: true,
        textCase: Mojo.Widget.steModeLowerCase,
    };
    this.lastfmUsernameModel = {
        value: "",
        //disabled: false
    };
    this.controller.setupWidget('lastfmUN', this.lastfmUsernameAttributes, this.lastfmUsernameModel);
    
    //last.fm password time
    this.lastfmPassAttributes = {
        hintText: 'last.fm password',
        changeOnKeyPress: true,
        //enterSubmits: true,
        textCase: Mojo.Widget.steModeLowerCase,
    };
    this.lastfmPassModel = {
        value: "",
        //disabled: false
    };
    this.controller.setupWidget('lastfmPW', this.lastfmPassAttributes, this.lastfmPassModel);
    
	
    //Random fetch songs
    this.randomSongFetchAttributes = {
        hintText: 'Default: 30',
        changeOnKeyPress: true,
        //enterSubmits: true,
        modifierState: Mojo.Widget.numLock,
    };
    this.randomSongFetchModel = {
        value: "",
        //disabled: false
    };
    this.controller.setupWidget('randomFetch', this.randomSongFetchAttributes, this.randomSongFetchModel);
	
    this.controller.setupWidget("protocol", this.protocolAttributes = {
        trueValue: 'https://',
        falseValue: 'http://'
    }, this.protocolModel = {
        value: false,
        disabled: false
    });
    this.protocolBox = this.controller.get('protocol');
    
    
    this.controller.setupWidget("notifications", this.notificationAttributes = {
        trueValue: 'On',
        falseValue: 'Off'
    }, this.notificationModel = {
        value: true,
        disabled: false
    });
    
    //default wifi	 
    this.controller.setupWidget("wifi", this.wifiAttributes = {
        trueValue: 'On',
        falseValue: 'Off'
    }, this.wifiModel = {
        value: true,
        disabled: false
    });
    
    //bluetooth controls default	
    this.controller.setupWidget("btC", this.btCAttributes = {
        trueValue: 'On',
        falseValue: 'Off'
    }, this.btCModel = {
        value: true,
        disabled: false
    });
    
    //headphone controls default 		 		
    this.controller.setupWidget("hpC", this.hpCAttributes = {
        trueValue: 'On',
        falseValue: 'Off'
    }, this.hpCModel = {
        value: true,
        disabled: false
    });
	
    //default scrobble	     
    this.controller.setupWidget("lastFmScrobble", this.lastFmAttributes = {
        trueValue: 'On',
        falseValue: 'Off'
    }, this.lastFmModel = {
        value: true,
        disabled: false
    });
	
    //dashboard     
    this.controller.setupWidget("dashboard", this.dashboardAttributes = {
        trueValue: 'On',
        falseValue: 'Off'
    }, this.dashboardModel = {
        value: true,
        disabled: false
    });
    
    this.ssidAttributes = {
        hintText: 'ssid of default AP (Required)',
        changeOnKeyPress: true,
        //enterSubmits: true,
        textCase: Mojo.Widget.steModeLowerCase,
    };
    this.ssidModel = {
        value: "",
        //disabled: false
    };
	
    //textColor
    this.textColorattributes = {
        hintText: 'white',
        changeOnKeyPress: true,
        textCase: Mojo.Widget.steModeLowerCase,
    };
    this.textColorModel = {
        value: "",
        //disabled: false
    };	 
    this.controller.setupWidget('textColor', this.textColorattributes, this.textColorModel); 
	  
	//textColorNP
    this.textColorNPattributes = {
        hintText: 'white',
        changeOnKeyPress: true,
        textCase: Mojo.Widget.steModeLowerCase,
    };
    this.textColorNPModel = {
        value: "",
        //disabled: false
    };
    this.controller.setupWidget('textColorNP', this.textColorNPattributes, this.textColorNPModel);
	
    //bufferPercentage
    this.bufferAttributes = {
        hintText: '50 - 100',
        changeOnKeyPress: true,
        enterSubmits: true,
        modifierState: Mojo.Widget.numLock,
    };
    this.bufferModel = {
        value: "",
        //disabled: false
    };
    this.controller.setupWidget('bufferPercentage', this.bufferAttributes, this.bufferModel);
    this.bufferField = this.controller.get('bufferPercentage');
	
	
    this.controller.setupWidget('ssid', this.ssidAttributes, this.ssidModel);
    this.wifiCheckHandler = this.wifiCheck.bind(this)
    this.lastFmScrobbleCheckHandler = this.lastFmScrobbleCheck.bind(this)
    this.pushImagePickerHandler = this.pushImagePicker.bind(this)
	this.pushImagePickerNPHandler = this.pushImagePickerNP.bind(this)
	this.resetImagesHandler = this.resetImages.bind(this)
}

AccountAssistant.prototype.activate = function(event){
    this.controller.listen($('wifi'), Mojo.Event.propertyChange, this.wifiCheckHandler);
    this.controller.listen($('lastfmPW'), Mojo.Event.propertyChange, this.lastFmScrobbleCheckHandler);
    this.controller.listen($('backgroundImage'), Mojo.Event.tap, this.pushImagePickerHandler)
    this.controller.listen($('backgroundImageNP'), Mojo.Event.tap, this.pushImagePickerNPHandler)
    this.controller.listen($('resetImages'), Mojo.Event.tap, this.resetImagesHandler)
    //this.controller.listen($('lastfmUN'), Mojo.Event.propertyChange, this.lastFmScrobbleCheckHandler);
    this.controller.get('spinner').mojo.start();
    this.controller.get('scrimSpinner').show();
    this.upDateText();
    
}


AccountAssistant.prototype.deactivate = function(event){
}
AccountAssistant.prototype.cleanup = function(event){
    this.controller.stopListening($('wifi'), Mojo.Event.propertyChange, this.wifiCheckHandler);
    this.controller.stopListening($('lastfmPW'), Mojo.Event.propertyChange, this.lastFmScrobbleCheckHandler);
    this.controller.stopListening($('backgroundImage'), Mojo.Event.tap, this.pushImagePickerHandler)
    this.controller.stopListening($('backgroundImageNP'), Mojo.Event.tap, this.pushImagePickerNPHandler)
    this.controller.stopListening($('resetImages'), Mojo.Event.tap, this.resetImagesHandler)
	imageSelected = false
    newAccount = false
    //this.controller.stopListening($('lastfmUN'), Mojo.Event.propertyChange, this.lastFmScrobbleCheckHandler);

}
AccountAssistant.prototype.lastFmScrobbleCheck = function(event){
    if (this.lastfmPassModel.value == "") {
        this.lastFmModel.value = 'Off'
        this.controller.modelChanged(this.lastFmModel);
        $('scrobble').hide()
    }
    else {
        $('scrobble').show()
    }
}
AccountAssistant.prototype.saveAccPrefs = function(event){
    protocolTest = this.addressModel.value.match("http://")
    protocolTestSsl = this.addressModel.value.match("https://")
    protocolTestForwardSlash = this.addressModel.value.match("/")
    //protocolTestForwardSlashDir = this.directoryModel.value.match("/")
    protocolTestBackSlash = this.addressModel.value.match(/\\/)
    protocolTestBackSlashDir = this.directoryModel.value.match(/\\/)
    numericExpression = /^[0-9]+$/;
    //Mojo.Controller.errorDialog(protocolTestForwardSlash)
    //Mojo.Controller.errorDialog(this.wifiModel.value)
    if (this.pingIntervalModel.value == "") {
        this.pingIntervalModel.value = '0'
    }
    if (this.reLogIntervalModel.value == "") {
        this.reLogIntervalModel.value = '0'
    }
    if (this.reLogIntervalMinsModel.value == "") {
        this.reLogIntervalMinsModel.value = '0'
    }
	if(this.randomSongFetchModel.value == ""){
		this.randomSongFetchModel.value = '30'
	}
	if (backGroundImage == "") {
		backGroundImage = 'images/ampachpre-blue.png'
	}
if (this.bufferModel.value == "") {
		this.bufferModel.value = '75'
		//Mojo.Controller.errorDialog('Username field is blank!')
	}
    if (this.bufferModel.value.match(numericExpression) && this.bufferModel.value > 49) {
		if (this.randomSongFetchModel.value.match(numericExpression)) {
			if (this.pingIntervalModel.value.match(numericExpression)) {
				if (this.reLogIntervalModel.value.match(numericExpression)) {
					if (this.reLogIntervalMinsModel.value.match(numericExpression)) {
						//if (this.pingIntervalModel.value.toString().length == 1) {
						//this.pingIntervalModel.value = "0" + this.pingIntervalModel.value
						//this.pingIntervalModel.value = parseFloat(this.pingIntervalModel.value)
						//Mojo.Log.error(this.pingIntervalModel.value);
						//}
						if (this.portModel.value.match(numericExpression) || this.portModel.value == "") {
							if (this.connectionPortModel.value.match(numericExpression) || this.connectionPortModel.value == "") {
								if (protocolTest == 'http://') {
									Mojo.Controller.errorDialog('The address field has the protocol (http://) in the url, leave that out, This field should only be the domain no quotes or special characters')
								}
								else 
									if (protocolTestSsl == 'https://') {
										Mojo.Controller.errorDialog('The address field has the protocol (https://) in the url, This field should only be the domain no quotes or special characters')
									}
									else 
										if (protocolTestForwardSlash == "/") {
											Mojo.Controller.errorDialog('The address field has the a (/), This field should only be the domain no quotes or special characters')
										}
										else 
											if (protocolTestBackSlash == "\\") {
												Mojo.Controller.errorDialog('The address field has the a (\\) in the url, This field should only be the domain no quotes or special characters')
											}
											else 
												if (protocolTestBackSlashDir == "\\") {
													Mojo.Controller.errorDialog('The directory field has the a (\\) in it, This field should only be the path ampache resides in no quotes or special characters')
												}
												else 
													if (this.wifiModel.value == 'On' && this.ssidModel.value == "") {
														Mojo.Controller.errorDialog('Default wifi is on but there is no default ssid.')
													}
													else 
														if (this.pingIntervalModel.value > 0 && this.pingIntervalModel.value < 5) {
															Mojo.Controller.errorDialog('Keep Alive must be at least 5 min.')
														}
														else 
															if (this.pingIntervalModel.value > 99) {
																Mojo.Controller.errorDialog('Keep Alive must be less than 100 min.')
															}
															else 
																if (this.reLogIntervalModel.value > 99) {
																	Mojo.Controller.errorDialog('Refresh Login hours must be less than 100 hrs.')
																}
																else 
																	if (this.reLogIntervalMinsModel.value > 99) {
																		Mojo.Controller.errorDialog('Refresh Login minutes must be less than 100 mins.')
																	}
																	else 
																		if (this.reLogIntervalMinsModel.value > 0 && this.reLogIntervalMinsModel.value < 5) {
																			Mojo.Controller.errorDialog('Refresh Login minutes must be greater than 5 mins.')
																		}
																		else 
																			if (this.userModel.value == "") {
																				Mojo.Controller.errorDialog('Username field is blank!')
																			}
																			else {
																				if (this.portModel.value != "") {
																					if (this.portModel.value[0] != ":") {
																						this.portModel.value = ":" + this.portModel.value
																					}
																				}
																				if (this.connectionPortModel.value != "") {
																					if (this.connectionPortModel.value[0] != ":") {
																						this.connectionPortModel.value = ":" + this.connectionPortModel.value
																					}
																				}
																				listAccounts[currentAccount] = {
																					accountName: this.nameModel.value,
																					username: this.userModel.value,
																					password: this.passModel.value,
																					address: this.addressModel.value,
																					directory: this.directoryModel.value,
																					port: this.portModel.value,
																					connectionPort: this.connectionPortModel.value,
																					protocol: this.protocolModel.value,
																					dl: this.pathModel.value,
																					notify: this.notificationModel.value,
																					wifi: this.wifiModel.value,
																					btC: this.btCModel.value,
																					hpC: this.hpCModel.value,
																					ssid: this.ssidModel.value,
																					ping: this.pingIntervalModel.value,
																					lastFmUN: this.lastfmUsernameModel.value,
																					lastFmPW: this.lastfmPassModel.value,
																					scrobble: this.lastFmModel.value,
																					reLog: this.reLogIntervalModel.value,
																					reLogMin: this.reLogIntervalMinsModel.value,
																					backGroundImage: backGroundImage,
																					backGroundIcon: backGroundIcon,
																					backGroundImageNP: backGroundImageNP,
																					backGroundIconNP: backGroundIconNP,
																					dashboard: this.dashboardModel.value,
																					textColor: this.textColorModel.value,
																					textColorNP: this.textColorNPModel.value,
																					randomSongFetch: this.randomSongFetchModel.value,
																					bufferPercentage: this.bufferModel.value,
																				}
																				db.add('accountsList', listAccounts, function(){
																					Mojo.Log.info("SUCCESS listAccounts SAVE");
																				}, function(){
																					Mojo.Log.error("FAIL listAccounts SAVE")
																				});
																				LoginTimeOut = false
																				loginRefresh = false
																				if (AmpacheLoggedIn == false || currentAccount != currentAccountLoggedIn) {
																					accountSelected = true
																					this.controller.stageController.swapScene({
																						name: 'login',
																						transition: Mojo.Transition.crossFade,
																						disableSceneScroller: true
																					});
																				}
																				else {
																					if (blueToothToggled == false) {
																						blueToothControls = listAccounts[currentAccount].btC
																					}
																					if (headphoneToggled == false) {
																						headPhoneControls = listAccounts[currentAccount].hpC
																					}
																					randomSongFetch = listAccounts[currentAccount].randomSongFetch
																					notify = listAccounts[currentAccount].notify
																					scrobble = listAccounts[currentAccount].scrobble
																					reLogInterval = listAccounts[currentAccount].reLog
																					reLogIntervalMins = listAccounts[currentAccount].reLogMin
																					pingInterval = listAccounts[currentAccount].ping
																					backGroundImage = listAccounts[currentAccount].backGroundImage
																					backGroundImageNP = listAccounts[currentAccount].backGroundImageNP
																					backGroundIconNP = listAccounts[currentAccount].backGroundIconNP
																					backGroundIcon = listAccounts[currentAccount].backGroundIcon
																					dashboard = listAccounts[currentAccount].dashboard
																					textColor = listAccounts[currentAccount].textColor
																					textColorNP = listAccounts[currentAccount].textColorNP
																					setBufferPercentage = listAccounts[currentAccount].bufferPercentage, this.controller.stageController.swapScene({
																						name: 'search',
																						transition: Mojo.Transition.crossFade,
																						disableSceneScroller: true
																					});
																				}
																			}
							}
							else {
								Mojo.Controller.errorDialog('The connection port field has a non numerical character')
							}
						}
						else {
							Mojo.Controller.errorDialog('The streaming port field has a non numerical character')
						}
					}
					else {
						Mojo.Controller.errorDialog('The Refresh Login minutes field has a non numerical character')
					}
				}
				else {
					Mojo.Controller.errorDialog('The Refresh Login hours field has a non numerical character')
				}
			}
			else {
				Mojo.Controller.errorDialog('The Keep Alive field has a non numerical character')
			}
		}
		else {
			Mojo.Controller.errorDialog('The Random fetch field has a non numerical character')
		}
	}
	else {
		Mojo.Controller.errorDialog('The buffer percentage contains a number less than 50 or not a number')
	}
}

AccountAssistant.prototype.upDateText = function(event){

    if (!newAccount) {
        this.nameModel.value = listAccounts[currentAccount].accountName
        this.controller.modelChanged(this.nameModel);
        this.userModel.value = listAccounts[currentAccount].username
        this.controller.modelChanged(this.userModel);
        this.passModel.value = listAccounts[currentAccount].password
        this.controller.modelChanged(this.passModel);
        this.addressModel.value = listAccounts[currentAccount].address
        if (currentAccount == 0) {
            this.addressAttributes.hintText = 'Default evdo address'
        }
        this.controller.modelChanged(this.addressModel);
        this.protocolModel.value = listAccounts[currentAccount].protocol;
        this.controller.modelChanged(this.protocolModel);
        this.pathModel.value = listAccounts[currentAccount].dl
        this.controller.modelChanged(this.pathModel);
        this.notificationModel.value = listAccounts[currentAccount].notify
        this.controller.modelChanged(this.notificationModel);
        this.directoryModel.value = listAccounts[currentAccount].directory
        this.controller.modelChanged(this.directoryModel);
        this.wifiModel.value = listAccounts[currentAccount].wifi
        this.controller.modelChanged(this.wifiModel);
        this.btCModel.value = listAccounts[currentAccount].btC
        this.controller.modelChanged(this.btCModel);
        this.hpCModel.value = listAccounts[currentAccount].hpC
        this.controller.modelChanged(this.hpCModel);
        this.ssidModel.value = listAccounts[currentAccount].ssid
        this.controller.modelChanged(this.ssidModel);
        this.pingIntervalModel.value = listAccounts[currentAccount].ping
        this.controller.modelChanged(this.pingIntervalModel);
        this.lastfmUsernameModel.value = listAccounts[currentAccount].lastFmUN
        this.controller.modelChanged(this.lastfmUsernameModel);
        this.lastfmPassModel.value = listAccounts[currentAccount].lastFmPW
        this.controller.modelChanged(this.lastfmPassModel);
        this.lastFmModel.value = listAccounts[currentAccount].scrobble
        this.controller.modelChanged(this.lastFmModel);
        this.reLogIntervalModel.value = listAccounts[currentAccount].reLog
        this.controller.modelChanged(this.reLogIntervalModel);
        this.reLogIntervalMinsModel.value = listAccounts[currentAccount].reLogMin
        this.controller.modelChanged(this.reLogIntervalMinsModel);
        this.dashboardModel.value = listAccounts[currentAccount].dashboard
        this.controller.modelChanged(this.dashboardModel);
        this.textColorModel.value = listAccounts[currentAccount].textColor
        this.controller.modelChanged(this.textColorModel);
        this.textColorNPModel.value = listAccounts[currentAccount].textColorNP
        this.controller.modelChanged(this.textColorNPModel);
		this.randomSongFetchModel.value = listAccounts[currentAccount].randomSongFetch
        this.controller.modelChanged(this.randomSongFetchModel);
		this.bufferModel.value = listAccounts[currentAccount].bufferPercentage
        this.controller.modelChanged(this.bufferModel);
		
		
		if(imageSelected == false){
			$('iconNP').innerHTML = '<img src="'+listAccounts[currentAccount].backGroundImageNP+'" width="40" height="40">'
			$('icon').innerHTML = '<img src="'+listAccounts[currentAccount].backGroundImage+'" width="40" height="40">'
		}else{
			$('iconNP').innerHTML = '<img src='+backGroundImageNP+' width="40" height="40">'
			$('icon').innerHTML = '<img src='+backGroundImage+' width="40" height="40">'
		}
        
        if (listAccounts[currentAccount].port != "") {
            if (listAccounts[currentAccount].port[0] == ":") {
                string = listAccounts[currentAccount].port
                stringReplace = string.replace(/:/, "")
                this.portModel.value = stringReplace
            }
        }
        if (listAccounts[currentAccount].connectionPort != "") {
            if (listAccounts[currentAccount].connectionPort[0] == ":") {
                string = listAccounts[currentAccount].connectionPort
                stringReplace = string.replace(/:/, "")
                this.connectionPortModel.value = stringReplace
            }
        }
        //Mojo.Log.error(this.portModel.value)
        //Mojo.Log.error(this.connectionPortModel.value)
        this.controller.modelChanged(this.portModel);
        this.controller.modelChanged(this.connectionPortModel);
        
        if (this.lastfmPassModel.value == "") {
            this.lastFmModel.value = 'Off'
            this.controller.modelChanged(this.lastFmModel);
            $('scrobble').hide()
        }
        else {
            $('scrobble').show()
        }
        if (this.wifiModel.value == 'On') {
            $('ssidField').show()
        }
        else {
            $('ssidField').hide()
        }
    }
    else {
        this.nameModel.value = '';
        this.controller.modelChanged(this.nameModel);
        this.userModel.value = '';
        this.controller.modelChanged(this.userModel);
        this.passModel.value = '';
        this.controller.modelChanged(this.passModel);
        this.addressModel.value = '';
        if (currentAccount == 0) {
            this.addressAttributes.hintText = 'Default evdo address'
        }
        this.controller.modelChanged(this.addressModel);
        this.protocolModel.value = 'http://';
        this.controller.modelChanged(this.protocolModel);
        this.pathModel.value = ''
        this.controller.modelChanged(this.pathModel);
        this.notificationModel.value = 'On'
        this.controller.modelChanged(this.notificationModel);
        this.directoryModel.value = ''
        this.controller.modelChanged(this.directoryModel);
        this.portModel.value = ''
        this.controller.modelChanged(this.portModel);
        this.connectionPortModel.value = ''
        this.controller.modelChanged(this.connectionPortModel);
        this.wifiModel.value = 'Off'
        this.controller.modelChanged(this.wifiModel);
        this.btCModel.value = 'Off'
        this.controller.modelChanged(this.btCModel);
        this.hpCModel.value = 'Off'
        this.controller.modelChanged(this.hpCModel);
        this.pingIntervalModel.value = 0
        this.controller.modelChanged(this.pingIntervalModel);
        this.reLogIntervalModel.value = 0
        this.controller.modelChanged(this.reLogIntervalModel);
        this.reLogIntervalMinsModel.value = 0
        this.controller.modelChanged(this.reLogIntervalMinsModel);
        this.lastFmModel.value = 'Off'
        this.controller.modelChanged(this.lastFmModel);
        this.dashboardModel.value = 'On'
        this.controller.modelChanged(this.dashboardModel);
        this.textColorModel.value = 'white'
        this.controller.modelChanged(this.textColorModel);
        this.textColorNPModel.value = 'white'
        this.controller.modelChanged(this.textColorNPModel);
		this.bufferModel.value = '75'
        this.controller.modelChanged(this.bufferModel);
/*
		this.randomSongFetchModel.value = 30
        this.controller.modelChanged(this.randomSongFetchModel);
*/
		
		$('iconNP').innerHTML = '<img src='+backGroundImageNP+' width="40" height="40">'
		$('icon').innerHTML = '<img src='+backGroundImage+' width="40" height="40">'
        $('scrobble').hide()
        $('ssidField').hide()
    }
    
	accountAss.controller.get('scrimSpinner').hide();
	accountAss.controller.get('spinner').mojo.stop();
	$('sceneContent').show()
}
AccountAssistant.prototype.accInfo = function(event){
    loginCookie = new Mojo.Model.Cookie('accounts');
    listAccounts = loginCookie.get();
    this.controller.showAlertDialog({
        onChoose: function(value){
            if (value == "cookieDelete") {
                listAccounts.splice(currentAccount, 1);
                this.nameModel.value = '';
                this.controller.modelChanged(this.nameModel);
                this.userModel.value = '';
                this.controller.modelChanged(this.userModel);
                this.passModel.value = '';
                this.controller.modelChanged(this.passModel);
                this.addressModel.value = '';
                this.controller.modelChanged(this.addressModel);
                this.protocolModel.value = 'no';
                this.controller.modelChanged(this.protocolModel);
                this.pathModel.value = ''
                this.controller.modelChanged(this.pathModel);
            }
            else {
            }
        },
        title: $L("Remove Account?"),
        message: $L("Are you sure you want to delete the account \"" + loginInfo.accountName + "\"?"),
        choices: [{
            label: $L("Delete Account"),
            value: "cookieDelete",
            type: 'negative'
        }, {
            label: $L("Cancel"),
            value: "",
            type: 'dismiss'
        }, ]
    });
}
AccountAssistant.prototype.protocol = function(event){
    if (this.protocolModel.value == 'https://') {
        protocolCookie = "https://";
    }
    else {
        protocolCookie = "http://"
    }
}
AccountAssistant.prototype.handleCommand = function(event){
    //this.currentScene=Mojo.Controller.stageController.activeScene();
    if (event.type == Mojo.Event.command) {
        switch (event.command) {
            case 'save':
                this.saveAccPrefs()
                break;
        }
    }
    if (event.type == Mojo.Event.back) {
        /*		loginCookie = new Mojo.Model.Cookie('account1');
         loginInfo = loginCookie.get();
         if (!loginInfo){
         this.controller.showAlertDialog({
         onChoose: function(value) {
         if (value == "iknow"){
         this.controller.stageController.popScenesTo('login');
         }
         else {}
         },
         title: $L("Hold On!"),
         message: $L("You do not have a default account. Ampachpre will not connect to ampache at start up if you continue."),
         choices:[
         {label:$L("I know"), value:"iknow", type:'negative'},
         {label:$L("Cancel"), value:"", type:'dismiss'},
         ]
         });}
         else{*/
        //currentAccount = 0
        //this.controller.stageController.popScenesTo('login');
    }
    //this.controller.stageController.deactivate();	
    //this.controller.stageController.pushScene('search');
}
AccountAssistant.prototype.wifiCheck = function(event){
    if (this.wifiModel.value == 'On') {
        for (i = 0; i < listAccounts.length; i++) {
            if (listAccounts[i].wifi == 'On') {
                this.errDialog('You already have a default wifi account. Would you like to make this your default?')
                accountToChange = i
            }
        }
        $('ssidField').show()
    }
    else {
        $('ssidField').hide()
        this.ssidModel.value = ''
        this.controller.modelChanged(accountAss.ssidModel);
    }
}
AccountAssistant.prototype.errDialog = function(errText){
    this.controller.showAlertDialog({
        onChoose: function(value){
            if (value == "yes") {
                Mojo.Log.info(listAccounts[accountToChange].wifi)
                listAccounts[accountToChange].wifi = 'Off'
                listAccounts[accountToChange].ssid = ''
                Mojo.Log.info(listAccounts[accountToChange].wifi)
                Mojo.Log.info(accountAss.wifiModel.value)
                Mojo.Log.info(accountToChange + ', ' + currentAccount)
            }
            else 
                if (value == "no") {
                    accountAss.wifiModel.value = 'Off'
                    accountAss.controller.modelChanged(accountAss.wifiModel);
                    accountAss.ssidModel.value = ''
                    accountAss.controller.modelChanged(accountAss.ssidModel);
                    $('ssidField').hide()
                }
        },
        title: $L(errText),
        choices: [{
            label: $L("Yes"),
            value: "yes"
        }, {
            label: $L("No"),
            value: "no"
        }, ]
    });
}
AccountAssistant.prototype.pushImagePicker = function(){
    Mojo.Log.info('Enter pushImagePicker')
    this.controller.get('spinner').mojo.start();
    this.controller.get('scrimSpinner').show();
	imageSelected = true
    stageController = this.controller.stageController
    Mojo.FilePicker.pickFile({
        actionType: 'open',
        //defaultKind: 'image',
        kinds: ['image'],
/*
        crop: {
            width: 320,
            height: 480
        },
*/
        onSelect: function(file){
            backGroundImage = file.fullPath//Object.toJSON(file); 
            //colonIndex = file.iconPath.indexOf(':')
            backGroundIcon = file.iconPath//.slice(0,colonIndex)
            Mojo.Log.info('onSelect backGroundImage: ' + backGroundImage + " backGroundIcon: " + backGroundIcon)
			accountAss.controller.get('scrimSpinner').hide();
			accountAss.controller.get('spinner').mojo.stop();
        },
		onCancel: function(){
			//backGroundImage = 'images/ampachpre-blue.png'
           // backGroundIcon = ""
            Mojo.Log.info('onCancel backGroundImage: ' + backGroundImage + " backGroundIcon: " + backGroundIcon)
			accountAss.controller.get('scrimSpinner').hide();
			accountAss.controller.get('spinner').mojo.stop();
		}
    }, stageController)
    Mojo.Log.info('Exit pushImagePicker')
}
AccountAssistant.prototype.pushImagePickerNP = function(){
    Mojo.Log.info('Enter pushImagePickerNP')
    this.controller.get('spinner').mojo.start();
    this.controller.get('scrimSpinner').show();
	imageSelected = true
    stageController = this.controller.stageController
    Mojo.FilePicker.pickFile({
        actionType: 'open',
        //defaultKind: 'image',
        kinds: ['image'],
/*
        crop: {
            width: 320,
            height: 480
        },
*/
        onSelect: function(file){
            backGroundImageNP = file.fullPath//Object.toJSON(file); 
            //colonIndex = file.iconPath.indexOf(':')
            backGroundIconNP = file.iconPath//.slice(0,colonIndex)
            //Mojo.Log.info('onSelect backGroundImageNP: ' + backGroundImageNP + " backGroundIconNP: " + backGroundIconNP)
			accountAss.controller.get('scrimSpinner').hide();
			accountAss.controller.get('spinner').mojo.stop();
        },
		onCancel: function(){
			//backGroundImageNP = ""
            //backGroundIconNP = ""
           // Mojo.Log.info('onCancel backGroundImageNP: ' + backGroundImageNP + " backGroundIconNP: " + backGroundIconNP)
			accountAss.controller.get('scrimSpinner').hide();
			accountAss.controller.get('spinner').mojo.stop();
		}
    }, stageController)
    Mojo.Log.info('Exit pushImagePickerNP')
}
AccountAssistant.prototype.resetImages = function(){
		imageSelected = false
		backGroundImage = Mojo.appPath+'images/ampachpre-blue.png'
		//backGroundIcon = 'images/ampachpre-blue.png'
		backGroundImageNP = ''
		//backGroundIconNP = ''
		listAccounts[currentAccount].backGroundImageNP = backGroundImageNP
		listAccounts[currentAccount].backGroundImage = backGroundImage
        listAccounts[currentAccount].textColor = 'white'
        listAccounts[currentAccount].textColorNP = 'white'
        this.textColorModel.value = listAccounts[currentAccount].textColor
        //this.controller.modelChanged(this.textColorModel);
        this.textColorNPModel.value = listAccounts[currentAccount].textColorNP
		this.upDateText()
}