import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddDistance from "./pages/AddDistance";
import Append from "./pages/Append";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import { auth, db } from "./utils/FirebaseConfig";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useAuthListener } from "./utils/AuthListener";
import { GasEntry, UsersData } from "./utils/Types";
import Loading from "./pages/Loading";

// Auth + usersdata context - here because of loading
export const AuthContext = createContext(null);
export const UsersDataContext = createContext<GasEntry[]>([]);

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { loggedIn, checkingStatus } = useAuthListener();
  let loc = useLocation();

  useEffect(() => {
    setIsLoading(true);
    if (loggedIn) {
      const unsub = onSnapshot(
        doc(db, "users", auth.currentUser!.uid),
        (doc) => {
          if (doc.data() != undefined) setUsersData(doc.data()!.data);
          setIsLoading(false);
        }
      );
    } else setIsLoading(false);
  }, [loggedIn, checkingStatus]);

  return (
    <AuthContext.Provider value={currentUser}>
      <UsersDataContext.Provider value={usersData}>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="min-h-screen bg-white dark:bg-black text-neutral-700 dark:text-neutral-100">
            <div className="container mx-auto p-2 pb-14">
              <div className="w-full flex justify-center">
                {loc.pathname !== "/login" && <Navbar />}
                <Routes>
                  <Route
                    path="/"
                    element={<ProtectedRoute component={Home} />}
                  />
                  <Route
                    path="settings"
                    element={<ProtectedRoute component={Settings} />}
                  />
                  <Route
                    path="add"
                    element={<ProtectedRoute component={Append} />}
                  />
                  <Route path="login" element={<Login />} />
                  <Route
                    path="*"
                    element={<ProtectedRoute component={Home} />}
                  />
                  <Route
                    path="add_distance/:entryId"
                    element={<ProtectedRoute component={AddDistance} />}
                  />
                </Routes>
              </div>
            </div>
          </div>
        )}
      </UsersDataContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
