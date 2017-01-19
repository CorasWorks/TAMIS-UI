
(function() {

  function ViewModel ( params ) {

    
    // Provides access to data sources, which have been chosen in the Designer
    //$("#TAMIS-Banner").parent().attr("id","top-banner");

    //Check if img has been added, if not, then add it

    if ($("span.top-nav-text").prev().get(0).tagName != 'IMG') {
      $('<img/>', {
        style: "vertical-align: top",
        src: "/Content/images/Banners/TAMIS.png",
        alt: "TAMIS Icon",
        height: "54px",
        width: "229px"
      }).insertBefore("span.top-nav-text");
    }

    $("#navCol").kendoButton({
      click: function(e) {
        //cc.events.trigger('navCol', {     });
        window.window.navToggle();
      }
    });



    var self = this;
    this.listsInfo = params.listsInfo;
    self.bannerUser = ko.observable("--");
    self.bannerTitle = ko.observable("--");
    self.bannerFY = ko.observable("--");
    self.bannerMACID = ko.observable("--");
    self.bannerHIERITEMID = ko.observable("--");
    self.bannerLoaded = ko.observable(false);
    //self.selHier = ko.observable();
    self.curUser = cc.api.getCurrentUserDS();
    self.curUser.fetch().then( function() { self.bannerUser(self.curUser.data()[0].DisplayName);} );
	self.loc = String(window.location);
		var n = 3;
			var L= self.loc.length, i= -1;
			while(n-- && i++<L){
				i= self.loc.indexOf('/', i);
				if (i < 0) break;
			}
	self.loc = self.loc.substring(0, i);
    self.localDS = cc.api.getLocalStorageDS();

    self.localDS.read().then( function(){
      console.log(self.localDS.data());

      self.localFY = _.find(self.localDS.data(), {key: "[FY]"});
      if(self.localFY === undefined){
        self.localFY = {'key': "[FY]", 'value': 2016};
        var item = self.localDS.add();
        item.set('key', self.localFY.key);
        item.set('value', self.localFY.value);
        self.localDS.sync(); 
      }
      self.bannerFY(self.localFY.value);  

      self.opts = new cnc.app.options();     

      self.localAcct = _.find(self.localDS.data(), {key: "[MACID]"});
      if(self.localAcct === undefined) {
        self.localAcct = {'key': "[MACID]", 'value': 1};
        var item = self.localDS.add();
        item.set('key', self.localAcct.key);

        item.set('value', self.localAcct.value);
        self.localDS.sync();
      }
      //https://now.tamis.org/odata/Connections('a0070443-8e55-4006-afea-6418cd2ca34d')/Lists('dbo.vw_summary_report')/ListItems?%24top=5000&%24orderby=DODIC%2CHierarchyLevel&%24filter=(fy+eq+2016+and+mac_ID+eq+1+and+contains(ancestors%2C%27!1!%27))&%24count=true&_=1480619727883
      //dbo.lkup_munitions_account
      //munition_account
      //mac_ID

      //self.localAcct.value
      cnc.app.get(self.opts)

        .fail(function (results) {   console.log('Fail getting app info:', results); self.bannerMACID('Error');  })

        .then(function (results) {

        $.ajax({
          method : "GET",
          url: self.loc+"/odata/Connections('a0070443-8e55-4006-afea-6418cd2ca34d')/Lists('dbo.lkup_munitions_account')/ListItems?%24filter=(mac_ID+eq+"+self.localAcct.value+")",
          headers : {
            Accept : 'application/json,odata.metadata=minimal',
            AppId : results.Id
          }
        })
          .done(function (response) {
          self.bannerMACID(response.value[0].munition_account);
        });
      });

      self.localHier = _.find(self.localDS.data(), {key: "[HIERITEMID]"});
      console.log(self.localHier.value);
      console.log(self.localHier.value.substring(1, (self.localHier.value.length-1)));

      if(self.localHier === undefined) {
        self.localHier = {'key': "[HIERITEMID]", 'value': 'xxx'};
        var item = self.localDS.add();
        item.set('key', self.localHier.key);

        item.set('value', self.localHier.value);
        self.localDS.sync();
      }
      else {
        self.hierTierVal = Number(self.localHier.value.substring(1, (self.localHier.value.length-1)));
        if(!isNaN(self.hierTierVal)){
        cnc.app.get(self.opts)

          .fail(function (results) {   console.log('Fail getting app info:', results); self.bannerHIERITEMID('Error'); })

          .then(function (results) {

          $.ajax({
            method : "GET",
            url: self.loc+"/odata/Connections('a0070443-8e55-4006-afea-6418cd2ca34d')/Lists('dbo.t_hierarchy_item')/ListItems?%24top=1&%24filter=(hieritemID+eq+"+self.hierTierVal+")",
            headers : {
              Accept : 'application/json,odata.metadata=minimal',
              AppId : results.Id
            }
          })
            .done(function (response) {
            console.log(response.value[0]);
            self.bannerHIERITEMID(response.value[0].name);
          });
        });
      }
      }
    });

    ////
    self.viewId = window.location.hash.split('/').pop();
    var viewConfigDS = cc.api.getViewConfigsDS();
    viewConfigDS.read({$expand:'Tabs($expand=Views)'}).then(function () {
      self.appMap = viewConfigDS.data()[0];
      for (var i = 0; i < viewConfigDS.data()[0].Tabs.length; i++){
        self.temp = _.find(viewConfigDS.data()[0].Tabs[i].Views, function(o) { return (o.Id == self.viewId); });
        console.log(typeof self.temp);
        //debugger;
        if (typeof self.temp !== 'undefined'){
          self.bannerTitle(self.temp.Title);
          i = viewConfigDS.data()[0].Tabs.length;
        }
      }
    });

  }

  // add your prototype methods
  $.extend(true, ViewModel.prototype, {

    // dispose gets called when the custom component is destroyed
    // see http://knockoutjs.com/documentation/component-binding.html#disposal-and-memory-management

    dispose: function(){

      // tear down/cleanup
      //console.log('dispose', this);

    },

    // initComponent handler to provide early access to the HTML fragment after it has been attached to the DOM.
    // At that time elements inside the HTML fragment can be accessed via jQuery.
    // In order to support multiple instances of the component jQuery selectors should be scoped to the current view.

    initComponent : function( view ) {

      // $('.mySelector', view).doSomething();

    }


  });

  return ViewModel;

})();

