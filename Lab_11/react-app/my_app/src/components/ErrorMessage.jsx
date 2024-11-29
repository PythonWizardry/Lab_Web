import React, { useState } from 'react';
import styles from './ErrorMessage.module.css';

function ErrorMessage({ errors, touched }) {
  const [visible, setVisible] = useState(true);
  const errorMessages = Object.keys(errors).filter(key => touched[key]).map(key => errors[key]);

  if (errorMessages.length === 0 || !visible) return null;

  return (
    <div className={styles.error}>
      <ul>
        {errorMessages.map((message, index) => (
          <li key={index}>
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ErrorMessage;