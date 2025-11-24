import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";

export default function Settings() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
            
            <TouchableOpacity style={styles.option} onPress={() => router.push("/settings/profile")}>
                <Text style={styles.optionText}>Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => router.push("/progress")}>
                <Text style={styles.optionText}>Avanços</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => router.push("/settings/notifications")}>
                <Text style={styles.optionText}>Notificações</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => router.push("/settings/stats")}>
                <Text style={styles.optionText}>Horas de estudo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Remover conta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.deleteButtonText}>Sair</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2f2f2f",
        paddingTop: 40,
        paddingHorizontal: 20,
    },

    option: {
        paddingVertical: 20,
        borderBottomColor: "#bfbfbf",
        borderBottomWidth: 3,
    },

    optionText: {
        fontSize: 28,
        color: "white",
        fontWeight: "500",
    },

    deleteButton: {
        marginTop: 50,
        backgroundColor: "#ff5f5f",
        padding: 15,
        borderRadius: 30,
        alignSelf: "center",
        width: "70%",
        alignItems: "center",
    },

    logoutButton: {
        marginTop: 15,
        backgroundColor: "#ff5f5f",
        padding: 15,
        borderRadius: 30,
        alignSelf: "center",
        width: "70%",
        alignItems: "center",
    },

    deleteButtonText: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
    }
});
