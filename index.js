var fs = require('fs');
var walk = require('walk');
var moment = require('moment'); 
var _ = require('underscore');
var shell = require('shelljs');

var files  = [];
var today = moment().format('YYYY.MM.DD') + '.md';

// Read all files
var walker  = walk.walk(__dirname + '/entries', { followLinks: false });
walker.on('file', function(root, stat, next) {
    files.push(stat.name);
    next();
});

walker.on('end', function() {
  if (!_.contains(files, today)) {
    // Create file with simple header
    fs.writeFile(__dirname + "/entries/" + today, "# " + moment().format('YYYY MMMM Do'), function(err) {
      if(err) {
        console.log(err);
      } else {
        // Open file
        console.log("Log entered. Opening page.");
        shell.exec('open -a "iA Writer" ' + __dirname + '/entries/' + today, {silent: false}).output; // jshint ignore:line
      }
    }); 
  } else {
    // Open file
    console.log('Date already exists! Opening page.');
    shell.exec('open -a "iA Writer" ' + __dirname + '/entries/' + today, {silent: false}).output; // jshint ignore:line
  }
});