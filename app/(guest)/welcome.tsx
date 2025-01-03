import { SafeAreaView } from "react-native";
import { Button, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import styles from "@/styles/guest/welcomeStyles";

const Welcome = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to COSMETIQ!</Text>
      <Button
        mode="contained"
        style={styles.loginButton}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </Button>
      <Button
        mode="outlined"
        style={styles.signupButton}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </Button>
    </SafeAreaView>
  );
};

export default Welcome;