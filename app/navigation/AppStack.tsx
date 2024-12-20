import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

/**
 * App navigation for logged in users.
 * @returns 
 */
export const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};