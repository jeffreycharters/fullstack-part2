import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="error">
            {message}
        </div>
    )
}

const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note!')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('an error happened!')

    useEffect(() => {
        console.log('effect')
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])
    console.log('render', notes.length, 'notes')


    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id === id ? returnedNote : note))
            })
            .catch(error => {
                setErrorMessage(`the note '${note.content}' was already deleted from the server`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 3000)
                setNotes(notes.filter(n => n.id !== id))
            })

    }

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
        }

        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })

    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote}
                    onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App
