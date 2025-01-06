import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="addItem" options={{ title: "Add Item" }} />
    </Stack>
  );
}