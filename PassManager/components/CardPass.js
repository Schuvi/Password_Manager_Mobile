import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';

const CardPass = ({ data, onDelete, onEdit }) => {
    const confirmDelete = () => {
        Alert.alert(
          "Konfirmasi Hapus",
          "Apakah Anda yakin ingin menghapus data ini?",
          [
            {
              text: "Tidak",
              style: "cancel"
            },
            { text: "Ya", onPress: () => onDelete(data) }
          ]
        );
    };

    const handleCopy = (password) => {
        Clipboard.setStringAsync(password);
        Alert.alert("Success", "Password Sudah Di-Copy!");
    };
  
    return (
        <View style={styles.card}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{data.id}</Text>
        <Text style={styles.label}>Nama Aplikasi:</Text>
        <Text style={styles.value}>{data.nama_aplikasi}</Text>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{data.username}</Text>
        <Text style={styles.label}>Password:</Text>
        <Text style={styles.value}>{data.password}</Text>
        <Text style={styles.label}>Waktu Pembuatan:</Text>
        <Text style={styles.value}>{data.tanggal_pembuatan}</Text>
        <Button title="Hapus" onPress={confirmDelete} color="red" />
        <Button title="Edit" onPress={() => onEdit(data)} color="blue" style={{ marginTop: '5px' }}/>
        <Button title="Copy Password" onPress={() => handleCopy(data.password)} color="green" />
        </View>
    );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    marginBottom: 10,
  },
});

export default CardPass;
