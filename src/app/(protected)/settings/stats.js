import { View, Text, StyleSheet } from "react-native";

export default function Stats() {

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Horas de Estudo</Text>

            <View style={styles.box}>
                <Text style={styles.number}>12h 45min</Text>
                <Text style={styles.label}>Total acumulado</Text>
            </View>

            <View style={styles.box}>
                <Text style={styles.number}>1h 30min</Text>
                <Text style={styles.label}>Hoje</Text>
            </View>

            <View style={styles.box}>
                <Text style={styles.number}>7h 10min</Text>
                <Text style={styles.label}>Esta semana</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2f2f2f",
        padding: 20,
    },

    title: {
        fontSize: 30,
        color: "white",
        fontWeight: "bold",
        marginBottom: 25,
    },

    box: {
        backgroundColor: "#6C6B6E",
        padding: 20,
        borderRadius: 20,
        marginBottom: 15,
    },

    number: {
        fontSize: 32,
        color: "white",
        fontWeight: "bold",
    },

    label: {
        fontSize: 18,
        color: "#d4d4d4",
    }
});
