class MusicPlayer{
    constructor(){
        this.playlist= [];
        this.windowAudioContext = (window.AudioContext||window.webkitAudioContext||window.mozAudioContext)
        this.context = new this.windowAudioContext();
        this.eventListenerObject={};
        this.nowPlaying = false;
        this.paused=false;
        this.context.onstatechange = ()=>{console.log(this.context);console.log("Fin");console.log(this.context.state);};
        this.context.addEventListener('ended',()=>{console.log("hello");});
    }
    test(){
        while(true){
            if(this.playlist[this.actualMusicIndex].duration<=this.context.currentTime){
                console.log("Fin");
            }
        }
    }
    nextIsAble(){
        return this.playlist.length>this.actualMusicIndex+1;
    }
    prevIsAble(){
        return this.actualMusicIndex-1>0;
    }
    playIsAble(){
        return this.playlist.length>0;
    }
    pause(){
        if(this.playlist.length>this.actualMusicIndex && !this.paused){
            this.context.suspend();
            this.paused=true;
        }
    }
    play(){
        if(this.playlist.length>this.actualMusicIndex && this.paused){
            this.context.resume();
            this.paused=false;
        }
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
    on(key){
        if(Object.keys(this.eventListenerObject).keys(key)){
            for(let i = 0;i<this.eventListenerObject[`${key}`].length;i++){
                this.eventListenerObject[`${key}`][i]();
            }
        }
    }
    addNext(music){
        let listSize = this.playlist.length;
        this.playlist.push(music);
        this.actualMusicIndex = 0;
        if(listSize===0){
            this.startPlayer();
        }
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
    getActualSound(){
        if(this.playlist.length>0)
            return this.playlist[this.actualMusicIndex].Sound.data;
        return "";
    }
    next(){
        if(this.playlist.length>this.actualMusicIndex+1){
            this.stopPlayer();
            this.actualMusicIndex+=1;
            this.startPlayer();
        }
    }
    previous(){
        if(this.actualMusicIndex-1>=0){
            this.stopPlayer();
            this.actualMusicIndex-=1;
            this.startPlayer();
        }
    }
    startPlayer(){
        if(this.nowPlaying === false){
            this.nowPlaying = true;
            this.playSound(this.playlist[this.actualMusicIndex]);
            this.playlist[this.actualMusicIndex].source.addEventListener('ended',()=>{this.next();});
        }
        else{
            this.stopPlayer();
            this.startPlayer();
        }
        this.on('test');
    }
    stopPlayer(){
        this.playlist[this.actualMusicIndex].source.stop(0);
        this.nowPlaying = false;
    }
    playSound(music) {
        if(this.playlist.length>0){
            let source = this.context.createBufferSource(); // creates a sound source
            this.context.decodeAudioData(this.toArrayBuffer(music.Sound.data), (buffer)=>{
                source.buffer = buffer;
                source.connect(this.context.destination);
                source.loop = false;
            },
            function(e){ console.log(e); });
            source.connect(this.context.destination);       // connect the source to the context's destination (the speakers)
            source.start(0); 
            music.source = source;                          // play the source now 
        }                       
      }
    toArrayBuffer(buf) {
        var ab = new ArrayBuffer(buf.length);
        var view = new Uint8Array(ab);
        for (var i = 0; i < buf.length; ++i) {
            view[i] = buf[i];
        }
        return ab;
    }
}
export default MusicPlayer;