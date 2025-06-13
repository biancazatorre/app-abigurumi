import axios from 'axios';

const api = axios.create({
  baseURL: 'https://abigurumi-api.onrender.com/api',
  timeout: 15000, // Aumentei para 15 segundos para evitar timeouts
});

export const registerUser = async (userData) => {
  try {
    console.log('Iniciando requisição POST para /users/register com:', userData);
    const response = await api.post('/users/register', userData);
    console.log('Resposta recebida:', response.data);
    return response.data;
  } catch (error) {
    console.log('Erro na requisição:', {
      message: error.message,
      code: error.code,
      response: error.response ? error.response.data : 'Sem resposta',
    });
    throw error.response ? error.response.data : error.message;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post('/users/login', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export default api;