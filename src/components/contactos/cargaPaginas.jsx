




function Contacto({item}) {
 if(item===undefined){
  item=JSON.parse(localStorage.items)
 }

  return (
    <div className='contacts' id={item.id} key={item.id}>
    <h2 title={item.nombre + ', ' + item.apellido}>{item.nombre + ', ' + item.apellido} </h2>
    <div><span>&#x1F4F1;  : </span><p><strong>{item.movil}</strong></p></div>
    <div><span>&#x1F4DE; : </span><p><strong> {item.numeroFijo}</strong></p></div>
    <div><span>&#x1F3E0; : </span><p><strong>{item.dirección}</strong></p></div>
    <div><span>&#x1F3E2;  : </span><p><strong>{item.numJob}</strong></p></div>
   
    </div>
  );
}
function Contactos({item, onEdit}) {
  if(item===undefined){
    item=JSON.parse(localStorage.items)
   }

  return (
    <div className='contacts' id={item.id} key={item.id}>
    <h2 onClick={() => onEdit(item.id)} title={item.nombre + ', ' + item.apellido}>{item.nombre + ', ' + item.apellido} </h2>
    
  </div>
  );
}

export  {
  Contactos,
  Contacto,
};


