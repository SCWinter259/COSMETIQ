import { Tabs } from "expo-router";

export default function UserLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{ title: 'Home' }}/>
        </Tabs>
    );
}