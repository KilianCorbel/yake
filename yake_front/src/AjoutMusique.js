import React, { Component } from "react";
import "./ajoutAlbum.css";
import "./MainContent.css";
import "./Scrollable.css";
import "./ErrorColor.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Badge,Button, Form, FormGroup, Label, Input } from "reactstrap";

class AjoutMusique extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      nom: "",
      note:[],
      musique:undefined,
      fileChoosen:undefined,
      artiste: "",
      album:"",
      listeArtistes: [],
      idsArtistes: [],
      listeAlbums: [],
      idsAlbums: [],
      error:{},
      ajoutOk : false,
      ajoutKo : false
    };
    this.dismissKoAlert=this.dismissKoAlert.bind(this);
    this.dismissOkAlert=this.dismissOkAlert.bind(this);
  }

  componentDidMount(){
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
          listeArtistes:["Choisissez un artiste"].concat(data.map(ele=>ele.nom)),
          idsArtistes:[""].concat(data.map(ele=>ele._id))
        })
        )
      .catch(err => console.log(err));
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
    if(this.state.artiste === undefined || this.state.artiste.length<=0){
      error.artiste="Veuillez choisir un artiste";
    }
    else{
      error.artiste=undefined;
    }
    if(this.state.album === undefined || this.state.album.length<=0){
      error.album="Veuillez choisir un artiste";
    }
    else{
      error.album=undefined;
    }
    if(this.state.nom === undefined || this.state.nom.length<=0){
      error.nom="Veuillez entrer un nom d'album";
    }
    else{
      error.nom=undefined;
    }
    if(this.state.fileChoosen===undefined){
      error.img="Veuillez ajouter une musique";
    }
    else{
      error.img=undefined;
    }
    return error;
  }
  ajouterMusique() {
    let error = this.checkError();
    if(Object.keys(error).filter((ele)=>this.state.error[`${ele}`]!==undefined).length===0){
      let fileReader = new FileReader();
      fileReader.onloadend=()=>{
        let musique = this.toBuffer(fileReader.result);
        let body = {
            idArtiste: this.state.artiste,
            idAlbum:this.state.album,
            titre: this.state.nom,
            son: musique
        };
        fetch("/api/artistes/addMusique", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(
            body
          )
        })
        .then((data)=>{this.reinitialiserFormulaire();if(!data.ok){throw Error("Erreur ajout musique")}})
        .then(()=>{this.setState({ajoutOk : true,ajoutKo:false});})
        .catch(err =>{this.setState({ajoutKo : true,ajoutOk:false});});
      }
      fileReader.readAsArrayBuffer(this.state.fileChoosen);
    }
    else{
      this.setState({error:error});
    }
  }

  reinitialiserFormulaire(){
    document.getElementById("musique").value="";
    this.setState({
      inputValue: "",
      nom: "",
      note:[],
      musique:undefined,
      fileChoosen:undefined,
      artiste: "",
      album:"",
      listeArtistes: [],
      idsArtistes: [],
      listeAlbums: [],
      idsAlbums: [],
      error:{}
    });
    this.getArtistes();
  }

  creerSelectsArtiste() {
    let selects = [];
    for (let i = 0; i < this.state.listeArtistes.length; i++) {
        if(i===0){
        selects.push(
            <option value={this.state.idsArtistes[i]} disabled key={`ajoutMusiqueArtiste${i}`}>
            {this.state.listeArtistes[i]}
            </option>
        );
        }
        else{
            selects.push(
        <option value={this.state.idsArtistes[i]} key={`ajoutMusiqueArtiste${i}`}>
          {this.state.listeArtistes[i]}
        </option>
      );
        }
    }
    return selects;
  }
  creerSelectsAlbum() {
    let selects = [];
    for (let i = 0; i < this.state.listeAlbums.length; i++) {
      if(i===0){
          selects.push(
        <option value={this.state.idsAlbums[i]} disabled key={`ajoutMusiqueAlbum${i}`}>
          {this.state.listeAlbums[i]}
        </option>
      );
      }
      else{
          selects.push(
        <option value={this.state.idsAlbums[i]} key={`ajoutMusiqueAlbum${i}`}>
          {this.state.listeAlbums[i]}
        </option>
      );
      }
    }
    return selects;
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
  checkIfFileIsCorrect(file){
    this.setState({fileChoosen:file});
  }

  modifierState(e){
    let temp={};
    temp[`${e.target.id}`]=e.target.value;
    this.setState(temp);
  }
  chooseAlbum(e){
      let event = e.target.value;
      this.setState({
          album:event
      });
  }
  chooseArtiste(e){
      let event = e.target.value;
    fetch(`/api/artistes/id/${event}`, {
    method: "GET",
    headers: new Headers({
        "Content-Type": "application/json"
    })
    })
    .then(res => res.json())
    .then(
        data =>{this.setState({
        listeAlbums:[],
        idsAlbums:[],
        artiste:event
        });
        this.setState({
            listeAlbums:["Choisissez un album"].concat(data.albums.map(ele=>ele.nom)),
            idsAlbums:[""].concat(data.albums.map(ele=>ele._id)),
            album:""
        });
        })
    .catch(err => console.log(err));
  }
  dismissOkAlert(){
    this.setState({ajoutOk:false});
  }

  dismissKoAlert(){
    this.setState({ajoutKo:false});
  }
  render() {
    let errorImg = this.state.error.img!==undefined?(<Badge color="danger">{this.state.error.img}</Badge>):undefined;
    let errorArtiste = this.state.error.artiste!==undefined?(<Badge color="danger">{this.state.error.artiste}</Badge>):undefined;
    let errorAlbum = this.state.error.album!==undefined?(<Badge color="danger">{this.state.error.album}</Badge>):undefined;
    let errorNom = this.state.error.nom!==undefined?(<Badge color="danger">{this.state.error.nom}</Badge>):undefined;
    return (
      <div className="MainContent">
      <div className="scrollable">
      <Form className="formulaire">
        <h3>Ajout d'une musique</h3>
        <Alert color="success" isOpen={this.state.ajoutOk} toggle={this.dismissOkAlert}>
          Votre musique a bien été ajoutée
        </Alert>
        <Alert color="danger" isOpen={this.state.ajoutKo} toggle={this.dismissKoAlert}>
          Echec de l'ajout de votre musique
        </Alert>
        <FormGroup row>
          <Label for="artiste">Artiste </Label>
          <Input
            value={this.state.artiste}
            className={`${this.state.error.artiste===undefined?"":"errorInput"}`}
            type="select"
            id="artiste"
            onChange={e => this.chooseArtiste(e)}
          >
            {this.creerSelectsArtiste()}
          </Input>
          {errorArtiste}
        </FormGroup>
        <FormGroup row>
          <Label for="album">Album </Label>
          <Input
            value={this.state.album}
            className={`${this.state.error.album===undefined?"":"errorInput"}`}
            type="select"
            id="album"
            onChange={e => this.chooseAlbum(e)}
          >
            {this.creerSelectsAlbum()}
          </Input>
          {errorAlbum}
        </FormGroup>
        <FormGroup row>
          <Label for="nom">Titre de la musique </Label>
          <Input
            className={`${this.state.error.nom===undefined?"":"errorInput"}`}
            type="Text"
            id="nom"
            value={this.state.nom}
            onChange={e => this.modifierState(e)}
          />
          {errorNom}
        </FormGroup>
        <FormGroup row>
          <Label for="couv">Musique</Label>
          <Input 
          className={`${this.state.error.img===undefined?"":"errorInput"}`}
          type="file" id="musique" onChange={(e)=>{console.log(e.target.files[0]);this.checkIfFileIsCorrect(e.target.files[0])}}/>
          {errorImg}
        </FormGroup>
        <Button color="primary" size="md" onClick={() => this.ajouterMusique()}>
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

export default AjoutMusique;
