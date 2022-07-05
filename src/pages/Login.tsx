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
  Desc,
  LandingText,
  TextInput,
} from "../primitives/StyledComponents";
import { auth } from "../utils/FirebaseConfig";

function Login() {
  let navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [wrongPass, setWrongPass] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  //Login
  async function logIn() {
    if (stayLoggedIn) await auth.setPersistence(browserLocalPersistence);
    else await auth.setPersistence(browserSessionPersistence);
    signInWithEmailAndPassword(auth, username + "@gascalc.com", pass)
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
      <LandingText className="text-5xl mb-10">gascalc</LandingText>
      {/* <p className="text-zinc-400 mb-2">Password</p> */}
      {wrongPass && (
        <p className="text-center text-rose-400 mb-5">Wrong password</p>
      )}

      <TextInput
        className="mb-10"
        type="text"
        placeholder="Uživatelské jméno"
        value={username}
        onChange={(e: any) => setUsername(e.target.value)}
      />

      <TextInput
        className="mb-10"
        type="password"
        placeholder="Heslo"
        value={pass}
        onChange={(e: any) => setPass(e.target.value)}
      />
      <div>
        <input
          type="checkbox"
          onChange={() => setStayLoggedIn(!stayLoggedIn)}
          className="mb-8"
        />
        <label className="ml-2">Pamatovat si mě</label>
      </div>

      <Button onClick={() => logIn()}>Login</Button>

      <div className="mt-8">
        <Desc>
          Nejsi uživatel?{" "}
          <span
            className="text-emerald-400 dark:text-emerald-300 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Registrace
          </span>
        </Desc>
      </div>
    </div>
  );
}

export default Login;
