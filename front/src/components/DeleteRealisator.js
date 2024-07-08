import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_REALISATOR, GET_REALISATORS } from '../graphql/realisatorQueries';

const DeleteRealisator = () => {
  const [selectedRealisator, setSelectedRealisator] = useState('');
  const [deleteRealisator] = useMutation(DELETE_REALISATOR);
  const { loading, error, data, refetch } = useQuery(GET_REALISATORS);

  useEffect(() => {
    if (data) {
      // Sélectionner le premier auteur par défaut
      if (data.realisators.length > 0) {
        setSelectedRealisator(`${data.realisators[0].firstname} ${data.realisators[0].lastname}`);
      }
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [firstname, lastname] = selectedRealisator.split(' ');
      await deleteRealisator({ variables: { firstname, lastname } });
      // Réinitialiser la sélection après la suppression
      await refetch(); // Rafraîchir les données des auteurs après la suppression
      if (data.realisators.length > 1) {
        setSelectedRealisator(`${data.realisators[0].firstname} ${data.realisators[0].lastname}`);
      } else {
        setSelectedRealisator('');
      }
    } catch (error) {
      console.error('Error deleting realisator:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Realisator to delete:
        <select value={selectedRealisator} onChange={(e) => setSelectedRealisator(e.target.value)} required>
          {data.realisators.map((realisator) => (
            <option key={realisator.id} value={`${realisator.firstname} ${realisator.lastname}`}>
              {realisator.firstname} {realisator.lastname}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Delete Realisator</button>
    </form>
  );
};

export default DeleteRealisator;
