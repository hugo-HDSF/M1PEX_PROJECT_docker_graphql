import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_SAGA, GET_SAGAS } from '../graphql/sagaQueries';

const DeleteSagasPage = () => {
  const [selectedSagas, setSelectedSagas] = useState('');
  const [deleteSagas] = useMutation(DELETE_SAGA);

  const { loading, error, data, refetch } = useQuery(GET_SAGAS);

  useEffect(() => {
    if (data) {
      if (data.sagas.length > 0) {
        setSelectedSagas(data.sagas[0].title);
      }
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteSagas({ variables: { title: selectedSagas } });
      await refetch();
      if (data.sagas.length > 1) {
        setSelectedSagas(data.sagas[0].title);
      } else {
        setSelectedSagas('');
      }
    } catch (error) {
      console.error('Error deleting sagas:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Saga to delete
        <select value={selectedSagas} onChange={(e) => setSelectedSagas(e.target.value)} required>
          {data.sagas.map((sagas) => (
            <option key={sagas.id} value={sagas.title}>
              {sagas.title}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Delete Saga</button>
    </form>
  );
};

export default DeleteSagasPage;
