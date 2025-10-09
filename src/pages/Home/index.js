import React, { useState, useEffect, useCallback } from 'react';
import {View, Text, Image, TouchableOpacity, ImageBackground,SafeAreaView, StatusBar, FlatList, ActivityIndicator, Alert
} from 'react-native';
import styles from './style';
import galeriaStyles from '../../components/Carrossel/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header/index';
import ImageGallery from '../../components/Carrossel/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProdutos, BASE_URL } from '../../services/api';

const banners = [
    require('../../../assets/images/banner.png'),
    require('../../../assets/images/banner.png'),
];

export default function Home({ navigation }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favoritos, setFavoritos] = useState([]);
    // 1. O ESTADO QUE CONTROLA O TOAST
    const [toast, setToast] = useState({ visible: false, message: '' });

    const carregarDados = useCallback(async () => {
        setLoading(true);
        try {
            const produtosDaApi = await getProdutos();
            setProdutos(produtosDaApi);
            const favoritosJson = await AsyncStorage.getItem('favoritos');
            setFavoritos(favoritosJson ? JSON.parse(favoritosJson) : []);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar os produtos do servidor.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', carregarDados);
        return unsubscribe;
    }, [navigation, carregarDados]);

    // 2. A FUNÇÃO QUE MOSTRA O TOAST
    const showToast = (message) => {
        setToast({ visible: true, message });
        setTimeout(() => {
            setToast({ visible: false, message: '' });
        }, 2500);
    };

    const toggleFavorito = async (produto) => {
        const novaLista = favoritos.some(item => item.id === produto.id)
            ? favoritos.filter(item => item.id !== produto.id)
            : [...favoritos, produto];
        setFavoritos(novaLista);
        await AsyncStorage.setItem('favoritos', JSON.stringify(novaLista));
    };

    const isFavorito = (id) => favoritos.some(item => item.id === id);

    const adicionarAoCarrinho = async (produto) => {
        try {
            const carrinhoJson = await AsyncStorage.getItem('carrinho');
            let carrinho = carrinhoJson ? JSON.parse(carrinhoJson) : [];
            const itemIndex = carrinho.findIndex(item => item.id === produto.id);

            if (itemIndex > -1) {
                carrinho[itemIndex].quantidade = (carrinho[itemIndex].quantidade || 1) + 1;
            } else {
                carrinho.push({ ...produto, quantidade: 1 });
            }
            
            await AsyncStorage.setItem('carrinho', JSON.stringify(carrinho));
            // A função que chama o Toast
            showToast(`${produto.nome} foi adicionado ao carrinho!`);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível adicionar o produto ao carrinho.");
        }
    };

    const renderProduto = ({ item }) => (
        <View style={styles.cardContainer}>
            <Image source={{ uri: `${BASE_URL}${item.imagem_url}` }} style={styles.cardImage} />
            <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <Text style={styles.cardPrice}>R$ {Number(item.preco).toFixed(2).replace('.', ',')}</Text>
                <TouchableOpacity style={styles.removerContainer} onPress={() => toggleFavorito(item)}>
                    <Icon name={isFavorito(item.id) ? 'heart' : 'heart-o'} size={16} color="#E359EC" />
                </TouchableOpacity>
            </View>
            <View style={styles.buttonColumn}>
                <TouchableOpacity style={styles.verButton} onPress={() => navigation.navigate('Detalhes', { produtoId: item.id })}>
                    <Text style={styles.buttonText}>Ver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.comprarButton} onPress={() => adicionarAoCarrinho(item)}>
                    <Text style={styles.buttonText}>Comprar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
                <ImageBackground
                    source={require('../../../assets/images/fundo.png')}
                    style={styles.background}
                    resizeMode="cover"
                >
                    <Header navigation={navigation} menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
                    {loading && produtos.length === 0 ? (
                        <ActivityIndicator size="large" color="#E359EC" style={{ flex: 1 }}/>
                    ) : (
                        <FlatList
                            data={produtos}
                            renderItem={renderProduto}
                            keyExtractor={(item) => item.id.toString()}
                            onRefresh={carregarDados}
                            refreshing={loading}
                            ListHeaderComponent={
                                <>
                                  <View style={styles.carouselContainer}>
                                    <ImageGallery images={banners} imageStyle={galeriaStyles.bannerImagem} />
                                  </View>
                                  <View style={styles.paymentOptionsContainer}>
                                      <View style={styles.paymentOption}>
                                          <Icon name="credit-card" size={16} color="#E359EC" />
                                          <Text style={styles.paymentText}> Até 6x sem juros</Text>
                                      </View>
                                      <View style={styles.paymentOption}>
                                          <Icon name="money" size={16} color="#E359EC" />
                                          <Text style={styles.paymentText}> 5% off no PIX</Text>
                                      </View>
                                  </View>
                                  <Text style={styles.sectionTitle}>Produtos em Destaque</Text>
                                </>
                            }
                        />
                    )}
                </ImageBackground>
            </SafeAreaView>

            {/* 3. O JSX QUE RENDERIZA O TOAST */}
            {toast.visible && (
                <View style={styles.toastContainer}>
                    <Text style={styles.toastText}>{toast.message}</Text>
                </View>
            )}
        </View>
    );
}