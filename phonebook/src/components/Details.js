import React from 'react'

const Details = ({ person, deleteHandler }) => {
    return (
        <div>
            {person.name}: {person.number}
            <button onClick={() => deleteHandler(person.id)}>Delete</button>
        </div>
    )
}

export default Details