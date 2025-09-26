
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, Image, StatusBar } from 'react-native';
import styles from './style'; // Você pode criar um style.js para esta tela
import Header from '../../components/Header';

export default function AdminMenu({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

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
        <View style={styles.container}>
          <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Painel do Administrador</Text>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('ProductForm', { produto: null })} // Passa 'null' para indicar modo de criação
          >
            <Text style={styles.menuButtonText}>Cadastrar Novo Produto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('Lista')}
          >
            <Text style={styles.menuButtonText}>Ver/Editar Produtos</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}