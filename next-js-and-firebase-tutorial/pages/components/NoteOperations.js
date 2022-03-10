import React, {useEffect, useState} from "react";
import styles from "../../styles/Evernote.module.scss"
import { app, database } from "../../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore"
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function NoteOperations({getSingleNote}){
    const dbInstance = collection(database, "notes");

    const [isInputVisible, setInputVisible] = useState(false);
    const [noteTitle, setNoteTitle] = useState("");
    const [noteDescription, setNoteDescription] = useState("");
    const [notesArray, setNotesArray] = useState([]);

    //function that gets notes from database and returns it in a console
    const getNotes = () => {
        getDocs(dbInstance)
            .then((data) => {
            setNotesArray(data.docs.map((item) => {
                return { ...item.data(), id:item.id}
            }));
        })
    }

    useEffect(() => {
        getNotes();
    }, [])

    //function that adds description
    const addDescription = (value) => {
        setNoteDescription(value)
    }
    //function that toggles the visibility of inputs
    const inputToggle = () => {
        setInputVisible(!isInputVisible)
    }
    //function that saves notes to the firebase db
    const saveNote = () => {
        addDoc(dbInstance, {
            noteTitle: noteTitle,
            noteDescription: noteDescription
        })
            //then clears the value box of inputs after fulfilling its promise
            .then(() => {
                setNoteTitle("");
                setNoteDescription("");
                getNotes();
            })
    }
    return(
     <>
         <div className={styles.btnContainer }>
             <button
                 onClick={inputToggle}
                 className={styles.button}>
                 Add a new Note
             </button>
         </div>
         {isInputVisible ? (
         <div className={styles.inputContainer}>
             <input className={styles.input}
                    placeholder="Enter the title.."
                    onChange={(e) => setNoteTitle(e.target.value)}
                    value={noteTitle}
             />
             <div className={styles.ReactQuill}>
                 <ReactQuill
                     onChange={addDescription}
                     value={noteDescription}
                 />
             </div>
         </div>
             ) : (
                 <></>
             )}
         <button
             onClick={saveNote}
             className={styles.saveBtn}>
             Save Note
         </button>
         <div className={styles.notesDisplay}>
             {notesArray.map((note) => {
                 return (
                     <div
                         key={note.id}
                         className={styles.notesInner}
                            onClick={() => getSingleNote(note.id)}>
                         <h3>{note.noteTitle}</h3>
                         {/*<p dangerouslySetInnerHTML={{ __html: note.noteDescription }}></p>*/}

                     </div>
                 )
             })}
         </div>
     </>
    )
}