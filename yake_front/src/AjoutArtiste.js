import React, { Component } from "react";
import "./ajoutArtiste.css";
import "./MainContent.css";
import "./Scrollable.css";
import "./ErrorColor.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge, Button, Form, FormGroup, Label, Input } from "reactstrap";

class AjoutArtiste extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      dateCreation: "",
      dateFin: "",
      biographie: "",
      fileChoosen: undefined,
      albums: [],
      error:{}
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

  checkError(){
    let error = this.state.error;
    if(this.state.nom === undefined || this.state.nom.length<=0){
        error.nom="Veuillez entrer un nom d'artiste";
    }
    else{
      error.nom=undefined;
    }
    if(this.state.biographie===undefined || this.state.biographie.length<=0){
      error.biographie="Veuillez écrire une biographie";
    }
    else{
      error.biographie=undefined;
    }
    if(this.state.fileChoosen===undefined){
      error.img="Veuillez ajouter une image";
    }
    else{
      error.img=undefined;
    }
    return error;
  }
  ajouterArtiste() {
    let error = this.checkError();
    if(Object.keys(error).filter((ele)=>this.state.error[`${ele}`]!==undefined).length===0){
      let body = this.state;
      let fileReader = new FileReader();
      fileReader.onloadend=()=>{
        body.image=this.toBuffer(fileReader.result);
        body.fileName=this.state.fileChoosen.name;
        body.fileChoosen=undefined;
        body.error=undefined;
        fetch("/api/artistes/", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(body)
        }).then(() => {alert("Artiste " + body.nom + " ajouté");this.reinitialiserFormulaire();});
      }
      fileReader.readAsArrayBuffer(this.state.fileChoosen);
    }
    else{
      this.setState({error:error});
    }
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
    document.getElementById("image").value="";
    this.setState({
      nom: "",
      dateCreation: "",
      dateFin: "",
      biographie: "",
      fileChoosen:undefined,
      albums: [],
      error:{}
    });
  }

  checkIfFileIsCorrect(file){
    let img = new Image();
    img.onload=()=>{
      let error=this.state.error;
      error.img=undefined;
      if(img.width>260 || img.height>260){
        error.img="La taille de l'image ne doit pas dépasser 260x260";
      }
      this.setState({fileChoosen:file,error:error});
    }
    img.onerror = ()=>{
      let error=this.state.error;
      error.img="Le fichier choisi n'est pas correct";
      this.setState({fileChoosen:file,error:error});
    }
    img.src=URL.createObjectURL(file);
  }
  render() {
    let errorNom=this.state.error.nom!==undefined?(<Badge color="danger">{this.state.error.nom}</Badge>):undefined;
    let errorBiographie=this.state.error.biographie!==undefined?(<Badge color="danger">{this.state.error.biographie}</Badge>):undefined;
    let errorImg = this.state.error.img!==undefined?(<Badge color="danger">{this.state.error.img}</Badge>):undefined;
    return (
      <div className="MainContent">
      <div className="scrollable">
      <Form className="formulaire">
        <h2>Ajout d'un artiste</h2>
        <FormGroup row>
        <Label for="nom">Nom</Label>
          <Input
            className={`${this.state.error.nom===undefined?"":"errorInput"}`}
            type="Text"
            id="nom"
            value={this.state.nom}
            onChange={e => this.modifierState(e)}
          />
          {errorNom}
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
            className={`${this.state.error.biographie===undefined?"":"errorInput"}`}
            type="textarea"
            id="biographie"
            value={this.state.biographie}
            onChange={e => this.modifierState(e)}
          />
          {errorBiographie}
        </FormGroup>

        <hr></hr>

        <FormGroup row >
          <Label for="img">Image</Label>
          <Input 
          className={`${this.state.error.img===undefined?"":"errorInput"}`}
          type="file" id="image" onChange={(e)=>{console.log(e.target.files[0]);this.checkIfFileIsCorrect(e.target.files[0])}}/>
          {errorImg}
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
