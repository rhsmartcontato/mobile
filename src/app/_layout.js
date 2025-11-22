import { Stack, useSegments, router } from "expo-router";
import { AppProvider } from "../hooks";
import { useAuth } from "../hooks/Auth";
import { useEffect } from "react";

const StackLayout = () => {
    const { user } = useAuth();
    const segments = useSegments();

    useEffect(() => {
        const inProtected = segments.includes ("(protected)");

        if (!user?.authenticated && inProtected) {
            router.replace("/");
        }

        if (user?.authenticated && !inProtected) {
            router.replace("/(protected)");
        }
    }, [user]);

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        </Stack>
    );
};

export default function Layout() {
    return (
        <AppProvider>
            <StackLayout />
        </AppProvider>
    );
}
