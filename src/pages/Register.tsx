import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
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

function Register() {
  let navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);

  //Login
  async function register() {
    createUserWithEmailAndPassword(auth, username + "@gascalc.com", pass)
      .then((userCredential) => {
        const user = userCredential.user;
        setError(false);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(true);
      });
  }

  return (
    <div className="p-2 flex flex-col justify-center items-center mt-20">
      <LandingText className="text-4xl mb-10">Registrace</LandingText>

      {error && (
        <p className="text-center text-rose-400 mb-5">
          Heslo musí mít více jak 6 znaků!
        </p>
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
      <Button onClick={() => register()}>Registrovat</Button>
    </div>
  );
}

export default Register;
