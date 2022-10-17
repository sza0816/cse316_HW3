import jsTPS_Transaction from "../common/jsTPS.js"

/*
 * EditSong_Transaction
 *
 * This class represents a transaction that works with modification of a song in a specific list.
 * It will be managed by the transaction stack.
 * 
 * @author Zian Shang
 * 
 */

export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initStore,songIndex,oldSong,newSong){
        super();
        this.store=initStore;
        this.songIndex=songIndex;
        this.oldSong=oldSong;
        this.newSong=newSong;
    }

    doTransaction(){
        this.oldSong=this.store.editSong(this.songIndex,this.newSong);
    }

    undoTransaction(){
        this.newSong=this.store.editSong(this.songIndex,this.oldSong);
    }
}