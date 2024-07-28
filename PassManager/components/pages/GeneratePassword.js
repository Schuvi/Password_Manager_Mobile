import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';

const PasswordGenerator = () => {
  const [hasil, setHasil] = useState("");
  const [copy, setCopy] = useState("");

  const generatePassword = (prefixOptions = ["Satraaliyu", "Satrashufi"], length = 16) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    let result = '';
    const prefix = prefixOptions[Math.floor(Math.random() * prefixOptions.length)];
    const charactersLength = characters.length;
    
    for (let i = 0; i < length - prefix.length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return prefix + result;
  }

  const handleSubmit = () => {
    const response = generatePassword();
    setHasil(response);
    setCopy("Klik Password Untuk Mengcopy");
  };

  const handleCopy = () => {
    Clipboard.setStringAsync(hasil);
    Alert.alert("Success", "Password copied to clipboard!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Generator</Text>
      <TouchableOpacity onPress={handleCopy}>
        <Text style={styles.passwordText}>Password: {hasil}</Text>
      </TouchableOpacity>
      <Text>{copy}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Generate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  passwordText: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PasswordGenerator;
