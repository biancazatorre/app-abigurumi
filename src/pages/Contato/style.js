import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    safeArea: {
      flex: 1,
      marginTop: 50,
      backgroundColor: 'transparent',
    },
    background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: '#EAEAF4',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  cardTitle: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#E359EC',
    color: '#fff',
    paddingHorizontal: 10,
    borderRadius: 5,
    fontWeight: 'bold',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#CDB7E1',
    width: '100%',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ADEEE8'
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 5,
  },
  required: {
    color: 'red',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  botao: {
    backgroundColor: '#D941E6',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuButton: {
  position: 'absolute',
  top: 40,
  left: 20,
  zIndex: 10,
  backgroundColor: '#fff',
  padding: 10,
  borderRadius: 10,
  elevation: 5,
},
uploadButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#808080', // cinza médio
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 8,
  marginTop: 10,
  alignSelf: 'flex-start', // pode trocar por 'center' se quiser centralizar
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},
uploadIcon: {
  marginRight: 8,
},
uploadText: {
  color: '#fff',
  fontSize: 14,
  fontWeight: 'bold',
},
});
