import React, { useState } from "react";
import ListProvider from "./Store/ListProvider";
import MedicineList from "./Components/Medicine/MedicineList";
import MedicineForm from "./Components/Medicine/MedicineForm";
import CartProvider from "./Store/CartProvider";
import Cart from "./Components/Cart/Cart";

const App = () => {
  const [cartShown, setCartShown] = useState(false);

  const showCartHandler = () => {
    setCartShown(true);
  };
  const hideCartHandler = () => {
    setCartShown(false);
  };

  return (
    <ListProvider>
      <CartProvider>
        <MedicineForm onShowCart={showCartHandler}/>
        <MedicineList />
        {cartShown && <Cart onHideCart={hideCartHandler}/>}
      </CartProvider>
    </ListProvider>
  );
};

export default App;
