import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { router } from "expo-router";

export default function Progress() {
    const screenWidth = Dimensions.get("window").width;

    const data = [
        { name: "História", progress: 62.5, color: "#4CAF50", legendFontColor: "#fff", legendFontSize: 14 },
        { name: "Matemática", progress: 25, color: "#4287f5", legendFontColor: "#fff", legendFontSize: 14 },
        { name: "Ciências", progress: 12.5, color: "#e75555", legendFontColor: "#fff", legendFontSize: 14 },
    ];

    return (
        <ScrollView 
            style={{ flex: 1, backgroundColor: "#2d2d2d" }}
            contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
        >

            <View 
                style={{
                    backgroundColor: "white",
                    borderRadius: 25,
                    padding: 20,
                    marginBottom: 25
                }}
            >
                <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 20 }}>
                    Seu Progresso
                </Text>

                <View style={{ backgroundColor: "#e7e7e7", padding: 15, borderRadius: 10, marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>Estudo de História</Text>
                    <Text>Progresso: 62,5% | Nível de estudo: <Text style={{ color: "green", fontWeight: "bold" }}>Alta</Text></Text>
                </View>

                <View style={{ backgroundColor: "#e7e7e7", padding: 15, borderRadius: 10, marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>Estudo de Matemática</Text>
                    <Text>Progresso: 25% | Nível de estudo: <Text style={{ color: "#4287f5", fontWeight: "bold" }}>Média</Text></Text>
                </View>

                <View style={{ backgroundColor: "#e7e7e7", padding: 15, borderRadius: 10 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>Estudo de Ciências</Text>
                    <Text>Progresso: 12,5% | Nível de estudo: <Text style={{ color: "red", fontWeight: "bold" }}>Baixa</Text></Text>
                </View>
            </View>

            <PieChart
                data={data.map(item => ({
                    name: item.name,
                    population: item.progress,
                    color: item.color,
                    legendFontColor: item.legendFontColor,
                    legendFontSize: item.legendFontSize,
                }))}
                width={screenWidth - 40}
                height={210}
                chartConfig={{
                    color: () => `#fff`,
                    labelColor: () => "#fff",
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="0"
                absolute
            />

            <TouchableOpacity
                onPress={() => router.back()}
                style={{
                    backgroundColor: "#00c853",
                    padding: 16,
                    borderRadius: 25,
                    marginTop: 30,
                    marginBottom: 40,
                    alignItems: "center"
                }}
            >
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>VOLTAR</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}
