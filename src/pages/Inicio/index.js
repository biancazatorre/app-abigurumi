import React from 'react';
import { View, ImageBackground, Image } from 'react-native';
import styles from './style';
import Botao from '../../components/Botao/index';

export default function Inicio({ navigation }) {
  
  return (
    <ImageBackground source={require('../../../assets/images/fundo.png')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
        
        <Botao 
            titulo="Vem conhecer ➜"
            cor="#E359EC"
            funcao = { () => navigation.navigate('Home')} 
        />
      </View>
    </ImageBackground>
  );
}
