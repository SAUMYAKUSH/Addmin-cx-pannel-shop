import React, { useContext, useState, useEffect } from "react";
import CartContext from "./cart-context";
import ListContext from "./list-context";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);

  const listCxt = useContext(ListContext);

  // Add useEffect to fetch cart data when the component mounts
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(
          "https://keep-clone-c021e-default-rtdb.firebaseio.com/cart.json"
        );
        if (response.ok) {
          const data = await response.json();
          let cartItems = [];
          for (let key in data) {
            cartItems.push({
              id: key,
              ...data[key],
            });
          }
          setItems(cartItems);
        } else {
          console.error("failed to fetch cart data");
        }
      } catch (error) {
        console.error("error occurred", error);
      }
    };

    fetchCartData();
  }, []);

  const addItemToCartHandler = async (gotItem, qnt) => {
    try {
      const response = await fetch(
        "https://keep-clone-c021e-default-rtdb.firebaseio.com/cart.json",
        {
          method: "POST",
          body: JSON.stringify({ ...gotItem, quantity: qnt }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setItems((prevItems) => {
          const existingItem = prevItems.find((item) => item.id === gotItem.id);
          if (existingItem) {
            return prevItems.map((item) =>
              item.id === gotItem.id
                ? { ...item, quantity: item.quantity + qnt }
                : item
            );
          } else {
            return [...prevItems, { ...gotItem, quantity: qnt }];
          }
        });
      } else {
        console.error("failed to add data");
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const removeItemToCartHandler = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateCartQuantity = (id) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      // Remove the item from the cart if the quantity becomes zero
      return updatedItems.filter((item) => item.quantity > 0);
    });
    listCxt.updateQuantity(id, -1); // updateQuantity me - h already to -1 pass kiye - - + hoga
  };

  const cartContext = {
    items: items,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    updateCartQuantity: updateCartQuantity,
  };

  return (
    <React.Fragment>
      <CartContext.Provider value={cartContext}>
        {props.children}
      </CartContext.Provider>
    </React.Fragment>
  );
};

export default CartProvider;
