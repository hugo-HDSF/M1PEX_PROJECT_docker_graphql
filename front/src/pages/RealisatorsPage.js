import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_REALISATORS } from '../graphql/realisatorQueries';
import './PageStyles.css';

const RealisatorsPage = () => {
  const { loading, error, data } = useQuery(GET_REALISATORS);

  if (loading) return <p>Loading Realisators...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="page-container">
      <h1>Realisators list</h1>
      <div className="realisators-list">
        {data.realisators.map(realisator => (
          <div key={realisator.id} className="realisator-item">
            <h2>{`${realisator.firstname} ${realisator.lastname}`}</h2>
            <p>Date of birth: {realisator.birthdate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealisatorsPage;
