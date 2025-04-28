import { Alert, SafeAreaView, View } from "react-native";
import { auth } from "../../firebase/config";
import { useRouter } from "expo-router";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { useAuthContext } from "../../contexts/AuthContext";
import { useState } from "react";
import { Button, TextInput, Text, ActivityIndicator } from "react-native-paper";
import { FirebaseError } from "firebase/app";
import styles from "@/styles/guest/loginStyles";
import colors from "@/constants/colors";

class EmailNotVerifiedError extends Error {
  constructor() {
    super("Email is not yet verified");
  }
}

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resendVerification, setResendVerification] = useState<boolean>(false);

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

      // check if the user is verified
      if(!user.emailVerified) {
        throw new EmailNotVerifiedError();
      }

      // if the user exists and verified, log the user in and remove any previous error
      setLoggedInUser(res.user);
      setError(null);
      setResendVerification(false);
      // TODO: Redirect to addUserInfo page if user is new (cannot find user collections in database)

      // TODO: Redirect to the home page if normal user
      // router.push("/home");
    } catch (err) {
      if (err instanceof FirebaseError) {
        // Handle Firebase-specific errors
        switch (err.code) {
          case "auth/user-not-found":
            setError("No user found with this email. Please sign up first.");
            break;
          case "auth/wrong-password":
            setError("Incorrect password. Please try again.");
            break;
          case "auth/invalid-email":
            setError(
              "The email address is invalid. Please enter a valid email."
            );
            break;
          default:
            setError("An unexpected error occurred. Please try again.");
        }
      } else if (err instanceof EmailNotVerifiedError) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
        setResendVerification(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: make a text and button to resend the verification email
  // const handleResendVerificationEmail = async () => {
  //   const user = auth.currentUser;
  //   if (user) {
  //     try {
  //       await sendEmailVerification(user);
  //       Alert.alert("Verification Email Resent", "Please check your email inbox again.");
  //     } catch (err: any) {
  //       Alert.alert("Error sending verification email", err);
  //     }
  //   } else {
  //     Alert.alert('Error', 'No user is currently logged in.');
  //   }
  // };

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
