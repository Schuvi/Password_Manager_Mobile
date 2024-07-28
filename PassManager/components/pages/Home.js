import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import Card from "../Card";

export default function Home() {
  const [data, setData] = useState([]);

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

  const renderItem = ({ item }) => <Card data={item} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.text}>Ringkasan Aktivitas</Text>
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id} contentContainerStyle={styles.container} />
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
});
