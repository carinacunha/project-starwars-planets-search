import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

function Header() {
  const {
    planets,
    planetsList,
    setInputName,
    setPlanetsList,
    columns,
    valueColumn,
    setValueColumn,
    valueComparation,
    setValueComparation,
    comparations,
    valueNumber,
    setValueNumber,
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

  const handleColumns = ({ target }) => {
    const { value } = target;
    setValueColumn(value);
  };

  const handleComparations = ({ target }) => {
    const { value } = target;
    setValueComparation(value);
  };

  const handleNumber = ({ target }) => {
    const { value } = target;
    setValueNumber(value);
  };

  const handleClickFilter = () => {
    let planetsFiltered = [];
    if (valueComparation === 'maior que') {
      planetsFiltered = planetsList
        .filter((planet) => planet[valueColumn] !== 'unknown'
      && Number(planet[valueColumn]) > Number(valueNumber));
    }

    if (valueComparation === 'menor que') {
      planetsFiltered = planetsList
        .filter((planet) => planet[valueColumn] !== 'unknown'
      && Number(planet[valueColumn]) < Number(valueNumber));
    }

    if (valueComparation === 'menor que') {
      planetsFiltered = planetsList
        .filter((planet) => planet[valueColumn] !== 'unknown'
      && Number(planet[valueColumn]) === Number(valueNumber));
    }
    setPlanetsList(planetsFiltered);
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
              onChange={ handleColumns }
            >
              {
                columns.map((col) => (
                  <option
                    value={ col }
                    key={ col }
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
              onChange={ handleComparations }
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
              onChange={ handleNumber }
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
    </header>
  );
}

export default Header;
