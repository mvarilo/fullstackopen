import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([])
    const [searchName, setSearchName] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])
    console.log('render', countries.length, 'notes')

    const countriesToShow = showAll
        ? countries
        : countries.filter(country => {
            let toFilter = country.name.toLocaleLowerCase();
            let toSearch = searchName.toLocaleLowerCase();
            return toFilter.includes(toSearch)
        }
        )


    const handleSearchName = (event) => {
        console.log(event.target.value)
        setSearchName(event.target.value)
        setShowAll(false)
    }

    return (
        <div>
            <h2>Data for Countries</h2>

            <Filter
                handleSearchName={handleSearchName}
            />
            <div>debug: {searchName}</div>
            <Countries
                countries={countriesToShow}
            />
        </div>
    )
}

export default App