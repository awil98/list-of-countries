export const generateSolution = (results, current, validCountries) =>{
  //if the current word is a end of word then that means I've found a valid country
  if(current.endOfWord === true){
    results.push(validCountries)
  }


  //for each node get all of the nodes keys
  let keys = Object.keys(current.map)

  //perform a depth first search down each key's path
  for(let i = 0; i < keys.length; i++){
    generateSolution(results, current.map[keys[i]], validCountries + keys[i])
  }

}
