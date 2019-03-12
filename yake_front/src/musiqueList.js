import React, { Component } from 'react';
import './MainContent.css';
import AlbumsBlock from './AlbumsBlock.js';
import ArtistesBlock from './ArtistesBlock.js';
import MusiquesBlock from './MusiquesBlock.js';
import { Spinner } from 'reactstrap';
class musiqueList extends Component{
    render(){
        //sortir le titre de musiquesBlock AlbumsBlock et ArtistesBlock 
        //afin que chaque personne utilisant les blocks puissent les gérer comme elles veulent
        let musicBlock;
        if(this.props.searchParams.findMusic){
            if(this.props.musiqueList === undefined){
                musicBlock=<div className="MusicList"><Spinner color="success"/></div>;
            }
            else if(this.props.musiqueList.length>0){
                musicBlock=<MusiquesBlock musiques={this.props.musiqueList} playlist={this.props.playlist} refresh={this.props.refresh}/>;
            }
            else{
                musicBlock=<div className="MusicList"><p>Aucune musique trouvée</p></div>;
            }
            musicBlock=<div><h3>Liste de musique</h3>{musicBlock}</div>;
        }
        let albumBlock;
        if(this.props.searchParams.findAlbum){
            if(this.props.albumList === undefined){
                albumBlock=<div className="AlbumRows"><Spinner color="success"/></div>;
            }
            else if(this.props.albumList.length>0){
                albumBlock = <AlbumsBlock albums={this.props.albumList} onAlbumClick={this.props.onAlbumClick}/>;
            }
            else{
                albumBlock=<div className="AlbumRows"><p>aucun album trouvé</p></div>;
            }
            albumBlock=<div className="AlbumList"><h3>{"Albums"}</h3>{albumBlock}</div>;
        }
        let artisteBlock;
        if(this.props.searchParams.findArtiste){
            if(this.props.artisteList === undefined){
                artisteBlock=<div className="ArtisteRows"><Spinner color="success"/></div>;
            }
            else if(this.props.artisteList.length>0){
                artisteBlock = <ArtistesBlock artistes={this.props.artisteList} onArtisteClick={this.props.onArtisteClick}/>;
            }
            else{
                artisteBlock=<div className="ArtisteRows"><p>Aucun artiste trouvé</p></div>;
            }
            artisteBlock=<div className="ArtisteList"><h3>{"Liste d'Artistes"}</h3>{artisteBlock}</div>;
        }
        return <div className="MainContent">
                    <div className="scrollable">
                        {musicBlock}
                        {albumBlock}
                        {artisteBlock}
                    </div>
                </div>
    }
}
export default musiqueList;