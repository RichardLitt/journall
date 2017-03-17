# journall

> A package for creating a journal entry a day in markdown.

## Installation

`npm install -g journall`

## Usage

```
Usage
  $ journall <input>

Options
  -t, --title A title you want as a heading
  -p, --program The program to open with
  --path The path to the folder (Can be specifed with $JOURNALL)

Examples
  $ journall -t 'Test'
  # Will open a document with test
```

Journall needs to have a path defined, either as a parameter or using `JOURNALL` in your environment.

It won't make a new file if today's date is already taken. It also adds in the date as a header, and can add a secondary header with the first argument (or the `-t` or `--title` arg).

The idea is that typing `journall` automatically constructs the file for you, so you don't have to build one yourself, and so you always have a markdown file you can write anything in that is persistently saved so you don't end up with hundreds of random files in a folder called 'journal'.

You can set the editor using the `-p` or `--program` flag, which will override your env var, `JOURNALL_PROGRAM`. I suggest [iA Writer](http://www.iawriter.com/mac/), the best Markdown editor I've found for OS X.

From then on, simply type `$ journall` and today's date should open.

### Environmental variables

* `JOURNALL`: The directory where files should be stored.  
* `JOURNALL_PROGRAM`: The name of the program which will be opened in the shell and used to edit the file.  

### Alfred

If you're using and [Alfred 2](https://www.alfredapp.com/) workflow with this, note that Alfred doesn't source your `.bash_profile`. To get around this, use a workflow with the following bash script, where the `journall` path is whatever `which journall` spits out:

```sh
/usr/local/bin/node /Users/richard/.nvm/versions/node/v7.5.0/bin/journall {query} --path='/Users/richard/src/journal/' -p 'iA Writer'
```

## Contributing

Feel free!

## License

[MIT](LICENSE) © 2014-2017 Richard Littauer
