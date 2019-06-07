const fs = require('fs')
const chalk = require('chalk')

const log = require('./log.js')

const addNote = (title, body) => {
    const allNotes = loadNotesFromStorage()
    const duplicateNote = allNotes.find((note) => note.title === title)

    if (!duplicateNote) {
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

const removeNote = (title) => {
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
    const allNotes = loadNotesFromStorage()
    log("Your notes:")
    allNotes.forEach((note) => log(note.title))
}

const readNote = function (title) {
    const allNotes = loadNotesFromStorage()
    const note = allNotes.find((note) => note.title === title)

    if (!note) {
        log(chalk.red.inverse('Note not found!'))
    } else {
        log(chalk.green.inverse(note.title))
        log(note.body)
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotesFromStorage = () => {

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