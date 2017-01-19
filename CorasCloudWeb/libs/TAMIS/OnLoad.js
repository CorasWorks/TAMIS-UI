var ol = this;

function appStart() {
	$.when(cnc.ready).done(function () {
		//break;
	//Namespace
	var self = this;
	//Parse Query String Vars
	self.loc = String(window.location);
	self.n = self.loc.lastIndexOf("?");
	self.query = self.loc.substring(self.n+1);
	self.vars = self.query.split("&");

	//Set Default values for parameter
	//?FY=XXXX&FYC=XXXX&MACID=X&ANC=XXXXXX
	self.parms = [];
	self.parms.push({'key':'FY','val':2017});
	self.parms.push({'key':'FYC','val':2017});
	self.parms.push({'key':'MACID','val':1});
	self.parms.push({'key':'HIERITEMID','val':'1'});
	
	//Call and fetch Local Storage
	self.localDS = cc.api.getLocalStorageDS();

	self.localDS.read().then( function(){
		
		for (var i = 0; i < self.vars.length; i++){
			self.vars[i]=self.vars[i].split("=");
		}
		
		self.item = self.localDS.add();
		
		for (var i = 0; i < self.parms.length; i++) {
			self.item = self.localDS.add();
			self.item.set('key', '['+self.parms[i].key+']');

			self.temp = self.parms[i].val;
			for (var j = 0; j < self.vars.length; j++) {
				if (self.parms[i].key == self.vars[j][0]) {
					if(!isNaN(parseFloat(self.vars[j][1])) && isFinite(self.vars[j][1])){
						if(self.parms[i].key == 'HIERITEMID')
							self.temp = '!'+self.vars[j][1]+'!';
						else
							self.temp = self.vars[j][1];
					break;
					}
				}
			}
			self.item.set('value', self.temp);
		}

	//Sync DS then set Application Style
	self.localDS.sync().then( function() {
		//Get Base URI Dynamically
		var n = 3;
		var L= self.loc.length, i= -1;
		while(n-- && i++<L){
			i= self.loc.indexOf('/', i);
			if (i < 0) break;
		}
		self.css = new cnc.ui.css.options();
		self.css.addHref(self.loc.substring(0, i)+"/assets/CSS/kendo.custom.css");
		cnc.ui.css.inject(self.css).done( function (){
		wait(function () { return !isNaN(parseFloat($('.cc-tab').height()))}, function() {
	// Capture values to be used when restoring navigation
    ol.ccTabHeight = $('.cc-tab').height();
    ol.vaNavButtonGroupHeight = $('.vaNavButtonGroup').height();
    ol.buttonPadding = $('.vaNavButtonGroup div button:first').css("padding");
	ol.tabstripHeight = $('.k-tabstrip-wrapper').height();
    // Track nav state
    ol.navHidden = false;
	
	var interval = setInterval(function() {
    if(document.readyState === 'complete') {
		navToggle();
        clearInterval(interval);
		$( window ).on( "orientationchange", function( event ) {
  window.location = window.location;
});
        //done();
    }    
}, 100);
			
		});
	});
	});
	});	
	});
}


function navToggle() {
	// Function to toggle navigation
	  ol.navHidden = !ol.navHidden; // Toggle
	  //console.log(ol.navHidden);
      if(ol.navHidden){
        $('#cc-app-top-nav, .appPageDescription').slideUp();
        $('.cc-tab-icon').slideUp();
        //$('.cc-tab').height(40);//18
		$('.cc-tab').slideUp();
        //$('.vaNavButtonGroup').height(40);//24
		$('.vaNavButtonGroup.k-state-active').slideUp();
        //$('.vaNavButtonGroup div button').css("padding", "0px 10px 0px 10px");
        $('#appContent').height($(window).height() - 10);
		//$('.k-tabstrip-wrapper').height(49);
		$('.k-tabstrip-wrapper').slideUp();
		//$('.cc-tab-text').css("padding", "7px 0px 0px 0px");
      } else {
        $('#cc-app-top-nav, .appPageDescription').slideDown();
        //$('.cc-tab').height(ol.ccTabHeight);
		$('.cc-tab').slideDown();
        //$('.vaNavButtonGroup').height(ol.vaNavButtonGroupHeight);
		$('.vaNavButtonGroup.k-state-active').slideDown();
        //$('.vaNavButtonGroup div button').css("padding", ol.buttonPadding);
        $('.cc-tab-icon').slideDown();
        $('#appContent').height($(window).height() - 10);
		//$('.k-tabstrip-wrapper').height(ol.tabstripHeight);
		$('.k-tabstrip-wrapper').slideDown();
		//$('.cc-tab-text').css("padding", "0px 0px 0px 0px");
      }
};

function wait(item, func){
if(item()){
	func();
} else {
setTimeout(function(){
	wait(item, func);
},100);
}
};
wait(function () {return typeof cnc !== "undefined"}, appStart);