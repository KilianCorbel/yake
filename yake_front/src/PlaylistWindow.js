import React, { Component } from 'react';
import './MainContent.css';
import './Scrollable.css';
class PlaylistWindow extends Component{
    render(){
        return(
        <div className="MainContent">
            <div className="scrollable">
                <p>{"Mes Playlists"}</p>
                <p>{"ici vous pourrez retrouver toutes vos playlists"}</p>
            </div>
        </div>
        );
    };
}
export default PlaylistWindow;