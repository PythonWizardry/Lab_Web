import React, { useContext, useState, useEffect } from "react";
import styles from './Item.module.css'
import { Link, useParams } from "react-router-dom";
import Filter from "../components/Filter";
import ItemInput from "../components/ItemInput";
import Napoleon from '../assets/napoleon_2.webp'
import { getToolItem } from "../API/api";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../Redux/CartSlice.js';


import Modern from '../assets/images_for_chainsaws/modern.jpg'
import Small from '../assets/images_for_chainsaws/small.jpg'
import Powerful from '../assets/images_for_chainsaws/powerful.jpg'
import Art from '../assets/images_for_chainsaws/art.jpg'
import Vintage from '../assets/images_for_chainsaws/vintage.jpg'

export function newGetImage(chainsawLink) {
  if (chainsawLink === "Art") {
    return Art;
  } else if (chainsawLink === "Modern") {
    return Modern;
  } else if (chainsawLink === "Powerful") {
    return Powerful;
  } else if (chainsawLink === "Small") {
    return Small;
  } else if (chainsawLink === "Vintage") {
    return Vintage;
  }
}


export default function Item() {
  useEffect(() => {
    document.title = "🧙‍♂️ Yay, you're buying 🧙‍♂️";
  });



  const {id} = useParams();

  const [chainsaw, setChainsaw] = useState(null);
  const [warranty, setWarranty] = useState(0);
  const [color, setColor] = useState('Default color');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
        setIsLoading(true);
        await getToolItem(id)
        .then(response => setChainsaw(response.data))
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000); 
        });
    }
    getData();
  }, [id]);

  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const addToCart = async () => {
    const existingChainsaw = cart.find(item => item.id === id && item.color === color && item.warranty === warranty);
    let updatedCart;
    if (existingChainsaw) {
        updatedCart = cart.map(item => {
          if (item => item.id === id && item.color === color && item.warranty === warranty) {
              item = {...item, amount: item.amount + 1};
          }
          return item;
        });
        alert("Item updated")
    }
    else {
        updatedCart = [...cart, { id: id, name: chainsaw.name, price: chainsaw.price, color: color, amount: 1, warranty: warranty, chainsawImagelink: chainsaw.imagelink }];
        alert('Item added to cart');
    }
    dispatch(setCart(updatedCart));
  }

  const fullprice = () => {
    const basePrice = chainsaw.price;
    const colorPremium = (color === 'Matte Black' || color === 'Metallic Silver') ? 100 : 0;
    const warrantyPrice = warranty * 150;
    return basePrice + colorPremium + warrantyPrice;
  };


  if (isLoading) {
    return (<Loader/>)
  }

  if (!chainsaw) {
      return (
      <div className={styles.wrong_item}>
        <h2 className={styles.meme_text}>🧙‍♂️ There is nothing we can do 🧙‍♂️</h2>
        <h2>(Something is wrong, there isn't chainsaw like this)</h2>
        <img src={Napoleon} alt="France, Army, Josephine" />
      </div>
    );
  }
  return (
    <div className={styles.item}>
      <div className={styles.main__container}>
        <img className={styles.image} src={newGetImage(chainsaw.imagelink)} alt="Uh, there was supposed to be a picture here" />
        <div className={styles.context}>
          <h2>{chainsaw.name}</h2>
          <p>{chainsaw.description}</p>
          <div className={styles.fields}>
            <div className={styles.countable_field}>
              <label>Warranty Period (1 year costs 150$)</label>
              <ItemInput onChange={setWarranty}/>
            </div>
            <div className={styles.selectable_field}>
              <label>Colors (Premium is 100$ more)</label>
              <Filter
                default_descriprion={'Default color'} 
                options={[
                  { value: 'Black', label: 'Black' },
                  { value: 'Green', label: 'Green' },
                  { value: 'Matte Black', label: 'Matte Black(Premium)' },
                  { value: 'Metallic Silver', label: 'Metallic Silver(Premium)' },
                ]} 
                onChange={setColor}/>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttons__container}>
        <h2>Price: {fullprice()}$</h2>
        <ul>
          <Link className={styles.item_button} to='/catalog'>Go back</Link>
          <button onClick={addToCart} className={styles.item__button}>Add to cart</button>
        </ul>
      </div>
    </div>
  );
}

