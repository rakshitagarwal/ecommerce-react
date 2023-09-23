import React, { useContext, useState } from "react";
import CartContext from "./CartContext";

const AuthContext = React.createContext({
  token: "",
  email: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");

  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState("");

  const userIsLoggedIn = !!token;

  const handleLogIn = (token, email) => {
    setToken(token);
    setEmail(email);
    console.log(email);
    localStorage.setItem("token", token);
  };

  const handleLogOut = () => {
    setToken(null);
    setEmail("");
    localStorage.removeItem("token");
  };

  const contextValue = {
    token: token,
    email: email,
    isLoggedIn: userIsLoggedIn,
    login: handleLogIn,
    logout: handleLogOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
