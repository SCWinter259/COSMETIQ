import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen } from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

/**
 * The AppStack is created to navigate the in-app screens
 * @returns 
 */
export const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}