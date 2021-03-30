import React, { useState, useEffect } from 'react'
import personService from './services/personService'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  if (message[1] === 'error') {
  return ( 
    <div className="error">
      {message[0]}
    </div>
  )
  }
  if (message[1] === 'success' ) {
    return (
    <div className="success">
      {message[0]}
    </div>
    )
  }
}

const App = () => {
  // States:
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ personFilter, setPersonFilter ] = useState('')
  const [ notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [persons])

  // Handlers:
  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    // A name is required for the phonebook, number is not.
    if(newName === '') {
      setNotification([`You must specify a name for the contact.`,'error'])
      setTimeout(() => { setNotification(null)}, 5000)
      return
    }

    // Go through the contacts to see if supplied name is already in it.
    for(var i = 0;i < persons.length;i++) {
      if(persons[i].name.toLowerCase() === newName.toLowerCase()) {
        const id = persons[i].id
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          personService
            .update(id, personObject)
            .then(returnedPerson =>
              setPersons(persons.map(person => person.id !== id ? person : returnedPerson)),
              setNotification([`Number changed for ${newName}.`,'success']),
              setTimeout(() => { setNotification(null) }, 5000)
                )
            .catch(error =>
              setNotification([`${newName} was deleted from phonebook before updating.`,'error']),
              setTimeout(() => { setNotification(null) }, 5000)
              )
          return
        }
        else {
          setNewName('')
          setNewNumber('')
          return
        }
      }
    }

    // If it's a new name, create a new contact.
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotification([`${newName} added to phonebook.`,'success'])
        setTimeout(() => { setNotification(null) }, 5000)
      })
  }

  const handleFilterChange = (event) => {
    setPersonFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // Render:
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />

      <Filter 
        personFilter={personFilter} 
        handleFilterChange={handleFilterChange} 
      />

      <h3>add a new</h3>

      <PersonForm 
        addPerson={addPerson} newName={newName} setNewName={setNewName} 
        newNumber={newNumber} setNewNumber={setNewNumber} 
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons 
        persons={persons} personFilter={personFilter} setPersons={setPersons}
        setNotification={setNotification}
      />
    </div>
  ) 

}

export default App