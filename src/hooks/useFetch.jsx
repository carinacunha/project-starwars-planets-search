import { useState, useEffect } from 'react';
import fetchAPI from '../services/fetchAPI';

function useFetch() {
  const [planets, setPlanets] = useState([]);
  useEffect(() => {
    fetchAPI().then((data) => setPlanets(data.results));
  }, []);
  return [planets, setPlanets];
}

export default useFetch;
