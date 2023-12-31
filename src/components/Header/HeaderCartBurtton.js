import { GrCart } from "react-icons/gr";
import classes from "./HeaderCartButton.module.css";
import { Fragment } from "react";
import { useContext } from "react";
import CartContext from "../store/CartContext";

function HeaderCartButton(props) {
  const cartCntxt = useContext(CartContext);

  const numberOfItemsInCart = cartCntxt.products.reduce((currNum, product) => {
    return currNum + product.amount;
  }, 0);

  return (
    <Fragment>
      <button className={classes.button} onClick={props.onClick}>
        <span className={classes.icon}>
          <GrCart />
        </span>
        <span> Cart</span>

        <span className={classes.badge}>{numberOfItemsInCart}</span>
      </button>
    </Fragment>
  );
}
export default HeaderCartButton;
