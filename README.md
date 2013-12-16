# meteor-i18n-PJ


## How to install

1. Add the package `meteor-i18n-PJ` to your `smart.json` file.
2. Run `mrt`

## Usage
  Client
```
    Meteor.startup(function() {
       Meteor.langPJ();
       //or set default language
       //Meteor.langPJ("defaultLang"); 
    });
```

  HTML
```
  {{langPJ "lang"}}

  Show when language is ready

  {{#if language_is_ready}}
    {{> home}}
  {{/if}}
```
## How to add translations

  Server
```
  Meteor.startup(function() {
        //ADD
        Meteor.langPJServer().insert("PL", "lang", "Polski");
        Meteor.langPJServer().insert("EN", "lang", "English");

        //or Array
        // Meteor.langPJServer().insert("EN", [["lang", "English"],["user","user"]]);
        // Meteor.langPJServer().insert("PL", [["lang", "Polski"],["user","uzytkownik"]]);

        //or Object
        //Meteor.langPJServer().insert("EN", {lang:"England",user:"user"});


        //REMOVE
        //Meteor.langPJServer().remove("PL", "lang");

        //or array
        //Meteor.langPJServer().remove("PL", ["lang"]);

        //remove all language
        //Meteor.langPJServer().remove(); 

        //remove one language
        //Meteor.langPJServer().remove("PL");
  });
```
## How to get/change language

Client
```
  Meteor.langPJ().lang("EN");

  //Get current language
  Meteor.langPJ().lang();

```