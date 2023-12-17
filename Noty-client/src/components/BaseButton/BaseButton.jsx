import styles from "./BaseButton.module.css"

export const BaseButton = ({buttonLabel, type, onClick}) =>{

    return(
        <button 
            className={styles["base-button"]} 
            type={type || "button"}
            onClick={onClick}
        >
            {buttonLabel}
        </button>
    )
}