
import styles from "./AddNoteModal.module.css"
import { BaseInput } from "../../../../components/BaseInput/BaseInput"

export const AddNoteModal = () => {

    return (
        <div className={styles["container"]}>
            <h1>Add Note</h1>

            <div className={styles["content"]}>
                <label>Title</label>
                <div className={styles["input-wrapper"]}>
                    <BaseInput />
                </div>

                <label>Description</label>
                <textarea />
            </div>

        </div>
    )
}