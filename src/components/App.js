import "../styles/App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Forgot from "./Forgot";
import NavBar from "./NavBar";
import Home from "./home/Home";
import Premium from "./Premium";
import Search from "./Search";
import UserDetail from "./UserDetail";
import Details from "./Details";
import Groups from "./Groups";
import { useStateProvider } from "../utils/StateProvider";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [{ token }] = useStateProvider();
  useEffect(() => {
    if (location.pathname === "/" && !token) {
      navigate("/signin");
    }
  }, [location.pathname, history]);
  return (
    <>
      {location.pathname === "/signup" ? (
        <SignUp />
      ) : location.pathname === "/signin" ? (
        <SignIn />
      ) : location.pathname === "/forgot" ? (
        <Forgot />
      ) : location.pathname === "/premium" ? (
        <Premium />
      ) : (
        <>
          <NavBar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/user" element={<UserDetail />} />
            <Route path="/detail" element={<Details />} />
            <Route path="/group" element={<Groups />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
