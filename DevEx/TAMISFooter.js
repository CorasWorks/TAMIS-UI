
(function() {

  function ViewModel ( params ) {
    
    var self = this;
    this.listsInfo = params.listsInfo;
    self.bannerUser = ko.observable();
    self.bannerDate = ko.observable(moment(new Date()).format("M/D/YY, h:mm:ss a"));
    self.bannerTitle = ko.observable();
    //self.selHier = ko.observable();
    self.curUser = cc.api.getCurrentUserDS();
    self.curUser.fetch().then( function() { self.bannerUser(self.curUser.data()[0].DisplayName);} );
    
        self.localDS = cc.api.getLocalStorageDS();

    self.localDS.read().then( function(){
      var localFY = _.find(self.localDS.data(), {key: "[FY]"});
      if(localFY == undefined){
                var item = self.localDS.add();
        item.set('key', '[FY]');

        item.set('value', 2013);
        self.localDS.sync();
      }
                             
      var localAcct = _.find(self.localDS.data(), {key: "[MACID]"});
      if(localAcct == undefined) {
        var item = self.localDS.add();
        item.set('key', '[MACID]');

        item.set('value', 1);
        self.localDS.sync();
      };
      
    });
    
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

