import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_MOVIE, GET_MOVIES } from '../graphql/movieQueries';

const DeleteMovie = () => {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [deleteMovie] = useMutation(DELETE_MOVIE);

  const { loading, error, data, refetch } = useQuery(GET_MOVIES);

  useEffect(() => {
    if (data) {
      // Sélectionner le premier movie par défaut
      if (data.movies.length > 0) {
        setSelectedMovie(data.movies[0].title);
      }
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteMovie({ variables: { title: selectedMovie } });
      // Réinitialiser la sélection après la suppression
      await refetch(); // Rafraîchir les données des movies après la suppression
      if (data.movies.length > 1) {
        setSelectedMovie(data.movies[0].title);
      } else {
        setSelectedMovie('');
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Movie to delete :
        <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)} required>
          {data.movies.map((movie) => (
            <option key={movie.id} value={movie.title}>
              {movie.title}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Delete Movie</button>
    </form>
  );
};

export default DeleteMovie;
