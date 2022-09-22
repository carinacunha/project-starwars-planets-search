import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

function Header() {
  const {
    planets,
    planetsList,
    setInputName,
    setPlanetsList,
    valueColumn,
    setValueColumn,
    valueComparation,
    setValueComparation,
    comparations,
    valueNumber,
    setValueNumber,
    filtersSelected,
    setFiltersSelected,
    visibleOptions,
    setVisibleOptions,
    filterInfos,
  } = useContext(GlobalContext);

  const handleChange = ({ target }) => {
    const { value } = target;
    const name = value.toLowerCase();
    setInputName(name);
    const filterByName = planets.filter(
      (planet) => planet.name.toLowerCase().includes(name),
    );
    setPlanetsList(filterByName);
  };

  const tableFilter = (filterData) => {
    const { valueColumn, valueComparation, valueNumber } = filterData;
    let planetsFiltered = [];
    if (valueComparation === 'maior que') {
      planetsFiltered = planetsList
        .filter((planet) => planet[valueCol] !== 'unknown'
        && Number(planet[valueColumn]) > Number(valueNumber));
    }

    if (valueComparation === 'menor que') {
      planetsFiltered = planetsList
        .filter((planet) => planet[valueCol] !== 'unknown'
        && Number(planet[valueColumn]) < Number(valueNumber));
    }

    if (valueComparation === 'igual a') {
      planetsFiltered = planetsList.filter((planet) => Number(planet[valueColumn])
      === Number(valueNumber));
    }
    return planetsFiltered;
  };

  const handleClickFilter = () => {
    const newTable = tableFilter(filterInfos);
    setPlanetsList(newTable);

    const newOptions = visibleOptions.filter((option) => option !== valueColumn);
    setFiltersSelected([...filtersSelected, filterInfos]);
    setVisibleOptions(newOptions);
    setValueColumn(newOptions[0]);

    filtersSelected.forEach((elem) => tableFilter(elem));
  };

  return (
    <header>
      <form>
        <section>
          <input
            data-testid="name-filter"
            type="text"
            placeholder="Digite o nome do planeta"
            onChange={ handleChange }
          />
          <legend>
            Colunas
            <select
              data-testid="column-filter"
              value={ valueColumn }
              onChange={ ({ target: { value } }) => setValueColumn(value) }
            >
              {
                visibleOptions.map((col, index) => (
                  <option
                    value={ col }
                    key={ index }
                  >
                    {col}
                  </option>
                ))
              }
            </select>
          </legend>
          <legend>
            Intervalo
            <select
              data-testid="comparison-filter"
              value={ valueComparation }
              onChange={ ({ target: { value } }) => setValueComparation(value) }
            >
              {
                comparations.map((comp, index) => (
                  <option
                    value={ comp }
                    key={ index }
                  >
                    {comp}
                  </option>
                ))
              }
            </select>
          </legend>
          <legend>
            Valor
            <input
              data-testid="value-filter"
              type="number"
              min="0"
              value={ valueNumber }
              onChange={ ({ target: { value } }) => setValueNumber(value) }
            />
          </legend>
        </section>
      </form>
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClickFilter }
      >
        Filtrar
      </button>

      {
        filtersSelected.map((elem) => (
          <section
            data-testid="filter"
            key={ elem.valueColumn }
          >
            <p>
              {
                `${elem.valueColumn} 
                ${elem.valueComparation} 
                ${elem.valueNumber}`
              }
            </p>
            <button
              type="button"
              name={ elem.valueColumn }
            >
              Remover filtro
            </button>
          </section>
        ))
      }
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ () => {
          setFiltersSelected([]);
          setPlanetsList(planets);
        } }
      >
        Remover todas filtragens
      </button>

    </header>
  );
}

export default Header;
