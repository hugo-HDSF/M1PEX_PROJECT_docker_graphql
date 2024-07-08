// src/components/ModifyRealisatorForm.js
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_REALISATORS, MODIFY_REALISATOR } from '../graphql/realisatorQueries';

const ModifyRealisatorForm = () => {
  const [selectedRealisator, setSelectedRealisator] = useState('');
  const [newFirstname, setNewFirstname] = useState('');
  const [newLastname, setNewLastname] = useState('');
  const [newBirthdate, setNewBirthdate] = useState('');

  const { loading, error, data } = useQuery(GET_REALISATORS);
  const [modifyRealisator] = useMutation(MODIFY_REALISATOR, {
    refetchQueries: [{ query: GET_REALISATORS }],
  });

  useEffect(() => {
    if (!loading && data) {
      setRealisators(data.realisators);
    }
  }, [loading, data]);

  const [realisators, setRealisators] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await modifyRealisator({
        variables: {
          firstname: selectedRealisator.firstname,
          lastname: selectedRealisator.lastname,
          birthdate: selectedRealisator.birthdate,
          newFirstname,
          newLastname,
          newBirthdate
        }
      });
      console.log('Realisator modified:', data.modifyRealisator);
      // Reset form fields after modification
      setSelectedRealisator('');
      setNewFirstname('');
      setNewLastname('');
      setNewBirthdate('');
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

  if (loading) return <p>Loading Realisators...</p>;
  if (error) return <p>Error when loading Realisators: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Realisator:
        <select
          value={`${selectedRealisator.firstname} ${selectedRealisator.lastname}`}
          onChange={(e) => {
            const selected = realisators.find(r => `${r.firstname} ${r.lastname}` === e.target.value);
            setSelectedRealisator(selected);
            setNewFirstname(selected.firstname);
            setNewLastname(selected.lastname);
            setNewBirthdate(selected.birthdate);
          }}
          required
        >
          <option value="">Select a Realisator</option>
          {realisators.map((r, i) => (
            <option key={i} value={`${r.firstname} ${r.lastname}`}>
              {r.firstname} {r.lastname}
            </option>
          ))}
        </select>
      </label>
      <label>
        New Firstname:
        <input type="text" value={newFirstname} onChange={(e) => setNewFirstname(e.target.value)} />
      </label>
      <label>
        New Lastname:
        <input type="text" value={newLastname} onChange={(e) => setNewLastname(e.target.value)} />
      </label>
      <label>
        New Date of birth:
        <input type="date" value={newBirthdate} onChange={(e) => setNewBirthdate(e.target.value)} />
      </label>
      <button type="submit">Modify Realisator</button>
    </form>
  );
};

export default ModifyRealisatorForm;
