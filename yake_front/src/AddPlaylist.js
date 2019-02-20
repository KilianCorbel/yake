import React, { Component } from 'react';
import { Button,Modal,ModalHeader,ModalBody,Input,ModalFooter } from 'reactstrap';
import './AddPlaylist.css';
class AddPlaylist extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            titleInput:"",
            descrInput:""
        };
        this.toggle = this.toggle.bind(this);
        this.save = this.save.bind(this);
    }
    toggle() {
        this.setState({
            modal:!this.state.modal
        });
    }
    save(){
        console.log("save");
        let bodyContent={};
        bodyContent.nom=this.state.titleInput;
        bodyContent.description=this.state.descrInput;
        bodyContent.musiques=this.props.playlist.getMusics();
        fetch('/api/playlists/savePlaylist',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(bodyContent)
        });
        this.toggle();
    }
    render(){
        let musicList = this.props.playlist.getMusics().map(ele=>(
            <div key={`${ele.nomGroupe}----------${ele.nomAlbum}-------${ele.titre}`}>
                {`${ele.titre}----------${ele.nomAlbum}-------${ele.nomGroupe}`}
            </div>
        ));
        return (
            <div className="AddPlaylistContent">
                <Button className="AddPlaylistButton" color="info" onClick={this.toggle} disabled={this.props.playlist.isEmpty()}>{"+"}</Button>
                <Modal isOpen={this.state.modal} className={this.props.className}>
                        <ModalHeader >Ajouter une playlist</ModalHeader>
                        <ModalBody className="addPlaylistCadre">
                            <Input placeholder="Nom de la playlist" rows={1} value={this.state.titleInput} onChange={evt =>{this.setState({titleInput:evt.target.value});}}/>
                            <Input placeholder="Description" rows={4} value={this.state.descrInput} onChange={evt =>{this.setState({descrInput:evt.target.value});}}/>
                            <div className="musicCadre">{musicList}</div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={this.save}>Save</Button>{' '}
                            <Button color="danger" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default AddPlaylist;