import React, { useState }  from 'react';
import {View, Text, ScrollView, ImageBackground, StatusBar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 

import Header from '../../components/Header';
import styles from './style';

export default function Sobre({ navigation }) {
    const [menuVisible, setMenuVisible] = useState(false);

  return (
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
          <View style={styles.cardSobre}>
            <Text style={styles.cardTitle}>Sobre</Text>

            <Text style={styles.textSectionTitle}>Quem somos</Text>
            <Text style={styles.textParagraph}>
              A Abigurumi é uma empresa apaixonada por transformar fios e tecidos em arte, criando produtos artesanais únicos que encantam crianças e adultos. Cada peça é feita com carinho e atenção aos detalhes, valorizando o trabalho manual e a beleza de produtos feitos à mão. Nosso compromisso é levar alegria, conforto e originalidade para cada cliente, promovendo experiências memoráveis e cheias de afeto.
            </Text>

            <Text style={styles.textSectionTitle}>Missão</Text>
            <Text style={styles.textParagraph}>
              Oferecer produtos artesanais de alta qualidade que unem criatividade, cuidado e exclusividade, proporcionando momentos de alegria e conexão afetiva para nossos clientes.
            </Text>

            <Text style={styles.textSectionTitle}>Visão</Text>
            <Text style={styles.textParagraph}>
              Ser referência nacional em produtos artesanais, reconhecida por nossa inovação, sustentabilidade e pelo compromisso de transformar arte em experiências memoráveis.</Text>

            <Text style={styles.textSectionTitle}>Valores</Text>
            <Text style={styles.textParagraph}>
             Valorizamos a originalidade em cada peça que produzimos. | Comprometemo-nos a entregar produtos duráveis e feitos com excelência. | Cada criação é feita com cuidado e atenção aos detalhes | Priorizamos práticas responsáveis |Valorização do artesanato: Respeitamos e promovemos a arte de fazer à mão.
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
