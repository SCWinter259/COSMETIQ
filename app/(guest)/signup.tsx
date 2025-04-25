import { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "@/firebase/config";
import { SafeAreaView, View } from "react-native";
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

class EmptyUsernameError extends Error {
  constructor() {
    super("Username cannot be empty");
  }
}

const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { loggedInUser, setLoggedInUser } = useAuthContext();

  /**
   * Try to create a new user in Firebase Authentication with
   * the given email and password. If successful, create a new user document
   * in Firestore.
   */
  const handleSignUp = async () => {
    setIsLoading(true);

    try {
      // Basic input checking
      if (password !== confirmPassword) {
        throw new PasswordsDoNotMatchError();
      } else if (username === "") {
        throw new EmptyUsernameError();
      }

      // Create an auth user
      const res: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Create the user document
      const userRef: DocumentReference = doc(db, "users", res.user.uid);
      // Fill in document fields
      await setDoc(userRef, {
        username: username,
        email: res.user.email,
        createdAt: Timestamp.now(),
      });

      // set that user is logged in and redirect to home
      setLoggedInUser(res.user);
      setError(null);
      router.push("/home");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.code);
      } else if (err instanceof PasswordsDoNotMatchError) {
        setError(err.message);
      } else if (err instanceof EmptyUsernameError) {
        setError(err.message);
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
      <Text style={styles.title}>Create a new account</Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Username"
        outlineColor={colors.PURPLE}
        activeOutlineColor={colors.PURPLE}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
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
