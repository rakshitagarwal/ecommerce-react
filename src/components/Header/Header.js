import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import HeaderCartButton from "./HeaderCartBurtton";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import CartContext from "../store/CartContext";

function Header(props) {
  const authCntxt = useContext(AuthContext);
  const CartCntxt = useContext(CartContext);

  const navigate = useNavigate();
  const logoutHandler = () => {
    authCntxt.logout();
    navigate("/");
    CartCntxt.clearCart();
  };

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="header">
      <Container>
        <Navbar.Brand href="/">The Generics</Navbar.Brand>
        <Nav
          className="justify-content-center "
          variant="underline"
          id="navBar"
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="/store">Store</NavLink>
          <NavLink to="/about">About</NavLink>

          <NavLink to="/contactus">Contact Us</NavLink>
        </Nav>
        <Nav className="justify-content-end" style={{ alignItems: "center" }}>
          {!authCntxt.isLoggedIn && (
            <NavLink to="/auth" style={{ padding: 5, margin: 5 }}>
              Log In
            </NavLink>
          )}
          {authCntxt.isLoggedIn && (
            <button
              onClick={logoutHandler}
              style={{ padding: 5, margin: 5, background: "none" }}
            >
              Log Out
            </button>
          )}

          <HeaderCartButton onClick={props.onShowCart} />
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
