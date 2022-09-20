import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

function Header() {
  const { setInputName, inputName } = useContext(GlobalContext);

  const handleChange = ({ target }) => {
    const { value } = target;
    setInputName(value);
    console.log(value);
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
            value={ inputName }
          />
        </section>
      </form>
    </header>
  );
}

export default Header;
