class Playlist{
    constructor(){
        this.playlist= [];
        this.eventListenerObject={};
        this.actualMusicIndex=0;
        this.firstInit=true;
    }
    addNext(music){
        this.playlist.push(music);
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
        return obj;
    }
    getActualTitle(){
        if(this.playlist.length>0)
            return this.playlist[this.actualMusicIndex].titre;
        return "";
    }
    getActualAuthor(){
        if(this.playlist.length>0){
            return this.playlist[this.actualMusicIndex].Groupe;
        }
        return "";
    }
    getActualAlbum(){
        if(this.playlist.length>0)
            return this.playlist[this.actualMusicIndex].Album;
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