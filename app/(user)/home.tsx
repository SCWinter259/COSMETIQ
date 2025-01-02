import { SafeAreaView } from "react-native";
import { Button, Text } from "react-native-paper";
import { useAuthContext } from "@/contexts/AuthContext";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import styles from "@/styles/user/homeStyles";

const Home = () => {
  const router = useRouter();
  const { loggedInUser, setLoggedInUser } = useAuthContext();

  const signOutUser = async () => {
    try {
      const res: void = await signOut(auth);
      setLoggedInUser(null);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>You have successfully learned Firebase login</Text>
      <Button onPress={signOutUser} style={styles.button}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Button>
    </SafeAreaView>
  );
};

export default Home;
