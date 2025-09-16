import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';
import MenuLateral from '../MenuLateral/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header({ navigation, menuVisible, setMenuVisible }) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loadCart = async () => {
      const json = await AsyncStorage.getItem('carrinho');
      if (json) {
        const cart = JSON.parse(json);
        setCartCount(cart.length);
      } else {
        setCartCount(0);
      }
    };

    loadCart();

    const unsubscribe = navigation.addListener('focus', loadCart);
    return unsubscribe;
  }, [navigation]);

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
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
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
