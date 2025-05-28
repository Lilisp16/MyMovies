import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const ApiRest = ({ setListadoState }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [providers, setProviders] = useState({}); // Estado para almacenar los proveedores
    const API_KEY = '6143f75f3c16e93e2dc9fdc486e389ab';
    const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTQzZjc1ZjNjMTZlOTNlMmRjOWZkYzQ4NmUzODlhYiIsIm5iZiI6MTcyNzg5MTE1My43MjkyODMsInN1YiI6IjY2ZmNiODY5MjViNjFjMzNkYTU5NDRiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pj_kaT6mJtsF6m-p525Eubg4QpN-jpBJUcLIzaAsO4Y';
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

    useEffect(() => {
        const fetchMovies = async () => {
            const currentDate = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD
            const startYear = 2022;

            try {
                const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                    params: {
                        api_key: API_KEY,
                        sort_by: 'vote_average.desc',
                        'release_date.gte': `${startYear}-01-01`,
                        'release_date.lte': currentDate,
                        page: 1,
                    },
                });

                setMovies(response.data.results.slice(0, 20)); // Limitar a las mejores 20 películas
                setListadoState(response.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [setListadoState, API_KEY, TOKEN]);

    // Función para buscar películas por nombre
    const searchMovies = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
                params: {
                    api_key: API_KEY,
                    query: searchTerm, // Usar el término de búsqueda
                 
                },
            });

            setMovies(response.data.results); // Establecer las películas encontradas
            setListadoState(response.data.results);
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    };

    // Función para obtener proveedores de visualización
    const getWatchProviders = async (movieId) => {
        try {
            console.log(`Buscando proveedores para la película con ID: ${movieId}`);
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
                params: {
                    api_key: API_KEY,
                },
            });
            console.log(response.data.results); // Imprimir los resultados para depuración
            const providerData = response.data.results?.US; // Obtener los proveedores para Estados Unidos
            if (providerData) {
                setProviders((prevProviders) => ({
                    ...prevProviders,
                    [movieId]: providerData,
                }));
                console.log(`Proveedores encontrados para la película ${movieId}:`, providerData);
            } else {
                console.log("No hay proveedores disponibles para esta película.");
            }
        } catch (error) {
            console.error('Error fetching watch providers:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Mejores Películas (2022-2024)</h1>

            {/* Formulario de búsqueda */}
            <form className='buscarapi' onSubmit={searchMovies}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Nombre de pelicula"
                />
                <button type="submit">Buscar</button>
            </form>

            <div className="movie-container">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <img src={ movie.poster_path
                            ?`${IMAGE_BASE_URL}${movie.poster_path}`: '/img/default-poster.jpg'} alt={movie.title} className="movie-image" />
                        <div className="movie-title">{movie.title}</div>
                        <div className="movie-rating">Puntuación: {movie.vote_average}</div>

                        {/* Botón para obtener proveedores de visualización */}
                        <div className="watch-providers">
                        <button onClick={(e) => { e.preventDefault(); getWatchProviders(movie.id); }}>
                                Plataformas
                            </button>
                            {providers[movie.id] && providers[movie.id].flatrate ? (
                                <div>
                                    <h4>Disponible en:</h4>
                                    <ul>
                                        {providers[movie.id].flatrate.map((provider) => (
                                            <li key={provider.provider_id}>
                                                {provider.provider_name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p>No hay plataformas disponibles</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
