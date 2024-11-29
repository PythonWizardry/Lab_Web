import styles from './Navbar.module.css';
import logo from '../assets/icon.png';
import { NavLink, useLocation } from 'react-router-dom';


export default function Navbar() {

  const location = useLocation();
  const isCatalogPage = location.pathname.startsWith('/catalog');

  return (
    <header>
      <div className={styles.header__container}>
        <div className={styles.img}>
          <img src={logo} alt="Logo" />
        </div>
        <nav className={styles.just_nav}>
          <ul>
            <li><NavLink to="/" className={({ isActive }) => isActive ? styles.linkActive : styles.link}>Home</NavLink></li>
            <li><NavLink to="/catalog" className={isCatalogPage ? styles.linkActive : styles.link}>Catalog</NavLink></li>
            <li><NavLink to="/cart" className={({ isActive }) => isActive ? styles.linkActive : styles.link}>Cart</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>

  );
}
