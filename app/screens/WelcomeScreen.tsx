import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const WelcomeScreen = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Text>WelcomeScreen</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default WelcomeScreen;