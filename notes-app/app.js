const chalk = require('chalk')
const yargs = require('yargs')

const notes = require('./notes.js')
const log = require('./log.js')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler: function (argv) {
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: function () {
        log("Listing out all notes")
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a new note',
    handler: function () {
        log("Read a note")
    }
})

console.log(yargs.argv)