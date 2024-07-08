import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { MODIFY_MOVIE, GET_MOVIES } from '../graphql/movieQueries';
import { GET_REALISATORS } from '../graphql/realisatorQueries';

const ModifyMovieForm = () => {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [title, setTitle] = useState('');
  const [selectedRealisators, setSelectedRealisators] = useState([]);
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');

  const { loading: realisatorsLoading, error: realisatorsError, data: realisatorsData } = useQuery(GET_REALISATORS);
  const { loading: moviesLoading, error: moviesError, data: moviesData } = useQuery(GET_MOVIES);
  const [modifyMovie] = useMutation(MODIFY_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }],
  });
  
  useEffect(() => {
    if (!moviesLoading && moviesData) {
      setMovies(moviesData.movies);
    }
    if (!realisatorsLoading && realisatorsData) {
      setRealisators(realisatorsData.realisators);
    }
  }, [moviesLoading, moviesData, realisatorsLoading, realisatorsData]);

  const [movies, setMovies] = useState([]);
  const [realisators, setRealisators] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await modifyMovie({
        variables: {
          findTitle: selectedMovie,
          title,
          realisators: selectedRealisators.map(realisator => ({
            firstname: realisator.firstname,
            lastname: realisator.lastname,
            birthdate: realisator.birthdate
          })),
          year,
          genre
        }
      });
      console.log('Movie modified:', data.modifyMovie);
      // Reset form fields after modification
      setSelectedMovie('');
      setTitle('');
      setSelectedRealisators([]);
      setYear('');
      setGenre('');
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

  const handleRealisatorSelect = (index, realisator) => {
    const newSelectedRealisators = [...selectedRealisators];
    newSelectedRealisators[index] = realisator;
    setSelectedRealisators(newSelectedRealisators);
  };

  const addRealisatorField = () => {
    setSelectedRealisators([...selectedRealisators, { firstname: '', lastname: '', birthdate: '' }]);
  };

  const removeRealisatorField = (index) => {
    const newSelectedRealisators = selectedRealisators.filter((_, i) => i !== index);
    setSelectedRealisators(newSelectedRealisators);
  };

  if (realisatorsLoading || moviesLoading) return <p>Loading...</p>;
  if (realisatorsError) return <p>Error when loading realisators: {realisatorsError.message}</p>;
  if (moviesError) return <p>Error when loading movies: {moviesError.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Movie:
        <select
          value={selectedMovie}
          onChange={(e) => {
            const selected = movies.find(m => m.title === e.target.value);
            setSelectedMovie(selected.title);
            setTitle(selected.title);
            setSelectedRealisators(selected.realisators);
            setYear(selected.year);
            setGenre(selected.genre);
          }}
          required
        >
          <option value="">Select a Movie</option>
          {movies.map((m, i) => (
            <option key={i} value={m.title}>
              {m.title}
            </option>
          ))}
        </select>
      </label>
      <label>
        New Movie title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Year:
        <input type="number" min="1900" max="2099" step="1" value={year} onChange={(e) => setYear(e.target.value)} required />
      </label>
      <label>
        Genre:
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      </label>
      {selectedRealisators.map((realisator, index) => (
        <div key={index}>
          <label>
            Select a Realisator:
            <select
              value={`${realisator.firstname} ${realisator.lastname}`}
              onChange={(e) => {
                const selected = realisators.find(a => `${a.firstname} ${a.lastname}` === e.target.value);
                handleRealisatorSelect(index, selected);
              }}
            >
              <option value="">Select a Realisator</option>
              {realisators.map((a, i) => (
                <option key={i} value={`${a.firstname} ${a.lastname}`}>
                  {a.firstname} {a.lastname}
                </option>
              ))}
            </select>
          </label>
          {realisator.firstname && (
            <div>
              <p>Firstname: {realisator.firstname}</p>
              <p>Lastname: {realisator.lastname}</p>
              <p>Date of birth: {realisator.birthdate}</p>
            </div>
          )}
          <button type="button" onClick={() => removeRealisatorField(index)}>Delete Realisator</button>
        </div>
      ))}
      <button type="button" onClick={addRealisatorField}>Add a Realisator</button>
      <button type="submit">Modify Movie</button>
    </form>
  );
};

export default ModifyMovieForm;
