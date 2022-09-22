import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './componets/Table';
import Header from './componets/Header';

function App() {
  return (
    <Provider>
      <h1> Projeto StarWars - Trybe </h1>
      <Header />
      <Table />
    </Provider>
  );
}

export default App;
