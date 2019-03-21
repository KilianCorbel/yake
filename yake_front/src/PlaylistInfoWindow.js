import React, { Component } from 'react';
import './MainContent.css';
import './Scrollable.css';
import { Button } from 'reactstrap';
class PlaylistInfoWindow extends Component{
    constructor(props){
        super(props);

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
            this.props.playlist.replacePlaylist(this.props.playlistToShow.musiques);
            this.props.refresh();
        }
    }
    render(){
        let musiqueList=[];
        if(this.props.playlistToShow.musiques.length>0){
            musiqueList=this.props.playlistToShow.musiques;
            musiqueList=musiqueList.map((ele)=>{
            if(this.props.playlist.isInitialised()){
                return(<div className="musicLine" key={`${ele.titre}`}>{`${ele.titre} ---- ${ele.nomAlbum} ---- ${ele.nomGroupe}`}
                <Button color="secondary" size="sm" onClick={()=>{this.initMusic(ele);}}>{"Play"}</Button>
                </div>);}
            else{
                return(<div className="musicLine" key={`${ele.titre}`}>{`${ele.titre} ---- ${ele.nomAlbum} ---- ${ele.nomGroupe}`}
                <Button color="secondary" size="sm" onClick={()=>{this.initMusic(ele);}}>{"Play"}</Button>
                <Button color="secondary" size="sm" onClick={()=>{this.addNext(ele);}}>{"Add Next"}</Button>
                </div>);}
            })
        }
            musiqueList=(<div><h3>Musiques contenues dans cette playlist</h3><div className="MusicList">{musiqueList}</div></div>);
        return(
            <div className="MainContent">
                <div className="scrollable">
                    <div><h1>{this.props.playlistToShow.nom}</h1></div>
                    <img src={`api/playlists/playlist/stream/${this.props.playlistToShow._id}`} alt="noImage"/>
                    <div><p>{this.props.playlistToShow.description}</p></div>
                    <Button color="primary" size="sm" onClick={()=>{this.playWholePlaylist();}}>{"Lire cette playlist"}</Button>
                    {musiqueList}
                </div>
            </div>
        );
    }
}
export default PlaylistInfoWindow;