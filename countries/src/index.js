import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Filter = props => {
  return (
    <form>
      Filter countries using <input onChange={props.handleFilter} />
    </form>
  )
}

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({
    location: { name: "loading" },
    current: {
      weather_icons: "",
      temperature: "loading",
      weather_descriptions: "loading",
      wind_speed: "loading",
      wind_dir: "loading"
    }
  })

  useEffect(() => {
    axios
      //.get('http://localhost:3001/booger')
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
  }, [])
  return (
    <div>
      <h3>Weather in {weather.location.name}</h3>
      <div>
        <b>Temperature:</b> {weather.current.temperature} Celsius
      </div>
      <div>
        <img src={weather.current.weather_icons} alt={weather.current.weather_descriptions[0]} />
      </div>
      <div>
        <b>Wind:</b> {weather.current.wind_speed} kph {weather.current.wind_dir}
      </div>
    </div>
  )
}

const Display = ({ showCountries, clickCountryHandler, weather }) => {
  if (showCountries.length === 1) {
    const country = showCountries[0]
    return (
      <div key={country.name}>
        <h1>{country.name}</h1>
        <p><b>Capital:</b> {country.capital}<br />
          <b>Population:</b> {country.population}</p>

        <h3>Languages</h3>
        <ul>
          {country.languages.map(language => {
            return (
              <li key={language.name}> {language.name}</li>)
          }
          )
          }
        </ul>
        <div>
          <img src={country.flag} height="100" alt="Flag of {country.name}" />
        </div>

        <Weather city={country.capital} />


      </div>
    )
  }
  else if (showCountries.length > 10) {
    return (<div>Too many results, add more filter!</div>)
  }
  else {
    return (
      showCountries.map(country => {
        return (
          <div key={country.name}>{country.name}
            <button onClick={() => clickCountryHandler(country.name)}>show</button>
          </div>
        )
      }
      )
    )
  }
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        setShowCountries(response.data)
      })
  }, [])


  const handleFilter = event => {
    const filter = event.target.value.toLowerCase()
    const filteredCountries = countries.filter(country =>
      country.name.toLowerCase().includes(filter))
    setShowCountries(filteredCountries)
  }

  const clickCountryHandler = clickedCountry => {
    const selectedCountry = countries.filter(country => country.name === clickedCountry)
    setShowCountries(selectedCountry)
  }

  return (
    <div>
      <Filter handleFilter={handleFilter} />

      <Display showCountries={showCountries} clickCountryHandler={clickCountryHandler} />

    </div>
  )

}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
