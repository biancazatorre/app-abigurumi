const BASE_URL = '192.168.0.34'; // ou o IP do seu PC se for testar no celular

// ======= USUÁRIOS =======

// Cadastrar usuário

export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Erro ao cadastrar usuário');
  }
  return response.json();
};

// Login
export const loginUser = async ({ celular, senha }) => {
  const response = await fetch(`${BASE_URL}/usuarios?celular=${celular}&senha=${senha}`);
  const users = await response.json();
  if (users.length === 0) throw new Error('Usuário ou senha inválidos');
  return users[0]; // retorna o primeiro usuário encontrado
};

// ======= PRODUTOS =======

// Listar todos os produtos
export const getProdutos = async () => {
  const response = await fetch(`${BASE_URL}/produtos`);
  if (!response.ok) throw new Error('Erro ao buscar produtos');
  return response.json();
};

// Criar produto
export const createProduto = async (produto) => {
  const response = await fetch(`${BASE_URL}/produtos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto),
  });
  if (!response.ok) throw new Error('Erro ao criar produto');
  return response.json();
};

// Atualizar produto
export const updateProduto = async (id, produto) => {
  const response = await fetch(`${BASE_URL}/produtos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto),
  });
  if (!response.ok) throw new Error('Erro ao atualizar produto');
  return response.json();
};

// Deletar produto
export const deleteProduto = async (id) => {
  const response = await fetch(`${BASE_URL}/produtos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao deletar produto');
  return true;
};
