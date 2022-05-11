import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  LandingText,
  TextInput,
} from "../primitives/StyledComponents";
import { auth } from "../utils/FirebaseConfig";

function Login() {
  let navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [wrongPass, setWrongPass] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  //Login
  async function logIn() {
    if (stayLoggedIn) await auth.setPersistence(browserLocalPersistence);
    else await auth.setPersistence(browserSessionPersistence);
    signInWithEmailAndPassword(auth, "gascalc@gascalc.com", pass)
      .then((userCredential) => {
        const user = userCredential.user;
        setWrongPass(false);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setWrongPass(true);
      });
  }

  return (
    <div className="p-2 flex flex-col justify-center items-center mt-20">
      <LandingText className="text-4xl mb-20">Welcome</LandingText>
      {/* <p className="text-zinc-400 mb-2">Password</p> */}
      {wrongPass && (
        <p className="text-center text-rose-400 mb-2">Wrong password</p>
      )}

      <input
        type="checkbox"
        onChange={() => setStayLoggedIn(!stayLoggedIn)}
        className="mb-5"
      />

      <TextInput
        className="mb-10"
        type="password"
        placeholder="Password"
        value={pass}
        onChange={(e: any) => setPass(e.target.value)}
      />
      <Button onClick={() => logIn()}>Login</Button>
    </div>
  );
}

export default Login;
