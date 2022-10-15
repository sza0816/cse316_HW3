import jsTPS_Transaction from "../common/jsTPS.js"

/*
 * AddSong_Transaction
 *
 * This class represents a transaction that works with addition of a song in a specific list.
 * It will be managed by the transaction stack.
 * 
 * @author Zian Shang
 * 
 */

export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(initStore,songIndex,oldSong){
        super();
        this.store=initStore;
        this.songIndex=songIndex;
        this.oldSong=oldSong;
    }

    doTransaction(){
       this.store.addSong(this.songIndex,this.oldSong);
       this.oldSong={
        "title": "Untitled",
        "artist": "Unknown",
        "youTubeId": "dQw4w9WgXcQ"
        }; 
    }

    undoTransaction(){
        this.oldSong=this.store.removeSong(this.songIndex);
    }
}