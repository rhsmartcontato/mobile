import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProtectedLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: "#1d1d1d" },
                tabBarActiveTintColor: "white",
            }}
        >

            <Tabs.Screen
                name="index"
                options={{
                    title: "Início",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={26} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="timeline"
                options={{
                    title: "Cronograma",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="calendar-month-outline" size={26} color={color} />
                    ),
                }}
            />


            <Tabs.Screen
                name="progress"
                options={{
                    title: "Matéria",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="notebook-outline" size={26} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="settings/index"
                options={{
                    title: "Configurações",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="settings-outline" size={26} color={color} />
                    ),
                }}
            />

            <Tabs.Screen name="settings/profile" options={{ href: null }} />
            <Tabs.Screen name="settings/notifications" options={{ href: null }} />
            <Tabs.Screen name="settings/stats" options={{ href: null }} />
            <Tabs.Screen name="settings/email" options={{ href: null }} />
            <Tabs.Screen name="settings/password" options={{ href: null }} />
            <Tabs.Screen name="settings/subjects" options={{ href: null }} />

        </Tabs>
    );
}
