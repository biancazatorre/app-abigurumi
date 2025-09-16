import React from 'react';
import { TextInput, Text, View } from 'react-native';
import styles from './style';

export default function InputField({ label, value, onChangeText, placeholder, keyboardType = 'default', secureTextEntry = false, multiline = false, required = false }) {
  const handleChangeText = (text) => {
    let formattedText = text;

    if (keyboardType === 'phone-pad') {
      formattedText = text.replace(/[^0-9]/g, '');
      if (formattedText.length > 11) formattedText = formattedText.slice(0, 11);

      if (formattedText.length > 0) {
        let formatted = '';
        for (let i = 0; i < formattedText.length; i++) {
          if (i === 0) formatted += '(' + formattedText[i];
          else if (i === 2) formatted += ') ' + formattedText[i];
          else if (i === 7) formatted += '-' + formattedText[i];
          else formatted += formattedText[i];
        }
        formattedText = formatted;
      }
    }
  
    else if (keyboardType === 'numeric') {
      formattedText = text.replace(/[^0-9]/g, '');
      if (formattedText.length > 8) formattedText = formattedText.slice(0, 8);
      if (formattedText.length > 2) formattedText = formattedText.replace(/(\d{2})(\d+)/, '$1/$2');
      if (formattedText.length > 4) formattedText = formattedText.replace(/(\d{2}\/\d{2})(\d+)/, '$1/$2');
    }

    onChangeText(formattedText);
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        value={value}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
      />
    </View>
  );
}