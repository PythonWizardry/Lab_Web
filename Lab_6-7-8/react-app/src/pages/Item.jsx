import React, { useContext, useState, useEffect } from "react";
import styles from './Item.module.css'
import { Link, useParams } from "react-router-dom";
import { ChainsawContext } from "../services/data/All_Chainsaws";
import Filter from "../components/Filter";
import ItemInput from "../components/ItemInput";
import Napoleon from '../assets/napoleon_2.webp'

export default function Item() {
  useEffect(() => {
    document.title = "🧙‍♂️ Yay, you're buying 🧙‍♂️";
  });

  const {id} = useParams();

  const chainsaws = useContext(ChainsawContext);
  const foundchainsaw = chainsaws.find(el => el.id === id);

  const [warranty, setWarranty] = useState(0);
  const [color, setColor] = useState('All');
  const [priceForWarranty, setpriceForWarranty] = useState(0);
  const [priceForColor, setpriceForColor] = useState(0);

  const fullprice = () => {
    const basePrice = foundchainsaw.price;
    const colorPremium = (color === 'Matte Black' || color === 'Metallic Silver') ? 100 : 0;
    const warrantyPrice = warranty * 150;
    return basePrice + colorPremium + warrantyPrice;
  };

  if (!foundchainsaw) {
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
        <img className={styles.image} src={foundchainsaw.imagelink} alt="Uh, there was supposed to be a picture here" />
        <div className={styles.context}>
          <h2>{foundchainsaw.name}</h2>
          <p>{foundchainsaw.description}</p>
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
          <Link className={styles.item_button} to='/cart'>Add to cart</Link>
        </ul>
      </div>
    </div>
  );
}
