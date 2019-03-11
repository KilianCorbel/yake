import React, { Component } from "react";
import "./ajoutAlbum.css";
import "./Scrollable.css";
import "./MainContent.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class AjoutAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      datePublication: "",
      couverture:undefined,
      fileChoosen:undefined,
      genres: [],
      artisteId: "",
      listeArtistes: [],
      idsArtistes: [],
    };
    this.getArtistes();
  }

  getArtistes() {
    fetch("/api/artistes/", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(
        data =>this.setState({
          listeArtistes:data.map(ele=>ele.nom),
          idsArtistes:data.map(ele=>ele._id)
        })
        )
      .catch(err => console.log(err));
  }

  ajouterAlbum() {
    fetch("/api/artistes/addAlbum" + this.state.artiste, {
      method: "POSTT",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        _id: this.state.artiste,
        nom: this.state.nom,
        couverture: this.state.couverture,

      })
    })
    .catch(err => alert(err));
    //On récupère d'abord les albums de l'artiste
    fetch("/api/artistes/" + this.state.artiste, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        return data.albums;
      })
      .then(albums => this.setState({ albums: albums }))
      .then(() =>
        this.setState({
          albums: [
            this.state.albums,
            [
              {
                nom: this.state.nom,
                couverture: this.state.couverture,
                datePublication: this.state.datePublication,
                genres: [],
                musiques: []
              }
            ]
          ]
        })
      )
      //ensuite on fait la maj

      .then(()=>alert(JSON.stringify(this.state.albums)))

      .then(() =>
        fetch("/api/artistes/" + this.state.artiste, {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify({
            _id: this.state.artiste,
            albums: this.state.albums
            /*albums:[
              {
                nom: this.state.nom,
                couverture: this.state.couverture,
                datePublication: this.state.datePublication,
                genres: this.state.genre,
                musiques: []
              }
            ]*/
          })
        })
      )
      .catch(err => alert(err));

    /*.then(() => alert("Album " + this.state.albums+ " ajouté"))
      .catch(err => console.log(err));*/
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

  ajouterChampGenre() {
    let champs = this.state.genres;
    champs.push(
      <FormGroup row>
        <Label for="nom">{`Genre ${champs.length()}`}</Label>
        <Input
          type="Text"
          id="genre"
          value={this.state.titre}
          //onChange={e => this.modifierState(e)}
        />
      </FormGroup>
    );
    return champs;
  }

  render() {
    return (
      <div className="MainContent">
      <div className="Scrollable">
      <Form className="formulaire">
        <h3>Ajout d'un album</h3>
        <FormGroup row>
          <Label for="artiste">Artiste </Label>
          <Input
            type="select"
            id="artiste"
            onChange={e => this.modifierState(e)}
          >
            {this.creerSelects()}
          </Input>
        </FormGroup>
        <FormGroup row>
          <Label for="nom">Nom </Label>
          <Input
            type="Text"
            id="nom"
            value={this.state.titre}
            onChange={e => this.modifierState(e)}
          />
        </FormGroup>

        <FormGroup row>
          <Label for="datePubli">Date de publication </Label>
          <Input
            type="Date"
            id="datePublication"
            value={this.state.dateSortie}
            onChange={e => this.modifierState(e)}
          />
        </FormGroup>
        <FormGroup row>
          <Label for="couv">Couverture </Label>
          <Input
            type="Text"
            id="couverture"
            value={this.state.titre}
            onChange={e => this.modifierState(e)}
          />
        </FormGroup>
        <FormGroup col>
          <Label for="genres">Genres</Label>
          <Button
            color="primary"
            id="boutonAjoutGenre"
            size="sm"
            onClick={() => this.ajouterChampGenre()}
          >
            Nouveau
          </Button>
          <span> </span>
        </FormGroup>
        <Button color="primary" size="md" onClick={() => this.ajouterAlbum()}>
          Ajouter
        </Button>
        <span> </span>
        <Button color="danger" size="md" type="reset">
          Réinitialiser
        </Button>
      </Form>
      </div>
      </div>
    );
  }
}

export default AjoutAlbum;
