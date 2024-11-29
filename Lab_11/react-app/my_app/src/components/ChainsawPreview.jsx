import styles from "./ChainsawPreview.module.css";

export default function ChainsawPreview({ chainsawName, chainsawDesc, chainsawImg }) {
  return (
    <div className={styles.chainsaw_preview}>
      <img className={styles.chainsaw_img} alt="Chainsaw" src={chainsawImg} />
      <div className={styles.chainsaw_text}>
        <h2>{chainsawName}</h2>
        <p>{chainsawDesc}</p>
      </div>
    </div>
  );
}

