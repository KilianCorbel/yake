import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Menu from './Menu.js';
import Title from './Title.js';
import SearchPage from './SearchPage.js';
import MusicPlayerI from './MusicPlayer/MusicPlayerI.js';
import HomeWindow from './HomeWindow.js';
import MusicWindow from './MusicWindow.js';
import TendancesWindow from './TendancesWindow.js';
import PlaylistWindow from './PlaylistWindow.js';
import AutresWindow from './AutresWindow.js';
import ArtisteWindow from './ArtisteWindow.js';
import AlbumWindow from './AlbumWindow.js';
import Playlist from './MusicPlayer/Playlist.js';
import { Badge, Input, InputGroupAddon, InputGroup, Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import AjoutArtiste from './AjoutArtiste';
import AjoutAlbum from './AjoutAlbum';
import AjoutMusique from './AjoutMusique.js';
import PlaylistInfoWindow from './PlaylistInfoWindow.js'
import {Route,Switch, withRouter} from 'react-router-dom';
//import {Form} from 'react-bootstrap';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      inputValue:"",
      windowShowed:"homeWindow",
      playlist:new Playlist(),
      popoverOpen: false,
      findArtiste: true,
      findAlbum: true,
      findMusic: true,
      searchParams:{},
      genreFilterInput:"",
      genreFilter:[]
    }
    this.searchWindow=this.searchWindow.bind(this);
    this.albumWindow=this.albumWindow.bind(this);
    this.artisteWindow=this.artisteWindow.bind(this);
    this.inputFindAlbumChange=this.inputFindAlbumChange.bind(this);
    this.inputFindMusicChange=this.inputFindMusicChange.bind(this);
    this.inputFindArtisteChange=this.inputFindArtisteChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.submitInputValue = this.submitInputValue.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.mesPlaylistsWindow=this.mesPlaylistsWindow.bind(this);
    this.playlistWindow=this.playlistWindow.bind(this);
    this.inputGenreFilterChange=this.inputGenreFilterChange.bind(this);
    this.submitInputValueGenre=this.submitInputValueGenre.bind(this);
    this.addGenre=this.addGenre.bind(this);
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }
  inputFindArtisteChange(event) {
    this.setState({
      findArtiste:!this.state.findArtiste
    });
  }
  inputFindAlbumChange(event) {
    this.setState({
      findAlbum:!this.state.findAlbum
    });
  }
  inputFindMusicChange(event) {
    this.setState({
      findMusic:!this.state.findMusic
    });
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
  inputGenreFilterChange(evt){
    this.setState({genreFilterInput:evt.target.value});
  }
  submitInputValue(evt){
    if(evt.key === "Enter" && evt.target.value.replace(/ /g,"").length>0){
      this.props.history.push("/");
      evt.target.value="";
      this.setState({searchParams:{
        findArtiste:this.state.findArtiste,
        findAlbum:this.state.findAlbum,
        findMusic:this.state.findMusic,
        input: this.state.inputValue,
        genreFilter:(this.state.genreFilter===""?[]:[this.state.genreFilter])
      },
      windowShowed:"searchWindow",
      inputValue:"",
      artisteList:undefined,albumList:undefined,musicList:undefined});
    }
  }

  addGenre(){
    if(this.state.genreFilterInput.replace(" ","").length>0 && this.state.genreFilter.length<5){
      let genre = this.state.genreFilter;
      genre.push(this.state.genreFilterInput.replace(" ",""));
      this.setState({genreFilterInput:"",genreFilter:genre});
    }
    else{
      this.setState({genreFilterInput:""});
    }
  }

  submitInputValueGenre(evt){
    if(evt.key === " "){
      evt.target.value="";
      this.addGenre();
    }
  }
  generateGenreBadge(){
    return this.state.genreFilter.map((ele,i)=>(
    <Badge size="sm" color="secondary" id={`BadgeGenreFilter${i}`} key={`BadgeGenreFilter${i}`}>
      <div key={`divGenreFilter${i}`}>
        {this.state.genreFilter[i]}
        <Button size="sm" close id={`boutonClose${i}`} key={`boutonCloseGenreFilter${i}`} onClick={()=>{this.setState({genreFilter:this.state.genreFilter.filter((_,j)=>i!==j)})}}></Button>
      </div>
    </Badge>));
  }
  searchWindow(){
    return <SearchPage searchParams={this.state.searchParams} refresh={()=>{this.setState({});}} playlist={this.state.playlist}/>;
  }
  homeWindow(){
    return <HomeWindow/>
  }
  mesMusiquesWindow(){
    return <MusicWindow/>
  }
  tendancesWindow(){
    return <TendancesWindow/>
  }
  playlistWindow(){
    return <PlaylistInfoWindow playlist={this.state.playlist} refresh={()=>{this.setState({});}}/>
  }
  mesPlaylistsWindow(){
    return <PlaylistWindow playlist={this.state.playlist} refresh={()=>{this.setState({});}}/>
  }
  autresWindow(){
    return <AutresWindow/>
  }
  artisteWindow(){
    return <ArtisteWindow/>
  }
  albumWindow(){
    return <AlbumWindow refresh={()=>{this.setState({});}} playlist={this.state.playlist}/>
  }
  ajoutArtiste(){
    return <AjoutArtiste/>
  }
  ajoutAlbum(){
    return <AjoutAlbum/>
  }
  ajoutMusique(){
    return <AjoutMusique/>
  }
  render() {
    let show = this[`${this.state.windowShowed}`];
    return (
      <div className="App">
        <div className="Header">
          <Title onClick={()=>{this.setState({windowShowed:"homeWindow"});}}/>
          <div className="SearchHeaderBlock">
          <InputGroup>
              <Input className="Recherche" placeholder="Recherche" value={this.state.inputValue} onKeyPress={this.submitInputValue} onChange={evt => this.updateInputValue(evt)} onSubmit={()=>{this.search(this.state.inputValue)}}></Input>
              <InputGroupAddon addonType="prepend">
                <Button id="searchParamSup" type="button" color="info">
                  ...
                </Button>
              </InputGroupAddon>
              </InputGroup>
              <Popover trigger="legacy" className="paramSearch" placement="bottom" isOpen={this.state.popoverOpen} target="searchParamSup" toggle={this.toggle}>
                <PopoverHeader>Paramètres de recherche</PopoverHeader>
                <PopoverBody className="searchPopOver">
                <div>
                <label> 
                  {"Afficher des musiques :  "}
                  <input  name="findMusic"  type="checkbox" checked={this.state.findMusic}  onChange={this.inputFindMusicChange} />
                </label>
                </div>
                
                <div>
                <label> 
                  {"Afficher des albums :  "}
                  <input  name="findAlbum"  type="checkbox" checked={this.state.findAlbum}  onChange={this.inputFindAlbumChange} />
                </label>
                </div>
                
                <div>
                <label> 
                  {"Afficher des artistes :  "}
                  <input  name="findArtiste"  type="checkbox" checked={this.state.findArtiste}  onChange={this.inputFindArtisteChange} />
                </label>
                </div>
                <div>
                  <label>
                    {"Genre : "}
                    {this.generateGenreBadge()}
                    <input placeholder="Entrez vos genres" name="genreFilter" type="text" value={this.state.genreFilterInput} onChange={this.inputGenreFilterChange} onKeyPress={this.submitInputValueGenre}/>
                  </label>
                </div>
                
                </PopoverBody>
              </Popover>
          </div>
          <div className="RightHeaderBlock">{"Connexion"}</div>
        </div>
        <div className="FullBody">
          <div className="LeftMenuBar">
            <Menu clicable={true} to="/myMusic" value="Mes musiques"/>
            <Menu clicable={true} to="/tendances" value="Tendances"/>
            <Menu clicable={true} to="/myPlaylists" value="Mes playlists"/>
            <Menu clicable={true} to="/others" value="Autres"/>
            <Menu clicable={true} to="/addArtiste" value="Ajout artiste"/>
            <Menu clicable={true} to="/addAlbum" value="Ajout album"/>
            <Menu clicable={true} to="/addMusic" value="Ajout musique"/>
            <Menu clicable={false} onClick={()=>{}} value=""/>
          </div>
          <div className="Body">
                <Switch>
                  <Route path='/showArtiste' component={this.artisteWindow}/>
                  <Route path='/showAlbum' component={this.albumWindow}/>
                  <Route path='/showSearch' component={this.searchWindow}/>
                  <Route path='/showPlaylist' component={this.playlistWindow}/>
                  <Route path='/addArtiste' component={this.ajoutArtiste}/>
                  <Route path='/addAlbum' component={this.ajoutAlbum}/>
                  <Route path='/addMusic' component={this.ajoutMusique}/>
                  <Route path='/tendances' component={this.tendancesWindow}/>
                  <Route path='/myMusic' component={this.mesMusiquesWindow}/>
                  <Route path='/others' component={this.autresWindow}/>
                  <Route path='/myPlaylists' component={this.mesPlaylistsWindow}/>
                  <Route path='/' component={show}/>
                </Switch>     
              <MusicPlayerI playlist={this.state.playlist} musicPlayer={this.musicPlayer}/> 
          </div>
        </div>
        
      </div>      
    );
  }
}

export default withRouter(App);
