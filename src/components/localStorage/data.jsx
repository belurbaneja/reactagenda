

function data() {
  let datos;

  if(localStorage.items==undefined){
    localStorage.items='[]';
    datos=JSON.parse(localStorage.items);
  }else{
    datos=JSON.parse(localStorage.items);
  }
  return datos;
}

export {
   data,
};