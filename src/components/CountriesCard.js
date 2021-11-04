import './CountriesCard.css'
import {useState, useEffect} from 'react'

function CountriesCard({ data }){
    const [showCurrencies, setShowcurrencies] = useState(false)

    const toggleCurrencies = ()=>{

      setShowcurrencies(!showCurrencies)
    }

    return(
      <div className="Countries_Card" onClick={() => toggleCurrencies()}>
        <div className="Countries_Top_Row">
          <h3 data-testid="Country_Name" id="Top_Row_Name">{`${data.name}`}</h3>
          <h4 data-testid="Country_Region" id="Top_Row_Region">{`${data.region}`}</h4>
          <h4>{showCurrencies ? "Hide Currencies" : "Show Currencies"}</h4>
        </div>
        {data.currencies[0] ?
          <div className={showCurrencies ? "Show_Countries_Currencies_Container" : "Hide_Countries_Currencies_Container"}>
            <h3>Currencies:</h3>
            <div className="Countries_Currencies_Row">
              <p>Code: {data.currencies[0].code}</p>
              <p>Name: {data.currencies[0].name}</p>
              <p>Symbol: {data.currencies[0].symbol}</p>
            </div>
          </div>
          :
          <div className={showCurrencies ? "Show_Countries_Currencies_Container" : "Hide_Countries_Currencies_Container"}>
            Data Undefined
          </div>
        }
      </div>
    )
}

export default CountriesCard
