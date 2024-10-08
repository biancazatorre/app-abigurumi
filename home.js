import React from 'react';
import { View, TextInput, StyleSheet, ImageBackground, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Para o ícone de Pix

const Home = () => {
  return (
    <ImageBackground 
      source={require('./src/assets/fundo.png')} 
      style={styles.background} 
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.icon}>
          <Icon name="bars" size={28} style={styles.iconColor} />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Pesquisar..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={() => alert('Pesquisar clicado')}>
            <Icon name="search" size={20} color="#E359EC" style={styles.searchIcon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.icon}>
          <Icon name="shopping-cart" size={28} style={styles.iconColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.bannerContainer}>
        <Image
          source={require('./src/assets/LEAO.png')} 
          style={styles.bannerImage} 
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.infoButton}>
            <Icon name="credit-card" size={18} color="#000" />
            <Text style={styles.infoButtonText}>Até 6x sem juros</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.infoButton}>
            <MaterialCommunityIcons name="credit-card-outline" size={18} color="#000" />
            <Text style={styles.infoButtonText}>5% de desconto no Pix</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  icon: {
    padding: 10,
  },
  iconColor: {
    color: '#000',
  },
  searchContainer: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    height: 35,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    marginRight: 5, 
    color: '#000',
  },
  searchIcon: {
    marginRight: 10,
  },
  bannerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  bannerImage: {
    width: 363,
    height: 294,
    borderRadius: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 10,
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CDB7E1',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 2,
  },
  infoButtonText: {
    marginLeft: 5,
    color: '#000',
    fontSize: 14,
  },
});

export default Home;
