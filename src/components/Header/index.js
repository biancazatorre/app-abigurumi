import React from 'react';
import { View, TextInput, TouchableOpacity, Text,  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';
import MenuLateral from '../MenuLateral/index';

export default function Header({ navigation, menuVisible, setMenuVisible }) {
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => setMenuVisible(true)}>
          <Icon name="bars" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <TextInput 
            placeholder="Pesquisar produtos..." 
            style={styles.searchInput} 
            placeholderTextColor="#999"
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="search" size={18} color="#E359EC" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.headerIcon} 
          onPress={() => navigation.navigate('Carrinho')}
        >
          <Icon name="shopping-cart" size={24} color="#000" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <MenuLateral 
        visible={menuVisible} 
        onClose={() => setMenuVisible(false)} 
        navigation={navigation} 
      />
    </>
  );
}
