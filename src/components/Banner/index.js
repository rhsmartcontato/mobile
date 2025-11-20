import { StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

export function Banner() {
    return (
        <View style={StyleSheet.container}>
            <PagerView initialPage={0} style={styles.content}>
                <View key="1" style={styles.page}>
                    <Text>Banner 1</Text>
                </View>
                <View key="2">
                    <Text>Banner 2</Text>
                </View>
                <View key="3">
                    <Text>Banner 3</Text>
                </View>
            </PagerView>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        marginTop: 10,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    page: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        padding: 10,
    },
});