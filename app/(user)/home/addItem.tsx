import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";

const AddItem = () => {
  const router = useRouter();

  return (
    <SafeAreaView>
      <Text>A page for adding new items</Text>
    </SafeAreaView>
  );
};

export default AddItem;