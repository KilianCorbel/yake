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
import AjoutArtiste from './AjoutArtiste';
import AjoutAlbum from './AjoutAlbum';
//import {Form} from 'react-bootstrap';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      musicList:[],
      inputValue:"",
      windowShowed:"homeWindow"
    }
    this.submitInputValue = this.submitInputValue.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.search = this.search.bind(this);
    this.musicPlayer = new MusicPlayer();
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
    return <MusiqueList musicPlayer={this.musicPlayer} musiqueList={this.state.musicList}/>;
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
  ajoutArtiste(){
    return <AjoutArtiste/>
  }
  ajoutAlbum(){
    return <AjoutAlbum/>
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
          <Menu className ="RightHeaderBlock" onClick={()=>{this.setState({windowShowed:"ajoutArtiste"});}} value="Ajout artiste"/>
          <Menu className ="RightHeaderBlock" onClick={()=>{this.setState({windowShowed:"ajoutAlbum"});}} value="Ajout album"/>
        </div>
        <div className="FullBody">
          <div className="LeftMenuBar">
            <Menu onClick={()=>{this.setState({windowShowed:"mesMusiquesWindow"});}} value="Mes musiques"/>
            <Menu onClick={()=>{this.setState({windowShowed:"tendancesWindow"});}} value="Tendances"/>
            <Menu onClick={()=>{this.setState({windowShowed:"mesPlaylistsWindow"});}} value="Mes playlists"/>
            <Menu onClick={()=>{this.setState({windowShowed:"autresWindow"});}} value="Autres"/>
            <Menu onClick={()=>{}} value=""/>
          </div>
          <div className="Body">
              {show}         
              <MusicPlayerI musicPlayer={this.musicPlayer}/>
          </div>
        </div>
      </div>      
    );
  }
}

export default App;
