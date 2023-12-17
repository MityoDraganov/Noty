import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BaseSection.module.css";

import { BaseButton } from "../../../../components/BaseButton/BaseButton";



export const BaseSection = () => {

    const navigate = useNavigate()

    const useTypingEffect = (text, duration) => {
        const [visibleText, setVisibleText] = useState("");
      
        useEffect(() => {
          let currentIndex = 0;
          const intervalId = setInterval(() => {
            setVisibleText((prevText) => prevText + text[currentIndex]);
            currentIndex++;
      
            if (currentIndex === text.length - 1) {
              clearInterval(intervalId);
            }
          }, duration);
      
          return () => clearInterval(intervalId);
        }, [text, duration]);
      
        return visibleText;
      };

  const text = 
    `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    "Reprehenderit quam recusandae accusantium, voluptate minima vitae aut eveniet sint vel ratione, saepe mollitia tempora itaque assumenda dolorem nam voluptas eos facilis!
    "Tenetur sed laborum doloribus architecto corporis voluptatibus illo quis, placeat enim accusantium fugiat minus magnam ratione eius ab, nobis fugit.
    "Soluta neque ullam quae! Quia minima dolore modi maxime sit!
    "Aut eum, quidem voluptate magnam beatae, commodi perferendis vero molestias, hic minus ipsum! Quae illo aut, cumque quas, earum repellat, veniam exercitationem quo assumenda ea doloremque minima optio soluta dicta!`
  


  return (
    <div className={styles["container"]}>
      <div className={styles["content-container"]}>
        <h1>
            Welcome to <span className={styles["application-name"]}>Noty</span>
        </h1>

        <div className={styles["lines"]}>
            <p>
                {
                    useTypingEffect(text, 35)
                }
            </p>
        </div>

        <div className={styles["baseButton-wrapper"]}>
            <BaseButton buttonLabel="✏️ Get started with Noty now!" onClick={() => navigate("/dashboard")}/>
        </div>
      </div>
    </div>
  );
};
