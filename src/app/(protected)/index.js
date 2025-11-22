import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { router } from "expo-router";

export default function Home() {

  const [notifications, setNotifications] = useState([
    { id: 1, title: "Você ganhou uma nova tarefa!", read: false },
    { id: 2, title: "Amanhã tem prova de Matemática!", read: false },
    { id: 3, title: "Novo conteúdo de Ciências disponível.", read: false },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const unread = notifications.filter(n => !n.read).length;

  function openNotifications() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setModalVisible(true);
  }

  function closeNotifications() {
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>StudySync</Text>

        <TouchableOpacity
          style={styles.notificationContainer}
          onPress={openNotifications}
        >
          <Feather name="bell" size={28} color="white" />

          {unread > 0 && <View style={styles.badge} />}
        </TouchableOpacity>
      </View>

      {/* Modal de notificações */}
      {modalVisible && (
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Notificações</Text>

            {notifications.map(n => (
              <View key={n.id} style={styles.notificationItem}>
                <Text style={{ color: "white", fontSize: 16, opacity: n.read ? 0.5 : 1 }}>
                  • {n.title}
                </Text>
              </View>
            ))}

            <TouchableOpacity style={styles.modalButton} onPress={closeNotifications}>
              <Text style={{ color: "white", fontSize: 18 }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}


      {/* Conteúdo Principal */}
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.mainBox}>

          <Text style={styles.welcome}>Bem-vindo ao StudySync!</Text>

          {/* Status */}
          <View style={styles.statusRow}>
            <View style={styles.statusCard}>
              <Text style={styles.statusNumber}>7</Text>
              <Text style={styles.statusLabel}>Próximas tarefas</Text>
            </View>

            <View style={styles.statusCard}>
              <Text style={styles.statusNumber}>16</Text>
              <Text style={styles.statusLabel}>Tarefas pendentes</Text>
            </View>

            <View style={styles.statusCard}>
              <Text style={styles.statusNumber}>3</Text>
              <Text style={styles.statusLabel}>Novos assuntos</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Agenda de hoje</Text>

          <View style={styles.listItem}>
            <View>
              <Text style={styles.listTitle}>Matemática</Text>
              <Text style={styles.listSubtitle}>09:30 - 11:00</Text>
            </View>
            <Ionicons name="time-outline" size={26} color="white" />
          </View>

          <View style={styles.listItem}>
            <View>
              <Text style={styles.listTitle}>Geografia</Text>
              <Text style={styles.listSubtitle}>13:30 - 15:00</Text>
            </View>
            <Ionicons name="time-outline" size={26} color="white" />
          </View>

          <View style={styles.listItem}>
            <View>
              <Text style={styles.listTitle}>Ciências</Text>
              <Text style={styles.listSubtitle}>17:30 - 19:00</Text>
            </View>
            <Ionicons name="time-outline" size={26} color="white" />
          </View>

          <Text style={styles.sectionTitle}>Você ainda tem…</Text>

          {/* >>> BOTÃO 1: Projeto de Ciências <<< */}
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => router.push("/timeline")}
          >
            <View>
              <Text style={styles.listTitle}>Projeto de Ciências</Text>
              <Text style={styles.listSubtitle}>Prazo: 29 de novembro</Text>
            </View>
            <Feather name="calendar" size={26} color="white" />
          </TouchableOpacity>

          {/* >>> BOTÃO 2: Apresentação de História <<< */}
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => router.push("/timeline")}
          >
            <View>
              <Text style={styles.listTitle}>Apresentação de História</Text>
              <Text style={styles.listSubtitle}>Prazo: 20 de novembro</Text>
            </View>
            <Feather name="calendar" size={26} color="white" />
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}



/* ESTILOS */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2F2F2F",
    padding: 15,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 40,
    paddingBottom: 10,
  },

  headerTitle: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
  },

  notificationContainer: {
    position: "relative",
  },

  badge: {
    width: 10,
    height: 10,
    backgroundColor: "red",
    borderRadius: 10,
    position: "absolute",
    right: -2,
    top: -2,
  },

  mainBox: {
    backgroundColor: "#5B5A5E",
    borderRadius: 30,
    padding: 20,
  },

  welcome: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },

  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statusCard: {
    backgroundColor: "#6C6B6E",
    width: "30%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  statusNumber: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
  },

  statusLabel: {
    color: "white",
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },

  listItem: {
    backgroundColor: "#6C6B6E",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  listTitle: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },

  listSubtitle: {
    color: "#D3D3D3",
  },

  modalBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    elevation: 20,
  },

  modalBox: {
    backgroundColor: "#444",
    width: "85%",
    padding: 20,
    borderRadius: 15,
    zIndex: 10000,
    elevation: 25,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
    textAlign: "center",
  },

  notificationItem: {
    marginBottom: 12,
  },

  modalButton: {
    marginTop: 20,
    backgroundColor: "#25bb54",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});
