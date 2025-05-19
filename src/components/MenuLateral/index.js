import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';


export default function MenuLateral({ visible, onClose, navigation }) {
  const translateX = useRef(new Animated.Value(visible ? 0 : -300)).current;

useEffect(() => {
  Animated.timing(translateX, {
    toValue: visible ? 0 : -300,
    duration: 300,
    useNativeDriver: true,
  }).start();
}, [visible, translateX]);

  return (
    <Animated.View style={[styles.menuContainer, { transform: [{ translateX }] }]}>  
      
      <View style={styles.headerMenu}>
       <TouchableOpacity onPress={() => {navigation.navigate('Home'); onClose();}}>
          <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
        </TouchableOpacity>
                <Text>Menu</Text>

        <TouchableOpacity onPress={onClose}>
          <Icon name="times" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      {/* Itens do Menu */}
      <View style={styles.menuItemContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Login')}>
          <View style={styles.iconContainer}>
            <Icon name="user" size={20} color="#E359EC" />
          </View>
          <Text style={styles.menuText}>Minha Conta</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
      
      <View style={styles.menuItemContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Sobre')}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="leaf" size={20} color="#E359EC" />
          </View>
          <Text style={styles.menuText}>Sobre</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
      
      <View style={styles.menuItemContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Contato')}>
          <View style={styles.iconContainer}>
            <Icon name="envelope" size={20} color="#E359EC" />
          </View>
          <Text style={styles.menuText} >Contato</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
      
      <View style={styles.menuItemContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Favoritos')}>
          <View style={styles.iconContainer}>
            <Icon name="heart" size={20} color="#E359EC" />
          </View>
          <Text style={styles.menuText}>Favoritos</Text>
        </TouchableOpacity>
      </View>
      
      {/* Rodapé com WhatsApp */}
      <View style={styles.footer}>
        <Icon name="whatsapp" size={30} color="#25D366" />
        <Text style={styles.footerText}>(13) 99759-6685</Text>
      </View>
    </Animated.View>

  );
}
