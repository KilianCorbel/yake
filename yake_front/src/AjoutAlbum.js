import React, { Component } from "react";

class AjoutAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      couverture: "",
      datePublication: "",
      genres: [{}],
      musiques: [{}],
      artiste: "",
      listeArtistes: [],
      idsArtistes: [],

      nomArtiste: "",
      dateCreationArtiste: "",
      dateFinArtiste: "",
      bioArtsite: "",
      imageArtiste: "",
      albumsArtiste: []
    };

    this.getArtistes();

  }

  getArtiste(id) {
    fetch("/api/artistes/" + id, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ nomArtiste: data.nom });
        this.setState({ dateCreationArtiste: data.dateCreation });
        this.setState({ dateFinArtiste: data.dateFin });
        this.setState({ bioArtsite: data.biographie });
        this.setState({ imageArtiste: data.image });
        this.setState({ albumsArtiste: data.albums });
      })
      .then(alert(this.state.bioArtsite))
      .catch(err => console.log(err))
  }

  getArtistes() {
    fetch("/api/artistes/", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(data =>
        data.forEach(element => {
          this.setState({
            listeArtistes: [...this.state.listeArtistes, element.nom]
          });
          this.setState({
            idsArtistes: [...this.state.idsArtistes, element._id]
          });
        })
      )
      .catch(err => console.log(err));
  }

  ajouterAlbum() {
    fetch("/api/albums/" + this.state.artiste, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(
        {"id_":this.state.artiste},
        {"nom":this.state.nomArtiste},
        {"dateCreation":this.state.dateCreationArtiste},
        {"dateFin":this.state.dateFinArtiste},
        {"biographie":this.state.bioArtsite},
        {"image":this.state.imageArtiste},
        {"albums":[
          {"nom":this.state.nom},
          {"couverture":this.state.couverture},
          {"datePublication":this.state.datePublication},
          {"genres":this.state.genres},
        {"musiques":this.state.musiques}
        ]}
      )
    })
      .then((str) => alert(str))
      .catch(err => console.log(err));
  }

  modifierState(e) {
    let temp = {};
    temp[`${e.target.id}`] = e.target.value;
    this.setState(temp);
  }

  creerSelects() {
    let selects = [];
    for (let i = 0; i < this.state.listeArtistes.length; i++) {
      selects.push(
        <option value={this.state.idsArtistes[i]}>
          {this.state.listeArtistes[i]}
        </option>
      );
    }
    return selects;
  }

  render() {
    return (
      <div className="formulaire">
        <h1>Ajout d'un album</h1>
        <ul>
          <li>
            <span>Artiste </span>
            <select id="artiste" onChange={e => this.modifierState(e)}>
              {this.creerSelects()}
            </select>
          </li>
          <li>
            <span>Nom </span>
            <input
              type="Text"
              id="nom"
              value={this.state.titre}
              onChange={e => this.modifierState(e)}
            />
          </li>

          <li>
            <span>Date de publication </span>
            <input
              type="Date"
              id="datePublications"
              value={this.state.dateSortie}
              onChange={e => this.modifierState(e)}
            />
          </li>
          <li>
            <span>Genres </span>
            <input
              type="button"
              id="boutonAjoutGenre"
              value="+"
              onClick="genererChampGenre"
            />
          </li>
          <li>
            <span>Couverture </span>
            <input
              type="Text"
              id="image"
              value={this.state.titre}
              onChange={e => this.modifierState(e)}
            />
          </li>
          <li>
            <button onClick={() => this.ajouterAlbum()}>
              Ajouter
            </button>
          </li>

          <li>
            <span id="recap" />
          </li>
        </ul>
      </div>
    );
  }
}

export default AjoutAlbum;
