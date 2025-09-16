import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Image, SafeAreaView, StatusBar, Alert } from 'react-native';
import styles from './style';
import Header from '../../components/Header';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import InputField from '../../components/Input/index';



export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [celular, setCelular] = useState('');
  const [senha, setSenha] = useState('');
  const [preferencia, setPreferencia] = useState('');
  const [valorProduto, setValorProduto] = useState(5);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleRegister = async () => {
    // Validações
    if (!nome.trim()) {
      Alert.alert('Erro', 'O nome é obrigatório!');
      return;
    }
    if (!celular || celular.replace(/[^0-9]/g, '').length !== 11) {
      Alert.alert('Erro', 'O celular deve conter 11 dígitos!');
      return;
    }
    if (!dataNascimento || !/^\d{2}\/\d{2}\/\d{4}$/.test(dataNascimento)) {
      Alert.alert('Erro', 'A data de nascimento deve estar no formato DD/MM/AAAA!');
      return;
    }
    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres!');
      return;
    }
    if (!preferencia) {
      Alert.alert('Erro', 'Selecione uma preferência (salgado ou doce)!');
      return;
    }

    try {
      const userData = {
        celular,
        nome,
        dataNascimento,
        senha,
        preferencia,
        valorProduto,
      };
      const response = await registerUser(userData);
      Alert.alert('Sucesso', 'Cadastrado com sucesso! Eba!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert('Erro', error.toString() || 'Algo deu errado. Tente novamente!');
    }
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
          <View style={styles.logoContainer}>
            <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
          </View>

          <View style={styles.cardLogin}>
            <Text style={styles.cardTitle}>Cadastro</Text>

            <InputField
              label="Nome:"
              placeholder="Digite seu nome"
              value={nome}
              onChangeText={setNome}
              required
            />

            <InputField
              label="Data de nascimento:"
              placeholder="DD/MM/AAAA"
              value={dataNascimento}
              onChangeText={setDataNascimento}
              keyboardType="numeric"
            />

            <InputField
              label="Celular:"
              placeholder="(XX) XXXXX-XXXX"
              value={celular}
              onChangeText={setCelular}
              keyboardType="phone-pad"
            />

            <InputField
              label="Senha:"
              placeholder="Digite sua senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              required
            />

            <Text style={styles.label}>Você prefere salgado ou doce?</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={preferencia}
                onValueChange={(itemValue) => setPreferencia(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Selecione uma opção" value="" />
                <Picker.Item label="Salgado" value="salgado" />
                <Picker.Item label="Doce" value="doce" />
              </Picker>
            </View>
            
            <Text style={styles.label}>Quanto você valoriza produtos feitos à mão?</Text>
            <View style={styles.sliderContainer}>
              <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={0}
                maximumValue={3}
                step={1}
                value={valorProduto}
                onValueChange={setValorProduto}
                minimumTrackTintColor="#E359EC"
                maximumTrackTintColor="#ADEEE8"
                thumbTintColor="#E359EC"
              />
              <Text style={styles.sliderValue}>Valor: {valorProduto}</Text>
            </View>

            <TouchableOpacity style={styles.botaoEntrar} onPress={handleRegister}>
              <Text style={styles.botaoEntrarTexto}>Cadastrar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.botaoCadastrar} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.botaoCadastrarTexto}>Já tem conta? Faça login</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}