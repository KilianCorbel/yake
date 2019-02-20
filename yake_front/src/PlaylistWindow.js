import React, { Component } from 'react';
import './MainContent.css';
import './Scrollable.css';
import { Button } from 'reactstrap';
class PlaylistWindow extends Component{
    constructor(props){
        super(props);
        this.runPlaylist=this.runPlaylist.bind(this);
    }
    runPlaylist(ele){
        this.props.playlist.replacePlaylist(ele.musiques);
        this.props.refresh();
    }
    render(){
        let playlists=this.props.playlists.map(ele=>{
            return(
            <div className="musicLine" key={`${ele.nom}`}>
            <div className="flex" onClick={()=>{this.props.onPlaylistClick(ele)}}>{`${ele.nom}`}</div>
                <Button className="flex" color="secondary" size="sm" onClick={()=>{this.runPlaylist(ele);}}>{"Play"}</Button>
                </div>);});
        return(
        <div className="MainContent">
            <div className="scrollable">
                <p>{"Mes Playlists"}</p>
                {playlists}
            </div>
        </div>
        );
    };
}
export default PlaylistWindow;