import styles from "./ItemInput.module.css";

export default function ItemInput({ onChange }) {
  const handleChange = (event) => {
    if (event.target.value === "") {
      onChange(0);
    } else {
      onChange(parseInt(event.target.value));
    }
  };

  return (
    <input className={styles.item_input} onChange={handleChange} min={0} type="number" placeholder="Enter..."/>
  );
}
