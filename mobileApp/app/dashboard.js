import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Library Dashboard</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/books")} // navigate to Books page
      >
        <Text style={styles.cardText}>📚 View Books</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/borrow")} // navigate to Borrow page
      >
        <Text style={styles.cardText}>📝 Borrow a Book</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // for Android shadow
  },
  cardText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
