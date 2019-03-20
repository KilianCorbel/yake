import React , { Component } from 'react';
import './MainContent.css';
import './Scrollable.css';
import AlbumsBlock from './AlbumsBlock.js'
import {Link} from 'react-router-dom';
class ArtisteWindow extends Component{
    constructor(props){
        super(props);
        this.state={
            artiste:{}
        };
        let params= new URLSearchParams(window.location.href.split("/showArtiste")[1]);
        this.getArtisteInfo(params.get("id"));
    }
    getArtisteInfo(input){
        fetch(`/api/artistes/id/${input}`)
        .then(res => res.json())
        .then(data => {this.setState({artiste : data});})
        .catch(error => console.log(error));
      }
    render(){
        
        return(<div className="MainContent">
            <div className="scrollable">
            <div className="Head"><h1>{this.state.artiste.nom}</h1><img src={`api/artistes/stream/${this.state.artiste._id}`} alt="noImage" key={"artiste"}></img></div>
            <div className="Content">{this.state.artiste.biographie}</div>  
            <div className="AlbumList">
              <h3>{"Albums de l'artiste"}</h3>
              <AlbumsBlock albums={this.state.artiste.albums} onAlbumClick={this.props.onAlbumClick}/>
            </div>
            </div>
        </div>);
    }
}
export default ArtisteWindow;