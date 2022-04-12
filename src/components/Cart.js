import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCarthunk } from '../redux/actions';
import '../styles/carts.css'

const Cart = ({isOpen}) => {

    const carts = useSelector(state => state.carts)

    const navigate = useNavigate();

    const dispatch = useDispatch();

    // console.log(carts)

    return (
        <div className={`carts-modal ${isOpen ? 'open' : ""} `}>
            my cart
            <ul className='carts-list'>
            {
                carts.map(cart => (
                    <li key={cart.productsInCart.productId} >
                        <strong onClick={() => navigate(`product/${cart.productsInCart.productId}`)}>Product { cart.title}</strong>
                        <div>Quantity {cart.productsInCart.quantity}</div>
                        <button onClick={() => dispatch(deleteCarthunk(cart.id))}>
                            Delete
                        </button>
                    </li>
                ))
            }
            </ul>
        </div>
    );
};

export default Cart;