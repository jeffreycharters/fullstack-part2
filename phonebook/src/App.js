import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Details from './components/Details'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import './index.css'

import phonebookService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  const personsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(filter))

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="message">
        {message}
      </div>
    )
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const personExists = persons.find(person => person.name === newName)

    if (personExists) {
      const person = persons.find(person => person.name === newName)

      const confirm = window.confirm(`Change ${person.name} number to ${newNumber}?`)

      if (!confirm) { return null }

      phonebookService.update(person, newNumber)
        .then(updatedPerson => {
          setPersons(persons.map(person =>
            person.name === updatedPerson.name ? updatedPerson : person))
        })

      setMessage(`${person.name} number changed to ${newNumber}`)
    }
    else {

      phonebookService.create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })
    }

    setNewName('')
    setNewNumber('')

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const filterText = event.target.value.toLowerCase()
    if (filterText.length > 0) {
      setFilter(filterText)
      setShowAll(false)
    }
    else {
      setShowAll(true)
    }
  }

  const deleteHandler = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`)
    if (confirmDelete) {
      phonebookService.remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`${personToDelete.name} deleted from phonebook.`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(
            `${personToDelete.name} does not exist in phone book`
          )
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter handleFilterChange={handleFilterChange} />

      <h3>Add Person and Number</h3>

      <PersonForm
        nameValue={newName} nameChangeHandler={handleNameChange}
        numberValue={newNumber} numberChangeHandler={handleNumberChange}
        clickHandler={addPerson}
      />

      <h2>Numbers </h2>
      {personsToShow.map(person =>
        <Details key={person.name} person={person} deleteHandler={deleteHandler} />
      )}
    </div>
  )
}

export default App