import React , { Component } from 'react';
import './MainContent.css';
import './Scrollable.css';
import './AlbumWindow.css';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom';
class AlbumWindow extends Component{
    constructor(props){
        super(props);
        this.state={
            album:{}
        };
    }

    componentDidMount(){
        let params= new URLSearchParams(window.location.href.split("/showAlbum")[1]);
        this.getAlbumInfo(params.get("id"));
    }
    getAlbumInfo(input){
        fetch(`/api/artistes/albums/id/${input}`)
        .then(res => res.json())
        .then(data => {this.setState({album: data});})
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
    playWholeAlbum(){
        if(this.state.album.musiques.length>0){
            let musics = this.state.album.musiques.map(ele=>{
                let musique ={};
                musique.titre=ele.titre;
                musique._id=ele._id;
                musique.idAlbum = this.state.album._id;
                musique.nomAlbum=this.state.album.nom;
                musique.idArtiste=this.state.album.idArtiste;
                musique.nomGroupe=this.state.album.nomGroupe;
                return musique;
            });
            this.props.playlist.replacePlaylist(musics);
            this.props.refresh();
        }
    }
    render(){
        let musiqueList=[];
        if(this.state.album.musiques!==undefined && this.state.album.musiques.length>0){
            musiqueList=this.state.album.musiques.map((ele)=>{ele.nomAlbum=this.state.album.nom;ele.idAlbum=this.props.album._id;ele.nomGroupe=this.state.album.nomGroupe;ele.idGroupe=this.state.album.idGroupe;return ele;})
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
                        <h1>{`${this.state.album.nom}`}</h1>
                        {`Publié en ${this.state.album.datePublication} par :`}
                        <Link style={{textDecoration:'none',color:'black'}} to={`/showArtiste?id=${this.state.album.idGroupe}`}><h5 className="clicable">{`${this.state.album.nomGroupe}`}</h5></Link>
                    </div>
                    <div className="AlbumImg">
                        <img src={`api/artistes/albums/stream/${this.state.album._id}`} alt="noImage" key={"album"}></img>
                    </div>
                </div>
                <Button color="primary" size="sm" onClick={()=>{this.playWholeAlbum();}}>{"Lire cet album"}</Button>
                {musiqueList}
            </div>
        </div>);
    }
}
export default AlbumWindow;