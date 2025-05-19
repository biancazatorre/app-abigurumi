import React, { useState } from 'react';
import {View, Text, Image, ImageBackground, FlatList,TouchableOpacity, Dimensions, SafeAreaView, StatusBar} from 'react-native';
import styles from './style';
import galeriaStyles from '../../components/Carrossel/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header/index';
import ImageGallery from '../../components/Carrossel/index';

const produtos = [
  {
    id: '1',
    nome: 'Coelho',
    preco: 'R$ 50,00 ou 2x de R$25,00',
    imagem: require('../../../assets/images/COELHO.png')
  },
  {
    id: '2',
    nome: 'Sereia',
    preco: 'R$ 100,00 ou 4x de R$25,00',
    imagem: require('../../../assets/images/SEREIA.png')
  },
  {
    id: '3',
    nome: 'Mochila',
    preco: 'R$ 110,00 ou 5x de R$27,50',
    imagem: require('../../../assets/images/MOCHILA.png')
  }
];

const banners = [
  require('../../../assets/images/banner.png'),
  require('../../../assets/images/banner.png')
];

export default function Home({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [favoritos, setFavoritos] = useState([]);

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const isFavorito = (id) => favoritos.includes(id);

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
              <Image
                source={item.imagem}
                style={styles.cardImage}
                resizeMode="cover"
              />

              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <Text style={styles.cardPrice}>{item.preco}</Text>

                <TouchableOpacity
                  style={styles.removerContainer}
                  onPress={() => toggleFavorito(item.id)}
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
                  onPress={() => navigation.navigate('Carrinho', { produto: item })}
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
