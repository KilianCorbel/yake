import React, { Component } from 'react';
import './MainContent.css';
import './Scrollable.css';
import MusiquesBlock from './MusiquesBlock.js';
import { Button } from 'reactstrap';
class PlaylistInfoWindow extends Component{
    constructor(props){
        super(props);
        this.state ={
            playlist: undefined
        }
    }

    componentDidMount(){
        let params= new URLSearchParams(window.location.href.split("/showPlaylist")[1]);
        this.getPlaylistInfo(params.get("id"));
    }

    getPlaylistInfo(playlistId){
        fetch(`/api/playlists/getPlaylist?id=${playlistId}`)
        .then(res => res.json())
        .then(data => {this.setState({playlist : data});})
        .catch(error => console.log(error));
      }

    initMusic(sound){
        this.props.playlist.initMusic(sound);
        this.props.refresh();
    }
    addNext(sound){
        this.props.playlist.addNext(sound);
        this.props.refresh();
    }
    playWholePlaylist(){
        if(this.props.playlistToShow.musiques.length>0){
            this.props.playlist.replacePlaylist(this.state.playlist.musiques);
            this.props.refresh();
        }
    }
    render(){
        let musiqueList=[];
        let retour;
        if(this.state.playlist !== undefined && this.state.playlist.musiques !== undefined && this.state.playlist.musiques.length>0){
            musiqueList=this.state.playlist.musiques;
            musiqueList = (<MusiquesBlock refresh={this.props.refresh} musiques={musiqueList} playlist={this.props.playlist}/>);
            
            musiqueList=(<div><h3>Musiques contenues dans cette playlist</h3><div className="MusicList">{musiqueList}</div></div>);
            retour =(
                <div className="scrollable">
                    <div><h1>{this.state.playlist.nom}</h1></div>
                    <img src={`api/playlists/playlist/stream/${this.state.playlist._id}`} alt="noImage"/>
                    <div><p>{this.state.playlist.description}</p></div>
                    <Button color="primary" size="sm" onClick={()=>{this.playWholePlaylist();}}>{"Lire cette playlist"}</Button>
                    {musiqueList}
                </div>
            );
        }
        if(this.state.playlist === undefined || this.state.playlist.nom ===undefined){
            retour=(<div className="scrollable">
                <p> Cette playlist n'existe pas </p>
            </div>);
        }
        
        return(
            <div className="MainContent">
                {retour}                 
            </div>
        );
    }
}
export default PlaylistInfoWindow;