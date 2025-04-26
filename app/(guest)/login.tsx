import { Alert, SafeAreaView, View } from "react-native";
import { auth } from "../../firebase/config";
import { useRouter } from "expo-router";
import { sendEmailVerification, signInWithEmailAndPassword, signOut, UserCredential } from "firebase/auth";
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
      // Try and get the auth user (will throw error if there is none)
      const res: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = res.user;

      // Check if the user exists and verified
      if(user && user.emailVerified) {
        setLoggedInUser(res.user);
        setError(null);
        router.push("/home");
      } else {
        // help the user send another verification email
        Alert.alert(
          'Email Not Verified',
          'Please verify your email address before logging in. Check your inbox for the verification link.',
          [{ text: 'Resend Email', onPress: handleResendVerificationEmail }, { text: 'OK' }]
        );
        await signOut(auth);
      }
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

  const handleResendVerificationEmail = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await sendEmailVerification(user);
        Alert.alert("Verification Email Resent", "Please check your email inbox again.");
      } catch (err: any) {
        Alert.alert("Error sending verification email", err);
      }
    } else {
      Alert.alert('Error', 'No user is currently logged in.');
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
