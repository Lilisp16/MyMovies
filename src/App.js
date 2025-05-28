import { useState } from "react";
import { Buscador } from "./components/Buscador";
import { Crear } from "./components/Crear";
import { Listado } from "./components/Listado";
import { ContactModal } from './components/ContactModal'; // Asegúrate de que la ruta sea correcta
import { ApiRest } from "./components/ApiRest"; // Importa el componente ApiRest
import logoEmp from './assets/byempresa.svg';
import marcaPersonal from './assets/marcapersonal-ls.svg';
import imgfooter from './assets/imgfooter.png';
import pop from './assets/pop.png';
import { BuscadorApiRest } from "./components/BuscadorApiRest";

import { Link } from 'react-router-dom';




function App() {

    const [listadoState, setListadoState] = useState([]);
     // MODAL Define el estado para controlar la visibilidad del modal
    const [showModal, setShowModal] = useState(false);
    // NUEVO: Estado para controlar qué contenido se muestra
    const [activeTab, setActiveTab] = useState('listado'); // Por defecto, muestra el listado

    

     // Función para abrir el modal
     const handleOpenModal = () => {
         setShowModal(true);
     };
 
     // Función para cerrar el modal
     const handleCloseModal = () => {
         setShowModal(false);
     };



  return (
    <div className="layout">
        {/*Cabecera*/}
        <header className="header" >
            <div className="logo">
                <div className="play"></div>
            </div>
            <h1>MyMovies</h1>
        </header>

        {/*Barra de Navegacion*/}
        <nav className="nav" >
             <ul>
                <li><Link to="/" onClick={() => setActiveTab('listado')}>Inicio</Link></li>
                <li><Link to="/peliculas" onClick={() => setActiveTab('peliculas')}>Peliculas</Link></li>
                <li> <a href="https://www.justwatch.com" target="_blank" rel="noopener noreferrer">Ver online</a></li>
                <li><a href="/#" onClick={handleOpenModal}>Contacto</a></li>
             </ul>
        </nav>

            {/*Contenido principal*/}
            <section id="content" className="content">

                {/* Cambia el contenido según activeTab */}
               
                {activeTab === 'peliculas' ? (
             <ApiRest setListadoState={setListadoState} />
            ) : (
            <Listado listadoState={listadoState} setListadoState={setListadoState} />
             )}

            </section>

            {/* Mostrar el aside solo si la vista activa es "listado" */}
            {activeTab === 'listado' && (
            <aside className="lateral">
                <Buscador listadoState={listadoState} setListadoState={setListadoState} /> 
                <Crear setListadoState={setListadoState}/>  
            </aside>
            )}


            {/* Modal de contacto */}
            <ContactModal show={showModal} handleClose={handleCloseModal} />

            {/*pie de pagina*/}

 <footer className="footer">
 
  <div className="footer-sections">
    <div className="platforms">
      <img className="imgfooter" src={imgfooter} alt="Imagen Footer" />
    </div>

    <div className="platforms">
      <h5 className="footer-heading">Plataformas de Suscripción</h5>
      <ul className="platforms-list">
        <li><a href="https://www.netflix.com" target="_blank">Netflix</a></li>
        <li><a href="https://www.primevideo.com" target="_blank">Amazon Prime Video</a></li>
        <li><a href="https://www.disneyplus.com" target="_blank">Disney+</a></li>
        <li><a href="https://www.hbomax.com" target="_blank">HBO Max</a></li>
      </ul>
    </div>

    <div className="platforms">
      <h5 className="footer-heading">Streaming gratuito con anuncios</h5>
      <ul className="free-platforms-list">
        <li><a href="https://www.runtime.tv/app" target="_blank">Runtime TV</a></li>
        <li><a href="https://www.viki.com/?locale=es" target="_blank">Viki</a></li>
        <li><a href="https://watch.plex.tv/es" target="_blank">Plex</a></li>
        <li><a href="https://pluto.tv/" target="_blank">Pluto TV</a></li>
      </ul>
    </div>

    <div className="platforms">
      <img className="imgfooter" src={pop} alt="Popcorn" />
    </div>
  </div>
 
  <div className="footer-content">
    <div className="copy">
      &copy; Todos los derechos reservados by Lili Sanchez
      <img className="marca-personal" src={marcaPersonal} alt="Marca Personal" />
    </div>
  </div>


</footer>

    </div>

    
  );
}

export default App;
