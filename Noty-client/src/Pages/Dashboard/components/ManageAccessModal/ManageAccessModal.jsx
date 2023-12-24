import styles from "./ManageAccessModal.module.css"

export const ManageAccessModal = () => {

    return (
        <div className={styles["container"]}>

            <div className={styles["search-wrapper"]}>
                <BaseInput placeHolder="Search..." value={searchValue} onChange={handleSearchChange} />
                <Search onClick={searchSubmit} />

            </div>

            <div>

            </div>
        </div>
    )
}