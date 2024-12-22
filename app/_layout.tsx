import { Slot, Stack } from "expo-router";
import AuthProvider, { useAuthContext } from "./contexts/AuthContext";
import { Fragment } from "react";

export default function RootLayout() {
  // loads either the logged in stack or the guest stack, depending 
  // on what page in laoded in index.tsx
  return (
    <AuthProvider>
      <Slot /> {/* This renders the child routes */}
    </AuthProvider>
  );
}