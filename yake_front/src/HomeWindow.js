import React, { Component } from "react";
import "./MainContent.css";
import "./Scrollable.css";
class HomeWindow extends Component {
  render() {
    return (
      <div className="MainContent">
        <div className="scrollable">
          <h1>{"Bienvenue sur Yake"}</h1>
          <p>{"Bienvenue sur Yake votre site de streaming de musique"}</p>
          <p>
            {
              "Utilisez les onglets afin d'accéder à vos musiques,playlists ou aux tendances"
            }
          </p>
          <p>
            {
              "Utilisez la barre de recherche afin de rechercher les musiques sur Yake"
            }
          </p>
        </div>
      </div>
    );
  }
}

export default HomeWindow;
