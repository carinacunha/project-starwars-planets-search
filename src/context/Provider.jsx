import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';
import useFetch from '../hooks/useFetch';

function Provider({ children }) {
  const [planets] = useFetch();
  const [planetsList, setPlanetsList] = useState([]);
  const [inputName, setInputName] = useState('');
  const [columns, setColumns] = useState(
    [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ],
  );
  const [valueColumn, setValueColumn] = useState('population');
  const [valueComparation, setValueComparation] = useState('maior que');
  const comparations = ['maior que', 'menor que', 'igual a'];
  const [valueNumber, setValueNumber] = useState('0');
  const [filtersSelected, setFiltersSelected] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(columns);
  const filterInfos = {
    valueColumn,
    valueComparation,
    valueNumber,
  };

  useEffect(() => {
    setPlanetsList(planets);
  }, [planets]);
  const context = {
    planets,
    planetsList,
    setInputName,
    inputName,
    setPlanetsList,
    columns,
    setColumns,
    valueColumn,
    setValueColumn,
    valueComparation,
    setValueComparation,
    comparations,
    valueNumber,
    setValueNumber,
    filterInfos,
    filtersSelected,
    setFiltersSelected,
    visibleColumns,
    setVisibleColumns,

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
