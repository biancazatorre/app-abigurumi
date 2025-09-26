import React, { useState } from 'react';
import { 
  View, Text, Switch, TouchableOpacity, ScrollView, 
  ImageBackground, Image, SafeAreaView, StatusBar, Alert 
} from 'react-native';
import styles from './style'; 
import Header from '../../components/Header';
import InputField from '../../components/Input/index';
import { loginUser } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login({ navigation }) { // 'navigation' vindo das props
  const [login, setLogin] = useState(''); // Estado para o campo de celular
  const [senha, setSenha] = useState('');
  const [manterConectado, setManterConectado] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  // Se 'navigation' não vier das props, use a linha abaixo no lugar
  // const navigation = useNavigation();

  const handleLogin = async () => {
    // 1. Validação dos campos
    if (!login) {
      Alert.alert('Erro', 'O celular é obrigatório!');
      return;
    }
    if (!senha) {
      Alert.alert('Erro', 'A senha é obrigatória!');
      return;
    }

    // 2. Limpeza do número de celular (remove máscara)
    const celularLimpo = login.replace(/\D/g, '');
    
    if (celularLimpo.length !== 11 && celularLimpo.length !== 10) { // Aceita 10 ou 11 dígitos
        Alert.alert('Erro', 'O celular deve conter 10 ou 11 dígitos!');
        return;
    }

    try {
      // 3. Chama a API para tentar o login
      const response = await loginUser({ celular: celularLimpo, senha: senha });

      // --- CORREÇÃO IMPORTANTE ---
      // 4. PRIMEIRO, salva o token e espera a operação terminar
      await AsyncStorage.setItem('userToken', response.token);
      await AsyncStorage.setItem('userData', JSON.stringify(response.user));

      // 5. SÓ DEPOIS de salvar, navega para a tela correta
      if (response.user.tipo === 'admin') {
        navigation.navigate('Admin'); // Vai para o menu de admin
      } else {
        navigation.navigate('Home'); // Vai para a home de cliente
      }

    } catch (error) {
      // Se a API retornar erro (ex: senha inválida), ele será capturado aqui
      Alert.alert('Erro no Login', error.message || 'Falha na autenticação. Tente novamente.');
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