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
    newsColumns,
    setNewsColumns,
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

  const handleClickFilter = () => {
    let planetsFiltered = [];
    if (valueComparation === 'maior que') {
      planetsFiltered = planetsList
        .filter((planet) => planet[valueColumn] !== 'unspecified'
      && Number(planet[valueColumn]) > Number(valueNumber));
    }

    if (valueComparation === 'menor que') {
      planetsFiltered = planetsList
        .filter((planet) => planet[valueColumn] !== 'unspecified'
      && Number(planet[valueColumn]) < Number(valueNumber));
    }

    if (valueComparation === 'igual a') {
      planetsFiltered = planetsList.filter((planet) => Number(planet[valueColumn])
      === Number(valueNumber));
    }
    setPlanetsList(planetsFiltered);
    const newOptions = newsColumns.filter((option) => option !== valueColumn);
    setFiltersSelected([...filtersSelected, filterInfos]);
    setNewsColumns(newOptions);
    setValueColumn(newOptions[0]);
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
                newsColumns.map((col, index) => (
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
        filtersSelected.map((filter, index) => (
          <section key={ index }>
            <p>
              {
                `${filter.valueColumn} 
                ${filter.valueComparation} 
                ${filter.valueNumber}`
              }
            </p>
          </section>
        ))
      }
    </header>
  );
}

export default Header;
