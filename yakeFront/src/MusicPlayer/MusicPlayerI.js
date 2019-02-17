import './MusicPlayer.css';
import React, { Component } from 'react';
class MusicPlayerI extends Component{
    constructor(props){
        super(props);
        this.state={
            title:"",
            album:"",
            auteur:"",
            addEventOnce:true
        };
        this.songToPlay="";
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.init=this.init.bind(this);
    }
    updateSource(){ 
        let audio = document.getElementById('audioContent');
        audio.load();
    }
    init(){
        console.log("init");
        let audio = document.getElementById('audioContent');
        audio.addEventListener("ended", ()=>{this.next()});
    }
    next(){
        this.props.playlist.next();
        this.songToPlay=this.props.playlist.getActualSong();
        this.setState({});
        //this.updateSource();
    }
    previous(){
        this.props.playlist.previous();
        this.songToPlay=this.props.playlist.getActualSong();
        this.setState({});
        //this.updateSource();
    }
    render(){
        let show;
        if(this.props.playlist.getActualSong().titre !== ""){
            show=(<audio controls id="audioContent" autoPlay>
                 <source src={`/test/${this.props.playlist.getActualSong().titre}`} type="audio/mp3"/>
            </audio>)
        }
        else{
            if(this.state.addEventOnce===true){
                this.props.playlist.addEventListener("change",this.updateSource);
                this.props.playlist.addEventListener("init",this.init);
                this.setState({addEventOnce:false});
            }
            show=(<audio controls id="audioContent">
             </audio>)
        }
        return(
            <div className="MusicBar">
                <div>
                {`${this.props.playlist.getActualSong().titre}-------${this.props.playlist.getActualSong().album}------${this.props.playlist.getActualSong().Groupe}`}
                </div>
                <div>
                    <button onClick={()=>{this.previous();}}>{"previous"}</button>
                    {show}
                    <button onClick={()=>{this.next();}}>{"next"}</button>
                </div>
            </div>
        );
    }
}
export default MusicPlayerI;