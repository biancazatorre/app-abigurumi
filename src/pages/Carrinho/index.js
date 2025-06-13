import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import styles from './style';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Carrinho({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const carregarCarrinho = async () => {
      const json = await AsyncStorage.getItem('carrinho');
      if (json) {
        setCarrinho(JSON.parse(json));
      } else {
        setCarrinho([]);
      }
    };

    carregarCarrinho();

    const unsubscribe = navigation.addListener('focus', carregarCarrinho);
    return unsubscribe;
  }, [navigation]);

  const removerItem = async (id) => {
    const novoCarrinho = carrinho.filter(item => item.id !== id);
    setCarrinho(novoCarrinho);
    await AsyncStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
  };

  const finalizarCompra = async () => {
    if (carrinho.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione itens ao carrinho para finalizar a compra.');
      return;
    }

    // Aqui você pode fazer requisição de compra ou redirecionar para tela de pagamento
    Alert.alert('Compra finalizada!', 'Obrigado por sua compra!');
    setCarrinho([]);
    await AsyncStorage.removeItem('carrinho');
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

        <View style={{ padding: 16, flex: 1 }}>
          <Text style={styles.sectionTitle}>Meu Carrinho</Text>

          <FlatList
            data={carrinho}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <Image source={item.imagem} style={styles.cardImage} />
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.nome}</Text>
                  <Text style={styles.cardPrice}>{item.preco}</Text>
                </View>
                <TouchableOpacity onPress={() => removerItem(item.id)}>
                  <Icon name="trash" size={20} color="#E359EC" />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>
                Seu carrinho está vazio.
              </Text>
            }
          />

          {carrinho.length > 0 && (
            <TouchableOpacity style={styles.finalizarButton} onPress={finalizarCompra}>
              <Text style={styles.finalizarButtonText}>Finalizar Compra</Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
