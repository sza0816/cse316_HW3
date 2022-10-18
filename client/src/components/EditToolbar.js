import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    let addSongClass = "playlister-button";
    let undoClass="playlister-button";
    let redoClass="playlister-button";
    let closeClass="playlister-button";

    //foolproof design
    if(!store.canAddSong){
        addSongClass+=" playlister-button-disabled";
        undoClass+=" playlister-button-disabled";
        redoClass+=" playlister-button-disabled";
    }

    if(!store.canUndo){
        undoClass+=" playlister-button-disabled";
    }

    if(!store.canRedo){
        redoClass+=" playlister-button-disabled";
    }

    if(!store.canClose){
        closeClass+=" playlister-button-disabled";
    }

    if(store.modalVisible){
        addSongClass+=" playlister-button-disabled";
        undoClass+=" playlister-button-disabled";
        redoClass+=" playlister-button-disabled";
        closeClass+=" playlister-button-disabled";
    }

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }

    // this function handles the add song click
    function handleAddSong(){
        store.addAddSongTransaction();
    }

    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }
    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={editStatus}
                value="+"
                className={addSongClass}
                onClick={handleAddSong}
            />
            <input
                type="button"
                id='undo-button'
                disabled={editStatus}
                value="⟲"
                className={undoClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={editStatus}
                value="⟳"
                className={redoClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={editStatus}
                value="&#x2715;"
                className={closeClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;