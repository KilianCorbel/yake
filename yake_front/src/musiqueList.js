import React, { Component } from 'react';
import './MainContent.css';
import { Button } from 'reactstrap';
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
        let albumList=[];
        let artisteList=[];
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
        if(this.props.albumList.length>0){
            albumList=this.props.albumList.map((ele)=>{

                    return(<div className="albumRow" key={`${ele.nom}`} onClick={()=>{this.props.onAlbumClick(ele._id)}}>
                    <div className="albumRowContentimg"><img height="100" width="100" src={`api/artistes/albums/stream/${ele._id}`} alt="noImage"/></div>
                    <div className="albumRowContent">{`${ele.nom}`}</div>
                    </div>);}
                )
                albumList=(<div className="AlbumList"><h3>{"Liste d'album"}</h3><div className="AlbumRows"><div className={"AlbumContent"}>{albumList}</div></div></div>);
        }
        if(this.props.artisteList.length>0){
            artisteList=this.props.artisteList.map(ele=>{
                return(<div className="artisteRow" key={`${ele.nom}`} onClick={()=>{this.props.onArtisteClick(ele._id)}}>
                        <div className="artisteRowContent"><img height="100" width="100" src={`api/artistes/stream/${ele._id}`} alt="noImage"/></div>
                        <div className="artisteRowContent">{`${ele.nom}`}</div>
                    </div>);
            });
            artisteList=(<div className="ArtisteList"><h3>{"Liste d'Artistes"}</h3><div className="ArtisteRows"><div className={"ArtisteContent"}>{artisteList}</div></div></div>);
        }
        return <div className="MainContent">
                    <div className="scrollable">
                {musiqueList}
                {albumList}
                {artisteList}
                </div>
        </div>
    }
}
export default musiqueList;