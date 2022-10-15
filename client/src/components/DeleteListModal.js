import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function DeleteListModal(){
    const { store } = useContext(GlobalStoreContext);
    let name="";
    if (store.currentList) {
        name = store.currentList.name;
    }

    function deleteListCallback(event){
        console.log("here enters the delete marked list call back.");
        store.deleteMarkedList();
    }

    function hideDeleteListModalCallback(event){
        store.hideDeleteListModal();
    }

    return (
        <div 
            className="modal" 
            id="delete-list-modal" 
            data-animation="slideInOutLeft">
                <div className="modal-dialog">
                    <header className="modal-header">
                        Delete list?
                    </header>
                    <div className="dialog-header">
                        Are you sure you wish to permanently delete the <span>{name}</span> playlist?
                    </div>
                    <div className="confirm-cancel-container">
                        <input type="button" 
                            id="dialog-yes-button" 
                            className="modal-button" 
                            onClick={deleteListCallback}
                            value='Confirm' />
                        <input type="button" 
                            id="dialog-no-button" 
                            className="modal-button" 
                            onClick={hideDeleteListModalCallback}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}

export default DeleteListModal;