import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.DEFAULT_WHITE,
    paddingHorizontal: 5,
  },
  title: {
    fontFamily: fonts.Roboto_700Bold,
    color: colors.PURPLE,
    fontSize: 24,
    marginBottom: 16,
  },
  loginButton: {
    marginBottom: 8,
    backgroundColor: colors.PURPLE,
    width: "80%",
  },
  loginButtonText: {
    fontFamily: fonts.Roboto_500Medium,
    color: colors.DEFAULT_WHITE,
  },
  signupButton: {
    borderColor: colors.PURPLE,
    width: "80%",
  },
  signupButtonText: {
    fontFamily: fonts.Roboto_500Medium,
    color: colors.PURPLE,
  },
});

export default styles;
