import React from "react";
import classes from "./Cart.module.css";
import { Button } from "react-bootstrap";
import Modal from "../../UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import CartItem from "./CartItem";

const Cart = (props) => {
  const CartCntxt = useContext(CartContext);

  const totalAmount = CartCntxt.totalAmount.toFixed(2);

  const cartItemRemoveHandler = (id) => {
    CartCntxt.removeItem(id);
  };
  const cartItemAddHandler = async (product) => {
    await CartCntxt.addItem({ ...product, amount: 1 });
  };

  const cartElements = (
    <ul className={classes["cart-items"]}>
      {CartCntxt.products.map((product) => (
        <CartItem
          key={product.title}
          title={product.title}
          amount={product.amount}
          price={product.price}
          id={product.title}
          onRemove={cartItemRemoveHandler.bind(null, product.id)}
          onAdd={cartItemAddHandler.bind(null, product)}
        />
      ))}
    </ul>
  );

  const hasItem = CartCntxt.products.length > 0;

  return (
    <Modal>
      {cartElements}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>Rs {totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <Button
          variant="danger"
          style={{ marginRight: 5 }}
          onClick={props.onHideCart}
        >
          Close
        </Button>
        {hasItem && <Button variant="primary">Order</Button>}
      </div>
    </Modal>
  );
};

export default Cart;
