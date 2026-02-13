import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./auth/login";
import SignUp from "./auth/signup";
import Dashboard from "./pages/dashboard";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { app } from "./auth/firebase";
import { useState } from "react";


function App() {
  const [user,setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        setUser(user);
      } else {
        setUser(null);
      }
    })
  }, [auth]);

  const handleRouting = (path) => {
    if(user) {
      return <Dashboard />
    } else {
      if (path === "/signup") {
        return <SignUp />
      } else {
        return <Login />
      }
    }
  }

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={handleRouting("/")} />
          <Route path="/login" element={handleRouting("/login")} />
          <Route path="/signup" element={handleRouting("/signup")} />
          <Route path="/dashboard" element={handleRouting("/dashboard")} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  )
}

export default App;