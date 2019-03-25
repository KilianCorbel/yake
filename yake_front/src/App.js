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
import AjoutMusique from './AjoutMusique.js';
import PlaylistInfoWindow from './PlaylistInfoWindow.js'
import {Route,Switch, withRouter} from 'react-router-dom';
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
      findMusic: true,
      searchParams:{}
    }
    this.searchWindow=this.searchWindow.bind(this);
    this.getAllPlaylists=this.getAllPlaylists.bind(this);
    this.getAlbumInfo=this.getAlbumInfo.bind(this);
    this.getArtisteInfo=this.getArtisteInfo.bind(this);
    this.albumWindow=this.albumWindow.bind(this);
    this.artisteWindow=this.artisteWindow.bind(this);
    this.inputFindAlbumChange=this.inputFindAlbumChange.bind(this);
    this.inputFindMusicChange=this.inputFindMusicChange.bind(this);
    this.inputFindArtisteChange=this.inputFindArtisteChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.submitInputValue = this.submitInputValue.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.searchMusic = this.searchMusic.bind(this);
    this.mesPlaylistsWindow=this.mesPlaylistsWindow.bind(this);
    this.playlistWindow=this.playlistWindow.bind(this);
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
    if(evt.key === "Enter" && evt.target.value.replace(/ /g,"").length>0){
      this.props.history.push("/");
      evt.target.value="";
      this.setState({searchParams:{
        findArtiste:this.state.findArtiste,
        findAlbum:this.state.findAlbum,
        findMusic:this.state.findMusic
      },
      artisteList:undefined,albumList:undefined,musicList:undefined});
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
    return <MusiqueList searchParams={this.state.searchParams} onArtisteClick={this.getArtisteInfo} onAlbumClick={this.getAlbumInfo} refresh={()=>{this.setState({});}} playlist={this.state.playlist} artisteList={this.state.artisteList} albumList={this.state.albumList} musiqueList={this.state.musicList}/>;
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
    return <PlaylistWindow onPlaylistClick={(ele)=>{this.setState({playlistInfo:ele,windowShowed:"playlistWindow"}); this.props.history.push("/");}} playlist={this.state.playlist} refresh={()=>{this.setState({});}}/>
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
