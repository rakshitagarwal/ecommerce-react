import React, { useContext } from "react";
import classes from "./AuthForm.module.css";
import { useRef, useState } from "react";
import AuthContext from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [hasAccount, sethasAccount] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authCntxt = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    sethasAccount((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const emailForCrud = enteredEmail.replace("@", "").replace(".", "");
    setIsLoading(true);
    setError(null);
    let url;
    if (hasAccount) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhQgKELbVmla-4qp1JmM6jMC76ONrMNP4";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication Failed";

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          authCntxt.login(data.idToken, data.email);
          navigate("/store");
        })
        .catch((err) => {
          alert(err.message);
        });

      emailRef.current.value = "";
      passwordRef.current.value = "";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhQgKELbVmla-4qp1JmM6jMC76ONrMNP4";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication Failed";

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          authCntxt.login(data.idToken, data.email);
          navigate("/store");
        })
        .catch((err) => {
          alert(err.message);
        });

      let cart = {};
      fetch(
        `https://crudcrud.com/api/61288f0e202d47d2b0fcf8b682a5f08c/cart${emailForCrud}`,
        {
          method: "POST",
          body: JSON.stringify(cart),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      fetch(
        `https://ecommerce-a3b1b-default-rtdb.firebaseio.com/cart/${emailForCrud}.json`,
        {
          method: "POST",
          body: JSON.stringify(cart),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      emailRef.current.value = "";
      passwordRef.current.value = "";
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{hasAccount ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && error === null && (
            <button>{hasAccount ? "Login" : "Create Account"}</button>
          )}
          {!isLoading && error && <p>{error}</p>}
          {isLoading && <p>Loading...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {hasAccount ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
