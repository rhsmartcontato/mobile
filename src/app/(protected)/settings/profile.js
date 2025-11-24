import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Profile() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>

            <View style={styles.box}>
                
                <View style={styles.avatarArea}>
                    <Image
                        source={require("../../../assets/perfil.png")}
                        style={styles.avatar}
                    />

                    <TouchableOpacity style={styles.editIcon}>
                        <Ionicons name="pencil" size={22} color="white" />
                    </TouchableOpacity>

                    <Text style={styles.username}>@user</Text>
                    <Text style={styles.level}>Nível de estudo: Ensino Médio</Text>
                </View>

                <TouchableOpacity onPress={() => router.push("/settings/email")}>
                    <Text style={styles.item}>Email</Text>
                </TouchableOpacity>
                <View style={styles.line} />

                <TouchableOpacity onPress={() => router.push("/settings/password")}>
                    <Text style={styles.item}>Senha</Text>
                </TouchableOpacity>
                <View style={styles.line} />

                <TouchableOpacity onPress={() => router.push("/settings/progress")}>
                    <Text style={styles.item}>Progresso</Text>
                </TouchableOpacity>
                <View style={styles.line} />

                <TouchableOpacity onPress={() => router.push("/settings/subjects")}>
                    <Text style={styles.item}>Matérias</Text>
                </TouchableOpacity>
                <View style={styles.line} />

                <TouchableOpacity onPress={() => router.push("/timeline")}>
                    <Text style={styles.item}>Agenda</Text>
                </TouchableOpacity>
                <View style={styles.line} />

                <TouchableOpacity 
                    style={styles.logout}
                    onPress={() => router.replace("/login")}
                >
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>

            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2f2f2f",
        padding: 20,
    },

    box: {
        backgroundColor: "#6C6B6E",
        borderRadius: 30,
        padding: 25,
        marginTop: 20,
    },

    avatarArea: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },

    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },

    editIcon: {
        position: "absolute",
        bottom: 0,
        right: 105,
        backgroundColor: "#444",
        padding: 8,
        borderRadius: 30,
    },

    username: {
        fontSize: 24,
        color: "white",
        marginTop: 10,
        fontWeight: "bold",
    },

    level: {
        fontSize: 16,
        color: "white",
        opacity: 0.8,
    },

    item: {
        fontSize: 25,
        color: "white",
        marginTop: 25,
        marginBottom: 8,
    },

    line: {
        height: 4,
        backgroundColor: "#bfbfbf",
        borderRadius: 4,
    },

    logout: {
        marginTop: 30,
        backgroundColor: "#ff5f5f",
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: "center",
    },

    logoutText: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
    }
});
