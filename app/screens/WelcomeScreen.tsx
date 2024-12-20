import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

export const WelcomeScreen = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Text>WelcomeScreen</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}