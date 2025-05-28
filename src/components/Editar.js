import React, { useState } from 'react'

const Editar = ({ peli, conseguirPeliculas, setEditar, setListadoState }) => {
    const titulo_componente = "Editar pelicula";

    const guardarEdicion = (e, id) => {
        e.preventDefault();
       
        // conseguir el targer del evento
        let target = e.target;

        //Bucar el indice del objeto de la pelicula a actualizar
        const pelis_almacenadas = conseguirPeliculas();
        const indice = pelis_almacenadas.findIndex(peli => peli.id === id);
        
        // crear objeto con ese indice, con titulo
        let peli_actualizada = {
            id,
            titulo: target.titulo.value,
            descripcion: target.descripcion.value,
            trailer: target.trailer.value, // Agregado
            link: target.link.value // Agregado
        };

        // Actualizar el elemento con ese indice
        pelis_almacenadas[indice] = peli_actualizada;

        // Guardar el nuevo array de objetos en el localstorage
        localStorage.setItem("pelis", JSON.stringify(pelis_almacenadas));

        // Actualizar estados
        setListadoState(pelis_almacenadas);
        setEditar(0);
    }



  return (
    <div className='edit_form'>
        <h3 className='title'>{titulo_componente}</h3>
        
        <form onSubmit={ e => guardarEdicion(e, peli.id)} >

            <input 
                    type="text" 
                    id="trailer" 
                    name="trailer" 
                    placeholder="Enlace del tráiler de YouTube" 
                    required 
                    defaultValue={peli.trailer}/>

            <input type="text" 
                   name="titulo" 
                   className="titulo_editado"
                   defaultValue={peli.titulo}/>
            <textarea
                    name='descripcion'
                    defaultValue={peli.descripcion}
                    className='descripcion_editada' />
            
            <input className='linkvideo'
                    type="text" 
                    id="link" 
                    name="link" 
                    placeholder="Enlace de la película recomendada" 
                    required 
                    defaultValue={peli.link}/>


            <input type='submit' className='editar' value='Actualizar'/>

           

        </form>

    </div>
  )
}

export default Editar