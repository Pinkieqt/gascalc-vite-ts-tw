import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, Title } from "../primitives/StyledComponents";
import { auth } from "../utils/FirebaseConfig";

function Settings() {
  let navigate = useNavigate();

  // Function to Logout
  function logout() {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  }

  // theme
  function changeTheme() {}

  return (
    <div className="p-3 pb-16">
      <Title>Nastavení</Title>
      <h1 className="text-center text-xl mt-20">Tady nic není 😒😒😒</h1>
      <h1 className="text-center text-xl">a ani nebude jelikož</h1>
      <h1 className="text-center text-xl mb-20">... bude nová appka 😒</h1>

      {/* logout */}
      <div className="w-full flex justify-center items-center mt-5">
        <Button onClick={() => logout()}>Odhlásit</Button>
      </div>
    </div>
  );
}

export default Settings;
