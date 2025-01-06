import { SafeAreaView } from "react-native";
import { Text, Button } from "react-native-paper";
import styles from "@/styles/user/homeStyles";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Button mode="contained" onPress={() => router.push("/home/addItem")}>
        <Text>Navigate to add item</Text>
      </Button>
    </SafeAreaView>
  );
};

export default Home;
