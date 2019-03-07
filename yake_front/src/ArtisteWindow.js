import React , { Component } from 'react';
import './MainContent.css';
import './Scrollable.css';
import AlbumsBlock from './AlbumsBlock.js'
class ArtisteWindow extends Component{
    render(){
        
        return(<div className="MainContent">
            <div className="scrollable">
            <div className="Head"><h1>{this.props.artiste.nom}</h1><img src={`api/artistes/stream/${this.props.artiste._id}`} alt="noImage" key={"artiste"}></img></div>
            <div className="Content">{this.props.artiste.biographie}</div>  
                <AlbumsBlock albums={this.props.artiste.albums} onAlbumClick={this.props.onAlbumClick}/>
            </div>
        </div>);
    }
}
export default ArtisteWindow;