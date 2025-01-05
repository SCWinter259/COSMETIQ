import { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import Home from "./home";
import Profile from "./profile";
import Settings from "./settings";

export default function UserLayout() {
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: "home", title: "Home", focusedIcon: "home", unfocusedIcon: "home-outline" },
    { key: "profile", title: "Profile", focusedIcon: "account", unfocusedIcon: "account-outline" },
    { key: "settings", title: "Settings", focusedIcon: "cog", unfocusedIcon: "cog-outline" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    profile: Profile,
    settings: Settings,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
