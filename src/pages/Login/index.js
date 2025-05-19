import React, { useState } from 'react';
import {View, Text, TextInput, Switch, TouchableOpacity, ScrollView, ImageBackground, Image, SafeAreaView, StatusBar} from 'react-native';
import styles from './style'; 
import Header from '../../components/Header';
import InputField from '../../components/Input/index'


export default function MinhaConta({ navigation }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [manterConectado, setManterConectado] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  return (

<SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
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
            label="Login:"
            placeholder="Digite seu login"
            value={login}
            onChangeText={setLogin}
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
             <TouchableOpacity style={styles.botaoEntrar}>
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
