import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardPrice: {
    fontSize: 14,
    color: '#555',
  },
  finalizarButton: {
    backgroundColor: '#E359EC',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  finalizarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
