import { SafeAreaView, View } from "react-native";
import { auth } from "../../firebase/config";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { useAuthContext } from "../../contexts/AuthContext";
import { useState } from "react";
import { Button, TextInput, Text, ActivityIndicator } from "react-native-paper";
import { FirebaseError } from "firebase/app";
import styles from "@/styles/guest/loginStyles";
import colors from "@/constants/colors";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { loggedInUser, setLoggedInUser } = useAuthContext();

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const res: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoggedInUser(res.user);
      setError(null);
      router.push("/home");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.code);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const viewPasswordIcon = viewPassword ? (
    <TextInput.Icon onPress={() => setViewPassword(false)} icon="eye-off" />
  ) : (
    <TextInput.Icon onPress={() => setViewPassword(true)} icon="eye" />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome back!</Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        outlineColor={colors.PURPLE}
        activeOutlineColor={colors.PURPLE}
        value={email}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        outlineColor={colors.PURPLE}
        activeOutlineColor={colors.PURPLE}
        value={password}
        secureTextEntry={!viewPassword}
        onChangeText={(text) => setPassword(text)}
        right={viewPasswordIcon}
      />
      {error ? <Text>{error}</Text> : null}
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={colors.PURPLE}
          style={styles.loading}
        />
      ) : null}
      <Button mode="contained" style={styles.button} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </Button>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.downText}>Don't have an account?</Text>
        <Button mode="text" onPress={() => router.push("/signup")}>
          <Text style={styles.signup}>Sign Up</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Login;
