import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const LoginScreen = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Text>LoginScreen</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default LoginScreen;