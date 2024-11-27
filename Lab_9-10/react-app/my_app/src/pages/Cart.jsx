import React, { useEffect } from 'react';
import styles from './Cart.module.css';
import CartListItem from '../components/CartListItem';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeItem } from '../Redux/CartSlice';
import { newGetImage } from './Item';
import Napoleon from '../assets/napoleon_2.webp'


import Modern from '../assets/images_for_chainsaws/modern.jpg'
import Small from '../assets/images_for_chainsaws/small.jpg'
import Powerful from '../assets/images_for_chainsaws/powerful.jpg'
import Art from '../assets/images_for_chainsaws/art.jpg'
import Vintage from '../assets/images_for_chainsaws/vintage.jpg'

function Cart() {
  document.title = 'Shopping cart';

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.amount * (item.price + (item.color === 'Matte Black' || item.color === 'Metallic Silver' ? 100 : 0) + (item.warranty > 0 ? (item.warranty * 150) : 0));
  }, 0);

  const handleIncrement = (id, color, warranty) => {
    dispatch(incrementQuantity({id: id, color: color, warranty: warranty}));
  }

  const handleDecrement = (id, color, warranty) => {
    const item = cart.find(item => item.id === id && item.color === color);
    if (item.amount > 1) dispatch(decrementQuantity({id: id, color: color, warranty: warranty}));
    else dispatch(removeItem({id: id, color: color, warranty: warranty}));
  }

  return (
    <div className={styles.cart}>
      <h1 className={styles.cart_header}>Shopping cart</h1>
      {cart.length === 0 ? 
      (
      <div className={styles.wrong_item}>
        <h2 className={styles.meme_text}>🧙‍♂️ There is nothing we can do 🧙‍♂️</h2>
        <h2>(Something is wrong, there isn't no one chainsaw)</h2>
        <img src={Napoleon} alt="France, Army, Josephine" />
      </div>
      ) : 
      (<>
      <ul className={styles.cart_list}>
        {cart.map(chainsaw => (<CartListItem chainsaw={chainsaw} imagelink={newGetImage(chainsaw.chainsawImagelink)}
        key={`${chainsaw.id}-${chainsaw.roomType}`} 
        onPlus={handleIncrement} onMinus={handleDecrement}/>))}
      </ul>
      <h2 className={styles.cart_total__price}>Total price: {totalPrice} $</h2>
      </>)}
      <div className={styles.cart_links}>
        <NavLink className={styles.cart_back__button} to='/catalog'>Back to catalog</NavLink>
        {cart.length !== 0 && (<NavLink className={styles.cart_continue__button} to='/'>Continue</NavLink>)}
      </div>
    </div>
  )
}

export default Cart