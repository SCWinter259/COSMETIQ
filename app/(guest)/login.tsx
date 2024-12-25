import { SafeAreaView, Text, View } from "react-native";
import firebase from "firebase/compat/app";
import { authentication } from "../../firebase/config";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { useAuthContext } from "../../contexts/AuthContext";
import { useRef, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { styles } from "./loginStyles";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<string>("");
  const passwordRef = useRef<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { loggedInUser, setLoggedInUser } = useAuthContext();

  const handleLogin = async () => {
    setIsLoading(true);
    
    signInWithEmailAndPassword(authentication, email, password)
      .then((res: UserCredential) => {
        console.log("successful");
        setLoggedInUser(res.user);
      })
      .catch((error) => {
        console.error(error);
        setError("Incorrect Email/Password");
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome back!</Text>
      <TextInput
        style={styles.input}
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        label="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Button style={styles.button} onPress={() => signInWithEmailAndPassword(authentication, email, password)}>

      </Button>
    </SafeAreaView>
  );
};

export default Login;
