journall
========

*A package for creating a journal entry a day in markdown.*

## Installation

`npm install -g journall`

## Usage

Journall will use the `entries/` folder, and save a file titled with the date. It won't make a new file if today's date is already taken. It also adds in a brief header. 

The idea is that typing `journall` automatically constructs the file for you, so you don't have to build one yourself, and so you always have a markdown file you can write anything in that is persistently saved so you don't end up with hundreds of random files in a folder called 'journal'.

Nativelly, this package supports [iA Writer](http://www.iawriter.com/mac/), which is the best Markdown editor I've found for OS X. That will have to be installed for this to work. 

To make everything easier, add this to your .bash_profile: 

`alias journall='node /path/to/dir/journall/index.js'` 

From then on, simply type `$ journall` and today's date should open.

## Contributing

Feel free. I've kept it simple, but it doesn't have to be.
