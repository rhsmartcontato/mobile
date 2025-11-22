import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Notifications() {

    const notifications = [
        { id: 1, message: "Você ganhou uma nova tarefa!" },
        { id: 2, message: "Amanhã tem prova de Matemática!" },
        { id: 3, message: "Novo conteúdo de Ciências disponível." },
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Notificações</Text>

            {notifications.map(n => (
                <View key={n.id} style={styles.card}>
                    <Text style={styles.text}>• {n.message}</Text>
                </View>
            ))}
        </ScrollView>
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
        marginBottom: 20,
    },

    card: {
        backgroundColor: "#6C6B6E",
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
    },

    text: {
        color: "white",
        fontSize: 18,
    },
});
