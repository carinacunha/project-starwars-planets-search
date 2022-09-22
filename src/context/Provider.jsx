import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';
import useFetch from '../hooks/useFetch';

function Provider({ children }) {
  const [planets] = useFetch();
  // console.log(planets);
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
  const [visibleOptions, setVisibleOptions] = useState(columns);
  const [workTable, setWorkTable] = useState([]);
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
    visibleOptions,
    setVisibleOptions,
    workTable,
    setWorkTable,
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
