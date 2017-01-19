
(function() {

  function ViewModel ( params ) {

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
        window.window.navToggle();
      }
    });

    var self = this;
      self.newParams = function(){
        this.title = 'Default Chart Title';
        this.type = 'line';
        this.series = [];
        this.series.push({ColumnName: 'Title', Value: 'CreatedDate'});
      };
      self.params = params || new self.newParams();
      self.ready = ko.observable(false);
      self.onlyEnabled = ko.observable(true);
      self.pageDescription = ko.observable('');
      self.viewId = window.location.hash.split('/').pop();
      self.appMap = ko.observable();
      self.appName = ko.observable();
      self.appId = ko.observable();
      self.appDescription = ko.observable();
      self.navLink = ko.observable();
      
      var opts = new cnc.app.options();
      cnc.app.get(opts)
          .fail(function (results) {
          })
          .then(function (results) {
              self.appName(results.ApplicationName);
              self.appId(results.AppId);
              self.appDescription(results.Description);
          });
      
      var viewConfigDS = cc.api.getViewConfigsDS();
      viewConfigDS.read({$expand:'Tabs($expand=Views)'}).then(function () {
          self.appMap(viewConfigDS.data()[0]);
         for (var k = 0; k < self.appMap().Tabs.length; k++) { 
           for (var l = 0; l < self.appMap().Tabs[k].Views.length; l++) {
             self.appMap().Tabs[k].Views[l].navLink = window.location.protocol + '//' + window.location.host + '/home/SPA?AppId=' + self.appMap().AppId + '#/view/' + self.appMap().Tabs[k].Views[l].Id;
           }
         }
          var foundit = false;
          for (var i = 0; i < viewConfigDS.data()[0].Tabs.length; i++){
              for (var j = 0; j < viewConfigDS.data()[0].Tabs[i].Views.length; j++){
                  if(viewConfigDS.data()[0].Tabs[i].Views[j].Id == self.viewId){
                      self.pageDescription(viewConfigDS.data()[0].Tabs[i].Views[j].Description);
                      foundit = true;
                      break;
                  }
              }
              if(foundit){
                  break;
              }
          }
          self.ready(true);
      });
  }

  // add your prototype methods
  $.extend(true, ViewModel.prototype, {
    
    dispose: function(){    },
    
    initComponent : function( view ) {    }

  });

  return ViewModel;

})();

