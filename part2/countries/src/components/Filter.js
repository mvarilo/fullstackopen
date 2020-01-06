import React from 'react'

const Filter = ({ handleSearchName }) => {

    return (
        <p>
            find countries&nbsp;
            <input onChange={handleSearchName} />
        </p>
    )
}

export default Filter