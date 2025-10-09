import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
      background: {
    flex: 1,
  },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginVertical: 20,
    },
    list: {
        paddingHorizontal: 20,
    },
    listContent: {
        paddingBottom: 200, // Espaço no final para não ficar atrás do botão
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 50,
    },
    cardContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 15,
    },
    cardInfo: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    cardPrice: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    footerContainer: {
        position: 'absolute', // Faz o rodapé flutuar
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingBottom: 50, 
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 15,
        color: '#333',
    },
    finalizarButton: {
        backgroundColor: '#E359EC', 
        paddingVertical: 16,
        borderRadius: 15,
        alignItems: 'center',
    },
    finalizarButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        alignSelf: 'flex-start', // Para o container não ocupar a largura toda
    },
    quantityButton: {
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    quantityButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#555',
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        color: '#333',
    },
    trashButton: {
        padding: 10,
        position: 'absolute', // Posiciona o ícone no canto
        top: 5,
        right: 5,
    },
    subtotalText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default styles;