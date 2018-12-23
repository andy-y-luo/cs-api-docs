
var yaml = require('js-yaml');
var fs = require("fs");
var JsonRefs = require("json-refs");
var path = require('path')

// File and dir constants
const INDEX_FILE = '/src/index.yaml'
const OUTPUT_FILE = '/public/documentation.yaml'

// Something to use when events are received.
var log = console.log.bind(console);

/**
 * Takes the index yaml file and resolves all the refs, writing to output file.
 */
function regenerateFromRefs() {
  log("Regenerating output file from source yaml files")
  JsonRefs.resolveRefsAt(__dirname + INDEX_FILE, {
    filter: ['relative'],
    loaderOptions: {
      processContent: function (res, callback) {
        callback(undefined, yaml.safeLoad(res.text));
      }
    }
  })
    .then(function (res) {
      var yaml_string = yaml.safeDump(res.resolved);
      fs.writeFile(__dirname + OUTPUT_FILE, yaml_string, function(err) {
          if(err) {
              return console.log(err);
          }
          console.log("The output file was generated!");
      }); 
    }, function (err) {
      console.log(err.stack);
    });
}

regenerateFromRefs()