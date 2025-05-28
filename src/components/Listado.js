import React, { useEffect, useState } from 'react'
import noDataImage from '../assets/urban-no-data-found-3.png'
import Editar from './Editar';


export const Listado = ({listadoState, setListadoState}) => {
  //const [listadoState, setListadoState] = useState([]);
  const [editar, setEditar] = useState(0);
  
  useEffect(() =>  {
    console.log("Componente de peliculas cargando ")
    conseguirPeliculas();

  }, []);



  const conseguirPeliculas = () => {
      let peliculas = JSON.parse(localStorage.getItem("pelis"));
       
      if (!peliculas || peliculas.length === 0) {

    // Si no hay datos en localStorage, cargar desde data.json
    fetch(`${process.env.PUBLIC_URL}/data.json`)
       .then(async res => {
        const text = await res.text();

        try {
          const data = JSON.parse(text);
          localStorage.setItem('pelis', JSON.stringify(data));
          setListadoState(data);
        } catch (err) {
          console.error("⚠️ Error al parsear data.json: no es JSON válido. Probablemente se recibió HTML (404)", err);
          console.error("Contenido recibido:", text);
          setListadoState([]);
        }
      })
      .catch(err => {
        console.error("Error al cargar data.json", err);
        setListadoState([]);
      });
  } else {
    setListadoState(peliculas);
  }

  return peliculas;
};






  const borrarPeli = (id) => {
       // Mostrar alerta de confirmación antes de eliminar
    if (window.confirm("Estás seguro que deseas borrar esta película❓")) {
        
      //consegir peliculas almacenadas
        let pelis_almacenadas = conseguirPeliculas();

        //Filtrar esas peliculas para que elimine  el array la que no quiero
        let nuevo_array_pelis = pelis_almacenadas.filter(peli => peli.id !== parseInt(id));

        //Actualizar estado del Listado
        setListadoState(nuevo_array_pelis);

        //Actualizar los datos en el localStorage
        localStorage.setItem('pelis', JSON.stringify(nuevo_array_pelis));
    }

  }


  return (
   <>
     {listadoState != null && listadoState.length > 0 ?
              listadoState.map(peli => (
          
                  <article key={peli.id} className="peli-item" >

                     {peli.trailer && (
                            <iframe
                            className="trailer"
                            src={`https://www.youtube.com/embed/${getYouTubeID(peli.trailer)}?controls=1`} // Aquí se agregan los controles
                            title="Tráiler"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            ></iframe>
                        )}

                      <h3 className="title"> {peli.titulo} </h3>
                      <p className="Descripcion" > {peli.descripcion} </p>

                      {peli.link && (
                            <a href={peli.link} target="_blank" rel="noopener noreferrer">Ver aquí</a>
                        )}
                      
                      {/* Botones para editar y borrar */}
                      <button className="edit" onClick={ () => setEditar(peli.id)}>Editar</button>
                      <button className="delete" onClick={ () => borrarPeli(peli.id)} >Borrar</button>
                      
                      {/*aparece formulario de editar*/}
                      {editar === peli.id && (

                       <Editar 
                       peli={peli} 
                       conseguirPeliculas={conseguirPeliculas}
                       setEditar={setEditar}
                       setListadoState={setListadoState}

                       />
                      )}
                
                </article>
      ))
     
      :<section className='mensaje'> 
      <div className="header2">
      <div className="logo3">
                <div className="play2"></div>
            </div>
            </div>
      <div className='small'> 
      <span className="highlight">Ups❗</span>
      <span className="normal"> Lo siento</span>
      </div>
     <p>No hay peliculas para mostrar</p>
     <img src={noDataImage} alt="No data found" />
     </section>
     
    }

    </>
  );
};

// Función para obtener el ID de YouTube
const getYouTubeID = (url) => {
  // eslint-disable-next-line no-useless-escape
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};