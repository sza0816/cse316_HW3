import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function EditSongModal(){
    const { store } = useContext(GlobalStoreContext);
    let index;
    let title="";
    let artist="";
    let youTubeId="";
    console.log("here is the edit song modal");

    if(store.currentList.songs[0]){
        index=Number(store.songMarkedForEdition);
        title=store.currentList.songs[index].title;
        artist=store.currentList.songs[index].artist;
        youTubeId=store.currentList.songs[index].youTubeId;

    }

    function handleEditSong(event){
        store.addEditSongTransaction();
        
    }
    function handelHideEditSongModal(event){
        store.hideEditSongModal();
    }

    return(
        <div className="modal" id="edit-song-modal" data-animation="slideInOutLeft">
            <div className="modal-dialog">
                <header className="modal-header">
                    Edit Song?
                </header>
                <div className="dialog-header">
                    <form action="" method="get">
                        <div className="center-content-box">
                           <label htmlFor="title" className="edit-song-label">Title: </label>
                            <input
                              type="text"
                              name="edit-song-title"
                              id="edit-song-title"
                              className="edit-song-input"
                              placeholder={title}
                            />
                        </div>
                        <div className="center-content-box">
                            <label htmlFor="artist" className="edit-song-label">Artist: </label>
                            <input
                              type="text"
                              name="edit-song-artist"
                              id="edit-song-artist"
                              className="edit-song-input"
                              placeholder={artist}
                            />
                        </div>
                        <div className="center-content-box">
                            <label htmlFor="YoutubeId" className="edit-song-label">YoutubeId:</label>
                            <input
                              type="text"
                              name="edit-song-youtubeid"
                              id="edit-song-youtubeid"
                              className="edit-song-input"
                              placeholder={youTubeId}
                          />
                        </div>
                    </form>
                </div>
                <div className="confirm-cancel-container">
                    <input type="button" 
                            id="dialog-yes-button" 
                            className="modal-button" 
                            onClick={handleEditSong}
                            value='Confirm' />
                    <input type="button" 
                            id="dialog-no-button" 
                            className="modal-button" 
                            onClick={handelHideEditSongModal}
                            value='Cancel' />
                </div>
            </div>
        </div>
    )
}

export default EditSongModal;