import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_MOVIE, GET_MOVIES } from '../graphql/movieQueries';
import { GET_REALISATORS } from '../graphql/realisatorQueries';

const AddMovieForm = () => {
  const [title, setTitle] = useState('');
  const [selectedRealisators, setSelectedRealisators] = useState([]);
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');

  const { loading: realisatorsLoading, error: realisatorsError, data: realisatorsData } = useQuery(GET_REALISATORS);
  
  const [addMovie] = useMutation(ADD_MOVIE, {
    update(cache, { data: { addMovie } }) {
      const { movies } = cache.readQuery({ query: GET_MOVIES });
      cache.writeQuery({
        query: GET_MOVIES,
        data: { movies: [...movies, addMovie] },
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addMovie({
        variables: {
          title,
          year,
          genre,
          realisators: selectedRealisators.map(realisator => ({
            firstname: realisator.firstname,
            lastname: realisator.lastname,
            birthdate: realisator.birthdate
          }))
        },
      });
      console.log('New Movie added :', data.addMovie);
      setTitle('');
      setSelectedRealisators([]);
      setYear('');
      setGenre('');
    } catch (error) {
      console.error('Erreur when adding movie :', error);
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

  if (realisatorsLoading) return <p>Loading Realisators...</p>;
  if (realisatorsError) return <p>Error loading Realisators : {realisatorsError.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Movie title :
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      {selectedRealisators.map((realisator, index) => (
        <div key={index}>
          <label>
            Select a Realisator :
            <select
              value={`${realisator.firstname} ${realisator.lastname}`}
              onChange={(e) => {
                const selected = realisatorsData.realisators.find(a => `${a.firstname} ${a.lastname}` === e.target.value);
                handleRealisatorSelect(index, selected);
              }}
            >
              <option value="">Select a Realisator</option>
              {realisatorsData.realisators.map((a, i) => (
                <option key={i} value={`${a.firstname} ${a.lastname}`}>
                  {a.firstname} {a.lastname}
                </option>
              ))}
            </select>
          </label>
          {realisator.firstname && (
            <div>
              <p>Firstname : {realisator.firstname}</p>
              <p>Lastname : {realisator.lastname}</p>
              <p>Date of birth : {realisator.birthdate}</p>
            </div>
          )}
          <button type="button" onClick={() => removeRealisatorField(index)}>Delete Realisator</button>
        </div>
      ))}
      <button type="button" onClick={addRealisatorField}>Add a Realisator</button>
      <label>
        year :
        <input type="number" min="1900" max="2099" step="1" value={year} onChange={(e) => setYear(e.target.value)} required />
      </label>
      <label>
        Genre :
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      </label>
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovieForm;
