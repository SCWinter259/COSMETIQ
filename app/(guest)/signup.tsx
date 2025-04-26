import { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { createUserWithEmailAndPassword, UserCredential, sendEmailVerification } from "firebase/auth";
import { auth } from "@/firebase/config";
import { SafeAreaView, View, Alert } from "react-native";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import { FirebaseError } from "firebase/app";
import { useRouter } from "expo-router";
import { doc, setDoc, DocumentReference, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import styles from "@/styles/guest/signupStyles";
import colors from "@/constants/colors";

class PasswordsDoNotMatchError extends Error {
  constructor() {
    super("Passwords do not match");
  }
}

const SignUp = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  const [verificationEmailSent, setVerificationEmailSent] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Try to create a new user in Firebase Authentication with
   * the given email and password. If successful, create a new user document
   * in Firestore.
   */
  const handleSignUp = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Basic input checking
      if (password !== confirmPassword) {
        throw new PasswordsDoNotMatchError();
      }

      // Create an auth user (will throw an error if the email already exists)
      const res: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = res.user;

      // send the first email verification
      await sendEmailVerification(user);
      setVerificationEmailSent(true);

      // // Create the user document
      // const userRef: DocumentReference = doc(db, "users", res.user.uid);
      // // Fill in document fields
      // await setDoc(userRef, {
      //   username: username,
      //   email: res.user.email,
      //   createdAt: Timestamp.now(),
      // });

      // // set that user is logged in and redirect to home
      // setLoggedInUser(res.user);
      // setError(null);
      // router.push("/home");
    } catch (err) {
      if (err instanceof FirebaseError) {
        // Handle Firebase-specific errors
        switch (err.code) {
          case "auth/email-already-in-use":
            setError("This email is already in use. Please use a different email.");
            break;
          case "auth/invalid-email":
            setError("The email address is invalid. Please enter a valid email.");
            break;
          case "auth/weak-password":
            setError("The password is too weak. Please use a stronger password.");
            break;
          default:
            setError("An unexpected error occurred. Please try again.");
        }
      } else if (err instanceof PasswordsDoNotMatchError) {
        // Handle custom error
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
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
      <Text style={styles.title}>Create a new account</Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        keyboardType="email-address"
        outlineColor={colors.PURPLE}
        activeOutlineColor={colors.PURPLE}
        value={email}
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
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Confirm Password"
        outlineColor={colors.PURPLE}
        activeOutlineColor={colors.PURPLE}
        value={confirmPassword}
        secureTextEntry={true}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {error ? <Text>{error}</Text> : null}
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={colors.PURPLE}
          style={styles.loading}
        />
      ) : null}
      {verificationEmailSent && (
        <Text>A verification email has been sent. Please verify your account, then navigate to the login page.</Text>
      )}
      <Button onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Button>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.downText}>Already have an account?</Text>
        <Button mode="text" onPress={() => router.push("/login")}>
          <Text style={styles.login}>Login</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
