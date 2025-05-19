import React, { useState } from 'react';
import {View, Text, TouchableOpacity,ScrollView, ImageBackground, Image, SafeAreaView, StatusBar} from 'react-native';
import styles from './style';
import Header from '../../components/Header';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import InputField from '../../components/Input/index'

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [celular, setCelular] = useState('');
  const [senha, setSenha] = useState('');
  const [preferencia, setPreferencia] = useState('');
  const [valorProduto, setValorProduto] = useState(5);
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
                />

             <InputField
              label="Data de nascimento:"
              placeholder="DD/MM/AAAA"
              value={dataNascimento}
              onChangeText={setDataNascimento}
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

            <TouchableOpacity style={styles.botaoEntrar}>
              <Text style={styles.botaoEntrarTexto}>Cadastrar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.botaoCadastrar} onPress={() => navigation.navigate('MinhaConta')}>
            <Text style={styles.botaoCadastrarTexto}>Já tem conta? Faça login</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
