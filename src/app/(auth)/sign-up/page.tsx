import type { Metadata } from "next";
import SignUpForm from "./sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Signing up for QueryNex",
};

function SignUp() {
  return <SignUpForm />;
}

export default SignUp;
