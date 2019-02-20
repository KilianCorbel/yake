class Playlist{
    constructor(){
        this.playlist= [];
        this.eventListenerObject={};
        this.actualMusicIndex=0;
        this.firstInit=true;
    }
    isEmpty(){
        return this.playlist.length===0;
    }
    addNext(music){
        this.playlist.push(music);
    }
    replacePlaylist(musics){
        this.playlist=musics;
        this.actualMusicIndex=0;
        if(this.firstInit){
            this.dispatchEvent("init");
            this.firstInit=false;
        }
        else{
            this.dispatchEvent("change");
        }
    }
    initMusic(music){
        this.playlist=[];
        this.actualMusicIndex=0;
        this.playlist.push(music);
        if(this.firstInit){
            this.dispatchEvent("init");
            this.firstInit=false;
        }
        else{
            this.dispatchEvent("change");
        }
    }
    getMusics(){
        return this.playlist;
    }
    isInitialised(){
        return this.firstInit;
    }
    addEventListener(key,fonc){
        if(Object.keys(this.eventListenerObject).includes(key)){
            this.eventListenerObject[`${key}`].push(fonc);
        }
        else{
            this.eventListenerObject[`${key}`] = [];
            this.eventListenerObject[`${key}`].push(fonc);
        }

    }
    dispatchEvent(key){
        if(Object.keys(this.eventListenerObject).includes(key)){
            for(let i = 0;i<this.eventListenerObject[`${key}`].length;i++){
                this.eventListenerObject[`${key}`][i]();
            }
        }
    }
    getActualSong(){
        let obj = {};
        obj.titre=this.getActualTitle();
        obj.album=this.getActualAlbum();
        obj.Groupe=this.getActualAuthor();
        obj.id=this.getActualId();
        obj.idAlbum = this.getActualIdAlbum();
        return obj;
    }
    getActualIdAlbum(){
        if(this.playlist.length>0){
            return this.playlist[this.actualMusicIndex].idAlbum;
        }
        return "";
    }
    getActualId(){
        if(this.playlist.length>0)
            return this.playlist[this.actualMusicIndex]._id;
        return "";
    }
    getActualTitle(){
        if(this.playlist.length>0)
            return this.playlist[this.actualMusicIndex].titre;
        return "";
    }
    getActualAuthor(){
        if(this.playlist.length>0){
            return this.playlist[this.actualMusicIndex].nomGroupe;
        }
        return "";
    }
    getActualAlbum(){
        if(this.playlist.length>0)
            return this.playlist[this.actualMusicIndex].nomAlbum;
        return "";
    }
    next(){
        if(this.playlist.length>this.actualMusicIndex+1){
            this.actualMusicIndex+=1;
            this.dispatchEvent("change");
        }
    }
    previous(){
        if(this.actualMusicIndex-1>=0){
            this.actualMusicIndex-=1;
            this.dispatchEvent("change");
        }
    }
}
export default Playlist;