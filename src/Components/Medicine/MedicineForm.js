import React, {useState, useContext} from "react";
import ListContext from "../../Store/list-context";
import CartContext from "../../Store/cart-context";
import './MedicineForm.module.css';

const MedicineForm = (props) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const listCxt = useContext(ListContext);
    const cartCxt = useContext(CartContext);

    const medicineChangeHandler = (event) => {
        setName(event.target.value);
    }
    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value);
    }
    const priceChangeHandler = (event) => {
        setPrice(event.target.value);
    }
    const quantityChangeHandler = (event) => {
        setQuantity(event.target.value);
    }

    const submitHandler =async(event) => {
        event.preventDefault();
        const data = {
            id: Math.random().toString(),
            name: name,
            description: description,
            price: price,
            quantity: quantity,
        }
        await listCxt.addData(data);
        setName('');
        setDescription('');
        setPrice('');
        setQuantity('');
        
    }

    let cartQuantity = 0;
    cartCxt.items.forEach((item) => {
        return cartQuantity = cartQuantity + Number(item.quantity);
    })

    return (
        <React.Fragment>
            <div>
                <header><button onClick={props.onShowCart}>{`Cart${cartQuantity}`}</button></header>
                <form onSubmit={submitHandler}>
                    <label htmlFor="medicine">Candy</label>
                    <input id="medicine" type="text" value={name} onChange={medicineChangeHandler}></input>
                    <label htmlFor="Description">Description</label>
                    <input id="Description" type="text" value={description} onChange={descriptionChangeHandler}></input>
                    <label htmlFor="Price">Price</label>
                    <input id="Price" type="number" value={price} onChange={priceChangeHandler}></input>
                    <label htmlFor="Quantity Available">Quantity Available</label>
                    <input id="Quantity Available" type="text" value={quantity} onChange={quantityChangeHandler}></input>
                    <button type="submit">Add Product</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default MedicineForm;


/* Form create kiye normally bs input data ko ListProvider me de diye array me add krne ke liye taki ye list hm cart me bhi use kr sake bina props chaining ke */