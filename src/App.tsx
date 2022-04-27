import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Append from "./pages/Append";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import ProtectedRoute from "./utils/ProtectedRoute";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  let loc = useLocation();

  return (
    <NextUIProvider>
      <div className="min-h-screen bg-white dark:bg-black text-neutral-700 dark:text-neutral-100">
        <div className="container mx-auto p-2">
          <div className="w-full flex justify-center">
            {loc.pathname !== "/login" && <Navbar />}
            <Routes>
              <Route path="/" element={<ProtectedRoute component={Home} />} />
              <Route
                path="settings"
                element={<ProtectedRoute component={Settings} />}
              />
              <Route
                path="add"
                element={<ProtectedRoute component={Append} />}
              />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<ProtectedRoute component={Home} />} />
            </Routes>
          </div>
        </div>
      </div>
    </NextUIProvider>
  );
}

export default App;
