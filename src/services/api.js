// services/api.js
import axios from 'axios';

// 1. Defina a URL base. Lembre-se de usar seu IP real aqui.
export const BASE_URL = 'http://192.168.0.34:5000'; // USE SEU IP ATUALIZADO AQUI

// 2. Crie e EXPORTE a instância do Axios.
// Esta é a parte que estava faltando.
export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ======= USUÁRIOS =======

export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/users/login', credentials);
  return response.data; // Retorna { token, user }
};


// ======= PRODUTOS =======

export const getProdutos = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const getProdutoById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar produto com id ${id}:`, error);
    throw error;
  }
};

export const createProduto = async (produtoData, token) => {
  const response = await api.post('/products', produtoData, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.data;
};

export const updateProduto = async (id, produtoData, token) => {
  const response = await api.put(`/products/${id}`, produtoData, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.data;
};

export const deleteProduto = async (id, token) => {
  const response = await api.delete(`/products/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.data;

  
};