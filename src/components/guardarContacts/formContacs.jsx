//importaciones y algunas variables
import React, { useState, useEffect } from 'react';
import {data} from '../localStorage/data.jsx'
import './estilo.css'
const cuerpoContactos={
  id: '', 
  nombre: '', 
  apellido: '', 
  movil: '',
  numeroFijo: '',
  dirección: '',
  numJob:'',
};


//Sistema para crear con formulario un contacto   

function CrearContacto({useMy,useMy2,useMy3}) {

  const [items, setItems] = useState(data() || []);
  const [nuevoItem, setNuevoItem] = useState(cuerpoContactos);

  const handleChange = (e) => {
   
    setNuevoItem({
      ...nuevoItem,
      [e.target.name]: e.target.value,
      
    });
   
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    
    if(Object.values(nuevoItem).slice(1).indexOf('')!=-1){
   
     alert('Falta cargar datos')
      
  }else{
 
    for(const a in nuevoItem){
     
        if(nuevoItem[a].replaceAll(' ','')==''){
        nuevoItem[a]='indefinido'
    }}
    nuevoItem.id=document.lastModified.replaceAll(':','').replaceAll('/','').replaceAll(' ','')
 
    setItems([...items, nuevoItem]);
   
    setNuevoItem(cuerpoContactos);
    
  };  

 document.getElementById('indice').getElementsByTagName('input')[0].max=useMy3;
 document.getElementById('indice').getElementsByTagName('input')[0].value=useMy3;
}

useEffect(() => {
  
  localStorage.setItem('items', JSON.stringify(items));
}, [items]);

  return (
    
    <form className={useMy2}
     id='existForm' onSubmit={handleSubmit}>
      <input name="nombre" value={nuevoItem.nombre} onChange={handleChange} placeholder="Nombre" />
      <input name="apellido" value={nuevoItem.apellido} onChange={handleChange} placeholder="Apellido" />
      <input name="movil" value={nuevoItem.movil} onChange={handleChange} placeholder="Móvil" />
      <input name="numeroFijo" value={nuevoItem.numeroFijo} onChange={handleChange} placeholder="Número Fijo" />
      <input name="dirección" value={nuevoItem.dirección} onChange={handleChange} placeholder="Dirección" />
      <input name="numJob" value={nuevoItem.numJob} onChange={handleChange} placeholder="Número Trabajo" />
      {useMy}
    </form>
  );
}
function EliminarContacto({useMy,useMy2}){

  const [items, setItems] = useState(data() || []);
  
  const deleting = (ids) => {
    let index = items.findIndex(x => x.id === ids);
   
    if (index !== -1) {
      if (window.confirm("¿Estás seguro de que quieres eliminar este contacto?")) {
        let newArrayDirectorio = [...items];
        newArrayDirectorio.splice(index, 1);
        setItems(newArrayDirectorio);
        localStorage.items=JSON.stringify(newArrayDirectorio)
      }
    }
  } 

  const handleSubmit = (e) => {

    e.preventDefault();
    deleting(useMy2)
    document.getElementById('indice').getElementsByTagName('input')[0].value=1;
    setItems(data())
  };  


 

useEffect(()=>{
  setItems
},[items]
)

    return(
      <form id='existForm2' onSubmit={handleSubmit} >
     {useMy}
      </form>
    )
}
function EditarContacto({useMy,useMy2,useMy3}){
 
  const [items, setItems] = useState(data() || []);
  const [nuevoItem, setNuevoItem] = useState(cuerpoContactos);
  const handleChange = (e) => {
   
    setNuevoItem({
      ...nuevoItem,
      [e.target.name]: e.target.value,
      
    });
   
  };
  const editContact = (ids) => {
    let index = items.findIndex(x => x.id === ids);
    if (index !== -1) {
    
        let newArrayDirectorio = [...items];
        return newArrayDirectorio[index]
      
             
    }
  } 

  const handleSubmit = (e) => {

    e.preventDefault();
        
    
  
    for(const a in nuevoItem){
      if(a=='id'){
        nuevoItem[a]=editContact(useMy3)[a];
      }
    
        if(nuevoItem[a]==''){
     
        nuevoItem[a]=editContact(useMy3)[a];
    }}

    if (window.confirm(`¿Estás seguro de que quieres Editar este contacto?`)) {
     
      items[items.findIndex(x => x.id === useMy3)]=nuevoItem
      localStorage.items=JSON.stringify(items)
      setItems(items)
    }
    
    

    
    
  };  



useEffect(()=>{
  setItems
},[items]
)

    return(
      
    <form className={useMy2}
    id='existForm' onSubmit={handleSubmit}>
     <input name="nombre" value={nuevoItem.nombre} onChange={handleChange} placeholder="Nombre" />
     <input name="apellido" value={nuevoItem.apellido} onChange={handleChange} placeholder="Apellido" />
     <input name="movil" value={nuevoItem.movil} onChange={handleChange} placeholder="Móvil" />
     <input name="numeroFijo" value={nuevoItem.numeroFijo} onChange={handleChange} placeholder="Número Fijo" />
     <input name="dirección" value={nuevoItem.dirección} onChange={handleChange} placeholder="Dirección" />
     <input name="numJob" value={nuevoItem.numJob} onChange={handleChange} placeholder="Número Trabajo" />
     {useMy}
   </form>
    )
}
export {
  CrearContacto,
  EliminarContacto,
  EditarContacto,
};
