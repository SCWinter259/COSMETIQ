import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "../screens/LoginScreen";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { SignUpScreen } from "../screens/SignUpScreen";

const Stack = createNativeStackNavigator();

/**
 * The GuestStack is made for guest users, containing Welcome, Login, and SignUp screens
 * @returns 
 */
export const GuestStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}