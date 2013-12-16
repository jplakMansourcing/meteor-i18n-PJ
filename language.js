(function() {
    Meteor.startup(function() {

        if (Meteor.isServer) {
            LangPJ = new Meteor.Collection("langPJ");
            Meteor.publish('current_language', function(lang) {
                if (lang) {
                    return LangPJ.find({
                        lang: lang
                    });
                }
            });

            LangPJ.allow({
                insert: false,
                update: false,
                remove: false
            });

            function LanguagePJServer(options) {
                this.init(options);
            };

            LanguagePJServer.prototype.init = function() {
                var self = this;
                this.collection = LangPJ;
                return this;
            };

            LanguagePJServer.prototype.insert = function(lang, baseStr, newStr) {
                if (typeof baseStr === 'string') {
                    if (this.collection.findOne({
                        lang: lang
                    }) == undefined) {
                        var str = {};
                        str[baseStr] = newStr;
                        this.collection.insert({
                            lang: lang,
                            str: str
                        });
                    } else {
                        var obj = {};
                        obj["str." + baseStr] = newStr;
                        this.collection.update({
                            lang: lang
                        }, {
                            $set: obj
                        });
                    }
                } else if (_.isArray(baseStr)) {
                    baseStr.forEach(function(i) {
                        Meteor.langPJServer().insert(lang, i[0], i[1]);
                    });
                } else if (typeof baseStr == 'object') {
                    for (var i in baseStr) {
                        Meteor.langPJServer().insert(lang, i, baseStr[i]);
                    }
                } else
                    throw 'Expected string|object|array. Got: ' + (typeof str);
                return this;
            };

            LanguagePJServer.prototype.remove = function(lang, baseStr) {
                if (!lang) {
                    this.collection.remove({});
                    return this;
                }
                if (!baseStr) {
                    this.collection.remove({
                        lang: lang
                    });
                    return this;
                }
                if (typeof baseStr === 'string') {
                    var obj = {}
                    obj["str." + baseStr] = "";
                    this.collection.update({
                        lang: lang
                    }, {
                        $unset: obj
                    })
                } else if (_.isArray(baseStr)) {
                    baseStr.forEach(function(i) {
                        Meteor.langPJServer().remove(lang, i);
                    });
                } else
                    throw 'Expected string|array. Got: ' + (typeof str);
                return this;
            };

            Meteor.langPJServer = function() {
                if (!instance)
                    instance = new LanguagePJServer();
                return instance;
            };
            Meteor.langPJServer();
        }
    });

    Meteor.startup(function() {

        if (Meteor.isClient) {
            Meteor.autosubscribe(function() {
                Meteor.subscribe("current_language", Session.get("current_language"), function() {
                    Session.set("language_ready", true)
                });
            });

            function LanguagePJ(defaultLang) {
                this.init(defaultLang);
            };

            LanguagePJ.prototype.init = function(defaultLang) {
                var self = this;
                this.defaultLang = defaultLang || 'PL';
                this.collection = new Meteor.Collection("langPJ");
                Session.set("language_ready", false);
                Session.set("current_language", this.defaultLang);
                return this;
            };

            LanguagePJ.prototype.lang = function() {
                if (arguments.length == 0)
                    return Session.get("current_language");
                else
                if (!Session.equals("current_language", arguments[0])) {
                    Session.set("language_ready", false);
                    Session.set("current_language", arguments[0]);
                }
                return this;
            };

            LanguagePJ.prototype.getStr = function(str) {
                var row = this.collection.findOne({
                    lang: Session.get("current_language")
                });
                if (row && row.str && row.str[str])
                    return row.str[str];
                return str;
            };

            var instance = null;

            Meteor.langPJ = function(options) {
                if (!instance)
                    instance = new LanguagePJ(options);
                return instance;
            };
        }
    });
})();