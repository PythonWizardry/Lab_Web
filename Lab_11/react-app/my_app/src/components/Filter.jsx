import styles from './Filter.module.css'


export default function Dropdown({ default_descriprion, options, onChange }) {

    const handleChange= (event) => {
        onChange(event.target.value)
    }
    return (
        <select onChange={handleChange} className={styles.dropdown}>
            <option className='dropdown-option' value='All'>{default_descriprion}</option>
            {options.map(option => (<option key={option.value} className='dropdown-option' value={option.value}>{option.label}</option>))}
        </select>
    );
}