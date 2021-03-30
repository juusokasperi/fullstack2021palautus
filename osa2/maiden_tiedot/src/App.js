import React, {useState, useEffect} from 'react'
import axios from 'axios'

const SearchFilter = ({searchFilter, handleFilterChange}) => {
  return(
    <form>
      <div>
        find countries <input value={searchFilter} onChange={handleFilterChange} />
      </div>
    </form>
  )
}

const Search = ({countries, searchFilter, setSearchFilter}) => {
  const filteredList = countries.filter(country => country.name.toLowerCase().includes(searchFilter.toLowerCase()))
  if (searchFilter === '') {
    return ('Search from the form above.')
  } else if (filteredList.length > 10) {
    return ('Too many matches, specify another filter')
  } else if (filteredList.length > 1) {
    return (
      filteredList.map(country => <ListedCountry key={country.numericCode} country={country} setSearchFilter={setSearchFilter}/>)
    )
  } else if (filteredList.length === 1) {
    return <Country 
              country={filteredList[0]} 
            />
  } else {
    return ("Nothing found with current parameters.")
  }
}

const ListedCountry = ({country, setSearchFilter}) => (
  <div>
    {country.name}
    <button onClick={() => setSearchFilter(country.name)}>
      show
    </button>
  </div>
)

const Country = ({country, weather, setWeather}) => {

  return (
    <div>
      <h1>{country.name}</h1>
      <p>
        capital {country.capital}<br />
        population {country.population}
      </p>
      <h2>languages</h2>
      {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}

      <p><img src={country.flag} width='20%' height='20%' alt='Country Flag'/></p>

      <h2>weather in {country.capital}</h2>

      <Weather city={country.capital} />
    </div>
  )
}

const Weather = ({city}) => {
  const [isLoading, setLoading] = useState(true)
  const [weather, setWeather] = useState({location:{}, current:{}})

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
    .then(response => {
      setWeather(response.data)
      setLoading(false)
    })
  }, [city])

  if (isLoading) {
    return <></>
  }

  return (
      <div>
        <p><b>temperature:</b> {weather.current.temperature} Celcius</p>
        <p><img src={weather.current.weather_icons[0]} alt='Weather Icon'/></p>
        <p><b>wind:</b> {weather.current.wind_speed} mph {weather.current.wind_dir}</p>
      </div>
      )
    }

const App = () => {
  //States:
  const [countries, setCountries] = useState([])
  const [searchFilter, setSearchFilter] = useState('')

  //Haetaan maatiedot:
  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  },[])

  // Handlers:
  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value)
  }

  return (
    <div>
      <SearchFilter
        searchFilter={searchFilter}
        handleFilterChange={handleFilterChange}
      />

      <Search
        countries={countries}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />

    </div>
  )

}

export default App;