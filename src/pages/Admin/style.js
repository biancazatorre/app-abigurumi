import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  // --- Estrutura Principal ---
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF' // Cor de fundo de segurança
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 50, // Espaço extra no final da lista
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },

  // --- Formulário de Produto ---
  cardLogin: { // Reutilizando estilo do card de login para o formulário
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  botaoEntrar: {
    backgroundColor: '#E359EC', // Cor rosa/roxo do seu exemplo
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoEntrarTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 15,
    textAlign: 'center',
  },

  // --- Card de Produto na Lista (Baseado no Coelho.js) ---
  card: { // Estilo principal para cada item da lista
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden', // Garante que a imagem não saia das bordas
    elevation: 4,
  },
  produtoImagem: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imagemPlaceholder: { // Caso não tenha imagem
    width: '100%',
    height: 200,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 15,
  },
  textoContainer: {
    marginBottom: 15,
  },
  nomeProduto: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  precoContainer: {
    marginBottom: 15,
  },
  precoPix: {
    fontSize: 18,
    color: '#555',
  },
  pix: {
    fontWeight: 'bold',
    color: '#111',
  },
  precoParcelado: {
    fontSize: 14,
    color: '#666',
  },
  descricaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 10,
  },
  descricaoTexto: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },

  // --- Botões de Editar/Excluir no Card ---
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  botaoComprar: { // Reutilizado para "Editar"
    flex: 1,
    backgroundColor: '#28a745', // Verde
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  botaoCarrinho: { // Reutilizado para "Excluir"
    flex: 1,
    backgroundColor: '#dc3545', // Vermelho
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoComprar: { // Reutilizado para texto do botão de editar
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textoCarrinho: { // Reutilizado para texto do botão de excluir
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  // --- Estilos de botões do exemplo Coelho.js que foram renomeados/reutilizados
  // Mantive os nomes para referência, mas no código usei os de cima para clareza
  // verButton: { ... }, 
  // buttonText: { ... },
});

export default styles;