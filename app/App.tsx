import AuthProvider, { useAuthContext } from "./contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./navigation/AppStack";
import GuestStack from "./navigation/GuestStack";

export const App = () => {
  const { loggedInUser } = useAuthContext();

  return (
    <AuthProvider>
      <NavigationContainer>
        {loggedInUser ? <AppStack /> : <GuestStack />}
      </NavigationContainer>
    </AuthProvider>
  );
};
