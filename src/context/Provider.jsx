import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';
import useFetch from '../hooks/useFetch';

function Provider({ children }) {
  const [planets] = useFetch();
  // console.log(planets);
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

  const context = {
    planets,
    planetsList,
    columns,
    setColumns,
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
