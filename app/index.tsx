import { useAuthContext } from "../contexts/AuthContext";
import { Redirect } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const { loggedInUser, setLoggedInUser } = useAuthContext();
  const router = useRouter();

  console.log(loggedInUser);

  useEffect(() => {
    if (loggedInUser) {
      router.push("/home");
    } else {
      router.push("/(guest)/welcome");
    }
  }, [loggedInUser]);

  return (
    <PaperProvider>
      {loggedInUser ? <Redirect href="/home" /> : <Redirect href="/(guest)/welcome" />}
    </PaperProvider>
  );
  // return null;
}
