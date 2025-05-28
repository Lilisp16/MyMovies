import React, { useState } from 'react'
import { GuardarEnStorage } from '../helpers/GuardarEnStorage';

export const Crear = ({setListadoState}) => {
    const tituloComponente = "Añadir pelicula";


    const [ peliState, setPeliState ] = useState({
        titulo: "",
        descripcion: "",
        trailer: "", // Campo para el enlace del tráiler
        link: "" // Campo para el enlace de la película
    });

    const {titulo, descripcion} = peliState;
      
    
    const conseguirDatosForm = e => {
        e.preventDefault();

          // Eliminar "pelis" de localStorage antes de agregar una nueva película
        //  localStorage.removeItem("pelis");

        //Conseguir datos del formulario 
        let target = e.target;
        let titulo = target.titulo.value;
        let descripcion = target.descripcion.value;
        let trailer = target.trailer.value; // Obtener el enlace del tráiler
        let link = target.link.value; // Obtener el enlace de la película

         //CREAR OBJETO DE LA PELICULA A GUARDAR
         let peli = {
            id: new Date().getTime(),
            titulo,
            descripcion,
            trailer, // Agregar el tráiler
            link // Agregar el enlace
        };

        //Guardar estado
        setPeliState(peli);

        //actualizar el estado del listado principal
        setListadoState(elementos => {
          return [...elementos, peli];
        });

        //Guardar en el almacenamiento local
        GuardarEnStorage("pelis", peli);
        //GuardarEnStorage("copia_datos", peli);

        // Limpiar los campos del formulario después de guardar
        e.target.reset();  // <--- Esta es la línea nueva
        

    }

        


  return (
    <div className="add" >
        <h3 className="title">{tituloComponente}</h3>
        <strong>
                {(titulo && descripcion) && "Has creado la pelicula: "+titulo}
        </strong>
        
       
        <form onSubmit={conseguirDatosForm}>

            <input 
                    type="text" 
                    id="trailer" 
                    name="trailer" 
                    placeholder="Enlace del tráiler de YouTube" 
                    required />

            <input type="text" 
                   id="titulo"
                   name="titulo"
                   placeholder="Titulo"/>

            <textarea 
                     id="descripcion"
                     name="descripcion"
                     placeholder="Descripcion"></textarea>
            
            <input className='linkvideo'
                    type="text" 
                    id="link" 
                    name="link" 
                    placeholder="Enlace de la película recomendada" 
                    required />
            
            <input type="submit"
                   id="save"
                   value="Guardar"/>
        </form>
    </div>
  )
}
