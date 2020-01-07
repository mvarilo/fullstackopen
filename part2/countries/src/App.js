import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([])
    const [searchName, setSearchName] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const countriesToShow = showAll
        ? countries
        : countries.filter(country => {
            let toFilter = country.name.toLocaleLowerCase();
            let toSearch = searchName.toLocaleLowerCase();
            return toFilter.includes(toSearch)
        }
        )

    const handleShow = (country) => {
        setSearchName(country.name)
    }

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
                handleShow={handleShow}
            />
        </div>
    )
}

export default App