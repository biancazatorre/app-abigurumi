import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    padding: 16,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    padding: 16,
    borderRadius: 16,
  },
  produtoImagem: {
    width: '100%',
    height: 320, // ✅ imagem maior
    borderRadius: 20,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  textoContainer: {
    flex: 1.3,
  },
  botoesContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 10,
  },
  nomeProduto: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  precoContainer: {
    marginBottom: 10,
  },
  precoPix: {
    fontSize: 18,
    color: '#333',
  },
  pix: {
    color: '#4169e1',
    fontWeight: 'bold',
  },
  precoParcelado: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  descricaoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  descricaoTexto: {
    fontSize: 16,
    color: '#666',
  },
  botaoComprar: {
    backgroundColor: '#34C759',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  textoComprar: {
    color: '#fff',
    fontWeight: 'bold',
  },
  botaoCarrinho: {
    backgroundColor: '#E359EC',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  textoCarrinho: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
