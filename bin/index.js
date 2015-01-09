#!/usr/bin/env node
'use strict';

var fs = require('fs')
var walk = require('walk')
var moment = require('moment')
var _ = require('underscore')
var path = require('path')
var shell = require('shelljs')
var argv = require('minimist')(process.argv.slice(2), {
    alias: {
        t: 'title',
    }
})

var journalFolder = (path.resolve(process.env['HOME'], 'Documents/journall'))
var files  = []
var filename = moment().format('YYYY.MM.DD') + '.md'

// Read all files
var walker  = walk.walk(journalFolder, { followLinks: false })
walker.on('file', function(root, stat, next) {
    files.push(stat.name)
    next()
})

walker.on('end', function() {

  var header

  if (!_.contains(files, filename)) {

    // Add the date and an optional title to the header
    header = '# ' + moment().format('YYYY MMMM Do') + '\n'
    if (argv.t && typeof argv.t === 'string' ||
      argv._[0] && typeof argv._[0] === 'string') {
      header += '\n## ' + (argv.t || argv._[0]) + '\n'
    }

    // Create file with simple header
    fs.writeFile(journalFolder + '/' + filename, header, function(err) {
      if (err) { console.log(err) }
      else {
        // Open file
        console.log("Log entered. Opening page.")
        shell.exec('open -a "iA Writer" ' + journalFolder + '/' + filename,
          {silent: false}).output
      }
    })
  } else {

    // Add the optional title at the end of the file
    if (argv.t && typeof argv.t === 'string') {
      header = '\n\n## ' + (argv.t) + '\n'

      fs.appendFile(journalFolder + '/' + filename, header, function(err) {
        if (err) console.log('Writing the new header did not work', err)
      })
    } else if (argv._ && _(argv._).every( function(arg) {
      return _.isString(arg)
    })) {
      header = '\n\n## ' + (argv._.join(' ')) + '\n'

      fs.appendFile(journalFolder + '/' + filename, header, function(err) {
        if (err) console.log('Writing the new header did not work', err)
      })
    }

    // Open file
    console.log('Date already exists! Opening page.')
    shell.exec('open -a "iA Writer" ' + journalFolder + '/' + filename,
      {silent: false}).output
  }
})
