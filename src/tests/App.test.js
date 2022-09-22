import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import mockFetch from '../../cypress/mocks/fetch';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

const INPUT_NAME = 'name-filter';
const SELECT_COL = 'column-filter';
const SELECT_COMP = 'comparison-filter';
const INPUT_VAL = 'value-filter';
const COMPONENTS = [INPUT_NAME, SELECT_COL, SELECT_COMP, INPUT_VAL];
const TITLES = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate', 'Garvity',
'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited', 'URl'];

describe('Verifica se a App é funcional', () => {

  afterEach(() => {
    global.fetch.mockClear();
  });

  beforeEach(()=> jest.spyOn(global, 'fetch').mockImplementation(mockFetch));

  test('Verifica se renderiza os componentes na tela', () => {
    render(<App />);

    const title = screen.getByText(/projeto starwars/i);
    expect(title).toBeInTheDocument();


    COMPONENTS.forEach((input) => {
      expect(screen.getByTestId(input)).toBeInTheDocument();
    })
  });

  test('Verifica se os planetas são filtrados por nome', async () => {
    render(<App />);

    const searchFilter = screen.getByTestId(INPUT_NAME);
    userEvent.type(searchFilter, 'ta');
    const nameExpect = await screen.findByText(/tatooine/i)

    expect(nameExpect).toBeInTheDocument();
  });

  test('Verifica se as categorias não se repetem no filtro', async () => {
    render(<App />);

    const columnValue = screen.getByTestId(SELECT_COL);
    const comparisonValue = screen.getByTestId(SELECT_COMP);
    const value = screen.getByTestId(INPUT_NAME);
    const btnFilter = screen.getByTestId('button-filter');

    expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();

    userEvent.selectOptions(columnValue, 'orbital_period');
    userEvent.selectOptions(comparisonValue, 'igual a');
    userEvent.clear(value);
    userEvent.type(value, '100');
    userEvent.click(btnFilter);

    const visibleColumns = ['population', 'diameter', 'rotation_period', 'surface_water'];
    visibleColumns.forEach((option) => (
      expect(screen.getByRole('option', { name: option })).toBeInTheDocument()
    ));
  });
});