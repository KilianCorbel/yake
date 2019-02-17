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
//import {Form} from 'react-bootstrap';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      musicList:[],
      inputValue:"",
      windowShowed:"homeWindow",
      playlist:new Playlist()
    }
    this.submitInputValue = this.submitInputValue.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.search = this.search.bind(this);
    this.musicPlayer = new MusicPlayer();
    //this.playlist= new Playlist();
   // this.findMusique("Evolve");
  }
  findMusique(musique){
    fetch(`/findMusiqueByAlbum/${musique}`)
    .then(res => res.json())
    .then(data => {this.setState({musicList : data});})
    .catch(error => console.log(error));
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
  submitInputValue(evt){
    if(evt.key === "Enter"){
      evt.target.value="";
      this.search(this.state.inputValue);
      this.setState({windowShowed:"searchWindow"});
    }
  }
  search(album){
    fetch(`/findMusiqueByAlbum/${album}`)
    .then(res => res.json())
    .then(data => {this.setState({musicList : data,inputValue:""});})
    .catch(error => console.log(error));
  }
  searchWindow(){
    return <MusiqueList refresh={()=>{this.setState({});}} playlist={this.state.playlist} musicPlayer={this.musicPlayer} musiqueList={this.state.musicList}/>;
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
    return <PlaylistWindow/>
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
              <input className="Recherche" placeholder="Recherche" value={this.state.inputValue} onKeyPress={this.submitInputValue} onChange={evt => this.updateInputValue(evt)} onSubmit={()=>{this.search(this.state.inputValue)}}></input>
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
