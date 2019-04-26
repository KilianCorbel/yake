import React, { Component } from "react";
import "./modifArtiste.css";
import 'react-widgets/dist/css/react-widgets.css';
import "./MainContent.css";
import "./Scrollable.css";
import "./ErrorColor.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { DropdownList } from "react-widgets";
class NewModifArtiste extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      nom: "",
      nouveauNom: "",
      dateCreation: "",
      dateFin: "",
      biographie: "",
      fileChoosen: undefined,
      albums: [],
      error: {},
      artistes: []
    };

    this.getArtistes();
    //this.creerSelects();
  }

  convertirDate(date) {
    if (date != null) {
      return (
        date.substring(0, 4) +
        "-" +
        date.substring(5, 7) +
        "-" +
        date.substring(8, 10)
      );
    }
    return "";
  }

  toBuffer(ab) {
    let buf = Buffer.alloc(ab.byteLength);
    let view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
      buf[i] = view[i];
    }
    return buf;
  }

  checkError() {
    let error = this.state.error;
    if (this.state.nom === undefined || this.state.nom.length <= 0) {
      error.nom = "Veuillez entrer un nom d'artiste";
    } else {
      error.nom = undefined;
    }
    if (
      this.state.biographie === undefined ||
      this.state.biographie.length <= 0
    ) {
      error.biographie = "Veuillez écrire une biographie";
    } else {
      error.biographie = undefined;
    }
    if (this.state.fileChoosen === undefined) {
      error.img = "Veuillez ajouter une image";
    } else {
      error.img = undefined;
    }
    return error;
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
        this.setState({
          artistes:
            data.map(ele => {
              let retour = {};
              retour.id = ele._id;
              retour.nom = ele.nom;
              return retour;
            })
          
          //idsArtistes: [""].concat(data.map(ele => ele._id))
        })
      )
      .catch(err => console.log(err));
  }

  /*getArtistes() {
    fetch("/api/artistes/", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(data =>
        this.setState({artistes:[...this.state.artistes, {data._id, data.nom}], 
      )
      .catch(err => console.log(err));
  }*/

  creerSelects() {
    let selects = [];
    for (let i = 0; i < this.state.listeArtistes.length; i++) {
      if (i === 0) {
        selects.push(
          <option
            value={this.state.idsArtistes[i]}
            disabled
            key={`ajoutArtiste${i}`}
          >
            {this.state.listeArtistes[i]}
          </option>
        );
      } else {
        selects.push(
          <option value={this.state.idsArtistes[i]} key={`ajoutArtiste${i}`}>
            {this.state.listeArtistes[i]}
          </option>
        );
      }
    }
    return selects;
  }

  chargerDonneesArtiste(e) {
    fetch(`/api/artistes/id/${e}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(data =>
        this.setState({
          _id: data._id,
          nouveauNom:"",
          nom: data.nom,
          dateCreation: this.convertirDate(data.dateCreation),
          dateFin: this.convertirDate(data.dateFin),
          biographie: data.biographie,
          fileChoosen: data.image
        })
      )
      .catch(err => console.log(err));
  }

  modifierArtiste() {
    fetch(`/api/artistes/${this.state._id}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        _id: this.state._id,
        nom: this.state.nouveauNom,
        dateCreation: this.state.dateCreation,
        dateFin: this.state.dateFin,
        biographie: this.state.biographie
      })
    }).then(alert("Artiste " + this.state.nom + " modifié"));
  }

  modifierState(e) {
    let temp = {};
    temp[`${e.target.id}`] = e.target.value;
    this.setState(temp);
  }

  reinitialiserFormulaire() {
    document.getElementById("image").value = "";
    this.setState({
      nom: "",
      dateCreation: "",
      dateFin: "",
      biographie: "",
      fileChoosen: undefined,
      albums: [],
      error: {}
    });
  }

  checkIfFileIsCorrect(file) {
    let img = new Image();
    img.onload = () => {
      let error = this.state.error;
      error.img = undefined;
      if (img.width > 260 || img.height > 260) {
        error.img = "La taille de l'image ne doit pas dépasser 260x260";
      }
      this.setState({ fileChoosen: file, error: error });
    };
    img.onerror = () => {
      let error = this.state.error;
      error.img = "Le fichier choisi n'est pas correct";
      this.setState({ fileChoosen: file, error: error });
    };
    img.src = URL.createObjectURL(file);
  }
  render() {

    let toto = (<FormGroup row>
      <Label for="nom">Artiste </Label>
      {/* <Input
        className={`${
          this.state.error.nom === undefined ? "" : "errorInput"
        }`}
        type="select"
        id="nom"
        //value={this.state.nom}
        onChange={e => this.chargerDonneesArtiste(e)}
      >
        {this.creerSelects()}
      </Input> */}
      <DropdownList filter
        className="dropdown"
        data={this.state.artistes}
        valueField="_id"
        textField="nom"
        placeholder = "Sélectionnez un artiste"
        //onChange={() => this.chargerDonneesArtiste(this.valueField)}
        onChange={e => this.chargerDonneesArtiste(e.id)}
      />
      {errorNom}
    </FormGroup>)

    let errorNom =
      this.state.error.nom !== undefined ? (
        <Badge color="danger">{this.state.error.nom}</Badge>
      ) : (
        undefined
      );
    let errorBiographie =
      this.state.error.biographie !== undefined ? (
        <Badge color="danger">{this.state.error.biographie}</Badge>
      ) : (
        undefined
      );
    let errorImg =
      this.state.error.img !== undefined ? (
        <Badge color="danger">{this.state.error.img}</Badge>
      ) : (
        undefined
      );

    return (
      <div className="MainContent">
        <div className="scrollable">
          <Form className="formulaire">
            <h2>Modification d'un artiste</h2>
            
            {toto}

            <hr />
            <hr />

            <FormGroup row>
              <Label for="nouveauNom">Nouveau nom</Label>
              <Input
                type="text"
                id="nouveauNom"
                value={this.state.nouveauNom}
                onChange={e => this.modifierState(e)}
              />
            </FormGroup>

            <FormGroup row>
              <Label for="dateCr">Date de création</Label>
              <Input
                type="Date"
                id="dateCreation"
                value={this.state.dateCreation}
                onChange={e => this.modifierState(e)}
              />
            </FormGroup>

            <hr />

            <FormGroup row>
              <Label for="dateFin">Date de fin</Label>
              <Input
                type="Date"
                id="dateFin"
                value={this.state.dateFin}
                onChange={e => this.modifierState(e)}
              />
            </FormGroup>

            <hr />

            <FormGroup row>
              <Label for="bio">Biographie</Label>
              <Input
                className={`${
                  this.state.error.biographie === undefined ? "" : "errorInput"
                }`}
                type="textarea"
                id="biographie"
                value={this.state.biographie}
                onChange={e => this.modifierState(e)}
              />
              {errorBiographie}
            </FormGroup>

            <hr />

            <FormGroup row>
              <Label for="img">Image</Label>
              <Input
                className={`${
                  this.state.error.img === undefined ? "" : "errorInput"
                }`}
                type="file"
                id="image"
                onChange={e => {
                  console.log(e.target.files[0]);
                  this.checkIfFileIsCorrect(e.target.files[0]);
                }}
              />
              {errorImg}
            </FormGroup>

            <FormGroup>
              <Button
                color="primary"
                size="md"
                onClick={() => this.modifierArtiste()}
              >
                Valider
              </Button>
              <span> </span>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default NewModifArtiste;
