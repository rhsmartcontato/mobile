import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

export default function EmailSettings() {
    const [email, setEmail] = useState("usuario@gmail.com");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alterar E-mail</Text>

            <Text style={styles.label}>E-mail atual</Text>
            <TextInput 
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#bbb"
                keyboardType="email-address"
            />

            <TouchableOpacity style={styles.saveBtn}>
                <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2f2f2f",
        padding: 20,
    },
    title: {
        fontSize: 28,
        color: "white",
        fontWeight: "bold",
        marginBottom: 30,
    },
    label: {
        fontSize: 18,
        color: "white",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "#4b4b4b",
        color: "white",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        fontSize: 16,
    },
    saveBtn: {
        backgroundColor: "#25bb54",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 15,
    },
    saveText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    backBtn: {
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "#555",
    },
    backText: {
        color: "white",
        fontSize: 18,
    },
});
