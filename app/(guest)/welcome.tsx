import { SafeAreaView } from "react-native";
import { Button, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import styles from "./welcomeStyles";

const Welcome = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to COSMETIQ!</Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text>Login</Text>
      </Button>
      <Button
        mode="outlined"
        style={styles.button}
        onPress={() => router.push("/signup")}
      >
        <Text>Sign Up</Text>
      </Button>
    </SafeAreaView>
  );
};

export default Welcome;