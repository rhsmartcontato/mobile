import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import 'react-native-gesture-handler';
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { useAuth } from '../../hooks/Auth/index';

function CustomDrawerContent(props) {
  const { user, signOut } = useAuth();

  return (
    <View style={{ flex: 1 }}>
        <View style={{ marginTop: 20 }}>
            <Image source={{ 
                url: "https://reactnative.dev/img/tiny_logo.png",

            }}/>
            <Text style={{ textAlign: "center", fontSize: 20 }}>
                {user.user.nome}
            </Text>
        </View>
        <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
    <TouchableOpacity onPress={() => signOut()}
    style={{
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        margin: 10,
        backgroundColor: "#f55a5a",
        borderRadius: 5,
    }}
    >
    <Text style={{ color: "white", fontFamily: "clear sans bold"}}>Sair da conta</Text>
    </TouchableOpacity>
    </View>
  );
}

const DrawerLayout = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer drawerContent={(props) => <CustomDrawerContent {...props} /> }>
                <Drawer.Screen 
                name="index" 
                options={{ 
                    drawerLabel: "Início", 
                    headerTitle: "Início", 
                    drawerIcon: () => <Ionicons name="home" size={20} color="black"/>, 
                }}
                />
                <Drawer.Screen 
                name="tasks" 
                options={{ 
                    drawerLabel: "Tarefas", 
                    headerTitle: "Tarefas",
                    drawerIcon: () => <FontAwesome name="tasks" size={20} color="black" />
                }}
                />
                <Drawer.Screen 
                name="subjects" 
                options={{ 
                    drawerLabel: "Matérias", 
                    headerTitle: "Matérias", 
                    drawerIcon: () => <MaterialIcons name="subject" size={20} color="black" />
                }}
                />
                <Drawer.Screen 
                name="settings" 
                options={{ 
                    drawerLabel: "Configurações", 
                    headerTitle: "Configurações", 
                    drawerIcon: () => <Feather name="settings" size={20} color="black" />
                }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
};

export default function Layout() {
    return DrawerLayout();
}