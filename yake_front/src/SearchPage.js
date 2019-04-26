import React, { Component } from 'react';
import './MainContent.css';
import AlbumsBlock from './AlbumsBlock.js';
import ArtistesBlock from './ArtistesBlock.js';
import MusiquesBlock from './MusiquesBlock.js';
import { Collapse, Spinner } from 'reactstrap';
class SearchPage extends Component{
    constructor(props){
        super(props);
        this.state={
            musicList:undefined,
            albumList:undefined,
            artisteList:undefined,
            musicCollapse : true,
            albumCollapse : true,
            artisteCollapse :true
        };
        this.equalsSearch=this.equalsSearch.bind(this);
    }

    componentDidMount(){
        this.setState({searchParams:this.props.searchParams});
        if(this.props.searchParams.findMusic){
            this.searchMusic();
        }
        if(this.props.searchParams.findAlbum){
            this.searchAlbum();
        }       
        if(this.props.searchParams.findArtiste){
            this.searchArtiste();
        }
    }
    componentDidUpdate(){
        if(this.props.change){
            this.setState({
                musicList:undefined,
                albumList:undefined,
                artisteList:undefined,
                musicCollapse : true,
                albumCollapse : true,
                artisteCollapse :true
            });
            if(this.props.searchParams.findMusic){
                this.searchMusic();
            }
            if(this.props.searchParams.findAlbum){
                this.searchAlbum();
            }       
            if(this.props.searchParams.findArtiste){
                this.searchArtiste();
            }
        }
    }
    equalsSearch(){
        if(Object.keys(this.state.searchParams).length===Object.keys(this.props.searchParams).length){
            return Object.keys(this.state.searchParams).reduce((accu,ele)=>{
                if(accu && this.state.searchParams[`${ele}`]===this.props.searchParams[`${ele}`])
                    return true;
                return false;
            },true)
        }
        return false;
    }
   

    searchMusic(){
        let genreFilter="";
        if(this.props.searchParams.genreFilter.length>0){
            genreFilter = '?genres='+this.props.searchParams.genreFilter.reduce((accu,ele,ind)=>{if(ind===this.props.searchParams.genreFilter.length-1)return accu+ele;return accu+','+ele;},"")
        }
        fetch(`/api/artistes/albums/musiques/title/${this.props.searchParams.input}${genreFilter}`)
        .then(res => res.json())
        .then(data => {this.setState({musicList : data});})
        .catch(error => console.log(error));
    }
    searchAlbum(){
        let genreFilter="";
        if(this.props.searchParams.genreFilter.length>0){
            genreFilter = '?genres='+this.props.searchParams.genreFilter.reduce((accu,ele,ind)=>{if(ind===this.props.searchParams.genreFilter.length-1)return accu+ele;return accu+','+ele;},"")
        }
        fetch(`/api/artistes/albums/name/${this.props.searchParams.input}${genreFilter}`)
        .then(res => res.json())
        .then(data => {this.setState({albumList : data});})
        .catch(error => console.log(error));
    }
    searchArtiste(){
        let genreFilter="";
        if(this.props.searchParams.genreFilter.length>0){
            genreFilter = '?genres='+this.props.searchParams.genreFilter.reduce((accu,ele,ind)=>{if(ind===this.props.searchParams.genreFilter.length-1)return accu+ele;return accu+','+ele;},"")
        }
        fetch(`/api/artistes/name/${this.props.searchParams.input}${genreFilter}`)
        .then(res => res.json())
        .then(data => {this.setState({artisteList : data});})
        .catch(error => console.log(error));
    }
    
    render(){
        //sortir le titre de musiquesBlock AlbumsBlock et ArtistesBlock 
        //afin que chaque personne utilisant les blocks puissent les gérer comme elles veulent
        let musicBlock;
        if(this.props.searchParams.findMusic){
            if(this.state.musicList === undefined){
                musicBlock=<div className="MusicList"><Spinner color="success"/></div>;
            }
            else if(this.state.musicList.length>0){
                musicBlock=<MusiquesBlock token={this.props.token} musiques={this.state.musicList} playlist={this.props.playlist} refresh={this.props.refresh}/>;
            }
            else{
                musicBlock=<div className="MusicList"><p>Aucune musique trouvée</p></div>;
            }
            musicBlock=<div><h3 className="clicable" onClick={()=>this.setState({musicCollapse: !this.state.musicCollapse})}>{`Liste de musique   ${this.state.musicCollapse?"v":">"}`}</h3><Collapse isOpen={this.state.musicCollapse}>{musicBlock}</Collapse></div>;
        }
        let albumBlock;
        if(this.props.searchParams.findAlbum){
            if(this.state.albumList === undefined){
                albumBlock=<div className="AlbumRows"><Spinner color="success"/></div>;
            }
            else if(this.state.albumList.length>0){
                albumBlock = <AlbumsBlock albums={this.state.albumList} onAlbumClick={this.props.onAlbumClick}/>;
            }
            else{
                albumBlock=<div className="AlbumRows"><p>aucun album trouvé</p></div>;
            }
            albumBlock=<div className="AlbumList"><h3 className="clicable" onClick={()=>this.setState({albumCollapse:!this.state.albumCollapse})}>{`Albums    ${this.state.albumCollapse?"v":">"}`}</h3><Collapse isOpen={this.state.albumCollapse}>{albumBlock}</Collapse></div>;
        }
        let artisteBlock;
        if(this.props.searchParams.findArtiste){
            if(this.state.artisteList === undefined){
                artisteBlock=<div className="ArtisteRows"><Spinner color="success"/></div>;
            }
            else if(this.state.artisteList.length>0){
                artisteBlock = <ArtistesBlock artistes={this.state.artisteList} onArtisteClick={this.props.onArtisteClick}/>;
            }
            else{
                artisteBlock=<div className="ArtisteRows"><p>Aucun artiste trouvé</p></div>;
            }
            artisteBlock=<div className="ArtisteList"><h3 className="clicable" onClick={()=>this.setState({artisteCollapse:!this.state.artisteCollapse})}>{`Liste d'Artistes  ${this.state.artisteCollapse?"v":">"}`}</h3><Collapse isOpen={this.state.artisteCollapse} >{artisteBlock}</Collapse></div>;
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
export default SearchPage;