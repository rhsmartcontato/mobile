import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../hooks/Auth";

export default function Login() {
    const { signIn } = useAuth();

    function handleGoogleLogin() {
        signIn({
            nome: "Usuário Google",
            email: "alunouser@gmail.com",
            role: "ALUNO",
        });

        router.replace("/(protected)");
    }

    function handleFacebookLogin() {
        signIn({
            nome: "Usuário Facebook",
            email: "alunouser@facebook.com",
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
                alignItems: "center",
                paddingHorizontal: 25,
                gap: 25,
            }}
        >

            <Image
                source={require("../assets/lampa.png")}
                style={{ width: 90, height: 90, marginBottom: 15 }}
            />

            <Text style={{ fontSize: 28, color: "#fff", fontFamily: "bold" }}>
                Bem-vindo ao
            </Text>

            <Text
                style={{
                    fontSize: 45,
                    color: "#fff",
                    fontFamily: "albertusnova_bold",
                    marginTop: -10,
                }}
            >
                StudySync
            </Text>

            <Text
                style={{
                    fontSize: 22,
                    textAlign: "center",
                    color: "#fff",
                    fontFamily: "semibold",
                    marginTop: -5,
                }}
            >
                Organize tarefas de estudo{'\n'}de forma eficiente
            </Text>

            <TouchableOpacity
                style={{
                    backgroundColor: "#fff",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 14,
                    paddingHorizontal: 20,
                    borderRadius: 30,
                    width: "100%",
                    gap: 10,
                }}
                onPress={handleGoogleLogin}
            >
                <Image
                    source={require("../assets/google.png")}
                    style={{ width: 25, height: 26 }}
                />
                <Text style={{ fontSize: 18, color: "#777" }}>
                    Entrar com Google
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    backgroundColor: "#fff",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 14,
                    paddingHorizontal: 20,
                    borderRadius: 30,
                    width: "100%",
                    gap: 10,
                }}
                onPress={handleFacebookLogin}
            >
                <Image
                    source={require("../assets/facebook.webp")}
                    style={{ width: 26, height: 26 }}
                />
                <Text style={{ fontSize: 18, color: "#777" }}>
                    Entrar com Facebook
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    backgroundColor: "#fff",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 14,
                    paddingHorizontal: 20,
                    borderRadius: 30,
                    width: "100%",
                    gap: 10,
                }}
                onPress={() => router.push("/loginEmail")}
            >
                <Image
                    source={require("../assets/gmail.png")}
                    style={{ width: 26, height: 20 }}
                />
                <Text style={{ fontSize: 18, color: "#777" }}>
                    Entrar com E-mail
                </Text>
            </TouchableOpacity>

            <Text style={{ color: "#fff", marginTop: 10 }}>
                já tem uma conta?{" "}
                <Text
                    style={{ textDecorationLine: "underline", color: "#78a8ff" }}
                    onPress={() => router.push("/loginEmail")}
                >
                    Entrar
                </Text>
            </Text>

            <Text
                style={{
                    textDecorationLine: "underline",
                    color: "#78a8ff",
                    fontSize: 18,
                }}
                onPress={() => router.replace("/(protected)")}
            >
                entrar sem conta
            </Text>
        </View>
    );
}
