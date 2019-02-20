import React , { Component } from 'react';
import './MainContent.css';
import './Scrollable.css';
import './AlbumWindow.css';
import { Button } from 'reactstrap';
class AlbumWindow extends Component{
    initMusic(sound){
        this.props.playlist.initMusic(sound);
        this.props.refresh();
    }
    addNext(sound){
        this.props.playlist.addNext(sound);
        this.props.refresh();
    }
    playWholeAlbum(){
        if(this.props.album.musiques.length>0){
            let musics = this.props.album.musiques.map(ele=>{
                let musique ={};
                musique.titre=ele.titre;
                musique._id=ele._id;
                musique.idAlbum = this.props.album._id;
                musique.nomAlbum=this.props.album.nom;
                musique.idArtiste=this.props.album.idArtiste;
                musique.nomGroupe=this.props.album.nomGroupe;
                return musique;
            });
            this.props.playlist.replacePlaylist(musics);
            this.props.refresh();
        }
    }
    render(){
        let musiqueList=[];
        if(this.props.album.musiques.length>0){
            musiqueList=this.props.album.musiques.map((ele)=>{ele.nomAlbum=this.props.album.nom;ele.idAlbum=this.props.album._id;ele.nomGroupe=this.props.album.nomGroupe;ele.idGroupe=this.props.album.idGroupe;return ele;})
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
            musiqueList=(<div><h3>Musiques contenues dans cet album</h3><div className="MusicList">{musiqueList}</div></div>);
        }
        return(
        <div className="MainContent">
            <div className="scrollable">
                <div className="HeaderAlbumWindow">
                    <div className="AlbumTitle">
                        <h1>{`${this.props.album.nom}`}</h1>
                        {`Publié en ${this.props.album.datePublication} par :`}
                        <h5 className="clicable" onClick={()=>{this.props.onArtisteClick(this.props.album.idGroupe)}}>{`${this.props.album.nomGroupe}`}</h5>
                    </div>
                    <div className="AlbumImg">
                        <img src={`api/artistes/albums/stream/${this.props.album._id}`} alt="noImage" key={"album"}></img>
                    </div>
                </div>
                <Button color="primary" size="sm" onClick={()=>{this.playWholeAlbum();}}>{"Lire cet album"}</Button>
                {musiqueList}
            </div>
        </div>);
    }
}
export default AlbumWindow;