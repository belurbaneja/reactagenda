
import React, { useState, useEffect, useRef, createElement } from 'react';
import '../../components/main/estilo.css';
import { wordsAz } from '../../controlEventos/eventos.jsx';
import { Contactos, Contacto } from "../../components/contactos/cargaPaginas.jsx";
import { data } from "../../components/localStorage/data.jsx";
import { CrearContacto, EliminarContacto, EditarContacto } from '../guardarContacts/formContacs.jsx';

function Agenda() {
  const [datos, setDatos] = useState(data());
  let [page, setPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const InpNumb = useRef();
  const [loadingClass, setLoadingClass] = useState('collapsed');
  const [formVisible, setFormVisible] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [contactos, setContactos] = useState(datos);
  const [editingContact, setEditingContact] = useState(null);
  const [selectedValue, setSelectedValue] = useState("nombre");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);

  };




  const handleSaveClick = () => {
    const form = document.getElementsByTagName('form')[0]

    if (form != undefined) {
    
      for (const a of Object.values(form.getElementsByTagName('input'))) {
        if (a.value == '') { return   setLoadingClass('cartel');}
      }

      
    }
   
    setLoadingClass('cartel');


  };
  const handleDeleteClick=()=>{
    setLoadingClass('cartel');
    setDatos(data())
  }
  const handleDivClick = () => {
    setContactos(JSON.parse(localStorage.items))
    setDatos(data());

    setFormVisible(false);// Hide the form
    setLoadingClass('collapsed');

  };
  const handleNewClick = () => {
    
    setFormVisible(true); // Show the form
  };
  const valueNumb = () => {

    let indice;
    document.getElementById('indice') != undefined ? indice = document.getElementById('indice').getElementsByTagName('input')[0] : () => { return };

    (indice != undefined && indice.value == '') ? indice.value = 1 : false
  }

  const handleChange = (event) => {
    document.getElementById('indice').getElementsByTagName('input')[0].value = 1;
    setSelectedOption(event.target.value);

  };
  const handleIndiceChange = (event) => {


    let value;
    if (typeof Number(event.target.value) === 'number') {
      value = (event.target.value);
    }
    setPage(value);
    page = event.target.value

  };
  const pageLeng = () => {
    let filtroData = datos;
    if (InpNumb.current != undefined) {
      page = +InpNumb.current.value

    }
    if (busqueda === '') {
      if (selectedOption === null || 'offAll') {

        if (datos.length == 0) {
          return 1
        }
        return Math.ceil(datos.length / 10)
      } else if (selectedOption === 'All') {
        filtroData.sort((a, b) => a.nombre.localeCompare(b.nombre));

        if (datos.length == 0) {
          return 1
        }
        return Math.ceil(datos.length / 10)
      }

      if (selectedOption != 'All') {
        filtroData = datos.filter(c => c.nombre.toLocaleLowerCase().startsWith(selectedOption));

        if (filtroData.length == 0) {
          return 1
        }
        return Math.ceil(filtroData.length / 10)
      }
    }

    filtroData = filtroData.filter(item => item[selectedValue].toLowerCase().replaceAll(' ','').includes(busqueda.toLowerCase().replaceAll(' ','')));
    if (filtroData.length == 0) {
      return 1
    }
    return Math.ceil(filtroData.length / 10)

  };
  const handleStorageChange = () => {
    let filtroData = data();
    if (InpNumb.current != undefined) {
      page = +InpNumb.current.value

    }
    if (busqueda === '') {

      if (selectedOption === null || selectedOption === 'offAll') {
        return datos.slice((page - 1) * 10, page * 10).map(dato => <Contactos item={dato} onEdit={handleEditClick} />)
      } else if (selectedOption === 'All') {
        filtroData.sort((a, b) => a.nombre.localeCompare(b.nombre));
        return filtroData.slice((page - 1) * 10, page * 10).map(dato => <Contactos item={dato} onEdit={handleEditClick} />)
      }
      if (selectedOption != 'All') {
        filtroData = datos.filter(c => c.nombre.toLocaleLowerCase().startsWith(selectedOption));

        return filtroData.slice((page - 1) * 10, page * 10).map(dato => <Contactos item={dato} onEdit={handleEditClick} />)
      }
    }

    filtroData = filtroData.filter(item => item[selectedValue].toLowerCase().includes(busqueda.toLowerCase()));

    return filtroData.slice((page - 1) * 10, page * 10).map(dato => <Contactos item={dato} onEdit={handleEditClick} />)

  };

  const handleSearchChange = (event) => {

    setBusqueda(event.target.value)
  };


  const handleEditClick = (id) => {
    setEditingContact(id); // Establecer el contacto que se está editando
    setFormVisible(true); // Mostrar el formulario
  };

  const handleBackClick = () => {
    setEditingContact(null); // Borrar el contacto que se estaba editando
    setFormVisible(false); // Ocultar el formulario
  };

  useEffect(() => {
    
    valueNumb()
    handleStorageChange;

  }, [])
  return (
    <div className='mainX' >
      <div className='barra'>

        {!formVisible && [<button onClick={handleNewClick}>Nuevo Contacto</button>,
        <input type="text" value={busqueda} onChange={handleSearchChange} placeholder="Buscar..." />,
        <select onChange={handleSelectChange}>
          <option value="nombre">Nombre</option>
          <option value="apellido">Apellido</option>
          <option value="dirección">Direccion</option>
          <option value="numeroFijo">Telefono</option>
          <option value="movil">Celular</option>
          <option value="numJob">Telefono Trabajo</option>
        </select>]}
        {formVisible && <button onClick={handleBackClick}>Volver</button>}
      </div>
      {
        !formVisible && <section>
          {
            handleStorageChange()
          }
        </section>

      }

      {formVisible && editingContact && (
        [<Contacto item={contactos.find(c => c.id === editingContact)} />,
        <EliminarContacto useMy={<button onClick={handleDeleteClick} type='submit'>Eliminar</button>} useMy2={editingContact} />,
         <EditarContacto useMy2={'form'} useMy3={editingContact} useMy={<button onClick={handleSaveClick} type='submit'>Editar</button>} />

        ]

      )}
      <div className='allDir'>

        <label className={selectedOption === 'All' ? 'desplazar7' : ' '} key={'All'}>
          <input type="radio" name="opcion" value={'All'} onChange={handleChange} />
          All
          <input type="radio" id='offAll' key={'offAll'} name="opcion" value={'offAll'} onChange={handleChange} />
        </label>
      </div>
      <section className='guiaWors1'>
        <div className='guia'>{wordsAz('impar').map(words => (
          <label className={selectedOption === words ? 'desplazar7' : ' '} key={words}>
            <input type="radio" name="opcion" value={words} onChange={handleChange} />
            {words}
          </label>
        ))}
        </div>
      </section>
      <section className='guiaWors2'>
        <div className='guia'>{wordsAz('par').map(words => (
          <label className={selectedOption === words ? 'desplazar7' : ' '} key={words}>
            <input type="radio" name="opcion" value={words} onChange={handleChange} />
            {words}
          </label>
        ))}
        </div>
      </section>
      <span id='indice'><input ref={InpNumb} type="number" min={1} max={pageLeng()} name="" placeholder='1' key={"indiceCount"} onChange={handleIndiceChange} value={valueNumb()} /><p>de pagina {pageLeng()}</p> </span>
      {formVisible && !editingContact && [(
        <CrearContacto useMy2={'form'} useMy3={pageLeng()} useMy={<button onClick={handleSaveClick} type='submit'>Guardar</button>} />
      ),]}
      <div onClick={handleDivClick} className={loadingClass}>
        <p >Cargado</p>
      </div>
    </div>

  );
}

export default Agenda;
