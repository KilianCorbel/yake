import React , { Component } from 'react';
import './MainContent.css';
import './Scrollable.css';
import AlbumsBlock from './AlbumsBlock.js'
import NoteBlock from './NoteBlock.js';
class ArtisteWindow extends Component{
    constructor(props){
        super(props);
        this.state={
            artiste:{}
        };
    }

    componentDidMount(){
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
        let retour;
        if(this.state.artiste!==undefined && this.state.artiste.nom!==undefined){
            let genresArtiste = this.state.artiste.albums.reduce((accu,ele)=>accu.concat(ele.genres),[])
            .reduce((accu,ele)=>{if(!accu.includes(ele))accu.push(ele);return accu;},[]);
            retour=(
                <div className="scrollable">
                    <div className="Head"><h1>{this.state.artiste.nom}</h1>
                    <img src={`api/artistes/stream/${this.state.artiste._id}`} alt="noImage" key={"artiste"}></img></div>
                    <p>{
                        genresArtiste.reduce((accu,ele,ind)=>genresArtiste.length-1===ind?accu+ele:accu+ele+",","")}
                        </p>
                    <NoteBlock note={this.state.artiste.note} token=""/>
                    <div className="Content">{this.state.artiste.biographie}</div>  
                    <div className="AlbumList">
                    <h3>{"Albums de l'artiste"}</h3>
                    <AlbumsBlock albums={this.state.artiste.albums} onAlbumClick={this.props.onAlbumClick}/>
                    </div>
                </div>
            );
        }
        else{
            retour=(
                <div className="scrollable">
                    <p>Cet artiste n'existe pas</p>
                </div>
            );
        }
        return(<div className="MainContent">
            {retour}
        </div>);
    }
}
export default ArtisteWindow;