import React, { Component } from 'react';
import { Button,Modal,ModalHeader,ModalBody,Input,ModalFooter } from 'reactstrap';
import './AddPlaylist.css';
class AddPlaylist extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            titleInput:"",
            descrInput:"",
            fileChoosen:{}
        };
        this.toggle = this.toggle.bind(this);
        this.save = this.save.bind(this);
    }
    toggle() {
        this.setState({
            modal:!this.state.modal,
            titleInput:"",
            descrInput:""
        });
    }
    toBuffer(ab) {
        let buf = Buffer.alloc(ab.byteLength);
        let view = new Uint8Array(ab);
        for (var i = 0; i < buf.length; ++i) {
            buf[i] = view[i];
        }
        return buf;
    }
    save(){
        console.log("save");
        let fileReader = new FileReader();
        fileReader.onloadend=()=>{
            console.log(fileReader.result);
            let bodyContent={};
            bodyContent.nom=this.state.titleInput;
            bodyContent.description=this.state.descrInput;
            bodyContent.musiques=this.props.playlist.getMusics();
            bodyContent.file=this.toBuffer(fileReader.result);
            bodyContent.fileName=this.state.fileChoosen.name;
            fetch('/api/playlists/savePlaylist',{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(bodyContent)
            });
            this.toggle();
        };
        fileReader.readAsArrayBuffer(this.state.fileChoosen);
    }
    render(){
        let musicList = this.props.playlist.getMusics().map(ele=>(
            <div key={`${ele.nomGroupe}----------${ele.nomAlbum}-------${ele.titre}`}>
                {`${ele.titre}----------${ele.nomAlbum}-------${ele.nomGroupe}`}
            </div>
        ));
        //let fileReader = new FileReader();
        //fileReader.onloadend=()=>{console.log(fileReader.result);};fileReader.readAsArrayBuffer(e.target.files[0]);
        return (
            <div className="AddPlaylistContent">
                <Button className="AddPlaylistButton" color="info" onClick={this.toggle} disabled={this.props.playlist.isEmpty()}>{"+"}</Button>
                <Modal isOpen={this.state.modal} className={this.props.className}>
                        <ModalHeader >Ajouter une playlist</ModalHeader>
                        <ModalBody className="addPlaylistCadre">
                            <Input placeholder="Nom de la playlist" rows={1} value={this.state.titleInput} onChange={evt =>{this.setState({titleInput:evt.target.value});}}/>
                            <input type="file" onChange={(e)=>{console.log(e.target.files[0]);this.setState({fileChoosen:e.target.files[0]});}}/>
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