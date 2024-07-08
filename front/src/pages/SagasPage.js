import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SAGAS } from '../graphql/sagaQueries';
import './PageStyles.css';

const SagasPage = () => {
  const { loading, error, data } = useQuery(GET_SAGAS);

  if (loading) return <p>Loading Sagas...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="page-container">
      <h1>Sagas List</h1>
      <div className="sagas-list">
        {data.sagas.map(sagas => (
          <div key={sagas.id} className="sagas-item">
            <h2>{sagas.title}</h2>
            <p>description: {sagas.description}</p>
            <p>Associated movies:</p>
            <ul>
              {sagas.movies.map(movie => (
                <li key={movie.id}>{movie.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SagasPage;
