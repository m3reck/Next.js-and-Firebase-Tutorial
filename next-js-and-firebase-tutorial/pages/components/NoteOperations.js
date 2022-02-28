import React from "react";
import styles from "../../styles/Evernote.module.scss"

export default function NoteOperations(){
    return(
     <>
         <div className={styles.btnContainer}>
             <button className={styles.button}>
                 Add a new Note
             </button>
         </div>
         <div className={styles.inputContainer}>
             <input placeholder="Enter the title.."/>
         </div>
     </>
    )
}