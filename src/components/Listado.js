import React, { useEffect, useState } from 'react';
import noDataImage from '../assets/urban-no-data-found-3.png';
import Editar from './Editar';

export const Listado = ({ listadoState, setListadoState }) => {
  const [editar, setEditar] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    console.log("Componente de películas cargando...");
    conseguirPeliculas().finally(() => setCargando(false));
  }, []);

  const conseguirPeliculas = async () => {
    let peliculas = JSON.parse(localStorage.getItem("pelis"));

    if (!peliculas || peliculas.length === 0) {
      try {
        const res = await fetch(`${process.env.PUBLIC_URL}/data.json`);
        const data = await res.json();
        localStorage.setItem('pelis', JSON.stringify(data));
        setListadoState(data);
        return data;
      } catch (err) {
        console.error("Error al cargar data.json", err);
        setListadoState([]);
        return [];
      }
    } else {
      setListadoState(peliculas);
      return peliculas;
    }
  };

  const borrarPeli = async (id) => {
    if (window.confirm("¿Estás seguro que deseas borrar esta película❓")) {
      const pelis_almacenadas = await conseguirPeliculas();
      const nuevo_array_pelis = pelis_almacenadas.filter(peli => peli.id !== parseInt(id));
      setListadoState(nuevo_array_pelis);
      localStorage.setItem('pelis', JSON.stringify(nuevo_array_pelis));
    }
  };

  const getYouTubeID = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <>
      {cargando ? (
        <p>Cargando películas...</p>
      ) : listadoState != null && listadoState.length > 0 ? (
        listadoState.map(peli => (
          <article key={peli.id} className="peli-item">
            {peli.trailer && (
              <iframe
                className="trailer"
                src={`https://www.youtube.com/embed/${getYouTubeID(peli.trailer)}?controls=1`}
                title="Tráiler"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}

            <h3 className="title">{peli.titulo}</h3>
            <p className="Descripcion">{peli.descripcion}</p>

            {peli.link && (
              <a href={peli.link} target="_blank" rel="noopener noreferrer">
                Ver aquí
              </a>
            )}

            <button className="edit" onClick={() => setEditar(peli.id)}>Editar</button>
            <button className="delete" onClick={() => borrarPeli(peli.id)}>Borrar</button>

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
      ) : (
        <section className='mensaje'>
          <div className="header2">
            <div className="logo3">
              <div className="play2"></div>
            </div>
          </div>
          <div className='small'>
            <span className="highlight">Ups❗</span>
            <span className="normal"> Lo siento</span>
          </div>
          <p>No hay películas para mostrar</p>
          <img src={noDataImage} alt="No data found" />
        </section>
      )}
    </>
  );
};