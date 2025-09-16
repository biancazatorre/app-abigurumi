import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    padding: 20,
    alignItems: 'center',
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
  cardLogin: {
    backgroundColor: '#CDB7E1',
    borderRadius: 10,
    width: '100%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ADEEE8'
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
  esqueciSenha: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333'
  },
  botaoEntrar: {
    backgroundColor: '#E359EC',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoEntrarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  politica: {
    marginTop: 10,
    fontSize: 12,
    color: '#444',
    textAlign: 'center'
  },
  link: {
    color: '#E359EC',
    textDecorationLine: 'underline'
  },
  botaoCadastrar: {
    backgroundColor: '#E359EC',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  botaoCadastrarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000',
    backgroundColor: '#fff',
  },
  sliderContainer: {
  marginTop: 10,
  width: '100%',
  alignItems: 'center',
  paddingHorizontal: 10,
},

sliderValue: {
  fontSize: 14,
  color: '#333',
  marginTop: 5,
  fontWeight: 'bold'
}
});

export default styles;
