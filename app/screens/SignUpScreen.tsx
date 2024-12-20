import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const SignUpScreen = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Text>SignUpScreen</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default SignUpScreen;