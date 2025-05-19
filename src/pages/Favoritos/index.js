import React, { useState } from 'react';
import {View,Text,Image,ScrollView,TouchableOpacity,ImageBackground,SafeAreaView,StatusBar} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './style';
import Header from '../../components/Header';

export default function Favoritos({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const [produtosFavoritos, setProdutosFavoritos] = useState([
    {
      id: 1,
      nome: 'Unicórnio',
      preco: 'R$ 50,00 ou 2x de R$25,00',
      imagem: require('../../../assets/images/UNICORNIO.png'),
    },
    {
      id: 2,
      nome: 'Sereia',
      preco: 'R$ 100,00 ou 4x de R$25,00',
      imagem: require('../../../assets/images/SEREIA.png'),
    },
    {
      id: 3,
      nome: 'Mochila',
      preco: 'R$ 110,00 ou 5x de R$27,50',
      imagem: require('../../../assets/images/MOCHILA.png'),
    },
    {
      id: 4 ,
      nome: 'Coelho',
      preco: 'R$ 100,00 ou 4x de R$25,00',
      imagem: require('../../../assets/images/COELHO.png'),
    },
    {
      id: 5,
      nome: 'Leão',
      preco: 'R$ 100,00 ou 4x de R$25,00',
      imagem: require('../../../assets/images/LEAO.png'),
    },
  ]);

  const removerFavorito = (id) => {
    const novaLista = produtosFavoritos.filter(item => item.id !== id);
    setProdutosFavoritos(novaLista);
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
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
          <Text style={styles.titulo}>Favoritos</Text>

          {produtosFavoritos.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={item.imagem} style={styles.imagem} />
              <View style={styles.infoContainer}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.preco}>{item.preco}</Text>
                <TouchableOpacity
                  style={styles.favorito}
                  onPress={() => removerFavorito(item.id)}
                >
                  <MaterialCommunityIcons
                    name="heart-broken"
                    size={18}
                    color="#E359EC"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.favoritoTexto}>Remover</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.botoesContainer}>
                <TouchableOpacity style={styles.botaoVer}
                onPress={() => {
                  if (item.id === 5) {
                    navigation.navigate('Leao');
                  } else {
                    alert('Página do produto ainda não disponível!');
                  }
                }}>
                  <Text style={styles.textoVer}>Ver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoComprar}>
                  <Text style={styles.textoComprar}>Comprar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
