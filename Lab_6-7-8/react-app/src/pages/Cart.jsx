import Napoleon from '../assets/napoleon_2.webp'
import styles from './Cart.module.css'

export default function Catalog(){
    return (
        <>
            <h1>"🧙‍♂️ There is nothing we can do!!! 🧙‍♂️"</h1>
            <div className={styles.imgNapoleon}>
                <img src={Napoleon} alt="Hmm......" />
            </div>
        </>

    );
}