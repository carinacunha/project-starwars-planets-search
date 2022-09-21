import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';
import useFetch from '../hooks/useFetch';

function Provider({ children }) {
  const [planets] = useFetch();
  const [inputName, setInputName] = useState('');
  const [planetsList, setPlanetsList] = useState([]);

  useEffect(() => {
    setPlanetsList(planets);
  }, [planets]);

  const context = {
    planets,
    planetsList,
    setInputName,
    inputName,
    setPlanetsList,
  };

  return (
    <GlobalContext.Provider value={ context }>
      { children }
    </GlobalContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};

export default Provider;
