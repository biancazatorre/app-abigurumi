import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './style';

export default function Button(props) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: props.cor }, props.style]}
      onPress={props.funcao}
    >
      <Text style={[styles.text, props.style]}>{props.titulo}</Text>
    </TouchableOpacity>
  );
}
