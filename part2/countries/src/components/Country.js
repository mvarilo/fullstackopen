
import React, { useEffect, useState } from 'react'
import Weather from './Weather'
import axios from 'axios'

const Country = ({ country }) => {
    const [weather, setWeather] = useState(null);
    const API_KEY = `secret`

    const getWeather = () => {
        if (API_KEY !== 'secret') {
            axios
                .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country.capital}`)
                .then(response => {
                    setWeather(response.data)
                })
                .catch(
                    console.log(`Could not get weather data`)
                )
        }
    }

    const showWeather = () => {
        return (
            <Weather weather={weather} />
        )
    }

    useEffect(getWeather, [])

    return (
        <div key={country.name}>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            {country.languages.map(language => (<li key={language.name}>{language.name}</li>))}
            <p><img src={country.flag} height="150" alt={`${country.name} flag`} /></p>
            {weather ? showWeather() : null}
        </div>
    )
}


export default Country