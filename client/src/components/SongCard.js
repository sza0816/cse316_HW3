import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import RemoveSongModal from './RemoveSongModal';
import EditSongModal from './EditSongModal';

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [draggedTo, setDraggedTo] = useState(0);
    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";

    function handleRemoveSong(event){
        event.stopPropagation();
        if(!event.target.disabled){
            let _id = event.target.id;
            if(_id.indexOf('remove-song-')>=0){
                _id = (""+_id).substring("remove-song-".length);
            }
            store.markSongForDeletion(_id);

        }
    }
    function handleDoubleClick(event){
        event.stopPropagation();
        if(event.detail===2 && !event.target.disabled){
            let _id=event.target.id;
            if(_id.indexOf('song-')>=0){
                _id=(""+_id).substring("song-".length,"song-".length+1);
            }
            store.markSongForEdition(_id);
            console.log(_id);
        }  
    }

    //handle dragging a song
    function handleDragStart(event) {
        event.dataTransfer.setData("item", event.target.id);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1,target.id.indexOf("-") + 2);
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1, sourceId.indexOf("-") + 2);
        setDraggedTo(false);

        store.addMoveSongTransaction(sourceId, targetId);
    }

    if(draggedTo){
        cardClass="list-card-dragged-to unselected-list-card";
    }
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onClick={handleDoubleClick}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                onClick={handleRemoveSong}
            />
            <RemoveSongModal/>
            <EditSongModal/>
        </div>
    );
}

export default SongCard;