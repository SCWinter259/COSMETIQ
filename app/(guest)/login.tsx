import { SafeAreaView, View } from "react-native";
import { authentication } from "../../firebase/config";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { useAuthContext } from "../../contexts/AuthContext";
import { useState } from "react";
import { Button, TextInput, Text, ActivityIndicator } from "react-native-paper";
import styles from "./loginStyles";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { loggedInUser, setLoggedInUser } = useAuthContext();

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const res: UserCredential = await signInWithEmailAndPassword(authentication, email, password);
      setLoggedInUser(res.user);
      // router.push("/");
    } catch (error) {
      setError("Incorrect Email/Password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome back!</Text>
      <TextInput
        style={styles.input}
        label="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        label="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      {error && <Text>{error}</Text>}
      <Button style={styles.button} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
        {isLoading && (
          <ActivityIndicator
            size="small"
            color="white"
            style={styles.loading}
          />
        )}
      </Button>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.downText}>Don't have an account?</Text>
        <Button onPress={() => router.push("/signup")}>
          <Text style={styles.signup}>Sign Up</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Login;
