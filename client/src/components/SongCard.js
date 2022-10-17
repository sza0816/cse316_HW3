import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import RemoveSongModal from './RemoveSongModal';
import EditSongModal from './EditSongModal';

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

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
        console.log("handles double click.");
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

    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onClick={handleDoubleClick}
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