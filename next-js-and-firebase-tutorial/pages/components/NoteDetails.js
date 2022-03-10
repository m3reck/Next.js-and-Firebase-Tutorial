import {useEffect, useState} from "react";
import { app, database } from '../../firebaseConfig'
import {collection, doc, getDoc, getDocs, updateDoc, deleteDoc} from "firebase/firestore"
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';
import styles from "../../styles/Evernote.module.scss"


export default function NoteDetails({ID}) {
    const dbInstance = collection(database, "notes");
    const [singleNote, setSingleNote] = useState({})
    const [isEdit, setIsEdit] = useState(false);
    const [noteTitle, setNoteTitle] = useState("");
    const [noteDescription, setNoteDescription] = useState("")

    //getting note
    const getSingleNote = async() =>{
        if (ID) {
            const singleNote = doc(database, "notes", ID);
            const data = await getDoc(singleNote);
            setSingleNote({ ...data.data(), id: data.id })
        }
    }
    //getting full notes database
    const getNotes = () => {
        getDocs(dbInstance)
            .then((data)=> {
                setSingleNote(data.docs.map((item)=> {
                    return { ...item.data(), id: item.id}
                })[0]);
            })
    }

    //editing single notes
    const editNote = (id) => {
        const collectionById = doc(database, "notes", id)
        updateDoc(collectionById, {
            noteTitle: noteTitle,
            noteDescription: noteDescription
        })
            .then(()=>{
                window.location.reload()
            })
    }
    //getting data to edit note
    const getEditData = () => {
        setIsEdit(true);
        setNoteTitle(singleNote.noteTitle);
        setNoteDescription(singleNote.noteDescription)
    }
    //deleting note
    const deleteNote = (id) => {
        const collectionById = doc(database, 'notes', id)
        deleteDoc(collectionById)
            .then(() => {
                window.location.reload()
            })
    }

    useEffect(()=> {
        getNotes();
    }, [])

    useEffect(() => {
        getSingleNote();
    }, [ID])

    return(
        <>
            <div>
                <button
                    onClick={getEditData}
                    className={styles.editButton}>Edit</button>
                <button
                    onClick={() => deleteNote(singleNote.id)}
                    className={styles.deleteButton}>Delete</button>
            </div>
            {isEdit ? (
                <div className={styles.inputContainer}>
                    <input
                        className={styles.input}
                        placeholder="Enter the title.."
                        onChange={(e) => setNoteTitle(e.target.value)}
                        value={noteTitle}/>

                    <div className={styles.ReactQuill}>
                        <ReactQuill
                            onChange={setNoteDescription}
                        value={noteDescription}/>
                    </div>
                    <button
                        onClick={() => editNote(singleNote.id)}
                        className={styles.saveBtn}>
                        Update Note
                    </button>
                </div>
            ) : (
                <>
                </>
                )}
            <h2>{singleNote.noteTitle}</h2>
            <div dangerouslySetInnerHTML={{ __html: singleNote.noteDescription}}></div>
        </>
    )
}