  if (Meteor.isClient) {
    (function(){
      Handlebars.registerHelper('langPJ', function(str){
        return Meteor.langPJ().getStr(str);
      });
      Handlebars.registerHelper('language_is_ready', function(str){
        return Session.get("language_ready");
      });
    })();
  }