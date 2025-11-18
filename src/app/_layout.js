import { Stack, useSegments, router } from "expo-router";
import { AppProvider } from "../hooks";
import { useAuth } from "../hooks/Auth";
import { useEffect } from "react";

export default function Layout() {
    const { user } = useAuth();
    const segments = useSegments();

    useEffect(() => {
        const inAuthGroup = segments[0] === "(protected)";

        if (!user?.autenticated && inAuthGroup) {
            router.replace("/");
        } else {
            if (user?.autenticated) {
                router.replace("/(protected)");
            }
        }
    }, [user]);

    return (
        <AppProvider>
           <Stack> 
            <Stack.Screen name="index" />
            <Stack.Screen name="(protected)" />
           </Stack>
        </AppProvider>
    );
}