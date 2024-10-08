import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './home';

// Criando o Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  // Componente da tela principal
  function MainScreen({ navigation }) {
    function enterApp() {
      navigation.navigate('Home'); 
    }

    return (
      <ImageBackground 
        source={require('./src/assets/fundo.png')}  
        style={{ flex: 1 }}  // Garante que a imagem de fundo ocupe toda a tela
      > 
        <View style={styles.container}>
          <Image 
            source={require("./src/assets/logo.png")}
            style={styles.logo}
          />

          <TouchableOpacity style={styles.button} onPress={enterApp}>
            <Text style={styles.buttonText}>Vem conhecer</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Tela principal */}
        <Stack.Screen name="App" component={MainScreen} options={{ headerShown: false }} />
        {/* Página Home */}
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    marginBottom: 60,
    width: 300,   
    height: 300, 
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: "#E359EC",
    width: "40%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  }
});
