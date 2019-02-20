import React, { Component } from "react";
import "./ajoutArtiste.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class AjoutArtiste extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      dateCreation: "",
      dateFin: "",
      biographie: "",
      image: "",
      albums: []
    };
  }

  ajouterArtiste() {
    fetch("/api/artistes/", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(this.state)
    }).then(() => alert("Artiste " + this.state.nom + " ajouté"))
    .then(()=>this.afficherAlerteConfirmation());
  }

  afficherRecap() {
    const c = document.getElementById("recap");
    c.innerText = this.state.dateCreation + "|" + this.state.dateFin;
  }

  modifierState(e) {
    let temp = {};
    temp[`${e.target.id}`] = e.target.value;
    this.setState(temp);
  }

  reinitialiserFormulaire(){
    this.setState({
      nom: "",
      dateCreation: "",
      dateFin: "",
      biographie: "",
      image: "",
      albums: []
    })
  }

  render() {
    return (
      <Form className="formulaire">
        <h2>Ajout d'un artiste</h2>
        <FormGroup row>
        <Label for="nom">Nom</Label>
          <Input
            type="Text"
            id="nom"
            value={this.state.titre}
            onChange={e => this.modifierState(e)}
          />
        </FormGroup>

        <hr></hr>

        <FormGroup row >
          <Label for="dateCr">Date de création</Label>
          <Input
            type="Date"
            id="dateCreation"
            value={this.state.dateSortie}
            onChange={e => this.modifierState(e)}
          />
        </FormGroup>

        <hr></hr>

        <FormGroup row >
        <Label for="dateFin">Date de fin</Label>
          <Input
            type="Date"
            id="dateFin"
            value={this.state.dateSortie}
            onChange={e => this.modifierState(e)}
          />
        </FormGroup>

        <hr></hr>

        <FormGroup row >
          <Label for="bio">Biographie</Label>
          <Input
            type="textarea"
            id="biographie"
            value={this.state.titre}
            onChange={e => this.modifierState(e)}
          />
        </FormGroup>

        <hr></hr>

        <FormGroup row >
          <Label for="img">Image</Label>
          <Input
            type="text"
            id="image"
            value={this.state.titre}
            onChange={e => this.modifierState(e)}
          />
        </FormGroup>

        <FormGroup>
          <Button
            color="primary"
            size="md"
            onClick={() => this.ajouterArtiste()}
          >
            Valider
          </Button>
          <span> </span>
          <Button
            color="danger"
            size="md"
            type = "reset"
            //onClick={() => this.reinitialiserFormulaire()}
          >
            Réinitialiser
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

export default AjoutArtiste;
