import React from 'react';
import styles from './CartListItem.module.css';

function CartListItem({chainsaw, onPlus, onMinus, imagelink}) {
  const {id, name, price, color = 'Default Color', amount, warranty, chainsawiImagelink} = chainsaw;
  return (
    <li className={styles.cart_item}>
      <img className={styles.cart_item__image} src={imagelink} alt='chainsaw'/>
      <div className={styles.cart_item__text}>
          <h3>{name}</h3>
          <p>Color: <span>{color}</span></p>
          <p>Warranty: <span>{warranty}</span></p>
      </div>
      <div className={styles.cart_item__counter}>
          <button onClick={() => onPlus(id, color, warranty)}>+</button>
          <p>{amount}</p>
          <button onClick={() => onMinus(id, color, warranty)}>-</button>
      </div>
      <p className={styles.cart_item__price}>{amount * (price + (color === 'Matte Black' || color === 'Metallic Silver' ? 100 : 0) + (warranty > 0 ? (warranty * 150) : 0))} $</p>
    </li>
  )
}

export default CartListItem