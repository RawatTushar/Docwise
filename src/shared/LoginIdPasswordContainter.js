import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const LoginIdPasswordContainer = ({ placeholder, value, onChange, secureTextEntry }) => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
});

export default LoginIdPasswordContainer;
