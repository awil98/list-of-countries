import './App.css';
import {useState, useEffect} from 'react'
import CountriesCard from './components/CountriesCard.js'
import TrieNode from './utils/TrieNode.js'
import { serverCall } from "./utils/service.js"
import { generateSolution } from "./utils/dfsTrie.js"

function App() {
  const [userInput, setUserInput] = useState("")
  const [showCurrencies, setShowcurrencies] = useState(false)
  const [countries, setCountries] = useState([]) //stores the countries that match a given prefix
  const [rootNode, setRootNode] = useState(new TrieNode)
  const [hashMap, setHashMap] = useState({})
  const [loading, setIsLoading] = useState(true)


  const loadCountriesIntoState = async () => {

    /*
     loop through all data objects and add them to the countries array so they can be seen
     also add them to a hashMap so to achieve constant lookup of data object
    */
    let promise = serverCall()
    let listOfCountries = await promise

    let obj = {}

    for(let i = 0; i < listOfCountries.length; i++){
      obj[listOfCountries[i].name] = listOfCountries[i]
    }

    setCountries(listOfCountries)
    setHashMap({...obj})
    setIsLoading(false)
  }

  const loadCountriesIntoTrie = () => {
   //Loop through every character in each word to add each country to the trie

   for(let i = 0; i < countries.length; i++){

     let current = rootNode

     for(let j = 0; j < countries[i].name.length; j++){
      //check if the current character is in the current nodes map
       if(!(countries[i].name[j] in current.map)){

         //if it isn't add it
         current.map[countries[i].name[j]] = new TrieNode()
       }
       //move to the newly created node
       current = current.map[countries[i].name[j]]
     }

     //mark the current node equal to a end of word
     current.endOfWord = true
   }

 }

  const updateCountries = (e) =>{

    setUserInput(e.target.value)
    let typedCountry = e.target.value

    //advance through all of the valid nodes
    let counter = 0
    let current = rootNode

    let noWord = false

    while(counter < typedCountry.length){
      if(!(typedCountry[counter] in current.map)){
        noWord = true
        break;
      }
      current = current.map[typedCountry[counter++]]
    }

    //If there isn't a word with a given prefix in the trie then render no countries
    if(noWord){
      setCountries([])
      return
    }

    let results = []

    //perform a depth first search to find all of the valid countries
    generateSolution(results, current, typedCountry)

    let newListOfCountries = []

    for(let i = 0; i < results.length; i++){
      newListOfCountries.push(hashMap[results[i]])
    }

    setCountries([...newListOfCountries])
  }



  useEffect(()=>{
      //wait for change in countries so that trie isn't initalized with an empty array
      loadCountriesIntoTrie()
  },[countries])

  useEffect(()=>{
    loadCountriesIntoState()
  },[])

  return (
    <div className="App">
      <h1>Countries:</h1>
      <p>Enter in countries below to update the shown list.</p>
      <input type="text" value={userInput} onChange={updateCountries} data-testid="country-input"/>
      {loading ?
          <div>loading...</div>
        :
          countries.map((ele) => {
            return(
              <CountriesCard data={ele} key={ele.name}/>
            )
      })}
    </div>
  );
}

export default App;
