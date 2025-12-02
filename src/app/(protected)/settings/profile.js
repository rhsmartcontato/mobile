import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Modal, Alert } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as ImagePicker from 'expo-image-picker'; 
import { useAuth } from "../../../hooks/Auth";

export default function Profile() {
    const { user, updateProfile, signOut } = useAuth();
    
    const [modalVisible, setModalVisible] = useState(false);
    const [newUsername, setNewUsername] = useState(user?.user?.nome || 'Convidado'); 
    const [newPicture, setNewPicture] = useState(user?.user?.photoUrl || require("../../../assets/perfil.png")); 
    
    const profileImageSource = typeof newPicture === 'string' && newPicture.startsWith('http') 
        ? { uri: newPicture } 
        : newPicture;

    const handleImagePick = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão Negada', 'Precisamos de permissão para acessar sua galeria.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            const newUri = result.assets[0].uri;
            
            try {
                await updateProfile({ photoUrl: newUri }); 
                setNewPicture(newUri);
                Alert.alert('Sucesso', 'Foto de perfil atualizada.');
            } catch (error) {
                 Alert.alert('Erro', 'Não foi possível fazer o upload da foto.');
            }
        }
    };

    const handleNameUpdate = async () => {
        if (!newUsername.trim()) {
            Alert.alert('Erro', 'O nome de usuário não pode ser vazio.');
            return;
        }
        
        try {
            const updatedUser = await updateProfile({ nome: newUsername.trim() });
            setNewUsername(updatedUser.nome);
            setModalVisible(false);
            Alert.alert('Sucesso', 'Nome de usuário atualizado.');
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível salvar o nome.');
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Alterar Nome de Usuário</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setNewUsername}
                            value={newUsername}
                            placeholder="Novo nome"
                            placeholderTextColor="#999"
                        />
                        <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonSave]}
                                onPress={handleNameUpdate}
                            >
                                <Text style={styles.textStyle}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.box}>
                
                <View style={styles.avatarArea}>
                    <Image
                        source={profileImageSource} 
                        style={styles.avatar}
                    />
                    
                    <TouchableOpacity style={styles.editIcon} onPress={handleImagePick}>
                        <Ionicons name="camera" size={22} color="white" />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Text style={styles.username}>{newUsername || '@user'}</Text>
                        <TouchableOpacity style={{marginLeft: 10}} onPress={() => setModalVisible(true)}>
                            <Ionicons name="pencil" size={22} color="white" />
                        </TouchableOpacity>
                    </View>

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
                    onPress={() => signOut()}
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
        bottom: 5,
        right: 120,
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
    },
    
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "#6C6B6E",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    input: {
        height: 50,
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#bfbfbf',
        color: 'white'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 100
    },
    buttonClose: {
        backgroundColor: "#999",
    },
    buttonSave: {
        backgroundColor: "#78a8ff",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
});