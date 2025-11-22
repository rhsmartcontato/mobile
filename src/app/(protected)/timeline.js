import { View, Text, ScrollView, TouchableOpacity } from "react-native";

export default function Timeline() {
    return (
        <ScrollView 
            style={{ flex: 1, backgroundColor: "#2d2d2d" }}
            contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Calendário */}
            <View 
                style={{
                    backgroundColor: "white",
                    borderRadius: 25,
                    padding: 20,
                    marginBottom: 20
                }}
            >
                <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "center" }}>
                    Novembro 2025
                </Text>

                {/* Cabeçalho Dias */}
                <View 
                    style={{ 
                        flexDirection: "row", 
                        justifyContent: "space-between",
                        marginTop: 20
                    }}
                >
                    {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
                        <Text key={d} style={{ fontSize: 16, fontWeight: "600" }}>{d}</Text>
                    ))}
                </View>

                {/* Números do Calendário */}
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
                    {[
                        "", "", "", "", "1","2","3",
                        "4","5","6","7","8","9","10",
                        "11","12","13","14","15","16","17",
                        "18","19","20","21","22","23","24",
                        "25","26","27","28","29","30","31"
                    ].map((day, index) => {
                        const isToday = day === "23";
                        return (
                            <View 
                                key={index} 
                                style={{ 
                                    width: "14.28%",
                                    paddingVertical: 12,
                                    alignItems: "center"
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: isToday ? "#b8d7d7" : "transparent",
                                        borderRadius: 20,
                                        padding: isToday ? 6 : 0
                                    }}
                                >
                                    <Text style={{ fontSize: 16, opacity: day ? 1 : 0 }}>
                                        {day}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>

            {/* Próximas Tarefas */}
            <View 
                style={{
                    backgroundColor: "white",
                    borderRadius: 25,
                    padding: 20
                }}
            >
                <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 15 }}>
                    Próximas tarefas
                </Text>

                {/* Card 1 */}
                <View style={{ backgroundColor: "#e7e7e7", padding: 12, borderRadius: 10, marginBottom: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Trabalho de matemática</Text>
                    <Text style={{ marginTop: 5 }}>
                        Vencimento: <Text style={{ fontWeight: "600" }}>15 de maio</Text> | Prioridade: 
                        <Text style={{ color: "green", fontWeight: "bold" }}> Alta</Text>
                    </Text>
                </View>

                {/* Card 2 */}
                <View style={{ backgroundColor: "#e7e7e7", padding: 12, borderRadius: 10, marginBottom: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Projeto de ciências</Text>
                    <Text style={{ marginTop: 5 }}>
                        Prazo: <Text style={{ fontWeight: "600" }}>29 de maio</Text> | Prioridade:
                        <Text style={{ color: "#4287f5", fontWeight: "bold" }}> Média</Text>
                    </Text>
                </View>

                {/* Card 3 */}
                <View style={{ backgroundColor: "#e7e7e7", padding: 12, borderRadius: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Apresentação de história</Text>
                    <Text style={{ marginTop: 5 }}>
                        Prazo: <Text style={{ fontWeight: "600" }}>20 de junho</Text> | Prioridade:
                        <Text style={{ color: "red", fontWeight: "bold" }}> Baixa</Text>
                    </Text>
                </View>

                {/* Botão */}
                <TouchableOpacity
                    style={{
                        backgroundColor: "#00c853",
                        padding: 15,
                        borderRadius: 12,
                        marginTop: 25,
                        alignItems: "center"
                    }}
                >
                    <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                        VER MEU PROGRESSO
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
