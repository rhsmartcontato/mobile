import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function Subjects() {

    const [subjects, setSubjects] = useState([
        { id: 1, name: "História", progress: 62.5, color: "#4CAF50" },
        { id: 2, name: "Matemática", progress: 25, color: "#4287f5" },
        { id: 3, name: "Ciências", progress: 12.5, color: "#e75555" },
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [newName, setNewName] = useState("");

    const addSubject = () => {
        if (!newName.trim()) return;

        const newSubject = {
            id: Date.now(),
            name: newName.trim(),
            progress: 0,
            color: ["#4CAF50", "#4287f5", "#e75555", "#ff9800", "#9c27b0"][Math.floor(Math.random() * 5)]
        };

        setSubjects([...subjects, newSubject]);
        setNewName("");
        setModalVisible(false);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={styles.title}>Minhas Matérias</Text>

            {subjects.map((s) => (
                <TouchableOpacity
                    key={s.id}
                    style={[styles.subjectCard, { borderLeftColor: s.color }]}
                >
                    <View>
                        <Text style={styles.subjectName}>{s.name}</Text>
                        <Text style={styles.progressText}>Progresso: {s.progress}%</Text>
                    </View>

                    <Ionicons name="chevron-forward" size={28} color="white" />
                </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Ionicons name="add-circle-outline" size={30} color="white" />
                <Text style={styles.addText}>Adicionar matéria</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalBackground}>
                    <View style={styles.modalBox}>

                        <Text style={styles.modalTitle}>Nova Matéria</Text>

                        <TextInput
                            value={newName}
                            onChangeText={setNewName}
                            placeholder="Nome da matéria"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                        />

                        <TouchableOpacity style={styles.saveButton} onPress={addSubject}>
                            <Text style={styles.saveText}>Salvar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

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
    },

    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    modalBox: {
        width: "100%",
        backgroundColor: "#3b3b3b",
        padding: 25,
        borderRadius: 20,
    },

    modalTitle: {
        fontSize: 22,
        color: "white",
        fontWeight: "bold",
        marginBottom: 20,
    },

    input: {
        backgroundColor: "#555",
        padding: 12,
        borderRadius: 10,
        fontSize: 18,
        color: "white",
        marginBottom: 20,
    },

    saveButton: {
        backgroundColor: "#25bb54",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 10,
    },

    saveText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },

    cancelText: {
        color: "#ddd",
        fontSize: 16,
        textAlign: "center",
    },
});
