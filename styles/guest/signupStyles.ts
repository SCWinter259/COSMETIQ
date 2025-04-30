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
  title: {
    fontFamily: fonts.Roboto_700Bold,
    color: colors.PURPLE,
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "80%",
    height: 48,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
  },
  loading: {
    margin: 8,
  },
  button: {
    width: "80%",
    backgroundColor: colors.PURPLE,
    height: 48,
    justifyContent: "center",
    margin: 8,
  },
  buttonText: {
    color: colors.DEFAULT_WHITE,
    fontFamily: fonts.Roboto_500Medium,
  },
  downText: {
    color: colors.PURPLE,
    fontFamily: fonts.Roboto_400Regular,
    fontSize: 16,
    marginTop: 12,
  },
  login: {
    textDecorationLine: "underline",
    fontFamily: fonts.Roboto_400Regular,
    color: colors.PINK,
    fontSize: 16,
    marginLeft: 4,
    marginTop: 12,
  },
  regularText: {
    color: colors.DEFAULT_BLACK,
    fontFamily: fonts.Roboto_400Regular,
    fontSize: 16,
    margin: 8,
  }
});

export default styles;