import styles from "./Footer.module.css";
import logo from "../assets/icon.png";
import facebook from "../assets/facebook.svg";
import x from "../assets/X.jpg";
import linkedIn from "../assets/linkedin.svg";
import gitHub from "../assets/Github.png";

export default function Footer() {
  return (
    <footer>
      <div className={styles.footer__container}>
        <div className={styles.inside}>
          <div className={styles.text}>
            <h3>Just buy It</h3>
            <p>If you want the best chainsaw, you will find it here.</p>
            <p className={styles.quote}>"The best tools make light of the hardest tasks." </p>
            <p className={styles.philosoph}>🧙‍♂️ Lao Tzu 🧙‍♂️</p>
          </div>
          <img src={logo} alt="Logo" />
          <ul className={styles.links}>
            <li><a href="https://www.facebook.com/"><img className={styles.link} src={facebook} alt="Facebook" /></a></li>
            <li><a href="https://x.com/"><img className={styles.link} src={x} alt="X" /></a></li>
            <li><a href="https://www.linkedin.com/"><img className={styles.link} src={linkedIn} alt="LinkedIn" /></a></li>
            <li><a href="https://github.com/"><img className={styles.link} src={gitHub} alt="Github" /></a></li>
          </ul>
        </div>
      </div>
      <div className={styles.additional__container}>
        <p className={styles.copyright}>2024 IoT © Copyright all rights reserved. 🧙‍♂️🧙‍♂️🧙‍♂️</p>
      </div>
    </footer>
  );
}
