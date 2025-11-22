import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

export default function PasswordSettings() {
    const [current, setCurrent] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirm, setConfirm] = useState("");

    function savePassword() {
        if (newPass.length < 6) {
            Alert.alert("Erro", "A nova senha deve ter pelo menos 6 caracteres.");
            return;
        }
        if (newPass !== confirm) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }
        Alert.alert("Sucesso!", "Senha alterada com sucesso!");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alterar Senha</Text>

            <Text style={styles.label}>Senha atual</Text>
            <TextInput 
                style={styles.input}
                secureTextEntry
                value={current}
                onChangeText={setCurrent}
                placeholder="Digite sua senha atual"
                placeholderTextColor="#bbb"
            />

            <Text style={styles.label}>Nova senha</Text>
            <TextInput 
                style={styles.input}
                secureTextEntry
                value={newPass}
                onChangeText={setNewPass}
                placeholder="Digite a nova senha"
                placeholderTextColor="#bbb"
            />

            <Text style={styles.label}>Confirmar nova senha</Text>
            <TextInput 
                style={styles.input}
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
                placeholder="Confirme sua nova senha"
                placeholderTextColor="#bbb"
            />

            <TouchableOpacity style={styles.saveBtn} onPress={savePassword}>
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
