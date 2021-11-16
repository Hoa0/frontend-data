/**
 * @description Maak een object aan die telt hoevaak iets voorkomt
 * @param {Array} arr Array waar het moet tellen
 * @param {String} key key die het moet tellen
 * @returns 
 */
 export function findOcc(arr, key){
    let arr2 = []; 
    arr.forEach((x)=>{
       if(arr2.some((val)=>{ return val[key] == x[key] })){
         arr2.forEach((k)=>{
           if(k[key] === x[key]){ 
             k["aantal"]++
           }
        })
       }else{
         let a = {}
         a[key] = x[key]
         a["aantal"] = 1
         arr2.push(a);
       }
    })   
    return arr2
  }