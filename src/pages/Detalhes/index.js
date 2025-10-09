import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, TouchableOpacity, ScrollView, ImageBackground,
    SafeAreaView, StatusBar, ActivityIndicator, Alert
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 1. Import do AsyncStorage
import styles from './style';
import Header from '../../components/Header';
import { getProdutoById, BASE_URL } from '../../services/api'; 

export default function Detalhes({ route, navigation }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [produto, setProduto] = useState(null);
    const [loading, setLoading] = useState(true);
    // 4. Estado para controlar a visibilidade e a mensagem do Toast
    const [toast, setToast] = useState({ visible: false, message: '' });

    const { produtoId } = route.params;

    useEffect(() => {
        const carregarDetalhesDoProduto = async () => {
            if (!produtoId) return;
            setLoading(true);
            try {
                const data = await getProdutoById(produtoId);
                setProduto(data);
            } catch (error) {
                Alert.alert("Erro", "Não foi possível carregar os detalhes do produto.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        carregarDetalhesDoProduto();
    }, [produtoId]);

    // 5. Função para mostrar o Toast por alguns segundos
    const showToast = (message) => {
        setToast({ visible: true, message });
        setTimeout(() => {
            setToast({ visible: false, message: '' });
        }, 2500);
    };

    // 6. A função adicionarAoCarrinho, que agora mostra o Toast
    const adicionarAoCarrinho = async (produtoParaAdicionar) => {
        if (!produtoParaAdicionar) return;
        try {
            const carrinhoJson = await AsyncStorage.getItem('carrinho');
            let carrinho = carrinhoJson ? JSON.parse(carrinhoJson) : [];
            const itemIndex = carrinho.findIndex(item => item.id === produtoParaAdicionar.id);
            if (itemIndex > -1) {
                carrinho[itemIndex].quantidade = (carrinho[itemIndex].quantidade || 1) + 1;
            } else {
                carrinho.push({ ...produtoParaAdicionar, quantidade: 1 });
            }
            await AsyncStorage.setItem('carrinho', JSON.stringify(carrinho));
            showToast(`${produtoParaAdicionar.nome} foi adicionado ao carrinho!`);
        } catch (error) {
            console.log('Erro ao adicionar ao carrinho:', error);
            Alert.alert("Erro", "Não foi possível adicionar o produto ao carrinho.");
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#E359EC" style={{ flex: 1, justifyContent: 'center' }} />;
    }

    if (!produto) {
        return <View><Text>Produto não encontrado.</Text></View>;
    }

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.safeArea}>
                <ImageBackground
                    source={require('../../../assets/images/fundo.png')}
                    style={styles.background}
                >
                    <Header
                        navigation={navigation}
                        menuVisible={menuVisible}
                        setMenuVisible={setMenuVisible}
                    />
                    <ScrollView contentContainerStyle={styles.container}>
                        <View style={styles.card}>
                            
                            {/* 7. BUG CORRIGIDO: Usando a URL da imagem vinda da API */}
                            <Image 
                              source={{ uri: `${BASE_URL}${produto.imagem_url}` }} 
                              style={styles.produtoImagem} 
                            />
                            
                            <View style={styles.infoContainer}>
                                <View style={styles.textoContainer}>
                                    <Text style={styles.nomeProduto}>{produto.nome}</Text>
                                    <View style={styles.precoContainer}>
                                        <Text style={styles.precoPix}>
                                            R$ {Number(produto.preco).toFixed(2).replace('.', ',')} <Text style={styles.pix}>à vista </Text>
                                            <MaterialCommunityIcons name="cash" size={16} />
                                        </Text>
                                        <Text style={styles.precoParcelado}>
                                            ou 3x de R${(Number(produto.preco) / 3).toFixed(2).replace('.', ',')}{' '}
                                            <MaterialIcons name="payment" size={16} />
                                        </Text>
                                    </View>
                                    <Text style={styles.descricaoTitulo}>Descrição</Text>
                                    <Text style={styles.descricaoTexto}>{produto.descricao}</Text>
                                </View>
                                <View style={styles.botoesContainer}>
                                    {/* 8. Botão Comprar AGORA leva para a página do Carrinho */}
                                    <TouchableOpacity style={styles.botaoComprar} onPress={() => navigation.navigate('Carrinho')}>
                                        <Text style={styles.textoComprar}>Comprar</Text>
                                    </TouchableOpacity>
                                    {/* 9. Botão Adicionar AGORA chama a função que mostra o Toast */}
                                    <TouchableOpacity style={styles.botaoCarrinho} onPress={() => adicionarAoCarrinho(produto)}>
                                        <Text style={styles.textoCarrinho}>Adicionar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>

            {/* 10. Componente do Toast que aparece sobre a tela */}
            {toast.visible && (
                <View style={styles.toastContainer}>
                    <Text style={styles.toastText}>{toast.message}</Text>
                </View>
            )}
        </View>
    );
}