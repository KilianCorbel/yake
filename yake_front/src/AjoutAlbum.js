import React, { Component } from "react";
import "./ajoutAlbum.css";
import "./Scrollable.css";
import "./MainContent.css";
import "./ErrorColor.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge, InputGroup,InputGroupAddon,Button, Form, FormGroup, Label, Input } from "reactstrap";

class AjoutAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      nom: "",
      datePublication: "",
      couverture:undefined,
      fileChoosen:undefined,
      genres: [],
      artiste: "",
      listeArtistes: [],
      idsArtistes: [],
      error:{}
    };
    this.getArtistes();
    this.submitInputValue=this.submitInputValue.bind(this);
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
    if(this.state.nom === undefined || this.state.nom.length<=0){
      error.nom="Veuillez entrer un nom d'album";
    }
    else{
      error.nom=undefined;
    }
    if(this.state.genres === undefined || this.state.genres.length<=0){
      error.genres = "Veuillez entrer au moins un genre";
    }
    else{
      error.genres = undefined;
    }
    if(this.state.fileChoosen===undefined){
      error.img="Veuillez ajouter une image";
    }
    else{
      error.img=undefined;
    }
    return error;
  }
  ajouterAlbum() {
    let error = this.checkError();
    if(Object.keys(error).filter((ele)=>this.state.error[`${ele}`]!==undefined).length===0){
      let fileReader = new FileReader();
      fileReader.onloadend=()=>{
        let couverture = this.toBuffer(fileReader.result);
        let body = {
            idArtiste: this.state.artiste,
            nom: this.state.nom,
            couverture: couverture,
            datePublication: this.state.datePublication,
            genres: this.state.genres
        };
        fetch("/api/artistes/addAlbum", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(
            body
          )
        })
        .then(()=>{alert("album ajouté");this.reinitialiserFormulaire();})
        .catch(err => alert(err));
      }
      fileReader.readAsArrayBuffer(this.state.fileChoosen);
    }
    else{
      this.setState({error:error});
    }
  }

  creerSelects() {
    let selects = [];
    for (let i = 0; i < this.state.listeArtistes.length; i++) {
      if(i===0){
        selects.push(
          <option value={this.state.idsArtistes[i]} selected disabled>
            {this.state.listeArtistes[i]}
          </option>
        );
      }
      else{
        selects.push(
          <option value={this.state.idsArtistes[i]}>
            {this.state.listeArtistes[i]}
          </option>
        );
      }
    }
    return selects;
  }

  reinitialiserFormulaire(){
    document.getElementById("couverture").value="";
    this.setState({
      inputValue: "",
      nom: "",
      datePublication: "",
      couverture:undefined,
      fileChoosen:undefined,
      genres: [],
      artiste: "",
      listeArtistes: [],
      idsArtistes: [],
      error:{}
    });
    this.getArtistes();
  }

  submitInputValue(evt){
    if(evt.key === " "){
      evt.target.value="";
      this.addGenre();
    }
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
  addGenre(){
    if(this.state.inputValue.replace(" ","").length>0){
      let genre = this.state.genres;
      genre.push(this.state.inputValue.replace(" ",""));
      this.setState({inputValue:"",genres:genre});
    }
    else{
      this.setState({inputValue:""});
    }
  }
  genreButtons(){
    let tab = [];
    for(let i = 0;i<this.state.genres.length;i++){
      tab.push(
      <Badge  color="secondary" id={`BadgeAjoutGenre${i}`} key={`BadgeAjoutGenre${i}`}>
      <div key={`divAjoutGenre${i}`}>
          {this.state.genres[i]}
          <Button close id={`boutonClose${i}`} key={`boutonClose${i}`} onClick={()=>{this.setState({genres:this.state.genres.filter((ele,j)=>i!==j)})}}></Button>
        </div>
      </Badge>
      );
    }
    return tab;
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

  modifierState(e){
    let temp={};
    temp[`${e.target.id}`]=e.target.value;
    this.setState(temp);
  }
  render() {
    let errorArtiste=this.state.error.artiste!==undefined?(<Badge color="danger">{this.state.error.artiste}</Badge>):undefined;
    let errorImg = this.state.error.img!==undefined?(<Badge color="danger">{this.state.error.img}</Badge>):undefined;
    let errorNom = this.state.error.nom!==undefined?(<Badge color="danger">{this.state.error.nom}</Badge>):undefined;
    let errorGenres = this.state.error.genres!==undefined?(<Badge color="danger">{this.state.error.genres}</Badge>):undefined;
    return (
      <div className="MainContent">
      <div className="Scrollable">
      <Form className="formulaire">
        <h3>Ajout d'un album</h3>
        <FormGroup row>
          <Label for="artiste">Artiste </Label>
          <Input
            className={`${this.state.error.artiste===undefined?"":"errorInput"}`}
            type="select"
            id="artiste"
            onChange={e => this.modifierState(e)}
          >
            {this.creerSelects()}
          </Input>
          {errorArtiste}
        </FormGroup>
        <FormGroup row>
          <Label for="nom">Nom </Label>
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
          <Label for="datePubli">Date de publication </Label>
          <Input
            type="Date"
            id="datePublication"
            value={this.state.datePublication}
            onChange={e => this.modifierState(e)}
          />
        </FormGroup>
        <FormGroup row>
          <Label for="couv">Couverture</Label>
          <Input 
          className={`${this.state.error.img===undefined?"":"errorInput"}`}
          type="file" id="couverture" onChange={(e)=>{console.log(e.target.files[0]);this.checkIfFileIsCorrect(e.target.files[0])}}/>
          {errorImg}
        </FormGroup>
        <FormGroup row>
          <Label for="genres">Genres</Label>
          
          <InputGroup className={`${this.state.error.genres===undefined?"":"errorInput"}`}>
              <InputGroupAddon addonType="append">
              {this.genreButtons()}
              </InputGroupAddon>
              <Input className="addGenreField" placeholder="Ajouter un genre" value={this.state.inputValue} onKeyPress={this.submitInputValue} onChange={evt => this.updateInputValue(evt)}></Input>
              <InputGroupAddon addonType="prepend">
                <Button id="addGenre" type="button" color="primary" onClick={()=>{this.addGenre();}}>
                  Ajouter genre
                </Button>
              </InputGroupAddon>
          </InputGroup>
          {errorGenres}
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
