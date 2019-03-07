import React, { Component } from 'react';
import './MainContent.css';
import AlbumsBlock from './AlbumsBlock.js';
import ArtistesBlock from './ArtistesBlock.js';
import MusiquesBlock from './MusiquesBlock.js';
class musiqueList extends Component{
    render(){
        //sortir le titre de musiquesBlock AlbumsBlock et ArtistesBlock 
        //afin que chaque personne utilisant les blocks puissent les gérer comme elles veulent
        return <div className="MainContent">
                    <div className="scrollable">
                        <MusiquesBlock musiques={this.props.musiqueList} playlist={this.props.playlist} refresh={this.props.refresh}/>
                        <AlbumsBlock albums={this.props.albumList} onAlbumClick={this.props.onAlbumClick}/>
                        <ArtistesBlock artistes={this.props.artisteList} onArtisteClick={this.props.onArtisteClick}/>
                    </div>
                </div>
    }
}
export default musiqueList;