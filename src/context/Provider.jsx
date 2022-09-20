import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';
import useFetch from '../hooks/useFetch';

function Provider({ children }) {
  const [planets] = useFetch();
  const [inputName, setInputName] = useState();
  const [planetsList, setPlanetsList] = useState([]);
  const [columns, setColumns] = useState(
    [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ],
  );

  useEffect(() => {
    setPlanetsList(planets);
  }, [planets]);

  useEffect(() => {
    setPlanetsList(planetsList.filter((planet) => (
      ((planet.name).toLowerCase()).includes(inputName.toLowerCase())
    )));
  }, [inputName]);

  const context = {
    planets,
    planetsList,
    columns,
    setColumns,
    setInputName,
  };

  return (
    <GlobalContext.Provider value={ context }>
      {children}
    </GlobalContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};

export default Provider;
