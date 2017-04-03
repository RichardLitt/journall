#!/usr/bin/env node

const editor = require('editor')
const fs = require('fs')
const walk = require('walk')
const moment = require('moment')
const _ = require('underscore')
const path = require('path')
const mkdirp = require('mkdirp')
const opn = require('opn')
const cli = require('meow')([`
  Usage
    $ journall <input>

  Options
    -t, --title    A title you want as a heading
    -p, --program  The program to open with
    -e, --editor   Open using $EDITOR
    --path         The path to the folder (Can be specifed with $JOURNALL)

  Examples
    $ get-github-user -t 'Test'
    # Will open a document with test
`], {
  alias: {
    t: 'title',
    p: 'program',
    e: 'editor'
  }
})

if (!cli.flags.path && !process.env['JOURNALL']) {
  console.log('ERROR: You must either specify --path or set $JOURNALL to a path.')
  cli.showHelp(1)
}

const journalFolder = cli.flags.path || path.resolve(process.env['JOURNALL'])
const files = []
const filename = moment().format('YYYY.MM.DD') + '.md'
const fullPath = path.resolve(journalFolder + '/' + filename)
const program = cli.flags.program || process.env['JOURNALL_PROGRAM']
const title = cli.flags.title || cli.input
const walker = walk.walk(journalFolder, { followLinks: false })

function openFile (text) {
  console.log(`${text} Opening page.`)
  if (cli.flags.editor) {
    editor(fullPath, function () {
      process.exit(0)
    })
  } else {
    opn(fullPath, {app: program, wait: false})
    process.exit(0)
  }
}

function wrapTitle (title) {
  return `\n## ${title}\n`
}

walker.on('file', function (root, stat, next) {
  files.push(stat.name)
  next()
})

walker.on('end', function () {
  var header = `# ${moment().format('YYYY MMMM Do')}\n\n`

  if (!_.contains(files, filename)) {
    // Add the date and an optional title to the header
    if (title && title.length !== 0) {
      header += wrapTitle(title)
    }

    // Create the directory if it doesn't exist
    mkdirp.sync(journalFolder)

    // Create file with simple header
    fs.writeFile(fullPath, header, function (err) {
      if (err) {
        throw new Error(err)
      }
      openFile('Log entered.')
    })
  } else if (title) {
    // Add the optional title at the end of the file
    fs.appendFile(fullPath, wrapTitle(title), function (err) {
      if (err) {
        throw new Error('Writing the new header did not work', err)
      }
      openFile('Date already exists.')
    })
  } else {
    openFile('Date already exists.')
  }
})
