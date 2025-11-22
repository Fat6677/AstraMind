import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      
      {/* LOGO */}
      <Image
        source={require("../../assets/images/mylogo.png")} // sementara pakai logo online
        style={styles.logo}
      />

      {/* BUTTON LOGIN */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 3,
  },
  logo: {
    width: 40,
    height: 40,
  },
  loginButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
