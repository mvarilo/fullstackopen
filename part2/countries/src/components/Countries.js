import React, { useEffect, useState } from 'react'
import Country from './Country'

const Countries = ({ countries, handleShow, matches }) => {

    if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }


    if (countries.length === 1) {
        return (
            <>
                {countries.map(country => (
                    <Country country={country} />
                ))}
            </>
        )
    }

    return (
        <>
            {countries.map(country => (
                <p key={country.name}>
                    {country.name} {country.number}
                    <button onClick={() => handleShow(country)}>show</button>
                </p>
            ))}
        </>
    );
}

export default Countries