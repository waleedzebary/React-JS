import './checkout.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-context';

const Checkout = () => {
    const { cartItems, addItemToCart } = useContext(CartContext);

    return (
        <div>
            {
                cartItems.map((cartItem) => {
                    const {id, name, quantity} = cartItem;
                    return(
                        <div key={id}>
                            <h2> {name} </h2>
                            <span> {quantity} </span>
                            <span>decrement</span>
                            <span>increment</span>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Checkout;