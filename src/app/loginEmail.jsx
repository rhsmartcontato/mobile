import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../hooks/Auth";
import { router } from "expo-router";

export default function LoginEmail() {
    const { signIn } = useAuth();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function handleLogin() {
        if (!email || !senha) {
            alert("Preencha os campos corretamente");
            return;
        }

        signIn({
            nome: "Usuário",
            email: email,
            role: "ALUNO",
        });

        router.replace("/(protected)");
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#333",
                justifyContent: "center",
                paddingHorizontal: 25,
            }}
        >
            <Text
                style={{
                    color: "#fff",
                    fontSize: 30,
                    textAlign: "center",
                    marginBottom: 30,
                }}
            >
                Login com E-mail
            </Text>

            <TextInput
                placeholder="Digite seu e-mail"
                placeholderTextColor="#ccc"
                value={email}
                onChangeText={setEmail}
                style={{
                    backgroundColor: "#444",
                    padding: 15,
                    color: "#fff",
                    borderRadius: 10,
                    marginBottom: 15,
                }}
            />

            <TextInput
                placeholder="Senha"
                placeholderTextColor="#ccc"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
                style={{
                    backgroundColor: "#444",
                    padding: 15,
                    color: "#fff",
                    borderRadius: 10,
                    marginBottom: 30,
                }}
            />

            <TouchableOpacity
                style={{
                    backgroundColor: "#78a8ff",
                    padding: 15,
                    borderRadius: 10,
                    alignItems: "center",
                }}
                onPress={handleLogin}
            >
                <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>
                    Entrar
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => router.back()}
                style={{ marginTop: 20, alignItems: "center" }}
            >
                <Text
                    style={{
                        color: "#78a8ff",
                        textDecorationLine: "underline",
                        fontSize: 16,
                    }}
                >
                    Voltar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
