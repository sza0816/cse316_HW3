import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function RemoveSongModal(){
    const { store } = useContext(GlobalStoreContext);

    let name="";
    let index;
    if(store.currentList.songs[0]){
        index=Number(store.songMarkedForDeletion);
        console.log(index);
        name=store.currentList.songs[index].title;
    }

    function handleRemoveSong(){
        store.addRemoveSongTransaction();
    }

    function handleHideRemoveSong(){
        store.hideRemoveSongModal();
    }

    return (
        <div 
            className="modal" 
            id="remove-song-modal" 
            data-animation="slideInOutLeft">
                <div className="modal-dialog">
                    <header className="modal-header">
                        Delete Song?
                    </header>
                    <div className="dialog-header">
                        Are you sure you wish to permanently delete the <span>{name}</span> song?
                    </div>
                    <div className="confirm-cancel-container">
                        <input type="button" 
                            id="dialog-yes-button" 
                            className="modal-button" 
                            onClick={handleRemoveSong}
                            value='Confirm' />
                        <input type="button" 
                            id="dialog-no-button" 
                            className="modal-button" 
                            onClick={handleHideRemoveSong}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}

export default RemoveSongModal;