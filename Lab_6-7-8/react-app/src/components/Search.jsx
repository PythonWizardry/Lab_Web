import styles from './Search.module.css'


export default function Search({onChange}) {

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <input className={styles.search_input} onChange={handleChange} placeholder='Search chainsaws...' />
    );
}