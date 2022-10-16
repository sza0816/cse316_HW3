import jsTPS_Transaction from "../common/jsTPS.js"

/*
 * DeleteSong_Transaction
 *
 * This class represents a transaction that works with deletion of a song in a specific list.
 * It will be managed by the transaction stack.
 * 
 * @author Zian Shang
 * 
 */

export default class RemoveSong_Transaction extends jsTPS_Transaction {
    constructor(initStore,songIndex,oldSong){
        super();
        this.store=initStore;
        this.songIndex=songIndex;
        this.oldSong=oldSong;
    }

    doTransaction(){
       this.store.removeSong(this.songIndex,this.oldSong);
    }

    undoTransaction(){
        this.store.addSong(this.songIndex,this.oldSong);
    }
}