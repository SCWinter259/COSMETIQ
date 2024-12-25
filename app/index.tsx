import { useAuthContext } from "../contexts/AuthContext";
import { Redirect } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";

export default function Index() {
  const { loggedInUser, setLoggedInUser } = useAuthContext();

  return (
    <PaperProvider>
      {loggedInUser ? <Redirect href="/home" /> : <Redirect href="/welcome" />}
    </PaperProvider>
  );
}
