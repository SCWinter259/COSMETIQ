import { StyleSheet } from "react-native";
import colors from "@/constants/colors";
import fonts from "@/constants/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.DEFAULT_WHITE,
    padding: 5,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.PURPLE,
  }
});

export default styles;
