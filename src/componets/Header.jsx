import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

function Header() {
  const { setInputName, planets, setPlanetsList } = useContext(GlobalContext);

  const handleChange = ({ target }) => {
    const { value } = target;
    const name = value.toLowerCase();
    setInputName(name);
    const filterByName = planets.filter(
      (planet) => planet.name.toLowerCase().includes(name),
    );

    setPlanetsList(filterByName);
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
        </section>
      </form>
    </header>
  );
}

export default Header;
