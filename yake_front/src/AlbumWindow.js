import React , { Component } from 'react';
import './MainContent.css';
import './Scrollable.css';
import './AlbumWindow.css';
import NoteBlock from './NoteBlock.js';
import MusiquesBlock from './MusiquesBlock.js';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom';
class AlbumWindow extends Component{
    constructor(props){
        super(props);
        this.state={
            album:undefined
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
        let retour;
        if(this.state.album!==undefined && this.state.album.nom!== undefined && this.state.album.musiques!== undefined ){
            if(this.state.album.musiques.length>0){
                musiqueList=this.state.album.musiques.map((ele)=>{ele.nomAlbum=this.state.album.nom;ele.idAlbum=this.state.album._id;ele.nomGroupe=this.state.album.nomGroupe;ele.idGroupe=this.state.album.idGroupe;return ele;})
                musiqueList = (<MusiquesBlock token={this.props.token} refresh={this.props.refresh} musiques={musiqueList} playlist={this.props.playlist}/>);
            }
            musiqueList=(<div><h3>Musiques contenues dans cet album</h3><div className="MusicList">{musiqueList}</div></div>);   
            retour = (
                <div className="scrollable">
                <div className="HeaderAlbumWindow">
                    <div className="AlbumTitle">
                        <h1>{`${this.state.album.nom}`}</h1>
                        {`Publié en ${this.state.album.datePublication} par :`}
                        <Link style={{textDecoration:'none',color:'black'}} to={`/showArtiste?id=${this.state.album.idGroupe}`}><h5 className="clicable">{`${this.state.album.nomGroupe}`}</h5></Link>
                        <p>{this.state.album.genres.reduce((accu,ele,ind)=>this.state.album.genres.length-1===ind?accu+ele:accu+ele+",","")}</p>
                        <NoteBlock note={this.state.album.note} token=""/>
                    </div>
                    <div className="AlbumImg">
                        <img src={`api/artistes/albums/stream/${this.state.album._id}`} alt="noImage" key={"album"}></img>
                    </div>
                </div>
                <Button color="primary" size="sm" onClick={()=>{this.playWholeAlbum();}}>{"Lire cet album"}</Button>
                {musiqueList}
            </div>
            );
        }  
        else{
            retour = (<div className="scrollable">
                Cet album n'existe pas
            </div>);
        }
        return(
        <div className="MainContent">
            {retour}
        </div>);
    }
}
export default AlbumWindow;