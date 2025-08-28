import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => alert("Go to Students page")}
      >
        <Text style={styles.cardText}>📚 Students</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => alert("Go to Courses page")}
      >
        <Text style={styles.cardText}>📖 Courses</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginVertical: 20 },
  card: { backgroundColor: "white", padding: 20, borderRadius: 12, marginVertical: 10, width: "100%", alignItems: "center", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5 },
  cardText: { fontSize: 18 },
});
