var chokidar = require('chokidar');
var yaml = require('js-yaml');
var fs = require("fs")
var JsonRefs = require("json-refs")

function regenerateFromRefs() {
  JsonRefs.resolveRefsAt(__dirname + '/src/index.yaml', {
    filter: ['relative'],
    loaderOptions: {
      processContent: function (res, callback) {
        callback(undefined, yaml.safeLoad(res.text));
      }
    }
  })
    .then(function (res) {
      var json_string = JSON.stringify(res.resolved)
      fs.writeFile(__dirname + "/public/documentation.json", json_string, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
    }, function (err) {
      console.log(err.stack);
    });
}

// Initialize watcher.
var watcher = chokidar.watch('src', {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

// Something to use when events are received.
var log = console.log.bind(console);
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

// 'add', 'addDir' and 'change' events also receive stat() results as second
// argument when available: http://nodejs.org/api/fs.html#fs_class_fs_stats
watcher.on('change', (path, stats) => {
  if (stats) console.log(`File ${path} changed size to ${stats.size}`);
});
