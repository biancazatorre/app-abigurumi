import React, { useEffect, useState } from 'react';
import {View,Text,Image,ScrollView,TouchableOpacity,ImageBackground,SafeAreaView,StatusBar,} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import Header from '../../components/Header';
import { BASE_URL } from '../../services/api';


export default function Favoritos({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [produtosFavoritos, setProdutosFavoritos] = useState([]);

  useEffect(() => {
    const carregarFavoritos = async () => {
      const json = await AsyncStorage.getItem('favoritos');
      if (json) {
        setProdutosFavoritos(JSON.parse(json));
      }
    };
    const unsubscribe = navigation.addListener('focus', carregarFavoritos);
    return unsubscribe;
  }, [navigation]);

  const removerFavorito = async (id) => {
    const novaLista = produtosFavoritos.filter((item) => item.id !== id);
    setProdutosFavoritos(novaLista);
    await AsyncStorage.setItem('favoritos', JSON.stringify(novaLista));
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
              <Image source={{ uri: `${BASE_URL}${item.imagem_url}` }} style={styles.imagem} />
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
                <TouchableOpacity
                  style={styles.botaoVer}
                  onPress={() => {
                    if (item.nome.toLowerCase() === 'leão') {
                      navigation.navigate('Leao');
                    } else {
                      navigation.navigate('ProdutoDetalhes', { produto: item });
                    }
                  }}
                >
                  <Text style={styles.textoVer}>Ver</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.botaoComprar}
                  onPress={() => navigation.navigate('Carrinho', { produto: item })}
                >
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
