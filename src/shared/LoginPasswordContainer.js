import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const LoginPasswordContainer = ({ placeholder, value, onChange, secureTextEntry, usePasswordEye }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        placeholderTextColor="#666"
        autoCapitalize="none"
      />
      {usePasswordEye}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 8,
    padding: 12,
    paddingRight: 54,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
});

export default LoginPasswordContainer;
