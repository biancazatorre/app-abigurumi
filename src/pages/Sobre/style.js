import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  cardSobre: {
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
    borderColor: '#ADEEE8',
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
  textSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 5,
  },
  textParagraph: {
    fontSize: 14,
    color: '#444',
    textAlign: 'justify',
    lineHeight: 20,
  },
});

export default styles;
