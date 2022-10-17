import AddSong_Transaction from '../transactions/AddSong_Transaction';
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction';
import EditSong_Transaction from '../transactions/EditSong_Transaction';

import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'

export const GlobalStoreContext = createContext({});

/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    MARK_LIST_FOR_DELETION:"MARK_LIST_FOR_DELETION",
    MARK_SONG_FOR_DELETION:"MARK_SONG_FOR_DELETION",
    MARK_SONG_FOR_EDITION:"MARK_SONG_FOR_EDITION"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        listMarkedForDeletion:null,
        songMarkedForDeletion:null,
        songMarkedForEdition:null
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion:null,
                    songMarkedForDeletion:null,
                    songMarkedForEdition:null
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion:null,
                    songMarkedForDeletion:null,
                    songMarkedForEdition:null
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listMarkedForDeletion:null,
                    songMarkedForDeletion:null,
                    songMarkedForEdition:null
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion:null,
                    songMarkedForDeletion:null,
                    songMarkedForEdition:null
                });
            }
            // PREPARE TO DELETE A LIST
           case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion:payload,
                    songMarkedForDeletion:null,
                    songMarkedForEdition:null
                });
            }
            //prepare to delete a song
            case GlobalStoreActionType.MARK_SONG_FOR_DELETION:{
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList:store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion:null,
                    songMarkedForDeletion: payload,
                    songMarkedForEdition:null
                });
            }

            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion:null,
                    songMarkedForDeletion:null,
                    songMarkedForEdition:null
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listMarkedForDeletion:null,
                    songMarkedForDeletion:null,
                    songMarkedForEdition:null
                });
            }

            case GlobalStoreActionType.MARK_SONG_FOR_EDITION:{
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter:store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songMarkedForEdition: payload
                });
            }

            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        tps.clearAllTransactions();
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                response=await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }

    store.createNewList=function(){
        async function asyncCreateNewList(){
            let newListTitle="Untitled"+store.newListCounter;
            let payload={name:newListTitle,songs:[]};
            const response=await api.createPlaylist(payload);
            if(response.data.success){
                let newList=response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload:newList
                });

                store.history.push("/playlist/"+newList._id);
            }
            else{
                console.log("create new list failed.");
            }
        }
        asyncCreateNewList();
    }

    store.updateCurrentList = function() {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        asyncUpdateCurrentList();
    }
    // this function marks the current list in order to delete
    store.markListForDeletion = function(id){
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload: id
        });
        store.showDeleteListModal();
    }
    store.showDeleteListModal = function(){
        let modal = document.getElementById("delete-list-modal");
        modal.classList.add("is-visible");
        console.log("current list: "+store.currentList);
    }
    store.hideDeleteListModal=function(){
        let modal = document.getElementById("delete-list-modal");
        modal.classList.remove("is-visible");
    }
    store.deleteMarkedList=function(){
        store.deleteList(store.listMarkedForDeletion);
        store.hideDeleteListModal();
    }
    store.deleteList=function(id){
        async function asyncDeleteList(id){
            const response = await api.deleteListById(id);
            if (response.data.success) {
                store.loadIdNamePairs();
                store.history.push("/");
            }
        }
        asyncDeleteList(id);
    }
    // this function adds a add-song transaction to the stack
    store.addAddSongTransaction=function(){
        let oldSong=null;
        let index;
        if(store.currentList!==null){
            index=store.currentList.songs.length;
            let transaction=new AddSong_Transaction(store, index,oldSong);
            tps.addTransaction(transaction);
        }
    }
    store.addSong=function(songId, songCard){
        let newCurrentList= store.currentList;

        console.log(newCurrentList.songs);
        if(songCard==null){
            var newSong={
                "title": "Untitled",
                "artist": "Unknown",
                "youTubeId": "dQw4w9WgXcQ"
            };
            newCurrentList.songs.push(newSong);
        }

        else{
            newCurrentList.songs.splice(songId,0,songCard);       
        }

        store.updateCurrentList();
    }

    //this function marks a song for deletion
    store.markSongForDeletion=function(id){
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_DELETION,
            payload:id
        });
        console.log(store.currentList.songs[id]);
        store.showRemoveSongModal();
    }
    store.showRemoveSongModal=function(){
        let modal=document.getElementById("remove-song-modal");
        modal.classList.add("is-visible");
    }
    store.hideRemoveSongModal=function(){
        let modal=document.getElementById("remove-song-modal");
        modal.classList.remove("is-visible");
    }
    store.addRemoveSongTransaction=function(){
        let index=Number(store.songMarkedForDeletion);
        let oldSong=store.currentList.songs[index];
        //copy song index from the current list
        

        let transaction=new RemoveSong_Transaction(store, index, oldSong);
        tps.addTransaction(transaction);
    }
    store.removeSong=function(index){
        console.log("remove song index: "+index);
        let oldSong=store.currentList.songs[index];
        let newCurrentList=store.currentList;
        newCurrentList.songs.splice(index,1);

        store.updateCurrentList();
        store.hideRemoveSongModal();
        return oldSong;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    store.markSongForEdition=function(id){
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_EDITION,
            payload: id
        });
        console.log(this.songMarkedForEdition);
        store.showEditSongModal();
    }
    store.showEditSongModal=function(){
        let modal=document.getElementById("edit-song-modal");
        modal.classList.add("is-visible");
    }
    store.hideEditSongModal=function(){
        let modal=document.getElementById("edit-song-modal");
        modal.classList.remove("is-visible");
    }
    store.addEditSongTransaction=function(){
        let index=Number(store.songMarkedForEdition);
        let oldSong=store.currentList.songs[index];

        let editSongTitle=document.getElementById("edit-song-title").value;
        let editSongArtist=document.getElementById("edit-song-artist").value;
        let editSongYoutubeId=document.getElementById("edit-song-youtubeid").value;
        var newSong={
            "title": editSongTitle,
            "artist": editSongArtist,
            "youTubeId": editSongYoutubeId
        }

        let transaction;
        if(editSongTitle!==""|| editSongArtist!==""||editSongYoutubeId!==""){ 
            transaction=new EditSong_Transaction(store, index, oldSong,newSong);
            tps.addTransaction(transaction);
        }

    }
    store.editSong=function(index, song){
        let oldSong =store.currentList.songs[index];
        var songCopy={
            "title": oldSong.title,
            "artist": oldSong.artist,
            "youTubeId": oldSong.youTubeId
        }

        //create a new list and then update it
        let newCurrentList=store.currentList;
        if(song.title!=="")
            newCurrentList.songs[index].title=song.title;
        if(song.artist!=="")
            newCurrentList.songs[index].artist=song.artist;
        if(song.youTubeId!=="")
            newCurrentList.songs[index].youTubeId=song.youTubeId;

        store.updateCurrentList();
        store.hideEditSongModal();
        //empty previous values in the input box
        document.getElementById("edit-song-title").value="";
        document.getElementById("edit-song-artist").value="";
        document.getElementById("edit-song-youtubeid").value="";

        return songCopy;
    }
    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}