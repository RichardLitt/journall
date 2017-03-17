#!/usr/bin/env node

const fs = require('fs')
const walk = require('walk')
const moment = require('moment')
const _ = require('underscore')
const path = require('path')
const opn = require('opn')
const cli = require('meow')([`
  Usage
    $ journall <input>

  Options
    -t, --title A title you want as a heading
    -p, --program The program to open with
    --path The path to the folder (Can be specifed with $JOURNALL)

  Examples
    $ get-github-user -t 'Test'
    # Will open a document with test
`], {
  alias: {
    t: 'title',
    p: 'program'
  }
})

const journalFolder = cli.flags.path || path.resolve(process.env['JOURNALL'])
const files = []
const filename = moment().format('YYYY.MM.DD') + '.md'
const fullPath = path.resolve(journalFolder + '/' + filename)
const program = cli.flags.program || process.env['JOURNALL_PROGRAM']
const title = cli.flags.title || cli.input
const walker = walk.walk(journalFolder, { followLinks: false })

console.log(cli.flags)

function openFile (text) {
  console.log(`${text} Opening page.`)
  opn(fullPath, {app: program})
  process.exit(1)
}

function wrapTitle (title) {
  return `\n\n## ${title}\n`
}

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
