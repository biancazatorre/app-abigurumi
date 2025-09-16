import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  carouselContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  carouselImage: {
    width: width - 30,
    height: width * 0.5,
    borderRadius: 10,
    alignSelf: 'center',
  },
  paymentOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E359EC',
  },
  paymentText: {
    color: '#E359EC',
    fontWeight: 'bold',
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardPrice: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  removerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removerTexto: {
    fontSize: 14,
    color: '#E359EC',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  buttonColumn: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  verButton: {
    marginBottom: 6,
    width: 80,
    backgroundColor: '#E359EC', 
    padding: 6, 
    borderRadius: 8
  },
  comprarButton: {
    width: 80,
    backgroundColor: '#2ECC71', 
    padding: 6, 
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
