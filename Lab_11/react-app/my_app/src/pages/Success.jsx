import React from "react";
import { Link } from "react-router-dom";
import { CheckCircleFilled } from "@ant-design/icons";
import styles from "./Success.module.css";


function SuccessPage() {

  return (

    <div className={styles.success}>
      <CheckCircleFilled 
      style={{ fontSize: '1000%', marginBottom: "20px", color:"rgb(202, 186, 17)"}}/>
      <h1 className={styles.success_title}>Success!</h1>
      <div className={styles.success_text}>
        <p>Your order was sent to processing!</p>
        <p>Check your e-mail box for further information.</p>
      </div>
      <Link to="/catalog">
        <button className={styles.go_back_button}> Go back to catalog</button>
      </Link>
    </div>
  );
}

export default SuccessPage;