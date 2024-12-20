import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const HomeScreen = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Text>HomeScreen</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default HomeScreen;