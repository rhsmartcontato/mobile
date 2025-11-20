import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Image, Button, Alert, BackHandler } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useAuth } from "../hooks/Auth";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";


export default function App() {
  const { signIn, signOut } = useAuth();
  const [email, setEmail] = useState("aluno@email.com");
  const [password, setPassword] = useState("A123456a!");
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleEntrarSuper = async () => {
    try {
      await signIn({ email, password });
      router.replace("/");
    } catch (error) {
      Alert.alert("Erro", error.message);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      

      <Image 
        source={require("../assets/lampa.png")} 
        style={styles.lamp}
      />

      <Text style={styles.welcome}>Bem-vindo ao</Text>
      <Text style={styles.title}>StudySync</Text>
      <Text style={styles.subtitle}>Organize tarefas de estudo{'\n'}de forma eficiente</Text>

      <View style={styles.inputbox}>
        <Ionicons name="mail-open-outline" size={20} color="black" />
        <TextInput
          style={styles.emailinput}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputbox}>
        <Ionicons name="lock-closed-outline" size={20} color="black" />
        <TextInput
          style={styles.emailinput}
          placeholder="Senha"
          secureTextEntry={passwordVisibility}
          value={password}
          onChangeText={setPassword}
        />

        <Ionicons
          name={passwordVisibility ? "eye-outline" : "eye-off-outline"}
          size={20}
          color="black"
          onPress={togglePasswordVisibility}
        />
      </View>

      <View style={styles.buttons}>

        <TouchableOpacity style={styles.buttonPrimary} onPress={handleEntrarSuper}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonPrimary} onPress={() => router.push("/about")}>
          <Text style={styles.buttonText}>Sobre</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonExit} onPress={() => BackHandler.exitApp()}>
          <Text style={styles.buttonText}>Sair do aplicativo</Text>
       </TouchableOpacity>

      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 15,
  },

  lamp: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },

  welcome: {
    fontSize: 25,
    color: "#fff",
    fontFamily: "semibold",
  },

  title: {
    fontSize: 50,
    fontFamily: "albertusnovathin",
    color: "#fff",
    marginBottom: 1,
  },

  subtitle: {
    fontSize: 23,
    textAlign: "center",
    color: "#fff",
    fontFamily: "semibold",
    marginBottom: 12,
  },

  inputbox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    width: "100%",
    gap: 10,
  },

  emailinput: {
    flex: 1,
    fontSize: 18,
    fontFamily: "regular",
  },

  buttons: {
    width: "100%",
    gap: 10,
    marginTop: 10,
  },
  buttonPrimary: {
  backgroundColor: "#25bb54",
  paddingVertical: 15,
  borderRadius: 12,
  alignItems: "center",
},

buttonExit: {
  backgroundColor: "#f55a5a",
  paddingVertical: 15,
  borderRadius: 12,
  alignItems: "center",
},

buttonText: {
  color: "#fff",
  fontSize: 20,
  fontFamily: "clear sans bold", // <<<<<< muda a fonte aqui!
},
});
