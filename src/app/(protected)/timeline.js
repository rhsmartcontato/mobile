import { router } from "expo-router";
import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

export default function Timeline() {
    const today = new Date();

    const [currentDate, setCurrentDate] = useState({
        month: today.getMonth(),
        year: today.getFullYear(),
    });

    const monthNames = [
        "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
        "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
    ];

    const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    const daysInMonth = new Date(currentDate.year, currentDate.month + 1, 0).getDate();

    const firstWeekday = new Date(currentDate.year, currentDate.month, 1).getDay();

    const daysArray = [
        ...Array(firstWeekday).fill(""), 
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
    ];

    function goToPreviousMonth() {
        setCurrentDate(prev => {
            let month = prev.month - 1;
            let year = prev.year;

            if (month < 0) {
                month = 11;
                year--;
            }
            return { month, year };
        });
    }

    function goToNextMonth() {
        setCurrentDate(prev => {
            let month = prev.month + 1;
            let year = prev.year;

            if (month > 11) {
                month = 0;
                year++;
            }
            return { month, year };
        });
    }

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: "#2d2d2d" }}
            contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
        >
            <View
                style={{
                    backgroundColor: "white",
                    borderRadius: 25,
                    padding: 20,
                    marginBottom: 20,
                }}
            >
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity onPress={goToPreviousMonth}>
                        <Text style={{ fontSize: 28 }}>◀</Text>
                    </TouchableOpacity>

                    <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "center" }}>
                        {monthNames[currentDate.month]} {currentDate.year}
                    </Text>

                    <TouchableOpacity onPress={goToNextMonth}>
                        <Text style={{ fontSize: 28 }}>▶</Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 20,
                    }}
                >
                    {weekDays.map((d) => (
                        <Text key={d} style={{ fontSize: 16, fontWeight: "600" }}>
                            {d}
                        </Text>
                    ))}
                </View>


                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
                    {daysArray.map((day, index) => {
                        const isToday =
                            day === today.getDate() &&
                            currentDate.month === today.getMonth() &&
                            currentDate.year === today.getFullYear();

                        return (
                            <View
                                key={index}
                                style={{
                                    width: "14.28%",
                                    paddingVertical: 12,
                                    alignItems: "center",
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: isToday ? "#90caf9" : "transparent",
                                        borderRadius: 20,
                                        padding: isToday ? 6 : 0,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            opacity: day ? 1 : 0.3,
                                            fontWeight: isToday ? "bold" : "normal",
                                        }}
                                    >
                                        {day}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>


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

                <View style={{ backgroundColor: "#e7e7e7", padding: 12, borderRadius: 10, marginBottom: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Trabalho de matemática</Text>
                    <Text style={{ marginTop: 5 }}>
                        Vencimento: <Text style={{ fontWeight: "600" }}>15 de novembro</Text> | Prioridade: 
                        <Text style={{ color: "green", fontWeight: "bold" }}> Alta</Text>
                    </Text>
                </View>

                <View style={{ backgroundColor: "#e7e7e7", padding: 12, borderRadius: 10, marginBottom: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Projeto de ciências</Text>
                    <Text style={{ marginTop: 5 }}>
                        Prazo: <Text style={{ fontWeight: "600" }}>29 de novembro</Text> | Prioridade:
                        <Text style={{ color: "#4287f5", fontWeight: "bold" }}> Média</Text>
                    </Text>
                </View>

                <View style={{ backgroundColor: "#e7e7e7", padding: 12, borderRadius: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Apresentação de história</Text>
                    <Text style={{ marginTop: 5 }}>
                        Prazo: <Text style={{ fontWeight: "600" }}>20 de novembro</Text> | Prioridade:
                        <Text style={{ color: "red", fontWeight: "bold" }}> Baixa</Text>
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => router.push("/progress")}
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
