#!/usr/bin/env node

const fs = require('fs')
const walk = require('walk')
const moment = require('moment')
const _ = require('underscore')
const path = require('path')
const shell = require('shelljs')
const cli = require('meow')([`
  Usage
    $ journall <input>

  Options
    -t, --title A token
    -p, --program The program to open with
    --path The path to the folder (Can be specifed with $JOURNALL)

  Examples
    $ get-github-user -t 'Test'
    # Will open a document with test
`], {
  alias: {
    t: 'token',
    p: 'program'
  }
})

var journalFolder = cli.flags.path || path.resolve(process.env['JOURNALL'])
var files = []
var filename = moment().format('YYYY.MM.DD') + '.md'
var program = cli.flags.program || process.env['JOURNALL_PROGRAM']
const title = cli.flags.title || cli.input

function openFile (text) {
  console.log(text + ' Opening page.')
  shell.exec('open -a "' + program + '" ' + journalFolder + '/' + filename,
    {silent: false}).output
}

function wrapTitle (title) {
  return `\n\n## ${title}\n`
}

function addCustomHeader (title) {
  return fs.appendFile(path.resolve(journalFolder + '/' + filename), wrapTitle(title), function (err) {
    if (err) {
      console.log('Writing the new header did not work', err)
    }
    openFile('Date already exists.')
  })
}

// Read all files
var walker = walk.walk(journalFolder, { followLinks: false })
walker.on('file', function (root, stat, next) {
  files.push(stat.name)
  next()
})

walker.on('end', function () {
  var header = `# ${moment().format('YYYY MMMM Do')}\n`
  if (!_.contains(files, filename)) {
    // Add the date and an optional title to the header
    if (title) {
      header += wrapTitle(title)
    }

    // Create file with simple header
    fs.writeFile(path.resolve(journalFolder + '/' + filename), header, function (err) {
      if (err) {
        return new Error(err)
      }

      openFile('Log entered.')
    })
  } else {
    // Add the optional title at the end of the file
    (title) ? addCustomHeader(title) : openFile('Date already exists.')
  }
})
