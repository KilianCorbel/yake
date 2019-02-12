import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Menu from './Menu.js';
import Title from './Title.js';
import MusiqueList from './musiqueList.js';
import MusicPlayer from './MusicPlayer/MusicPlayer.js';
import MusicPlayerI from './MusicPlayer/MusicPlayerI.js';
//import {Form} from 'react-bootstrap';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      musicList:[],
      inputValue:""
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
    }
  }
  search(album){
    fetch(`/findMusiqueByAlbum/${album}`)
    .then(res => res.json())
    .then(data => {this.setState({musicList : data,inputValue:""});})
    .catch(error => console.log(error));
  }
  render() {
    return (
      <div className="App">
        <div className="Header">
          <Title/>
          <div className="SearchHeaderBlock">
              <input className="Recherche" placeholder="Recherche" value={this.state.inputValue} onKeyPress={this.submitInputValue} onChange={evt => this.updateInputValue(evt)} onSubmit={()=>{this.search(this.state.inputValue)}}></input>
          </div>
          <div className="RightHeaderBlock">{"Connexion"}</div>
        </div>
        <div className="FullBody">
          <div className="LeftMenuBar">
            <Menu value="Mes musiques"/>
            <Menu value="Tendances"/>
            <Menu value="Mes playlists"/>
            <Menu value="Autre"/>
            <Menu value=""/>
          </div>
          <div className="Body">
            <div className="MainContent">
              <MusiqueList musicPlayer={this.musicPlayer} musiqueList={this.state.musicList}/>
            </div>           
              <MusicPlayerI musicPlayer={this.musicPlayer}/>
          </div>
        </div>
      </div>      
    );
  }
}

export default App;
