import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Menu from './Menu.js';
import Title from './Title.js';
import MusiqueList from './musiqueList.js';
import MusicPlayerI from './MusicPlayer/MusicPlayerI.js';
import HomeWindow from './HomeWindow.js';
import MusicWindow from './MusicWindow.js';
import TendancesWindow from './TendancesWindow.js';
import PlaylistWindow from './PlaylistWindow.js';
import AutresWindow from './AutresWindow.js';
import ArtisteWindow from './ArtisteWindow.js';
import AlbumWindow from './AlbumWindow.js';
import Playlist from './MusicPlayer/Playlist.js';
import { Input, InputGroupAddon, InputGroup, Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import AjoutArtiste from './AjoutArtiste';
import AjoutAlbum from './AjoutAlbum';
import PlaylistInfoWindow from './PlaylistInfoWindow.js'
import ConnectWindow from './ConnectWindow.js';
import FooterMenu from './FooterMenu.js';

//import {Form} from 'react-bootstrap';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      musicList:[],
      albumList:[],
      artisteList:[],
      playlistList:[],
      albumInfo:{},
      artisteInfo:{},
      playlistInfo:{},
      inputValue:"",
      windowShowed:"homeWindow",
      playlist:new Playlist(),
      popoverOpen: false,
      findArtiste: true,
      findAlbum: true,
      findMusic: true
    }
    this.getAllPlaylists=this.getAllPlaylists.bind(this);
    this.getAlbumInfo=this.getAlbumInfo.bind(this);
    this.getArtisteInfo=this.getArtisteInfo.bind(this);
    this.inputFindAlbumChange=this.inputFindAlbumChange.bind(this);
    this.inputFindMusicChange=this.inputFindMusicChange.bind(this);
    this.inputFindArtisteChange=this.inputFindArtisteChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.submitInputValue = this.submitInputValue.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.searchMusic = this.searchMusic.bind(this);
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
  submitInputValue(evt){
    if(evt.key === "Enter"){
      evt.target.value="";
      this.setState({artisteList:[],albumList:[],musicList:[]});
      if(this.state.findMusic)
        this.searchMusic(this.state.inputValue);
      if(this.state.findAlbum)
        this.searchAlbum(this.state.inputValue);
      if(this.state.findArtiste)
        this.searchArtiste(this.state.inputValue);
      this.setState({windowShowed:"searchWindow"});
    }
  }
  getAllPlaylists(){
    fetch(`/api/playlists/`)
    .then(res => res.json())
    .then(data => {this.setState({playlistList : data,windowShowed:"mesPlaylistsWindow"});})
    .catch(error => console.log(error));
  }
  getAlbumInfo(input){
    fetch(`/api/artistes/albums/id/${input}`)
    .then(res => res.json())
    .then(data => {this.setState({albumInfo : data,windowShowed:"albumWindow"});})
    .catch(error => console.log(error));
  }
  getArtisteInfo(input){
    fetch(`/api/artistes/id/${input}`)
    .then(res => res.json())
    .then(data => {this.setState({artisteInfo : data,windowShowed:"artisteWindow"});})
    .catch(error => console.log(error));
  }
  searchMusic(input){
    fetch(`/api/artistes/albums/musiques/title/${input}`)
    .then(res => res.json())
    .then(data => {this.setState({musicList : data,inputValue:""});})
    .catch(error => console.log(error));
  }
  searchAlbum(input){
    fetch(`/api/artistes/albums/name/${input}`)
    .then(res => res.json())
    .then(data => {this.setState({albumList : data,inputValue:""});})
    .catch(error => console.log(error));
  }
  searchArtiste(input){
    fetch(`/api/artistes/name/${input}`)
    .then(res => res.json())
    .then(data => {this.setState({artisteList : data,inputValue:""});})
    .catch(error => console.log(error));
  }
  searchWindow(){
    return <MusiqueList onArtisteClick={this.getArtisteInfo} onAlbumClick={this.getAlbumInfo} refresh={()=>{this.setState({});}} playlist={this.state.playlist} artisteList={this.state.artisteList} albumList={this.state.albumList} musiqueList={this.state.musicList}/>;
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
    return <PlaylistInfoWindow playlistToShow={this.state.playlistInfo} playlist={this.state.playlist} refresh={()=>{this.setState({});}}/>
  }
  mesPlaylistsWindow(){
    return <PlaylistWindow onPlaylistClick={(ele)=>this.setState({playlistInfo:ele,windowShowed:"playlistWindow"})} playlists={this.state.playlistList} playlist={this.state.playlist} refresh={()=>{this.setState({});}}/>
  }
  autresWindow(){
    return <AutresWindow/>
  }
  artisteWindow(){
    return <ArtisteWindow artiste={this.state.artisteInfo} onAlbumClick={this.getAlbumInfo}/>
  }
  albumWindow(){
    return <AlbumWindow onArtisteClick={this.getArtisteInfo} refresh={()=>{this.setState({});}} album={this.state.albumInfo} playlist={this.state.playlist}/>
  }
  ajoutArtiste(){
    return <AjoutArtiste/>
  }

  ajoutAlbum(){
    return <AjoutAlbum/>
  }

  connectWindow(){
    return <ConnectWindow/>
  }
  
  render() {
    let show = this[`${this.state.windowShowed}`]();
    let test = new FileReader();
    return (
      <div className="App">
        <div className="Header">
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
        <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Muli" rel="stylesheet"></link>
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
              <Popover className="paramSearch" placement="bottom" isOpen={this.state.popoverOpen} target="searchParamSup" toggle={this.toggle}>
                <PopoverHeader>Paramètres de recherche</PopoverHeader>
                <PopoverBody>
                <label> 
                  {"Musique :  "}
                  <input  name="findMusic"  type="checkbox" checked={this.state.findMusic}  onChange={this.inputFindMusicChange} />
                </label>
                <label> 
                  {"Album :  "}
                  <input  name="findAlbum"  type="checkbox" checked={this.state.findAlbum}  onChange={this.inputFindAlbumChange} />
                </label>
                <label> 
                  {"Artiste :  "}
                  <input  name="findArtiste"  type="checkbox" checked={this.state.findArtiste}  onChange={this.inputFindArtisteChange} />
                </label>
                </PopoverBody>
              </Popover>
          </div>
          <div className="RightHeaderBlock">
            <Menu clicable={true} onClick={()=>{this.setState({windowShowed:"connectWindow"});}} value="Connexion"/>
          </div>
        </div>
        <div className="FullBody">
          <div className="LeftMenuBar">
            <Menu clicable={true} onClick={()=>{this.setState({windowShowed:"mesMusiquesWindow"});}} value="Mes musiques"/>
            <Menu clicable={true} onClick={()=>{this.setState({windowShowed:"tendancesWindow"});}} value="Tendances"/>
            <Menu clicable={true} onClick={()=>{this.getAllPlaylists();}} value="Mes playlists"/>
            <Menu clicable={true} onClick={()=>{this.setState({windowShowed:"ajoutArtiste"});}} value="Ajout artiste"/>
            <Menu clicable={true} onClick={()=>{this.setState({windowShowed:"ajoutAlbum"});}} value="Ajout album"/>
            <Menu clicable={false}  value=""/>
            <Menu clicable={false}  value=""/>
            <FooterMenu />
          </div>
          <div className="Body">
              {show}        
              <MusicPlayerI playlist={this.state.playlist} musicPlayer={this.musicPlayer}/> 
          </div>
        </div>
      </div>      
    );
  }
}

export default App;
