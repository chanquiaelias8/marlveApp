import axios from 'axios';

const {
  REACT_APP_API_TS: ts,
  REACT_APP_API_KEY: apikey,
  REACT_APP_API_HASH: hash,
  REACT_APP_API_URL: apiUrl,
  REACT_APP_API_LIMIT:limit
} = process.env;


export const getCharacters = async() => {
  try {
    const response = await axios.get(`${apiUrl}?limit=${limit}&ts=${ts}&apikey=${apikey}&hash=${hash}`);
    return response.data;
  } catch (error) {
    console.log('Error al obtener los personajes', error);
    throw error;
  }
}

export const getCharacterById = async (id: number) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}?ts=${ts}&apikey=${apikey}&hash=${hash}`);
    return response.data.data.results[0];
  } catch (error) {
    console.error('Error al obtener el personaje:', error);
    throw error;
  }
};

const api = {
  getCharacters,
  getCharacterById,
};

export default api;