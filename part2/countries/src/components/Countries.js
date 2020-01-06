import React from 'react'

const Countries = ({ countries }) => {
    if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    if (countries.length === 1) {
        return (
            <>
                {countries.map(country => (
                    <div key={country.name}>
                        <h2>{country.name}</h2>
                        <p>capital {country.capital}</p>
                        <p>population {country.population}</p>
                        <h2>languages</h2>
                        {country.languages.map(language => (
                            <li key={language.name}>{language.name}</li>
                        ))}
                        <p><img src={country.flag} height="150" alt={`${country.name} flag`} /></p>
                    </div>
                ))}
            </>
        )
    }

    return (
        <>
            {countries.map(country => (
                <p key={country.name}>
                    {country.name} {country.number}
                </p>
            ))}
        </>
    );
}

export default Countries