import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

const base_url = "https://sheetdb.io/api/v1/243lr64k6j0xy?sheet=Password";

export default function AddPassword({ navigation }) {
  const date = new Date();
  const time = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  const [id, setId] = useState("INCREMENT");
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [waktu, setWaktu] = useState(time.toString());

  const handleSubmit = () => {
    const data = {
      id: id,
      nama_aplikasi: nama,
      username: username,
      password: password,
      tanggal_pembuatan: waktu,
    };

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: base_url,
      headers: {
        Authorization: "Bearer {Token}",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.created == 1) {
          alert("Data Berhasil Ditambahkan");
          setNama("");
          setUsername("");
          setPassword("");
          navigation.goBack();
        } else {
          alert("Data Gagal Ditambahkan");
        }
      })
      .catch((error) => {
        if (error.response) {
          // The server responded with a status code outside the 2xx range
          console.log("Error response:", error.response);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("Error request:", error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.log("Error message:", error.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nama Aplikasi</Text>
      <TextInput style={styles.input} value={nama} onChangeText={setNama} />
      <Text style={styles.label}>Username</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} />
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Tambah Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
