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

  return (
    <div className="p-3 pb-16">
      <Title>Settings</Title>
      <h1 className="text-center text-xl my-20">Nothing here 😒</h1>

      {/* logout */}
      <div className="w-full flex justify-center items-center mt-5">
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    </div>
  );
}

export default Settings;
