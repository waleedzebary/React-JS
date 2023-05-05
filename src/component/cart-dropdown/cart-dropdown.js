import './cart-dropdown.scss';
import Button from '../button/button';
import CartItem from '../cart-item/cart-item';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-context';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const naviagte = useNavigate();

    const goTOCheckoutHandler = () => {
        naviagte('/checkout');
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => {
                    return <CartItem key={item.id} cartItem={item} />;
                })}
            </div>
            <Button onClick={goTOCheckoutHandler} >GO TO CHECKOUT</Button>
        </div>
    );
};

export default CartDropdown;
