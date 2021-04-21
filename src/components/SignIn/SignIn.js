import React from "react";
import { signInWithGoogle } from "../../firebase";
import "./SignIn.css";
import { Button } from "react-bootstrap";
const SignIn = () => {
  return (
    <div className="signin">
      <h1>Sign In</h1>
      <div>
        <Button onClick={signInWithGoogle} variant="outline-success">
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};
export default SignIn;
