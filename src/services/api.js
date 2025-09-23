
const BASE_URL = 'http://192.168.0.34:5000/api'; 

// ======= USUÁRIOS =======

// Cadastro
export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Erro ao cadastrar usuário');
  }
  return response.json();
};

// Login
export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Usuário ou senha inválidos');
  }
  return response.json(); // Retorna { token, user }
};

// ======= PRODUTOS =======

// Listar todos os produtos (público)
export const getProdutos = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) throw new Error('Erro ao buscar produtos');
  return response.json();
};

// Criar produto (requer token de admin)
export const createProduto = async (produtoData, token) => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // 4. Enviando o token para rotas protegidas
    },
    body: JSON.stringify(produtoData),
  });
  if (!response.ok) throw new Error('Erro ao criar produto');
  return response.json();
};

// Atualizar produto (requer token de admin)
export const updateProduto = async (id, produtoData, token) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // 4. Enviando o token
    },
    body: JSON.stringify(produtoData),
  });
  if (!response.ok) throw new Error('Erro ao atualizar produto');
  return response.json();
};

// Deletar produto (requer token de admin)
export const deleteProduto = async (id, token) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`, // 4. Enviando o token
    },
  });
  if (!response.ok) throw new Error('Erro ao deletar produto');
  return true;
};

export const getProdutoById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Erro ao buscar detalhes do produto');
  return response.json();
};