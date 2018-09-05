var chokidar = require('chokidar');
var yaml = require('js-yaml');
var fs = require("fs");
var JsonRefs = require("json-refs");

// File and dir constants
const INDEX_FILE = '/src/index.yaml'
const OUTPUT_FILE = '/public/documentation.yaml'
const SRC_DIR = 'src'

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

// Initialize watcher.
var watcher = chokidar.watch(SRC_DIR, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});


// Add event listeners.
watcher
  .on('add', path => {
    log(`File ${path} has been added`)
  })
  .on('change', path => {
    log(`File ${path} has been changed`)
    regenerateFromRefs()
  })
  .on('unlink', path => { 
    log(`File ${path} has been removed`)
  });

// More possible events.
watcher
  .on('addDir', path => {
    log(`Directory ${path} has been added`)
  })
  .on('unlinkDir', path => {
    log(`Directory ${path} has been removed`)
  })
  .on('error', error => log(`Watcher error: ${error}`))
  .on('ready', () => log('Initial scan complete. Ready for changes'))
  .on('raw', (event, path, details) => {
    log('Raw event info:', event, path, details);
  });