import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";

const Settings = () => {
  const router = useRouter();

  return (
    <SafeAreaView>
      <Text>This is the settings page</Text>
      <Text>Maybe a daily notification setting (before expiry x days)</Text>
      <Text>Implement after deployment, I guess</Text>
    </SafeAreaView>
  );
};

export default Settings;