import React, { Component } from 'react';
import './MainContent.css';
class musiqueList extends Component{
    constructor(props){
        super(props);
        this.runMusic = this.runMusic.bind(this);
        this.toArrayBuffer=this.toArrayBuffer.bind(this);
        this.play=true;
        this.source=undefined;
        this.resume=0;
        this.context = undefined;
        this.beginningTime=0;
    }
    toArrayBuffer(buf) {
        var ab = new ArrayBuffer(buf.length);
        var view = new Uint8Array(ab);
        for (var i = 0; i < buf.length; ++i) {
            view[i] = buf[i];
        }
        return ab;
    }
    initMusic(sound){
        this.props.playlist.initMusic(sound);
        this.props.refresh();
    }
    addNext(sound){
        this.props.playlist.addNext(sound);
        this.props.refresh();
    }
    runMusic(sound){
        //console.log(this.play);
        //this.props.musicPlayer.addNext(sound);
        this.props.playlist.addNext(sound);
        this.props.refresh();
        //this.props.musicPlayer.next();
        /*if(this.play===true){
            try{
                console.log("play");
                this.context = new (window.AudioContext||window.webkitAudioContext||window.mozAudioContext)();
                this.source = this.context.createBufferSource();
                this.play=false;
                this.context.decodeAudioData(this.toArrayBuffer(sound.data), (buffer)=>{
                    this.source.buffer = buffer;
                    this.source.connect(this.context.destination);
                    this.source.loop = true;
                },
                function(e){ console.log(e); });
                //source.start(0);
            }catch(e){
                console.log(e);
                this.play=true;
                alert("error while loading sound");
            }
            this.source.start(0,this.resume);
            this.beginningTime = this.source.context.currentTime-this.resume;
        }
        else if(this.play===false){
            this.play=true;
            if (this.source) { 
                console.log("stop");
                this.resume=this.source.context.currentTime-this.beginningTime;
                console.log(this.resume);         
                this.source.disconnect();
                this.source.stop(0);
            }
        }*/
    }
    render(){
        let musiqueList=[];
        if(this.props.musiqueList.length>0){
            musiqueList=this.props.musiqueList.map((ele)=>{
                if(this.props.playlist.isInitialised()){
                    return(<li key={`${ele.titre}`}>{`${ele.titre} ---- ${ele.Album} ---- ${ele.Groupe}`}
                    <button onClick={()=>{this.initMusic(ele);}}>{"Play"}</button>
                    </li>);}
            else{
                return(<li key={`${ele.titre}`}>{`${ele.titre} ---- ${ele.Album} ---- ${ele.Groupe}`}
                <button onClick={()=>{this.initMusic(ele);}}>{"Play"}</button>
                <button onClick={()=>{this.addNext(ele);}}>{"Add Next"}</button>
                </li>);}
            })
        }
        return <div className="MainContent">
            <ul>
                {musiqueList}
            </ul>
        </div>
    }
}
export default musiqueList;