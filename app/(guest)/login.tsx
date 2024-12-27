import { SafeAreaView, View } from "react-native";
import { authentication } from "../../firebase/config";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { useAuthContext } from "../../contexts/AuthContext";
import { useState } from "react";
import { Button, TextInput, Text, ActivityIndicator } from "react-native-paper";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
  },
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
  loginText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    alignSelf: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  downText: {
    color: "#331ece",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
  },
  signup: {
    alignSelf: "flex-start",
    textDecorationLine: "underline",
    color: "#331ece",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 5,
    marginTop: 10,
  },
  loading: {
    alignSelf: "center",
    justifyContent: "center",
    paddingLeft: 10,
  },
});

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
      router.push("/home");
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
