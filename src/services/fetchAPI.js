const url = 'https://swapi.dev/api/planets';

const fetchAPI = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default fetchAPI;
