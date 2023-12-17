
import styles from "./AddNoteModal.module.css"
import { useState } from "react"

import { BaseInput } from "../../../../components/BaseInput/BaseInput"
import { BaseButton } from "../../../../components/BaseButton/BaseButton"

import { createNote } from "../../../../api/requests"

export const AddNoteModal = ({closeModal}) => {

    const [data, setData] = useState({
        title: "",
        description: ""
    })

    const onChangeHandler = (e) => {
        setData((prevState) => ({...prevState, [e.target.name]: e.target.value }));
      };

    const submitHandler = async (e) => {
        e.preventDefault()

        const note = await createNote(data)

        closeModal()
    }

    return (
        <div className={styles["container"]}>
            <h1>Add Note</h1>

            <form className={styles["content"]} onSubmit={submitHandler} >
                <label>Title</label>
                <div className={styles["input-wrapper"]}>
                    <BaseInput  name="title" onChange={onChangeHandler} value={data.title}/>
                </div>

                <label>Description</label>
                <textarea name="description" onChange={onChangeHandler} value={data.description}/>

                <div className={styles["btn-wrapper"]}>
                    <BaseButton type="submit" buttonLabel="Submit" />
                </div>

            </form>

        </div>
    )
}