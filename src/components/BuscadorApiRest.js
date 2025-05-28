import React from 'react';

export const BuscadorApiRest = ({ searchTerm, setSearchTerm, searchMovies }) => {
    return (
        <form className='buscarapi' onSubmit={searchMovies}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Nombre de pelicula"
                />
                <button type="submit">Buscar</button>
            </form>
    );
};
