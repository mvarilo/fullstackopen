import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchName, setSearchName] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [message, setMessage] = useState(null)
    const [messageType, setMessageType] = useState(null)

    useEffect(() => {
        console.log('effect')
        personService
            .getAll()
            .then(response => {
                setPersons(response)
            })
            .catch(error => {
                setMessageType(`Can not load phonebook data, ${error.response.data.error}`);
                setTimeout(() => {
                    setMessageType(null)
                }, 5000);
            })
    }, [])

    const contactsToShow = showAll
        ? persons
        : persons.filter(person => {
            let toFilter = person.name.toLocaleLowerCase();
            let toSearch = searchName.toLocaleLowerCase();
            return toFilter.includes(toSearch)
        }
        )

    const addContact = (event) => {
        event.preventDefault()

        const contactObject = {
            name: newName,
            number: newNumber,
            id: ''
        }

        if (persons.some(e => e.name === contactObject.name)) {
            let matchName = persons.find(person => person.name === contactObject.name)
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personService
                    .update(matchName.id, contactObject)
                    .then(response => {
                        contactObject.id = matchName.id
                        let newPersons = persons.filter(person => person.id !== matchName.id)
                        newPersons = [...newPersons, contactObject]
                        setPersons(newPersons)
                        infoMessage(`Updated ${contactObject.name}`, 'note');
                    })
                    .catch(error => {
                        infoMessage(`Information of ${newName} has already been removed from server, ${error.response.data.error}`, 'error')
                    })
            }

        } else {
            personService
                .create(contactObject)
                .then(response => {
                    setPersons(persons.concat(response))
                    infoMessage(`Added ${contactObject.name}`, 'note')
                })
                .catch(error => {
                    infoMessage(`Information of ${newName} could not be created, ${error.response.data.error}`, 'error')
                })

        }
        setNewName('')
        setNewNumber('')
    }

    const infoMessage = (text, type) => {
        setMessage(text)
        setMessageType(type)
        setTimeout(() => {
            setMessage(null)
        }, 5000);
    }

    const deleteContact = (id, name) => {

        if (window.confirm(`Delete ${name} ?`)) {
            personService
                .remove(id)
                .then(response => {
                    setPersons(persons.filter(person => person.id !== id))
                    infoMessage(`Deleted ${name}`, 'note')
                })
                .catch(error => {
                    infoMessage(`Information of ${name} has already been removed from server, ${error.response.data}`, 'error')
                })
        }
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleSearchName = (event) => {
        console.log(event.target.value)
        setSearchName(event.target.value)
        setShowAll(false)
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={message} type={messageType} />

            <Filter
                handleSearchName={handleSearchName}
            />

            <h3>Add a new</h3>
            <PersonForm
                addContact={addContact}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />

            <h2>Numbers</h2>
            <Persons
                persons={contactsToShow}
                onDelete={deleteContact}
            />
        </div>
    )
}

export default App