import { Slot } from "expo-router";
import AuthProvider from "../contexts/AuthContext";
import { MD3LightTheme, Provider as PaperProvider } from "react-native-paper";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
  useFonts,
} from "@expo-google-fonts/roboto";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

// prevent rendering the app until the font is loaded and ready
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && error) {
    return null;
  }

  // loads either the logged in stack or the guest stack, depending
  // on what page in loaded in index.tsx
  return (
    <AuthProvider>
      <PaperProvider theme={MD3LightTheme}>
        <Slot />
      </PaperProvider>
    </AuthProvider>
  );
}
