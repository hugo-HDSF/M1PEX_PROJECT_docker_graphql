import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_SAGA, GET_SAGAS} from '../graphql/sagaQueries';
import { GET_MOVIES } from '../graphql/movieQueries';

const AddSagaForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMovies, setSelectedMovies] = useState([]);

  const { loading: moviesLoading, error: moviesError, data: moviesData } = useQuery(GET_MOVIES);

  const [addSagas] = useMutation(ADD_SAGA, {
    update(cache, { data: { addSagas } }) {
      const { sagas } = cache.readQuery({ query: GET_SAGAS });
      cache.writeQuery({
        query: GET_MOVIES,
        data: { sagas: [...sagas, addSagas] },
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addSagas({
        variables: {
          title,
          description,
          movies: selectedMovies.map(movie => ({ title: movie.title }))
        },
      });
      console.log('Saga added:', data.addSagas);
      // Réinitialiser les champs du formulaire après l'ajout
      setTitle('');
      setDescription('');
      setSelectedMovies([]);
    } catch (error) {
      console.error('Error when adding Saga:', error);
    }
  };

  const handleMovieSelect = (index, movie) => {
    const newSelectedMovies = [...selectedMovies];
    newSelectedMovies[index] = movie;
    setSelectedMovies(newSelectedMovies);
  };
  
  const addMovieField = () => {
    setSelectedMovies([...selectedMovies, { firstname: '', lastname: '', birthdate: '' }]);
  };

  const removeMovieField = (index) => {
    const newSelectedMovies = [...selectedMovies];
    newSelectedMovies.splice(index, 1);
    setSelectedMovies(newSelectedMovies);
  };

  if (moviesLoading) return <p>Loading...</p>;
  if (moviesError) return <p>Error when loading: {moviesError.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      {selectedMovies.map((movie, index) => (
        <div key={index}>
          <label>
            Select a Movie:
            <select
              value={movie.title}
              onChange={(e) => {
                const selected = moviesData.movies.find(m => m.title === e.target.value);
                handleMovieSelect(index, selected);
              }}
            >
              <option value="">Select a Movie</option>
              {moviesData.movies.map((m, i) => (
                <option key={i} value={m.title}>
                  {m.title}
                </option>
              ))}
            </select>
          </label>
          {movie.title && (
            <div>
              <p>Movie Title: {movie.title}</p>
            </div>
          )}
          <button type="button" onClick={() => removeMovieField(index)}>Delete Movie</button>
        </div>
      ))}
      <button type="button" onClick={addMovieField}>Add a Movie</button>
      <button type="submit">Add Saga</button>
    </form>
  );
};

export default AddSagaForm;
