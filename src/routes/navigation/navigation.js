import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import './navigation.style.scss';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user-context";
import { CartContext } from "../../contexts/cart-context";
import { signOutUser } from "../../DataBase/firebase/firebase";
import CartIcon from "../../component/card-icon/cart_icon";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown";


const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className="navigation">
          <Link className="logo-container" to='/'>
              <CrwnLogo className='logo' />
          </Link>
        <div className="nav-links-container">
          <Link className='nav-link' to='/shop'>
              SHOP
          </Link>
          { currentUser ? (
              <span className='nav-link' onClick={signOutUser} > SIGN OUT</span>
              ) : 
              (<Link className="nav-link" to='/auth'>
                SIGN IN
              </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
  }


  export default Navigation;