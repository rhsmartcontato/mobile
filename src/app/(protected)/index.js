import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function Home() {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>StudySync</Text>

        <View style={styles.notificationContainer}>
          <Feather name="bell" size={28} color="black" />
          <View style={styles.badge} />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.mainBox}>

          <Text style={styles.welcome}>Bem-vindo ao StudySync!</Text>

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

          <View style={styles.listItem}>
            <View>
              <Text style={styles.listTitle}>Projeto de Ciências</Text>
              <Text style={styles.listSubtitle}>Prazo: 29 de maio</Text>
            </View>
            <Feather name="calendar" size={26} color="white" />
          </View>

          <View style={styles.listItem}>
            <View>
              <Text style={styles.listTitle}>Apresentação de História</Text>
              <Text style={styles.listSubtitle}>Prazo: 20 de junho</Text>
            </View>
            <Feather name="calendar" size={26} color="white" />
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

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
    fontSize: 24,
    color: "white",
    fontWeight: "albertusnova_bold",
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
});
