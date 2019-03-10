import React, { Component } from "react";
import "./ajoutArtiste.css";
import "./MainContent.css";
import "./Scrollable.css";
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
      fileChoosen: "",
      albums: []
    };
    this.ajouterArtiste = this.ajouterArtiste.bind(this);
  }
  toBuffer(ab) {
    let buf = Buffer.alloc(ab.byteLength);
    let view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}
  ajouterArtiste() {
    let body = this.state;
    let fileReader = new FileReader();
    fileReader.onloadend=()=>{
      body.image=this.toBuffer(fileReader.result);
      body.fileName=this.state.fileChoosen.name;
      body.fileChoosen=undefined;
      fetch("/api/artistes/", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(body)
      }).then(() => alert("Artiste " + body.nom + " ajouté"))
      .then(()=>{this.afficherAlerteConfirmation();this.reinitialiserFormulaire();});
    }
    fileReader.readAsArrayBuffer(this.state.fileChoosen);
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
      fileChoosen:undefined,
      albums: []
    })
  }

  render() {
    return (
      <div className="MainContent">
      <div className="scrollable">
      <Form className="formulaire">
        <h2>Ajout d'un artiste</h2>
        <FormGroup row>
        <Label for="nom">Nom</Label>
          <Input
            type="Text"
            id="nom"
            value={this.state.nom}
            onChange={e => this.modifierState(e)}
          />
        </FormGroup>

        <hr></hr>

        <FormGroup row >
          <Label for="dateCr">Date de création</Label>
          <Input
            type="Date"
            id="dateCreation"
            value={this.state.dateCreation}
            onChange={e => this.modifierState(e)}
          />
        </FormGroup>

        <hr></hr>

        <FormGroup row >
        <Label for="dateFin">Date de fin</Label>
          <Input
            type="Date"
            id="dateFin"
            value={this.state.dateFin}
            onChange={e => this.modifierState(e)}
          />
        </FormGroup>

        <hr></hr>

        <FormGroup row >
          <Label for="bio">Biographie</Label>
          <Input
            type="textarea"
            id="biographie"
            value={this.state.biographie}
            onChange={e => this.modifierState(e)}
          />
        </FormGroup>

        <hr></hr>

        <FormGroup row >
          <Label for="img">Image</Label>
          <input type="file" id="image" onChange={(e)=>{console.log(e.target.files[0]);this.setState({fileChoosen:e.target.files[0]});}}/>
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
            onClick={() => this.reinitialiserFormulaire()}
          >
            Réinitialiser
          </Button>
        </FormGroup>
      </Form>
      </div>
      </div>
    );
  }
}

export default AjoutArtiste;
