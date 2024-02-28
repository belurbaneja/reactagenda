

const wordsAz = (y) => {
    let words = []
    const f = {
      par: (z) => { return z % 2 == 0 },
      impar: (z) => { return z % 2 != 0 },
      neutro: true,
    }
    for (let i = "a".charCodeAt(); i <= "z".charCodeAt(); ++i) {
      if (f[y](i)) {
        words.push(String.fromCharCode(i));
      }
    }
    return words
  }

let evalNum={
    tres:(a)=>{
      if(a<1){
       return 0
      }else{
        
        return (a-1)*3
      }
    }
  }
  
  
  

 
  export {
    wordsAz,
    

  }