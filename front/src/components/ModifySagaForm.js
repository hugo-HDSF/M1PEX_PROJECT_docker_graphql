import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { MODIFY_SAGA, GET_SAGAS } from '../graphql/sagaQueries';
import { GET_MOVIES } from '../graphql/movieQueries';

const ModifySagaForm = () => {
  const [selectedSaga, setSelectedSaga] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMovies, setSelectedMovies] = useState([]);

  const { loading: sagasLoading, error: sagasError, data: sagasData } = useQuery(GET_SAGAS);
  const { loading: moviesLoading, error: moviesError, data: moviesData } = useQuery(GET_MOVIES);
  const [modifySaga] = useMutation(MODIFY_SAGA, {
    refetchQueries: [{ query: GET_SAGAS }],
  });

  useEffect(() => {
    if (!moviesLoading && moviesData) {
      setMovies(moviesData.movies);
    }
    if (!sagasLoading && sagasData) {
      setSagas(sagasData.sagas);
    }
  }, [moviesLoading, moviesData, sagasLoading, sagasData]);

  const [movies, setMovies] = useState([]);
  const [sagas, setSagas] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await modifySaga({
        variables: {
          findTitle: selectedSaga,
          title,
          description,
          movies: selectedMovies.map(movie => ({
            title: movie.title
          }))
        }
      });
      console.log('Saga modified:', data.modifySaga);
      // Reset form fields after modification
      setSelectedSaga('');
      setTitle('');
      setDescription('');
      setSelectedMovies([]);
    } catch (error) {
      console.error('Error when modifying Realisator:', error);
      if (error.networkError) {
        console.error('Network Error:', error.networkError);
      }
      if (error.graphQLErrors) {
        // biome-ignore lint/complexity/noForEach: <explanation>
        error.graphQLErrors.forEach(({ message, locations, path }) => {
          console.error(`GraphQL Error: Message: ${message}, Location: ${locations}, Path: ${path}`);
        });
      }
    }
  };

  const handleMovieSelect = (index, movie) => {
    const newSelectedMovies = [...selectedMovies];
    newSelectedMovies[index] = movie;
    setSelectedMovies(newSelectedMovies);
  };

  const addMovieField = () => {
    setSelectedMovies([...selectedMovies, { title: '' }]);
  };

  const removeMovieField = (index) => {
    const newSelectedMovies = selectedMovies.filter((_, i) => i !== index);
    setSelectedMovies(newSelectedMovies);
  };

  if (sagasLoading || moviesLoading) return <p>Loading...</p>;
  if (sagasError) return <p>Error when loading sagas: {sagasError.message}</p>;
  if (moviesError) return <p>Error when loading movies: {moviesError.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Saga:
        <select
          value={selectedSaga}
          onChange={(e) => {
            const selected = sagas.find(s => s.title === e.target.value);
            setSelectedSaga(selected.title);
            setTitle(selected.title);
            setDescription(selected.description);
            setSelectedMovies(selected.movies);
          }}
          required
        >
          <option value="">Select a Saga</option>
          {sagas.map((s, i) => (
            <option key={i} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </label>
      <label>
        New Saga Title:
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
                const selected = movies.find(m => m.title === e.target.value);
                handleMovieSelect(index, selected);
              }}
            >
              <option value="">Select a Movie</option>
              {movies.map((m, i) => (
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
      <button type="submit">Modify Saga</button>
    </form>
  );
};

export default ModifySagaForm;
