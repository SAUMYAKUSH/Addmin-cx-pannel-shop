import React, { useContext } from "react";
import CartContext from "../../Store/cart-context";
import Modal from '../UI/Modal';
import './Cart.module.css'

const Cart = (props) => {
  //const listCxt = useContext(ListContext);
  const cartCxt = useContext(CartContext);

  let totalAmount = cartCxt.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Modal onHideCart={props.onHideCart}>
      <div>
        <ul>
          {cartCxt.items.map((item) => (
            <li key={item.id}>
              Name: {item.name} Description: {item.description} Price:{" "}
              {item.price} Qnt: {item.quantity}
              <button onClick={() => cartCxt.updateCartQuantity(item.id)}>-</button>
            </li>
          ))}
        </ul>
        <span>{`Total Amount ${totalAmount.toFixed(2)}`}</span>
        <button type="click" onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default Cart;
