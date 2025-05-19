import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  imagem: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  preco: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  favorito: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  favoritoTexto: {
    fontSize: 14,
    color: '#E359EC',
    marginLeft: 4,
  },
  botoesContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  botaoVer: {
    backgroundColor: '#E359EC',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 6,
  },
  textoVer: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  botaoComprar: {
    backgroundColor: '#2ECC71',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  textoComprar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
