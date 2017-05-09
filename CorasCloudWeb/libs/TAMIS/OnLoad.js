//Namespace
var ol = this;

//Parse Query String Vars
ol.loc = String(window.location);
n = ol.loc.lastIndexOf("?");
m = ol.loc.lastIndexOf("#");
ol.query = ol.loc.substring(n+1, m);
ol.vars = ol.query.split("&");

//Nav Toggle Default Value
ol.navHidden = false;

//Set Default values for parameter
//?FY=XXXX&FYC=XXXX&MACID=X&ANC=XXXXXX
ol.parms = [];
ol.parms.push({'key':'FY','val':2017});
ol.parms.push({'key':'FYC','val':2017});
ol.parms.push({'key':'MACID','val':1});
ol.parms.push({'key':'HIERITEMID','val':'!1!'});

//Call Local Storage Var
ol.localDS = cc.api.getLocalStorageDS();

/* AJAX Checker Code
*
* ol.conString is hardcoded. This must be updated if connection is updated
*/
ol.conString = "a0070443-8e55-4006-afea-6418cd2ca34d";
ol.dbConnectionName = "TAMIS_Modernized";
ol.dbQuery = "stp_CheckUserRight";
ol.baseURL = window.location.origin;
ol.sqlConnectionID = null;

/* Populate Data
*
*/
//Connection
ol.internalConnection = cc.api.getConnectionsDS();
ol.connectionObject = null;
ol.p1 = ol.internalConnection.read().then(function () {
	ol.connectionObject = _.find(ol.internalConnection.data(), {
		Name : ol.dbConnectionName
	});
	if(ol.connectionObject === null){
	} else {
		//console.log(ol.connectionObject);
		ol.sqlConnectionID = ol.connectionObject.Id;
	}
});

// Get the App ID
ol.appId = null;
ol.appConfig = cc.api.getAppConfigsDS();
ol.p2 = ol.appConfig.read().then(function () {
	ol.appId = ol.appConfig.data()[0].AppId;
});

//Get User EDIPI
ol.EDIPI = null;
ol.curUser = cc.api.getCurrentUserDS();
ol.p3 = ol.curUser.read().then(function () {
	ol.EDIPI = ol.curUser.data()[0].MetaInfo.Values[0];
});

/* navToggle - Collapses, or expands, the CN Navigation
 *
 */
ol.navToggle = function() {
	// Function to toggle navigation
	  ol.navHidden = !ol.navHidden; // Toggle
	  //console.log(ol.navHidden);
      if(ol.navHidden){
        $('#cc-app-top-nav, .appPageDescription').slideUp();
        $('.cc-tab-icon').slideUp();
				$('.cc-tab').slideUp();
				$('.vaNavButtonGroup.k-state-active').slideUp();
        $('#appContent').height($(window).height() - 10);
				$('.k-tabstrip-wrapper').slideUp();
      } else {
        $('#cc-app-top-nav, .appPageDescription').slideDown();
				$('.cc-tab').slideDown();
				$('.vaNavButtonGroup.k-state-active').slideDown();
        $('.cc-tab-icon').slideDown();
        $('#appContent').height($(window).height() - 10);
				$('.k-tabstrip-wrapper').slideDown();
      }
};

ol.interval = setInterval(function() {
	console.log("Interval");
    if(document.readyState === 'complete') {
			navToggle();
      clearInterval(interval);
			$( window ).on( "orientationchange", function( event ) {
  			window.location = window.location;
			});
    }
}, 100);

/* Queue.js - A function to represent a queue for AJAX calls

Originally created by Stephen Morley as Queue.js - http://code.stephenmorley.org/ -
and released under the terms of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

/* AJAXQueue - Queue for AJAX requestsCreates a new queue.
 * A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front.
 */
ol.AJAXQueue = function(){

  // initialise the queue and offset
  var aq = this;
  aq.queue  = [];
  aq.offset = 0;
  aq.thisURL = window.location.href;

  // Returns the length of the queue.
  aq.getLength = function(){
    return (aq.queue.length - offset);
  }

  // Returns true if the queue is empty, and false otherwise.
  aq.isEmpty = function(){
    return (aq.queue.length == 0);
  }

  /* Enqueues the specified item. The parameter is:
   *
   * item - the item to enqueue
   */
  aq.enqueue = function(item){
    aq.queue.push(item);
  }

  /* Dequeues an item and returns it. If the queue is empty, the value
   * 'undefined' is returned.
   */
  aq.dequeue = function(){

    // if the queue is empty, return immediately
    if (aq.queue.length == 0) return undefined;

    // store the item at the front of the queue
    var item = aq.queue[aq.offset];

    // increment the offset and remove the free space if necessary
    if (++ aq.offset * 2 >= queue.length){
      aq.queue  = queue.slice(aq.offset);
      aq.offset = 0;
    }

    // return the dequeued item
    return item;

  }

  /* Returns the item at the front of the queue (without dequeuing it). If the
   * queue is empty then undefined is returned.
   */
  aq.peek = function(){
    return (aq.queue.length > 0 ? aq.queue[aq.offset] : undefined);
  }

  /* Returns index of first instance of search if queue contains search value.
   * If not, returns -1.
   *
   * search - item to be compared to queue contents
   */
  aq.find = function(search){
    //If queue is too short, automatically return -1
    if (aq.queue.length == 0) return -1;

    //Compare queue, in order, to look for item
    for(var i = aq.offset; i < aq.queue.length; i++) {
        if(aq.queue[i] == search) return i;
    }

    //If not found, return -1
    return -1;
  }

  /* Returns index of first instance of search if queue contains search value,
   * and removes this item from the queue.
   * If not, returns -1.
   *
   * search - item to be removed to queue contents
   */
  aq.remove = function(search){
    //Use Find to get item

    var index = aq.find(search);

    //If found, slice array into the items before and after the item to be removed,
    //Then concatonate to create compact Queue and reset the offset
	debugger;
    if (index !== -1) {
      aq.queue = aq.queue.slice(aq.offset, index).concat(aq.queue.slice(index+1, aq.queue.length));
      index -= aq.offset;
      aq.offset = 0;
    }
    return index;
  }

  // Clears all items from queue, and resets the offset
  aq.clear = function(){
    aq.queue.length = 0;
    aq.offset = 0;
  }

  /* Checks if URL has changed. If so, clear aq.queue. The parameter is:
   *
   * curURL - the current window URL
   */
  aq.checkURL = function(){

    //Check URL, if it doesn't match, clear and set to new URL
    if (aq.thisURL !== window.location.href)  {
      aq.clear();
      aq.thisURL = window.location.href;
    }
  }
}

ol.aQueue = new ol.AJAXQueue();

/* setLS - Set Local Storage Variables
*
*/
ol.setLS = function (){
	//Split Query String into Vars
	for (var i = 0; i < ol.vars.length; i++){
		ol.vars[i]=ol.vars[i].split("=");
	}
	//Placeholder for LS var
	/* Checks/Updates LS Var Key Value pairs
	 * Creates a numeric Value from the key,
	 * Unless that value is HIERITEMID, which is concatontes into a string with !'s
	 */
	var localStorage = cc.api.getLocalStorageDS()
	localStorage.fetch(function() {
	for (var i = 0; i < ol.parms.length; i++) {
		var item = localStorage.add();
		item.set('key', '['+ol.parms[i].key+']');

		var temp = ol.parms[i].val;
		for (var j = 0; j < ol.vars.length; j++) {
			if (ol.parms[i].key == ol.vars[j][0]) {
				if(!isNaN(parseFloat(ol.vars[j][1])) && isFinite(ol.vars[j][1])){
					if(ol.parms[i].key == 'HIERITEMID')	temp = '!'+ol.vars[j][1]+'!';
					else temp = ol.vars[j][1];
				break;
				}
			}
		}
		item.set('value', temp);
	}

	localStorage.sync();
})
};
ol.setLS();

ol.aQueue = new AJAXQueue();
//ol.localDS.read().then( ol.setLS() );

/* AjaxSetup - sets this check to be performed all Ajax requests are sent.
 *
 * If the request URL is making an OData call to the given DB, change URL and
 * make check for permissions. If this check passes, resend AJAX request,
 * after entering into aQueue to mark it should be allowed to continue
 */
 
$.ajaxSetup({
		beforeSend: function(jqXHR){
			var turl = this.url.valueOf()
			if(turl.indexOf("/odata/Connections('" + ol.sqlConnectionID + "')/Procedures('" + ol.dbQuery + "')") != -1 || turl.indexOf("odata/Connections('a0070443-8e55-4006-afea-6418cd2ca34d')/Lists('dbo.lkup_munitions_account')/ListItems?%24filter=(mac_ID+eq+") != -1 || turl.indexOf("/odata/Connections('a0070443-8e55-4006-afea-6418cd2ca34d')/Lists('dbo.t_hierarchy_item')/ListItems?%24top=1&%24filter=(hieritemID+eq+") != -1) {
				console.log(turl +" = X");
			} else if (turl.indexOf("/odata/Connections('"+ol.sqlConnectionID+"')") != -1) {
				if(ol.aQueue.remove(ol.removeCacheBuster(turl)) != -1){
					console.log(turl +" = 1b")
				} else {
					console.log(this);
					var klone = {
								accepts: this.accepts,
								async: this.async,
								cache: this.cache,
								contentType: this.contentType,
								contents: this.contents,
								converters: this.converters,
								crossDomain: this.crossDomain,
								data: this.data,
								dataType : this.dataType,
								dataTypes : this.dataTypes,
								error: this.error,
								flatOptions:this.flatOptions,
								global: this.global,
								hasContent: this.hasContent,
								headers: this.headers,
								isLocal: this.isLocal,
								//jsonp: this.jsonP,
								//jsonpCallback: this.jsonpCallback,
								jsonp: false,
								jsonpCallback: function(){return ''},
								method: this.method,
								processData: this.processData,
								responseFields: this.responseFields,
								success: this.success,
								type : this.type,
								url : this.url,
								xhr: this.xhr
							};
					jqXHR.abort();
					ol.AJAXCheck(klone);
				}
			}
			else {
				console.log(turl +" = 0");
			}
		}
});

/* AJAXCheck - Called Upon AJAX Requests
 *
 * Function executes before AJAX is sent, determining if this is a safe call, or if it needs to be checked against
 */
ol.AJAXCheck = function (klone) {
	var temp =  klone.url.valueOf().substring(klone.url.valueOf().indexOf("/Lists('")+8, klone.url.valueOf().length);
	this.DBTable = temp.substring(0, temp.indexOf("')/"));
	 $.when(ol.p3.promise(), ol.p2.promise(), ol.p3.promise()).then(function () {
		//Fetch Proc
		 //Check Filter Params
		ol.localDS.read().then( function(){
			var localAcct = _.find(ol.localDS.data(), {key: "[MACID]"}).value;
			var localHier = _.find(ol.localDS.data(), {key: "[HIERITEMID]"}).value;
			localHier = parseInt(localHier.substring(1, localHier.length-1));
			var localFY = _.find(ol.localDS.data(), {key: "[FY]"}).value;
			var pURL = ol.baseURL + "/odata/Connections('" + ol.sqlConnectionID + "')/Procedures('" + ol.dbQuery + "')";

			$.ajax({
				type : "POST",
				url : pURL,
				data: JSON.stringify({'cac_edipi':1455943937,
					//'cac_edipi': ol.EDIPI,
					'MACID':localAcct,
					'FY':localFY,
					'hierItemID':localHier,
					'permission': 'none'
					//'permission':DBTable
				}),
				success : function (result) {
				console.log("I'm a success!\nWait...That's not right...");
				},
				error : function (result) {
					console.log(result);
					if(JSON.parse(result.responseText).Results[0].RETURN_VALUE === 1) {
						ol.aQueue.enqueue(ol.removeCacheBuster(klone.url));
						console.log(klone.url +" = 1a")
						console.log(klone)
						$.ajax(klone);
					}
					else{
						cc.notification.trigger('warning', {
							title: 'Access Denied',
							message: 'Insufficient Privileges: \n Contact Support if you believe you recieved this message in Error.'
						});
					}
				},
				dataType : "jsonp",
				contentType: 'application/json; charset=utf-8',
				jsonp: false,
				jsonpCallback: function(){return ''},
				headers : {
					'AppId' : ol.appId,
					'Accept' : 'application/json,odata.metadata=minimal',
					'Content-Type' : 'application/json'
				}
			});
		});
	});
}

ol.removeCacheBuster = function (str){
	var i = str.lastIndexOf('_=')
	var j = str.length
	if(i != -1 && i+2 != j) {
		var tempURL = str.substring(i+2, j)
		if(+tempURL === +tempURL){
			str = str.substring(0, i)
		}
	}
	debugger
	return str
}

//Watches window for URL changes
window.onhashchange = function(){
	console.log("Hash Change!")
	ol.loc = String(window.location);
	n = ol.loc.lastIndexOf("?");
	m = ol.loc.lastIndexOf("#");
	ol.query = ol.loc.substring(n+1, m);
	ol.vars = ol.query.split("&");
	debugger;
	ol.aQueue.checkURL();
	ol.setLS();
}
