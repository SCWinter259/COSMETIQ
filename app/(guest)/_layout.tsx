import { Stack } from "expo-router";

export default function GuestLayout() {
    return (
        <Stack>
            <Stack.Screen name="login" options={{ title: "Login" }} />
            <Stack.Screen name="signup" options={{ title: "SignUp" }} />
            <Stack.Screen name="welcome" options={{ title: "Welcome" }} />
        </Stack>
    )
}