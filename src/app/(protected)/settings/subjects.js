import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const calculateProgress = (subject) => {
    if (!subject.topics || subject.topics.length === 0) return 0;
    const completedTopics = subject.topics.filter(t => t.completed).length;
    return (completedTopics / subject.topics.length) * 100;
};

const initialSubjects = [
    {
        id: 1,
        name: "História",
        color: "#4CAF50",
        topics: [
            { id: 101, name: "Antiguidade Clássica", completed: true },
            { id: 102, name: "Idade Média", completed: true },
            { id: 103, name: "Renascimento", completed: false },
            { id: 104, name: "Revolução Industrial", completed: false },
            { id: 105, name: "Guerra Fria", completed: false },
        ]
    },
    {
        id: 2,
        name: "Matemática",
        color: "#4287f5",
        topics: [
            { id: 201, name: "Álgebra Básica", completed: true },
            { id: 202, name: "Geometria Plana", completed: false },
            { id: 203, name: "Cálculo Diferencial", completed: false },
        ]
    },
    {
        id: 3,
        name: "Ciências",
        color: "#e75555",
        topics: [
            { id: 301, name: "Biologia Celular", completed: true },
            { id: 302, name: "Física Nuclear", completed: false },
        ]
    },
];

export default function Subjects() {

    const [subjects, setSubjects] = useState(initialSubjects.map(s => ({
        ...s,
        progress: calculateProgress(s)
    })));

    const [modalVisible, setModalVisible] = useState(false);
    const [newName, setNewName] = useState("");

    const [topicsModalVisible, setTopicsModalVisible] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [newTopicName, setNewTopicName] = useState("");

    const openTopicsModal = (subject) => {
        setSelectedSubject(subject);
        setTopicsModalVisible(true);
    };

    const deleteSubject = (subjectId, subjectName) => {
        Alert.alert(
            "Confirmar Exclusão",
            `Tem certeza que deseja remover a matéria "${subjectName}"? Todos os tópicos também serão perdidos.`,
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: () => {

                        setSubjects(currentSubjects => currentSubjects.filter(s => s.id !== subjectId));

                        setTopicsModalVisible(false);
                    }
                }
            ]
        );
    };

    const deleteTopicFromSubject = (subjectId, topicId, topicName) => {
        Alert.alert(
            "Confirmar Exclusão",
            `Tem certeza que deseja remover o tópico "${topicName}"?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: () => {
                        setSubjects(currentSubjects => {
                            return currentSubjects.map(s => {
                                if (s.id === subjectId) {
                                    const updatedTopics = s.topics.filter(t => t.id !== topicId);
                                    
                                    const updatedSubject = { ...s, topics: updatedTopics };
                                    updatedSubject.progress = calculateProgress(updatedSubject);

                                    setSelectedSubject(updatedSubject); 

                                    return updatedSubject;
                                }
                                return s;
                            });
                        });
                    }
                }
            ]
        );
    };
    
    const toggleTopicCompletion = (subjectId, topicId) => {
        setSubjects(currentSubjects => {
            return currentSubjects.map(s => {
                if (s.id === subjectId) {
                    const updatedTopics = s.topics.map(t => {
                        if (t.id === topicId) {
                            return { ...t, completed: !t.completed }; 
                        }
                        return t;
                    });
                    
                    const updatedSubject = { ...s, topics: updatedTopics };
                    updatedSubject.progress = calculateProgress(updatedSubject);

                    setSelectedSubject(updatedSubject); 

                    return updatedSubject;
                }
                return s;
            });
        });
    };

    const addTopicToSubject = () => {
        if (!newTopicName.trim() || !selectedSubject) return;

        const newTopic = {
            id: Date.now(),
            name: newTopicName.trim(),
            completed: false,
        };

        setSubjects(currentSubjects => {
            return currentSubjects.map(s => {
                if (s.id === selectedSubject.id) {
                    const updatedTopics = [...s.topics, newTopic];
                    const updatedSubject = { ...s, topics: updatedTopics };
                    updatedSubject.progress = calculateProgress(updatedSubject); 
                    
                    setSelectedSubject(updatedSubject); 
                    
                    return updatedSubject;
                }
                return s;
            });
        });

        setNewTopicName(""); 
    };

    const addSubject = () => {
        if (!newName.trim()) return;

        const newSubject = {
            id: Date.now(),
            name: newName.trim(),
            topics: [],
            progress: 0,
            color: ["#4CAF50", "#4287f5", "#e75555", "#ff9800", "#9c27b0", "#00bcd4", "#ff4081"][Math.floor(Math.random() * 7)]
        };

        setSubjects([...subjects, newSubject]);
        setNewName("");
        setModalVisible(false);
    };

    const CheckCircle = ({ completed, color }) => (
        <View style={[styles.checkCircle, { borderColor: color, backgroundColor: completed ? color : 'transparent' }]}>
            {completed && <Ionicons name="checkmark-sharp" size={18} color="white" />}
        </View>
    );

    const TopicItem = ({ topic, subjectColor, subjectId }) => (
        <View style={styles.topicItem}>

            <TouchableOpacity 
                style={styles.topicNameContainer}
                onPress={() => toggleTopicCompletion(subjectId, topic.id)}
            >
                <Text style={[
                    styles.topicName, 
                    { 
                        textDecorationLine: topic.completed ? 'line-through' : 'none', 
                        color: topic.completed ? '#aaa' : 'white' 
                    }
                ]}>
                    {topic.name}
                </Text>
                <CheckCircle completed={topic.completed} color={subjectColor} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.deleteTopicButton}
                onPress={() => deleteTopicFromSubject(subjectId, topic.id, topic.name)}
            >
                <Ionicons name="trash-bin" size={24} color="#e75555" />
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={styles.title}>Minhas Matérias</Text>

            {subjects.map((s) => (
                <TouchableOpacity
                    key={s.id}
                    style={[styles.subjectCard, { borderLeftColor: s.color }]}
                    onPress={() => openTopicsModal(s)}
                >
                    <View>
                        <Text style={styles.subjectName}>{s.name}</Text>
                        <Text style={styles.progressText}>
                            Progresso: {s.progress.toFixed(0)}%
                        </Text>
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

            <Modal visible={topicsModalVisible} transparent animationType="slide">
                <View style={styles.modalBackground}>
                    <View style={[styles.modalBox, { padding: 0 }]}>
                        {selectedSubject && (
                            <>
                                <View style={[styles.topicsHeader, { borderLeftColor: selectedSubject.color }]}>
                                    <View>
                                        <Text style={styles.topicsTitle}>{selectedSubject.name}</Text>
                                        <Text style={styles.topicsProgress}>
                                            Progresso: {selectedSubject.progress.toFixed(0)}%
                                        </Text>
                                    </View>
                                    
                                    <TouchableOpacity 
                                        style={styles.deleteSubjectButton}
                                        onPress={() => deleteSubject(selectedSubject.id, selectedSubject.name)}
                                    >
                                        <Ionicons name="trash-bin-outline" size={26} color="#e75555" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.addTopicContainer}>
                                    <TextInput
                                        value={newTopicName}
                                        onChangeText={setNewTopicName}
                                        placeholder="Adicionar novo tópico/assunto"
                                        placeholderTextColor="#ccc"
                                        style={styles.addTopicInput}
                                    />
                                    <TouchableOpacity 
                                        style={[styles.addTopicButton, { backgroundColor: selectedSubject.color }]}
                                        onPress={addTopicToSubject}
                                    >
                                        <Ionicons name="add" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>

                                <ScrollView style={styles.topicsContainer}>
                                    {selectedSubject.topics.length > 0 ? (
                                        selectedSubject.topics.map((topic) => (
                                            <TopicItem 
                                                key={topic.id} 
                                                topic={topic} 
                                                subjectColor={selectedSubject.color} 
                                                subjectId={selectedSubject.id}
                                            />
                                        ))
                                    ) : (
                                        <Text style={styles.noTopicsText}>
                                            Nenhum tópico adicionado ainda. Adicione um acima!
                                        </Text>
                                    )}
                                </ScrollView>

                                <TouchableOpacity
                                    style={styles.closeTopicsButton}
                                    onPress={() => setTopicsModalVisible(false)}
                                >
                                    <Text style={styles.saveText}>Fechar</Text>
                                </TouchableOpacity>
                            </>
                        )}
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
    topicsHeader: {
        backgroundColor: "#5B5A5E",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderLeftWidth: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    deleteSubjectButton: {
        padding: 5,
    },
    topicsTitle: {
        fontSize: 24,
        color: "white",
        fontWeight: "bold",
    },
    topicsProgress: {
        color: "#ddd",
        marginTop: 5,
    },
    topicsContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        maxHeight: 300,
    },
    topicItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#444",
    },
    topicNameContainer: { 
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10, 
    },
    topicName: {
        fontSize: 18,
        color: "white",
        flex: 1,
    },
    checkCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 15,
    },
    deleteTopicButton: { 
        padding: 5,
        marginLeft: 10,
    },
    closeTopicsButton: {
        backgroundColor: "#e75555",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        margin: 20,
        marginTop: 0,
    },
    addTopicContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    addTopicInput: {
        flex: 1,
        backgroundColor: "#444",
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
        color: "white",
        marginRight: 10,
    },
    addTopicButton: {
        width: 45,
        height: 45,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noTopicsText: {
        color: '#aaa',
        textAlign: 'center',
        paddingVertical: 20,
        fontSize: 16,
    }
});