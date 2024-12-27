import { SafeAreaView } from "react-native";
import { Button, Text } from "react-native-paper";
import { useAuthContext } from "@/contexts/AuthContext";
import { authentication } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#302298",
    borderRadius: 20,
    padding: 10,
    margin: 14,
    width: "78%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  signOutText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    alignSelf: "center",
  },
});

const Home = () => {
  const router = useRouter();
  const { loggedInUser, setLoggedInUser } = useAuthContext();

  const signOutUser = async () => {
    try {
      const res: void = await signOut(authentication);
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
