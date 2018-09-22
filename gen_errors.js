var fs = require('fs');
var ld = require('lodash');
yaml = require('js-yaml');
require('dotenv').load();

const ERROR_SOURCE_DIR = process.env.ERROR_DEF_DIR;
const ERROR_OUTPUT_DIR = __dirname + '/src/components/examples/errors';
const EXAMPLES_INDEX_PATH = __dirname + '/src/components/examples/index.yaml';
const BREAK_STRING = '# GENERATED ERROR EXAMPLES, DO NOT MODIFY BELOW'

/**
 * Removes all files and subdirectories in a directory, synchronously.
 */
rm_dir = function(dirPath, removeSelf) {
  if (removeSelf === undefined)
    removeSelf = true;
  try { var files = fs.readdirSync(dirPath); }
  catch(e) { return; }
  if (files.length > 0)
    for (var i = 0; i < files.length; i++) {
      var filePath = dirPath + '/' + files[i];
      if (fs.statSync(filePath).isFile())
        fs.unlinkSync(filePath);
      else
        rm_dir(filePath);
    }
  if (removeSelf)
    fs.rmdirSync(dirPath);
};
let error_count = 0;
let start_time = new Date();

console.log("********** Automatic Error Examples Generation Tool **********");
console.log("Error description source directory: " + ERROR_SOURCE_DIR);
console.log("Error examples output directory: " + ERROR_OUTPUT_DIR + "\n");

// Clear the error examples directory
rm_dir(ERROR_OUTPUT_DIR, false);
console.log("Cleared error examples directory.");

// Clear the section in index file
let index_string = fs.readFileSync(EXAMPLES_INDEX_PATH).toString('utf-8');
let index_string_by_line = index_string.split('\n');
let break_ind = index_string_by_line.indexOf(BREAK_STRING);
if(break_ind == -1) {
  throw new Error("Invalid examples index.yaml file: missing break statement");
}
index_string_by_line.length = break_ind + 1;

let stream = fs.createWriteStream(EXAMPLES_INDEX_PATH, {flags:'w'});
index_string_by_line.forEach(line => {
  stream.write(line + '\n');
});
stream.end;
console.log("Cleared error references in examples index file.");


// Regenerate the error examples directory
// For each file in the error descriptions directory
console.log("Starting error examples regeneration.")
fs.readdirSync(ERROR_SOURCE_DIR).forEach(file => {
  let category_name = file.split('.')[0];
  let category_no_error = category_name.split('_').slice(0, -1).join('_');
  console.log("Starting error category: " + category_no_error);
  errors = yaml.safeLoad(fs.readFileSync(ERROR_SOURCE_DIR + '/' + file));

  // Create category subfolder
  console.log("Creating category subdir if it doesn't already exist.")
  let subfolder = ERROR_OUTPUT_DIR + '/' + category_name;
  if (!fs.existsSync(subfolder)){
    fs.mkdirSync(subfolder);
  }

  // For each error in file (category)
  let stream = fs.createWriteStream(EXAMPLES_INDEX_PATH, {flags:'a'});
  for(var key in errors) {
    let error = errors[key];
    console.log("Generating error example for: " + key);
    
    // Create reference in index
    let reference_key = category_no_error + '_' + ld.snakeCase(key);
    let reference_value = '  $ref: \'./errors/' + category_name + '/' +
                          reference_key + '.yaml\''
    let reference = reference_key + ':\n' + reference_value
    stream.write(reference + "\n");


    // Check to make sure error valid
    if(!ld.has(error, 'status') || !ld.has(error, 'code') ||
       !ld.has(error, 'title') || !ld.has(error, 'detail') ||
       !ld.has(error, 'source')) {
      throw new Error("Error source: invalid error format at source.");
    }

    // Create file in subfolder
    let contents = {
      summary: ld.lowerCase(key),
      value: {
        errors: [
          {
            status: error.status,
            code: error.code,
            title: error.title,
            detail: error.detail,
            source: error.source
          }
        ]
      }
    };
    let contents_yaml = yaml.safeDump(contents);
    let file_body = '# #/components/examples/' + reference_key + '\n' +
                    contents_yaml;
    fs.writeFileSync(subfolder + '/' + reference_key + '.yaml', file_body);
    error_count = error_count + 1;
  }
  stream.end();


});

let end_time = new Date()
let elapsed_time = end_time - start_time
console.log("Generated " + error_count + " errors in " + elapsed_time + " ms.");


