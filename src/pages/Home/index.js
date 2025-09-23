import React, { useState, useEffect, useCallback } from 'react';
import {
    View, Text, Image, TouchableOpacity, ImageBackground,
    SafeAreaView, StatusBar, FlatList, ActivityIndicator, Alert
} from 'react-native';
import styles from './style';
import galeriaStyles from '../../components/Carrossel/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header/index';
import ImageGallery from '../../components/Carrossel/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProdutos } from '../../services/api'; 
import imageMap from '../../components/MapaImages';

const banners = [
    require('../../../assets/images/banner.png'),
    require('../../../assets/images/banner.png'),
];

export default function Home({ navigation }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [produtos, setProdutos] = useState([]); // 2. Começa como uma lista vazia
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    const [favoritos, setFavoritos] = useState([]);

    // Função para carregar os dados (produtos e favoritos)
    const carregarDados = useCallback(async () => {
        setLoading(true);
        try {
            // Busca os produtos da API
            const produtosDaApi = await getProdutos();
            setProdutos(produtosDaApi);

            // Carrega os favoritos do armazenamento local
            const favoritosJson = await AsyncStorage.getItem('favoritos');
            setFavoritos(favoritosJson ? JSON.parse(favoritosJson) : []);

        } catch (error) {
            console.error("Erro ao carregar dados:", error);
            Alert.alert("Erro", "Não foi possível carregar os produtos do servidor.");
        } finally {
            setLoading(false);
        }
    }, []);

    // 3. useEffect para buscar os dados quando a tela é focada
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', carregarDados);
        return unsubscribe;
    }, [navigation, carregarDados]);


    // --- Lógica de Favoritos e Carrinho (Mantida como estava) ---
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
            // Opcional: verificar se o produto já está no carrinho
            carrinho.push(produto);
            await AsyncStorage.setItem('carrinho', JSON.stringify(carrinho));
            navigation.navigate('Carrinho');
        } catch (error) {
            console.log('Erro ao adicionar ao carrinho:', error);
        }
    };

    // Componente para renderizar cada produto na lista
    const renderProduto = ({ item }) => (
        <View style={styles.cardContainer}>
           
            <Image source={imageMap[item.nome_imagem]} style={styles.cardImage} />

            <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                {/* 4. Formatando o preço que vem como número da API */}
                <Text style={styles.cardPrice}>R$ {Number(item.preco).toFixed(2).replace('.', ',')}</Text>

                <TouchableOpacity
                    style={styles.removerContainer}
                    onPress={() => toggleFavorito(item)}
                >
                    <Icon
                        name={isFavorito(item.id) ? 'heart' : 'heart-o'}
                        size={16}
                        color="#E359EC"
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonColumn}>
                <TouchableOpacity
                    style={styles.verButton}
                    // 5. Navegação agora é dinâmica para TODOS os produtos
                    onPress={() => navigation.navigate('Detalhes', { produtoId: item.id })}
                >
                    <Text style={styles.buttonText}>Ver</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.comprarButton}
                    onPress={() => adicionarAoCarrinho(item)}
                >
                    <Text style={styles.buttonText}>Comprar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
            <ImageBackground
                source={require('../../../assets/images/fundo.png')}
                style={styles.background}
                resizeMode="cover"
            >
                <Header
                    navigation={navigation}
                    menuVisible={menuVisible}
                    setMenuVisible={setMenuVisible}
                />
                
                {loading && produtos.length === 0 ? (
                    <ActivityIndicator size="large" color="#E359EC" style={{ flex: 1 }}/>
                ) : (
                    <FlatList
                        style={styles.contentContainer}
                        contentContainerStyle={styles.flatListContent}
                        data={produtos}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
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
                        renderItem={renderProduto}
                        onRefresh={carregarDados} // Permite puxar para atualizar
                        refreshing={loading} // Controla o ícone de atualização
                    />
                )}
            </ImageBackground>
        </SafeAreaView>
    );
}