import React from 'react'

const Filter = props => {
    return (
        <div>
            Filter names containing <input onChange={props.handleFilterChange} />
        </div>
    )
}

export default Filter
