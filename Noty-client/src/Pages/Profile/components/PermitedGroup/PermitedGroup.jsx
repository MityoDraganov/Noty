import { BaseButton } from "../../../../components/BaseButton/BaseButton"
import styles from "./PermitedNoteGroups.module.css"

export const PermitedGroup = ({_id, title, removeAccess}) => {

    return(
        <div className={styles["container"]}>
            <p>{title}</p>
            <div>
                <BaseButton buttonLabel="Remove my access" onClick={() => removeAccess(_id)}/>
            </div>
        </div>
    )
}