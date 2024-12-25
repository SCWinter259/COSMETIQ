import firebase from "firebase/compat/app";
import { UserCredential } from "firebase/auth";

export type User = UserCredential["user"];