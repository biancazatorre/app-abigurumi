import React, { useState } from 'react';
import { View,Text,Image,TouchableOpacity,ScrollView,ImageBackground,SafeAreaView,StatusBar,} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './style';
import Header from '../../components/Header';

export default function Coelho({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const imagensCoelho = [
    require('../../../assets/images/COELHO.png'),
    require('../../../assets/images/COELHO2.png'),
    require('../../../assets/images/COELHO3.png'),
  ];

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
          <View style={styles.card}>
            
            {/* Galeria de imagens horizontal */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.galeria}
              contentContainerStyle={styles.galeriaContent}
            >
              {imagensCoelho.map((img, index) => (
                <Image key={index} source={img} style={styles.produtoImagem} />
              ))}
            </ScrollView>

            <View style={styles.infoContainer}>
              <View style={styles.textoContainer}>
                <Text style={styles.nomeProduto}>Coelho</Text>

                <View style={styles.precoContainer}>
                  <Text style={styles.precoPix}>
                    R$ 85,50 <Text style={styles.pix}>no PIX </Text>
                    <MaterialCommunityIcons name="cash" size={16} />
                  </Text>
                  <Text style={styles.precoParcelado}>
                    ou R$ 90,00 à vista{'\n'}ou 3x de R$30,00{' '}
                    <MaterialIcons name="payment" size={16} />
                  </Text>
                </View>

                <Text style={styles.descricaoTitulo}>Descrição</Text>
                <Text style={styles.descricaoTexto}>Tamanho: 50cm</Text>
                <Text style={styles.descricaoTexto}>Linha ecológica</Text>
              </View>

              <View style={styles.botoesContainer}>
                <TouchableOpacity style={styles.botaoComprar}>
                  <Text style={styles.textoComprar}>Comprar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botaoCarrinho}>
                  <Text style={styles.textoCarrinho}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
