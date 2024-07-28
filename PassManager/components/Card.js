import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ data }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>ID:</Text>
      <Text style={styles.value}>{data.id}</Text>
      <Text style={styles.label}>Nama Aplikasi:</Text>
      <Text style={styles.value}>{data.nama_aplikasi}</Text>
      <Text style={styles.label}>Tanggal Edit:</Text>
      <Text style={styles.value}>{data.tanggal_edit}</Text>
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

export default Card;
