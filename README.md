journall
========

*A package for creating a journal entry a day in markdown.*

## Installation

`npm install -g journall`

Then, set your journal directory by adding the env var `JOURNALL` to your `.bash_profile`.

```sh
# Append to the end of the file
$ echo "export JOURNALL=/Users/richard/Documents/journall" >> ~/.bash_profile

# Update shell
$ source ~/.bash_profile
```

## Usage

`journall 'Title of post'`

Journall will use the `Documents/journall/` folder, and save a file titled with the date. It won't make a new file if today's date is already taken. It also adds in the date as a header, and can add a secondary header with the first argument (or the `-t` or `--title` arg).

The idea is that typing `journall` automatically constructs the file for you, so you don't have to build one yourself, and so you always have a markdown file you can write anything in that is persistently saved so you don't end up with hundreds of random files in a folder called 'journal'.

Natively, this package supports [iA Writer](http://www.iawriter.com/mac/), which is the best Markdown editor I've found for OS X. That will have to be installed for this to work. This package does not work on Windows. 

From then on, simply type `$ journall` and today's date should open.

## Contributing

Feel free. 
