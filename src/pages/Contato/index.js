import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, SafeAreaView, Image, StatusBar } from 'react-native';
import styles from './style';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Contato({ navigation }) {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const handleEnviar = () => {
    console.log({ nome, whatsapp, mensagem });
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

      <View style={styles.logoContainer}>
          <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
        </View>

      <View style={styles.card}>
      <Text style={styles.cardTitle}>Contato</Text>
        <Text style={styles.label}>Nome: <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Maria da Silva"
        />

        <Text style={styles.label}>Whatsapp: <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          value={whatsapp}
          onChangeText={setWhatsapp}
          placeholder="(xx) xxxxx-xxxx"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Adicionar Fotos</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={() => alert("Abrir galeria")}>
          <Icon name="image" size={20} color="#gray" style={styles.uploadIcon} />
          <Text style={styles.uploadText}>Carregar do dispositivo</Text>
        </TouchableOpacity>


        <Text style={styles.label}>Mensagem: <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={mensagem}
          onChangeText={setMensagem}
          placeholder="Olá, eu gostaria de..."
          multiline={true}
        />

        <TouchableOpacity style={styles.botao} onPress={handleEnviar}>
          <Text style={styles.botaoTexto}>Enviar</Text>
        </TouchableOpacity>
      </View>

    </ImageBackground>
</SafeAreaView>
  );
}
