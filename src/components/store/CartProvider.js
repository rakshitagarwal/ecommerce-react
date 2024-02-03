import React, { useContext, useEffect } from "react";
import CartContext from "./CartContext";
import { useReducer } from "react";
import AuthContext from "./AuthContext";

let defaultCartState = {
  products: [],
  totalAmount: 0,
};

const CartReducer = (state, action) => {
  if (action.type === "ADD") {
    return {
      products: action.products,
      totalAmount: action.totalAmount,
    };
  }
  if (action.type === "CLEAR") {
    return {
      products: action.products,
      totalAmount: action.totalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.products.findIndex(
      (product) => product.id === action.id
    );
    const existingItem = state.products[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.products.filter(
        (product) => product.id !== action.id
      );
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.products];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      products: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const authCntxt = useContext(AuthContext);
  const emailForCrud = authCntxt.email.replace("@", "").replace(".", "");

  const [cartState, dispatchCartAction] = useReducer(
    CartReducer,
    defaultCartState
  );

  useEffect(() => {
    const setDefaultValue = async () => {
      await fetch(
        `https://ecommerce-a08fc-default-rtdb.firebaseio.com/cart/${emailForCrud}.json`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          dispatchCartAction({
            type: "ADD",
            products: data?.products || [],
            totalAmount: data?.totalAmount || 0,
          });
          console.log(data);
        })
        .catch((err) => console.log(err));
    };
    if (emailForCrud) {
      setDefaultValue();
    }
  }, [emailForCrud]);

  const addItemToCartHandler = async (product) => {
    const updatedAmount =
      cartState.totalAmount + product.price * product.amount;
    const existingCartItemIndex = cartState.products.findIndex(
      ({ id }) => id === product.id
    );
    const existingCartItem = cartState.products[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + product.amount,
      };
      updatedItems = [...cartState.products];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = cartState.products.concat(product);
    }
    dispatchCartAction({
      type: "ADD",
      products: updatedItems,
      totalAmount: updatedAmount,
    });
    await fetch(
      `https://ecommerce-a08fc-default-rtdb.firebaseio.com/cart/${emailForCrud}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          products: updatedItems,
          totalAmount: updatedAmount,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  };
  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR", products: [], totalAmount: 0 });
  };

  const cartContext = {
    products: cartState.products,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
