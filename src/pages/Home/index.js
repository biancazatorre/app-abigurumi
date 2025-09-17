import React, { useState, useEffect } from 'react';
import {View,Text,Image,ImageBackground,FlatList,TouchableOpacity,SafeAreaView,StatusBar,
} 
from 'react-native';
import styles from './style';
import galeriaStyles from '../../components/Carrossel/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header/index';
import ImageGallery from '../../components/Carrossel/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const produtos = [
  {
    id: '1',
    nome: 'Coelho',
    preco: 'R$ 50,00 ou 2x de R$25,00',
    imagem: require('../../../assets/images/COELHO.png'),
    screen: 'Coelho', // Tela de destino
  },
  {
    id: '2',
    nome: 'Sereia',
    preco: 'R$ 100,00 ou 4x de R$25,00',
    imagem: require('../../../assets/images/SEREIA.png'),
    screen: 'ProdutoDetalhes', // Tela de destino genérica
  },
  {
    id: '3',
    nome: 'Mochila',
    preco: 'R$ 110,00 ou 5x de R$27,50',
    imagem: require('../../../assets/images/MOCHILA.png'),
    screen: 'ProdutoDetalhes', // Tela de destino genérica
  },
];

const banners = [
  require('../../../assets/images/banner.png'),
  require('../../../assets/images/banner.png'),
];

export default function Home({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const carregarFavoritos = async () => {
      const json = await AsyncStorage.getItem('favoritos');
      if (json) {
        setFavoritos(JSON.parse(json));
      } else {
        setFavoritos([]);
      }
    };

    carregarFavoritos();
    const unsubscribe = navigation.addListener('focus', carregarFavoritos);
    return unsubscribe;
  }, [navigation]);

  const toggleFavorito = async (produto) => {
    const existe = favoritos.find((item) => item.id === produto.id);
    let novaLista;
    if (existe) {
      novaLista = favoritos.filter((item) => item.id !== produto.id);
    } else {
      novaLista = [...favoritos, produto];
    }
    setFavoritos(novaLista);
    await AsyncStorage.setItem('favoritos', JSON.stringify(novaLista));
  };

  const isFavorito = (id) => favoritos.some((item) => item.id === id);

  const adicionarAoCarrinho = async (produto) => {
    try {
      const carrinhoJson = await AsyncStorage.getItem('carrinho');
      let carrinho = carrinhoJson ? JSON.parse(carrinhoJson) : [];
      carrinho.push(produto);
      await AsyncStorage.setItem('carrinho', JSON.stringify(carrinho));
      navigation.navigate('Carrinho');
    } catch (error) {
      console.log('Erro ao adicionar ao carrinho:', error);
    }
  };

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

        <FlatList
          style={styles.contentContainer}
          contentContainerStyle={styles.flatListContent}
          data={produtos}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <>
              <View style={styles.carouselContainer}>
                <ImageGallery
                  images={banners}
                  imageStyle={galeriaStyles.bannerImagem}
                />
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
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Image source={item.imagem} style={styles.cardImage} />

              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <Text style={styles.cardPrice}>{item.preco}</Text>

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
                  onPress={() => {
                    if (item.nome.toLowerCase() === 'coelho') {
                      navigation.navigate('Coelho');
                    } else {
                      navigation.navigate('ProdutoDetalhes', { produto: item });
                    }
                  }}
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
          )}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
