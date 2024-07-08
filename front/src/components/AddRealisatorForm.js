import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REALISATOR, GET_REALISATORS } from '../graphql/realisatorQueries';
import './form.css';

const AddRealisatorForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const [addRealisator] = useMutation(ADD_REALISATOR);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addRealisator({
        variables: {
          firstname,
          lastname,
          birthdate
        },
        refetchQueries: [{ query: GET_REALISATORS }],
      });
      console.log('Realisator Added :', data.addRealisator);
      setFirstname('');
      setLastname('');
      setBirthdate('');
    } catch (error) {
      console.error('Error when adding Realisator :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Firstname :
        <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
      </label>
      <label>
        Lastname :
        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
      </label>
      <label>
        Date of birth :
        <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
      </label>
      <button type="submit">Add Realisator</button>
    </form>
  );
};

export default AddRealisatorForm;
