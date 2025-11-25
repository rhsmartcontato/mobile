
const signInWithGoogle = async () => {
    try {
        console.log("Tentando login com Google...");

        const fakeUser = {
            id: "google_123",
            name: "Usuário Google",
            email: "googleuser@example.com",
            role: Role.ALUNO,
        };

        await AsyncStorage.setItem("@payment:user", JSON.stringify(fakeUser));

        setUser({
            autenticated: true,
            user: fakeUser,
            role: fakeUser.role,
        });

    } catch (error) {
        console.log("Erro no login Google:", error);
        throw new Error("Falha no login com Google");
    }
};

const signInWithFacebook = async () => {
    try {
        console.log("Tentando login com Facebook...");

        const fakeUser = {
            id: "facebook_123",
            name: "Usuário Facebook",
            email: "facebookuser@example.com",
            role: Role.ALUNO,
        };

        await AsyncStorage.setItem("@payment:user", JSON.stringify(fakeUser));

        setUser({
            autenticated: true,
            user: fakeUser,
            role: fakeUser.role,
        });

    } catch (error) {
        console.log("Erro no login Facebook:", error);
        throw new Error("Falha no login com Facebook");
    }
};
