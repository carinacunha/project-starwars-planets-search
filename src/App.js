import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './componets/Table';
import Header from './componets/Header';

function App() {
  return (
    <Provider>
      <Header />
      <Table />
    </Provider>
  );
}

export default App;
