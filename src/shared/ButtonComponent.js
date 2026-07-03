import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonComponent = ({ title, onPressEvent, disabled, extraStyles }) => {
  return (
    <TouchableOpacity
      style={[styles.button, extraStyles, disabled && styles.disabled]}
      onPress={onPressEvent}
      disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0f62fe',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default ButtonComponent;
