import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_MOVIES } from '../graphql/movieQueries';
import './PageStyles.css'; // Fichier de style CSS

const MoviesPage = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="page-container">
      <h1>Movies list</h1>
      <div className="movies-list">
        {data.movies.map(movie => (
          <div key={movie.id} className="movie-item">
            <h2>{movie.title}</h2>
            <p>year: {movie.year}</p>
            <p>Genre: {movie.genre}</p>
            <p>Realisators:</p>
            <ul>
              {movie.realisators.map(realisator => (
                <li key={realisator.id}>{`${realisator.firstname} ${realisator.lastname}`}</li>
              ))}
            </ul>
            {/* Ajoutez d'autres détails selon les besoins */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
