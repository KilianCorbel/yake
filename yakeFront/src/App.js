import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Menu from './Menu.js';
import Title from './Title.js';
import MusiqueList from './musiqueList.js';
import MusicPlayer from './MusicPlayer/MusicPlayer.js';
import MusicPlayerI from './MusicPlayer/MusicPlayerI.js';
import HomeWindow from './HomeWindow.js';
import MusicWindow from './MusicWindow.js';
import TendancesWindow from './TendancesWindow.js';
import PlaylistWindow from './PlaylistWindow.js';
import AutresWindow from './AutresWindow.js';
import Playlist from './MusicPlayer/Playlist.js';
import { Input, InputGroupAddon, InputGroup, Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
//import {Form} from 'react-bootstrap';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      musicList:[],
      albumList:[],
      artisteList:[],
      playlistList:[],
      inputValue:"",
      windowShowed:"homeWindow",
      playlist:new Playlist(),
      popoverOpen: false,
      findArtiste: true,
      findAlbum: true,
      findMusic: true
    }
    this.inputFindAlbumChange=this.inputFindAlbumChange.bind(this);
    this.inputFindMusicChange=this.inputFindMusicChange.bind(this);
    this.inputFindArtisteChange=this.inputFindArtisteChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.submitInputValue = this.submitInputValue.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.searchMusic = this.searchMusic.bind(this);
    this.musicPlayer = new MusicPlayer();

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
      if(this.state.findMusic)
        this.searchMusic(this.state.inputValue);
      if(this.state.findAlbum)
        this.searchAlbum(this.state.inputValue);
      if(this.state.findArtiste)
        this.searchArtiste(this.state.inputValue);
      this.setState({windowShowed:"searchWindow"});
    }
  }
  searchMusic(input){
    fetch(`/findMusiqueByAlbum/${input}`)
    .then(res => res.json())
    .then(data => {this.setState({musicList : data,inputValue:""});})
    .catch(error => console.log(error));
  }
  searchAlbum(input){
    fetch(``)
    .then(res => res.json())
    .then(data => {this.setState({albumList : data,inputValue:""});})
    .catch(error => console.log(error));
  }
  searchArtiste(input){
    fetch(``)
    .then(res => res.json())
    .then(data => {this.setState({artisteList : data,inputValue:""});})
    .catch(error => console.log(error));
  }
  searchWindow(){
    return <MusiqueList refresh={()=>{this.setState({});}} playlist={this.state.playlist} artisteList={this.state.artisteList} albumList={this.state.albumList} musiqueList={this.state.musicList}/>;
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
  mesPlaylistsWindow(){
    return <PlaylistWindow playlists={this.searchAlbum.playlistList} playlist={this.state.playlist} refresh={()=>{this.setState({});}}/>
  }
  autresWindow(){
    return <AutresWindow/>
  }
  render() {
    let show = this[`${this.state.windowShowed}`]();
   
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
          <div className="RightHeaderBlock">{"Connexion"}</div>
        </div>
        <div className="FullBody">
          <div className="LeftMenuBar">
            <Menu clicable={true} onClick={()=>{this.setState({windowShowed:"mesMusiquesWindow"});}} value="Mes musiques"/>
            <Menu clicable={true} onClick={()=>{this.setState({windowShowed:"tendancesWindow"});}} value="Tendances"/>
            <Menu clicable={true} onClick={()=>{this.setState({windowShowed:"mesPlaylistsWindow"});}} value="Mes playlists"/>
            <Menu clicable={true} onClick={()=>{this.setState({windowShowed:"autresWindow"});}} value="Autres"/>
            <Menu clicable={false} onClick={()=>{}} value=""/>
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
