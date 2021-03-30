import React from 'react'
import personService from '../services/personService'

const Person = (props) => {
  const deleteButton = () => {
    if (window.confirm(`Delete ${props.name}?`)) {
      personService.remove(props.id)
      personService.getAll()
      .then(response => 
        props.setPersons(response.data),
        props.setNotification([`${props.name} deleted from the phonebook.`,'success']),
        setTimeout(() => { props.setNotification(null)}, 5000))
      .catch(error =>
        props.setNotification([`${props.name} has already been deleted from the phonebook.`,'error']),
        setTimeout(() => {props.setNotification(null)}, 5000)
        )
    }
  }
    return (
      <>
        {props.name} {props.number}
        <button 
          onClick={deleteButton}>
          delete
        </button>
        <br />
      </>
    )
  }

const Persons = ({persons, personFilter, setPersons, setNotification}) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(personFilter.toLowerCase()))
    return (
      personsToShow.map(person =>
        <Person key={person.name} name={person.name} number={person.number} id={person.id} setNotification={setNotification} setPersons={setPersons}/>
      )
    )
  }

export default Persons