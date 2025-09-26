import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
    background: { flex: 1 },
    container: { paddingHorizontal: 20, paddingBottom: 40 },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginVertical: 20,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 6,
    },
    produtoImagem: {
        width: '100%',
        height: 180,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    infoContainer: {
        padding: 16,
    },
    nomeProduto: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#444',
    },
    precoPix: {
        fontSize: 18,
        color: '#555',
        marginTop: 8,
    },
    botoesContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'flex-end',
    },
    botaoEditar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginRight: 10,
    },
    botaoExcluir: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dc3545',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    textoBotao: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 14,
    },
});

export default styles;