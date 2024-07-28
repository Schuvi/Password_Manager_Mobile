import React, { useState, useEffect } from "react";
import { Button, Text, View, TextInput, StyleSheet, FlatList, SafeAreaView, Alert, Modal, TouchableOpacity } from "react-native";
import CardPass from "../CardPass";
import axios from "axios";

export default function AllPassword({ navigation }) {
  const [data, setData] = useState([]);
  const [cari, setCari] = useState("");
  const [column, setColumn] = useState("id");
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);

  const base_url = "https://sheetdb.io/api/v1/243lr64k6j0xy";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(base_url + "?sheet=Password", {
        headers: {
          Authorization: "Bearer {Token}",
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const search = (e) => {
    e.preventDefault();
    axios
      .get(base_url + `/search?sheet=Password&nama_aplikasi=${cari}`, {
        headers: { Authorization: "Bearer {Token}" },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const hapus = (data) => {
    console.log(data.id);

    axios
      .delete(base_url + `/${column}/${data.id}?sheet=Password`, {
        headers: { Authorization: "Bearer {Token}" },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.deleted == 1) {
          Alert.alert("Sukses", "Data berhasil dihapus");
          fetchData();
        }
      })
      .catch((error) => {
        console.error(error.message);
        Alert.alert("Gagal", "Terjadi kesalahan saat menghapus data");
      });
  };

  const edit = (item) => {
    setEditData(item);
    setEditModalVisible(true);
  };

  const handleEditSubmit = () => {
    const date = new Date();
    const time = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    const dataToEdit = {
      id: editData.id,
      nama_aplikasi: editData.nama_aplikasi,
      username: editData.username,
      password: editData.password,
      tanggal_pembuatan: editData.tanggal_pembuatan,
      tanggal_edit: time,
    };

    const config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: base_url + `/id/${editData.id}?sheet=Password`,
      headers: {
        Authorization: "Bearer {Token}",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(dataToEdit),
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));

        if (response.data.updated == 1) {
          Alert.alert("Sukses", "Data berhasil diperbarui");
          setEditModalVisible(false);
          fetchData(); // Refresh data
        } else {
          Alert.alert("Gagal", "Data gagal diperbarui");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const renderItem = ({ item }) => <CardPass data={item} onDelete={hapus} onEdit={edit} />;

  const tambahPass = () => {
    navigation.navigate("Tambah Password");
  };

  const tampilkanSemua = () => {
    fetchData();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.text}>Semua Password</Text>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Cari Nama Aplikasi" value={cari} onChangeText={(text) => setCari(text)} />
        <Button title="Cari" onPress={search} />
      </View>
      <Button title="Tampilkan semua" onPress={tampilkanSemua} />
      <TouchableOpacity style={styles.addButton} onPress={tambahPass}>
        <Text style={styles.addButtonText}>Tambah Password</Text>
      </TouchableOpacity>
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id} contentContainerStyle={styles.container} />

      <Modal visible={isEditModalVisible} animationType="slide" onRequestClose={() => setEditModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>Edit Data</Text>
          {editData && (
            <>
              <Text>ID: {editData.id}</Text>
              <TextInput style={styles.input} placeholder="Nama Aplikasi" value={editData.nama_aplikasi} onChangeText={(text) => setEditData({ ...editData, nama_aplikasi: text })} />
              <TextInput style={styles.input} placeholder="Username" value={editData.username} onChangeText={(text) => setEditData({ ...editData, username: text })} />
              <TextInput style={styles.input} placeholder="Password" value={editData.password} onChangeText={(text) => setEditData({ ...editData, password: text })} secureTextEntry />
              <Button title="Simpan" onPress={handleEditSubmit} />
              <Button title="Batal" onPress={() => setEditModalVisible(false)} color="red" />
            </>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  container: {
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: "100%",
  },
  addButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
