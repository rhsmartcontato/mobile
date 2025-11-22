import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function Subjects() {

    const [subjects, setSubjects] = useState([
        { id: 1, name: "História", progress: 62.5, color: "#4CAF50" },
        { id: 2, name: "Matemática", progress: 25, color: "#4287f5" },
        { id: 3, name: "Ciências", progress: 12.5, color: "#e75555" },
    ]);

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 40 }}
        >
            <Text style={styles.title}>Minhas Matérias</Text>

            {subjects.map((s) => (
                <TouchableOpacity 
                    key={s.id}
                    style={[styles.subjectCard, { borderLeftColor: s.color }]}
                    onPress={() => router.push(`/settings/subjects/${s.id}`)}
                >
                    <View>
                        <Text style={styles.subjectName}>{s.name}</Text>
                        <Text style={styles.progressText}>Progresso: {s.progress}%</Text>
                    </View>

                    <Ionicons name="chevron-forward" size={28} color="white" />
                </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add-circle-outline" size={30} color="white" />
                <Text style={styles.addText}>Adicionar matéria</Text>
            </TouchableOpacity>
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
        marginBottom: 25,
    },

    subjectCard: {
        backgroundColor: "#5B5A5E",
        padding: 20,
        borderRadius: 15,
        marginBottom: 15,
        borderLeftWidth: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    subjectName: {
        fontSize: 22,
        color: "white",
        fontWeight: "bold",
    },

    progressText: {
        color: "#ddd",
    },

    addButton: {
        backgroundColor: "#25bb54",
        marginTop: 25,
        padding: 15,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },

    addText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    }
});
