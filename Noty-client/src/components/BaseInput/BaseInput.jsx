import styles from "./BaseInput.module.css"

export const BaseInput = ({onChange, value, name, type, placeHolder}) => {

    return(
        <input type="text" className={styles["base-input"]} onChange={onChange} value={value} name={name} type={type || "text"} placeholder={placeHolder}/>
    )
}