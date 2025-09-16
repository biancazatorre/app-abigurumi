import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, ScrollView, ImageBackground, Image, SafeAreaView, StatusBar, Alert } from 'react-native';
import styles from './style'; 
import Header from '../../components/Header';
import InputField from '../../components/Input/index';
import { loginUser } from '../../services/api';


export default function Login({ navigation }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [manterConectado, setManterConectado] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogin = async () => {
    if (!login) {
      Alert.alert('Erro', 'O celular é obrigatório!');
      return;
    }
    if (login.replace(/[^0-9]/g, '').length !== 11) {
      Alert.alert('Erro', 'O celular deve conter 11 dígitos (ex.: 11999999999)!');
      return;
    }
    if (!senha) {
      Alert.alert('Erro', 'A senha é obrigatória!');
      return;
    }

    try {
      const userData = { celular: login, senha };
      const response = await loginUser(userData);
      Alert.alert('Sucesso', `Se sinta em casa, ${response.nome}!`, [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);
    } catch (error) {
      Alert.alert('Erro', error.toString() || 'Falha na autenticação. Tente novamente.');
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
            <Text style={styles.cardTitle}>Login</Text>

            <InputField
              label="Celular:"
              placeholder="(XX) XXXXX-XXXX"
              value={login}
              onChangeText={setLogin}
              keyboardType="phone-pad"
            />

            <InputField
              label="Senha:"
              placeholder="Digite sua senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />

            <TouchableOpacity>
              <Text style={styles.esqueciSenha}>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <View style={styles.switchContainer}>
              <Switch
                value={manterConectado}
                onValueChange={setManterConectado}
                thumbColor="#E359EC"
              />
              <Text style={styles.switchLabel}>Manter conectado?</Text>
            </View>
            
            <TouchableOpacity style={styles.botaoEntrar} onPress={handleLogin}>
              <Text style={styles.botaoEntrarTexto}>Entrar</Text>
            </TouchableOpacity>

            <Text style={styles.politica}>
              Ao continuar com o acesso, você concorda com a nossa{' '}
              <Text style={styles.link}>política de privacidade</Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.botaoCadastrar} onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.botaoCadastrarTexto}>Não tem conta? Cadastre-se</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}