import React from 'react'

const Details = ({ person, deleteHandler }) => {
    return (
        <div className="entry">
            {person.name}: {person.number} &nbsp;
            <button onClick={() => deleteHandler(person.id)}>Delete</button>
        </div>
    )
}

export default Details