import { Slot, Stack } from "expo-router";
import AuthProvider, { useAuthContext } from "../contexts/AuthContext";
import { Fragment } from "react";
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
  // loads either the logged in stack or the guest stack, depending
  // on what page in loaded in index.tsx
  return (
    <AuthProvider>
      {/* <PaperProvider> */}
        <Slot /> {/* This renders the child routes */}
      {/* </PaperProvider> */}
    </AuthProvider>
  );
}
