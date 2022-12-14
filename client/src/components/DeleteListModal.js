import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function DeleteListModal(){
    const { store } = useContext(GlobalStoreContext);
    let name="";
    let index=store.listMarkedForDeletion;
    for(let i=0;i<store.idNamePairs.length;i++){
        if(store.idNamePairs[i]._id===index){
            name=store.idNamePairs[i].name;
        }
    }

    function deleteListCallback(event){
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