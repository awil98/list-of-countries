export const serverCall = async () =>{

  try{
    let promise = await fetch('https://restcountries.com/v2/all?fields=name,region,currencies')
    let arr = await promise.json()
    return arr
  }catch(e){
    return []
  }

}
