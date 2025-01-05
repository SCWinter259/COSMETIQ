import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Text, Button } from "react-native-paper";
import { useAuthContext } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import styles from "@/styles/user/profileStyles";

/*
Notes:
Should have option to edit profile on a different page
logout option should be here
*/

const Profile = () => {
  const router = useRouter();
  const { loggedInUser, setLoggedInUser } = useAuthContext();

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setLoggedInUser(null);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        mode="outlined"
        onPress={signOutUser}
        style={styles.signOutButton}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </Button>
    </SafeAreaView>
  );
};

export default Profile;
