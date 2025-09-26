import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // --- Estrutura e Fundo ---
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',   
    padding: 20,
  },
  
  
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333', 
    textAlign: 'center',
    marginBottom: 60, 
  },
  
  // --- Botões do Menu ---
  menuButton: {
    backgroundColor: '#E359EC', 
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: '90%', 
    alignItems: 'center',
    marginBottom: 20, 
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600', // Um pouco menos "pesado" que 'bold'
  },
});

export default styles;