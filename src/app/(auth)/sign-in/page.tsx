import type { Metadata } from "next";
import SignInForm from "./sign-in-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In to QueryNex",
};

function SignIn() {
  return <SignInForm />;
}

export default SignIn;
