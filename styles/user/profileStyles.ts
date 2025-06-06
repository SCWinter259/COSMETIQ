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
  signOutButton: {
    borderColor: colors.PURPLE,
    width: "80%",
  },
  signOutText: {
    fontFamily: fonts.Roboto_500Medium,
    color: colors.PURPLE,
  }
});

export default styles;