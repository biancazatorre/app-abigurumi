import React from 'react';
import { TextInput, Text, View } from 'react-native';
import styles from './style';

export default function InputField({ label, value, onChangeText, mask, ...props }) {
  const handleChangeText = (text) => {
    let formattedText = text;

    // --- NOVA LÓGICA DE MÁSCARA ---
    if (mask === 'date') {
        // Remove tudo que não for número
        formattedText = text.replace(/\D/g, '');
        // Adiciona a primeira barra depois de 2 dígitos
        if (formattedText.length > 2) {
            formattedText = formattedText.replace(/(\d{2})(\d)/, '$1/$2');
        }
        // Adiciona a segunda barra depois de 5 caracteres (DD/MM)
        if (formattedText.length > 5) {
            formattedText = formattedText.replace(/(\d{2}\/\d{2})(\d)/, '$1/$2');
        }
    } 
    // Lógica do celular continua a mesma
    else if (props.keyboardType === 'phone-pad') {
        formattedText = text.replace(/[^0-9]/g, '');
        if (formattedText.length > 11) formattedText = formattedText.slice(0, 11);

        if (formattedText.length > 0) {
            let formatted = '';
            if (formattedText.length > 0) formatted = '(' + formattedText.substring(0, 2);
            if (formattedText.length > 2) formatted += ') ' + formattedText.substring(2, 7);
            if (formattedText.length > 7) formatted += '-' + formattedText.substring(7, 11);
            formattedText = formatted;
        }
    } 
    // Lógica do preço continua a mesma
    else if (props.keyboardType === 'numeric') {
        formattedText = text.replace(/[^0-9,]/g, '');
    }

    onChangeText(formattedText);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, props.multiline && styles.textArea]}
        value={value}
        onChangeText={handleChangeText}
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  );
}