import styles from "./Home.module.css"

//sections
import { BaseSection } from "./sections/BaseSection/BaseSection"

export const Home = () => {

    return(
        <div className={styles["container"]}>
            <BaseSection />
        </div>
    )
}