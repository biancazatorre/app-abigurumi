import React, { useState }  from 'react';
import {View, Text, ScrollView, ImageBackground,SafeAreaView, StatusBar} from 'react-native';
import Header from '../../components/Header';
import styles from './style';

export default function Sobre({ navigation }) {
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

        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.cardSobre}>
            <Text style={styles.cardTitle}>Sobre</Text>

            <Text style={styles.textSectionTitle}>Quem somos</Text>
            <Text style={styles.textParagraph}>
              xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx.
            </Text>

            <Text style={styles.textSectionTitle}>Missão</Text>
            <Text style={styles.textParagraph}>
              xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx.
            </Text>

            <Text style={styles.textSectionTitle}>Visão</Text>
            <Text style={styles.textParagraph}>
              xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx.
            </Text>

            <Text style={styles.textSectionTitle}>Valores</Text>
            <Text style={styles.textParagraph}>
              xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx.
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
