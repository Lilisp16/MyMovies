import React from 'react';

export const ContactModal = ({ show, handleClose }) => {
    return (
        <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-content">
            <div className='titulo-contact'>
               <h2>Informacion de Contacto</h2></div>
                
                <p>Nombre: Lili Sanz</p>
                <p>Email: lil@outlook.com</p>
                <p>WhatsApp: 3218454337</p>

                <span className="close" onClick={handleClose}>&times;</span>
            </div>
        </div>
    );
}
