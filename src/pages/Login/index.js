import React, { useState } from 'react';
import { 
  View, Text, Switch, TouchableOpacity, ScrollView, 
  ImageBackground, Image, SafeAreaView, StatusBar, Alert 
} from 'react-native';
import styles from './style'; 
import Header from '../../components/Header';
import InputField from '../../components/Input/index';
import { loginUser } from '../../services/api';

export default function Login({ navigation }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [manterConectado, setManterConectado] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  // Dentro do seu componente Login

const handleLogin = async () => {
    if (!login) {
        Alert.alert('Erro', 'O celular é obrigatório!');
        return;
    }
    
    // 👇 1. LIMPE O NÚMERO PRIMEIRO
    const celularLimpo = login.replace(/\D/g, ''); 

    // 👇 2. VALIDE O NÚMERO JÁ LIMPO
    if (celularLimpo.length !== 11) {
        Alert.alert('Erro', 'O celular deve conter 11 dígitos (ex.: 11999999999)!');
        return;
    }
    if (!senha) {
        Alert.alert('Erro', 'A senha é obrigatória!');
        return;
    }

    try {
        // 👇 3. ENVIE O NÚMERO LIMPO PARA A API
        const userData = { celular: celularLimpo, senha };
        const response = await loginUser(userData);

        // A lógica de resposta aqui está com um pequeno erro, vamos corrigir também.
        // A API retorna um objeto { token, user }. A propriedade 'tipo' está dentro de 'user'.
        if (response.user.tipo === 'admin') { 
            Alert.alert('Sucesso', 'Bem-vindo(a), administrador!', [
                { text: 'OK', onPress: () => navigation.navigate('Admin') }
            ]);
        } else {
            Alert.alert('Sucesso', `Se sinta em casa, ${response.user.nome}!`, [
                { text: 'OK', onPress: () => navigation.navigate('Home') }
            ]);
        }
    } catch (error) {
        Alert.alert('Erro', error.message || 'Falha na autenticação. Tente novamente.');
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
