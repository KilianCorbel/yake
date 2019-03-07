import React, { Component } from 'react';
import './MainContent.css';
import { Button } from 'reactstrap';
import AlbumsBlock from './AlbumsBlock.js';
import ArtistesBlock from './ArtistesBlock.js';
import MusiquesBlock from './MusiquesBlock.js';
class musiqueList extends Component{
    constructor(props){
        super(props);
    }
    render(){
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