import styles from "./Note.module.css"
import { useState } from "react"

import { MoreHorizontal } from "lucide-react"
import { deleteNote } from "../../../../api/requests"

export const Note = ({ title, description, _id }) => {

    const [isOptionsOpen, setIsOptionsOpen] = useState(false)

    const handleDelete = async () => {
        if(confirm("Are you sure that you want to delete that note?")){
            await deleteNote(_id)
        }
    }

    const handleEdit = () => {

        
    }

    return (
        <div className={styles["container"]}>


            <h1>{title}</h1>
            <textarea readOnly>
                {description}
            </textarea>


            <div className={styles["actions-container"]}>
                <div onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
                    <MoreHorizontal />
                </div>
            </div>

            <div className={styles["options-container"]} style={{ display: isOptionsOpen ? "block" : "none" }}>
                <ul>
                    <li onClick={handleEdit}>Edit</li>
                    <li onClick={handleDelete}>Delete</li>
                </ul>
            </div>


        </div>
    )
}