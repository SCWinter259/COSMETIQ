import { SafeAreaView } from "react-native";
import { Text, FAB } from "react-native-paper";
import styles from "@/styles/user/home/homeStyles";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => router.push("/home/addItem")}
      />
    </SafeAreaView>
  );
};

export default Home;
