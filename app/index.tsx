import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
  const { loggedInUser, setLoggedInUser } = useAuthContext();

  return (
    <>
      {loggedInUser ? <Redirect href="/home" /> : <Redirect href="/(guest)/welcome" />}
    </>
  );
}
