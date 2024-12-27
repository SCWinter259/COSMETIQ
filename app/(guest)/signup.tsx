import { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { authentication } from "@/firebase/config";
import { SafeAreaView } from "react-native";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import { FirebaseError } from "firebase/app";
import { useRouter } from "expo-router";
import styles from "@/styles/guest/signupStyles";

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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { loggedInUser, setLoggedInUser } = useAuthContext();

  const handleSignUp = async () => {
    setIsLoading(true);

    try {
      if (password !== confirmPassword) {
        throw new PasswordsDoNotMatchError();
      }
      const res: UserCredential = await createUserWithEmailAndPassword(
        authentication,
        email,
        password
      );
      setLoggedInUser(res.user);
      setError(null);
      router.push("/home");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.code);
      } else if (err instanceof PasswordsDoNotMatchError) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {error && <Text>{error}</Text>}
      <Button onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
        {isLoading && (
          <ActivityIndicator
            size="small"
            color="white"
            style={{
              alignSelf: "center",
              justifyContent: "center",
              paddingLeft: 10,
            }}
          />
        )}
      </Button>
    </SafeAreaView>
  );
};

export default SignUp;
