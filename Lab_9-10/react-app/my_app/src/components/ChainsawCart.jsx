import styles from "./ChainsawCart.module.css";
import { Link } from "react-router-dom";

export default function ChainsawCart({chainsaw, imagelink}) {
  return (
    <div className={styles.chainsaw_cart}>
      <img className={styles.chainsaw_img} alt="Chainsaw" src={imagelink} />
      <div className={styles.chainsaw_text}>
        <h2>{chainsaw.name}</h2>
        <p>{chainsaw.description}</p>
      </div>
      <div className={styles.for_charasteristics}>
        <p className={styles.just_p}>Main charasteristics:</p>
        <ul className={styles.charasteristics}>
          <li>Power: {chainsaw.power} kW</li>
          <li>Chain-Revolutions: {chainsaw.chainRevolutions} rpm</li>
        </ul>
      </div>
      <div className={styles.price_and_btn}>
        <p className={styles.for_price}>Price: <span className={styles.dollars}>{chainsaw.price}$</span></p>
        <Link className={styles.card_btn} to={`/catalog/item/${chainsaw.id}`}>View more</Link>
      </div>
    </div>
  );
}


