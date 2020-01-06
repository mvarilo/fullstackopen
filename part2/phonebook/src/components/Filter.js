import React from 'react'

const Filter = ({ handleSearchName }) => {
    return (
        <p>
            Filter show with&nbsp;
            <input onChange={handleSearchName} />
        </p>
    )
}

export default Filter