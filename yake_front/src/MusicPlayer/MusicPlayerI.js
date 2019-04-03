import './MusicPlayer.css';
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import AddPlaylist from '../AddPlaylist.js';
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

componentWillMount(){
    if(this.state.addEventOnce===true){
        this.props.playlist.addEventListener("change",this.updateSource);
        this.props.playlist.addEventListener("init",this.init);
        this.setState({addEventOnce:false});
    }
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
        let couverture;
        if(this.props.playlist.getActualSong().titre !== ""){
            show=(<audio controls id="audioContent" autoPlay>
                 <source src={`api/artistes/albums/musiques/stream/${this.props.playlist.getActualSong().id}`} type="audio/mp3"/>
            </audio>)
            couverture=(<div className="Couverture"><img height="100px" width="100px" key={`${this.props.playlist.getActualIdAlbum()}`}className="playlistCouverture" src={`api/artistes/albums/stream/${this.props.playlist.getActualIdAlbum()}`} alt="noImage"></img></div>);
        }
        else{
            show=(<audio controls id="audioContent">
             </audio>)
        }
        return(
            <div className="MusicBody">
                <div className="MusicBodyInfo">
                {couverture}
                <div className="MusicInfo">
                    {`${this.props.playlist.getActualSong().titre}-------${this.props.playlist.getActualSong().album}------${this.props.playlist.getActualSong().Groupe}`}
                </div>
                <AddPlaylist playlist={this.props.playlist}/>
                </div>
                <div className="MusicBar">
                    <Button color="info" onClick={()=>{this.previous();}}>{"<"}</Button>
                    {show}
                    <Button color="info" onClick={()=>{this.next();}}>{">"}</Button>
                </div>
            </div>
        );
    }
}
export default MusicPlayerI;