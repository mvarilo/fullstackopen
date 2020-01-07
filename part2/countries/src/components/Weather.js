import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ weather }) => {
    console.log('we', weather)
    if (!weather) {
        return null
    }
    const { location, current } = weather

    return (
        <div>
            <h3>Weather in {location.name}</h3>
            <p><strong>temperature:</strong> {current.temperature}°C</p>
            <img src={current.weather_icons} alt={current.weather_descriptions} title={current.weather_descriptions} />
            <p><strong>wind:</strong>{current.wind_speed} kph direction {current.wind_dir}</p>
        </div>
    )
}

export default Weather