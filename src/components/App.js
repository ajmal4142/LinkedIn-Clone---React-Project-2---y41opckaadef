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
import Network from "./Network";
import Message from "./Message";
import Notification from "./Notification";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [{ token }] = useStateProvider();
  useEffect(() => {
    if (!token && location.pathname != "/signin") {
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
            <Route path="/network" element={<Network />} />
            <Route path="/message" element={<Message />} />
            <Route path="/notification" element={<Notification />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
