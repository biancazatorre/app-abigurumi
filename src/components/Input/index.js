// components/InputField.js
import React from 'react';
import { TextInput, Text, View } from 'react-native';
import styles from './style';

export default function InputField({ label, value, onChangeText, placeholder, keyboardType = 'default', secureTextEntry = false, multiline = false, required = false }) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
      />
    </View>
  );
}
