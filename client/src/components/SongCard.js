import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import RemoveSongModal from './RemoveSongModal';

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";

    function handleRemoveSong(event){
        event.stopPropagation();
        if(!event.target.disabled){
            let _id = event.target.id;
            console.log("song _id for deletion:"+_id);
            if(_id.indexOf('remove-song-')>=0){
                _id = (""+_id).substring("remove-song-".length);}

            store.markSongForDeletion(_id);

        }
    }

    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
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
        </div>
    );
}

export default SongCard;