// @author Plak Jakub
// @version 0.4.0
// @ date 2013-03-27

Package.describe({
  summary: "Meteor i18n PJ"
});

Package.on_use(function (api) {
  api.use(["handlebars"]);
  api.add_files("language.js", ["client", "server"]);
  api.add_files("language-helper.js", "client");
});