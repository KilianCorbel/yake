import './MusicPlayer.css';
import React, { Component } from 'react';
class MusicPlayerI extends Component{
    constructor(props){
        super(props);
        this.state={
            title:"",
            album:"",
            auteur:""
        };
        this.props.musicPlayer.addEventListener('test',()=>{this.setState({
            title:`${this.props.musicPlayer.getActualTitle()}`,
            album:`${this.props.musicPlayer.getActualAlbum()}`,
            auteur:`${this.props.musicPlayer.getActualAuthor()}`
        });
    });
    }
    playPause(){
        if(this.props.musicPlayer.paused===true){
            this.props.musicPlayer.play();
        }
        else{
            this.props.musicPlayer.pause();
        }
        this.setState(this.state);
    }
    render(){
        return(
            <div className="MusicBar">
                <div>
                {`${this.state.title}-------${this.state.album}------${this.state.auteur}`}
                </div>
                <div>
                    <button onClick={()=>{this.props.musicPlayer.previous()}}>{"previous"}</button>
                    <button onClick={()=>{this.playPause()}}>{this.props.musicPlayer.paused?"Play":"Pause"}</button>
                    <button onClick={()=>{this.props.musicPlayer.next()}}>{"next"}</button>
                </div>
            </div>
        );
    }
}
export default MusicPlayerI;