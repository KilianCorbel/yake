import React, { Component } from 'react';
import './MainContent.css';
import { Button } from 'reactstrap';
import AlbumsBlock from './AlbumsBlock.js';
import ArtistesBlock from './ArtistesBlock.js';
class musiqueList extends Component{
    constructor(props){
        super(props);
        this.runMusic = this.runMusic.bind(this);
        this.play=true;
        this.source=undefined;
        this.resume=0;
        this.context = undefined;
        this.beginningTime=0;
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
    }
    render(){
        let musiqueList=[];
        if(this.props.musiqueList.length>0){
            musiqueList=this.props.musiqueList.map((ele)=>{
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
            musiqueList=(<div><h3>Liste de musique</h3><div className="MusicList">{musiqueList}</div></div>);
        }
        return <div className="MainContent">
                    <div className="scrollable">
                {musiqueList}
                <AlbumsBlock albums={this.props.albumList} onAlbumClick={this.props.onAlbumClick}/>
                <ArtistesBlock artistes={this.props.artisteList} onArtisteClick={this.props.onArtisteClick}/>
                </div>
        </div>
    }
}
export default musiqueList;