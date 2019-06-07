const fs = require('fs')
const chalk = require('chalk')

const log = require('./log.js')

const addNote = function (title, body) {
    const allNotes = loadNotesFromStorage()
    const duplicateNotes = allNotes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length == 0) {
        allNotes.push({
            title: title,
            body: body
        })

        saveNotes(allNotes)
        log(chalk.green.inverse("Note saved!"))
    } else {
        log(chalk.red.inverse("Note title already taken!"))
    }

}

const removeNote = function (title) {
    const allNotes = loadNotesFromStorage()
    const updatedNotes = allNotes.filter(note => note.title !== title)

    if (allNotes.length > updatedNotes.length) {
        saveNotes(updatedNotes)
        log(chalk.green.inverse('Note removed!'))
    } else {
        log(chalk.red.inverse('No note removed!'))
    }


}

const getNotes = function () {
    return "My notes"
}

const readNote = function () {

}

const saveNotes = function (notes) {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotesFromStorage = function () {

    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    getNotes: getNotes,
    readNote: readNote
}