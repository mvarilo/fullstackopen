import React from 'react'

const Persons = ({ persons, onDelete }) => {

    function deletePerson(id, name) {
        if (window.confirm(`Delete ${name} ?`)) {
            onDelete(id);
        }
        return;
    }

    return (
        <>
            {persons.map(person => (
                <p key={person.id}>
                    {person.name} {person.number} &nbsp;
                    <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
                </p>
            ))}
        </>
    );
}

export default Persons