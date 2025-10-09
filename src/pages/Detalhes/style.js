import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    background: {
        flex: 1,
    },
    container: {
        padding: 16,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 16,
        overflow: 'hidden',
    },
    produtoImagem: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    infoContainer: {
        padding: 20,
    },
    textoContainer: {
        marginBottom: 20,
    },
    nomeProduto: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    precoContainer: {
        marginBottom: 20,
    },
    precoPix: {
        fontSize: 20,
        color: '#444',
    },
    pix: {
        fontWeight: 'bold',
        color: '#111',
    },
    precoParcelado: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    descricaoTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 15,
        marginBottom: 5,
    },
    descricaoTexto: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
    },
    botoesContainer: {
        marginTop: 20,
    },
    botaoComprar: {
        backgroundColor: '#2ECC71',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 10,
    },
    textoComprar: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    botaoCarrinho: {
        backgroundColor: '#E359EC',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd'
    },
    textoCarrinho: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    // --- Estilos para o Toast ---
    toastContainer: {
        position: 'absolute',
        bottom: 60,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
    },
    toastText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default styles;