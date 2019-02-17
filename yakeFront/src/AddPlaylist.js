import React, { Component } from 'react';
import { Button,Modal,ModalHeader,ModalBody,Input,ModalFooter } from 'reactstrap';
class AddPlaylist extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            unmountOnClose: true
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
        this.toggle();
    }
    render(){
        let musicList = this.props.playlist.getMusics().map(ele=>(
            <div>
                {`${ele.titre}----------${ele.Album}-------${ele.Groupe}`}
            </div>
        ));
        return (
            <div>
                <Button color="info" onClick={this.toggle} disabled={this.props.playlist.isEmpty()}>{"+"}</Button>
                <Modal isOpen={this.state.modal} className={this.props.className} unmountOnClose={true}>
                        <ModalHeader >Ajouter une playlist</ModalHeader>
                        <ModalBody>
                            <Input placeholder="Playlist Title" rows={1} />
                            {musicList}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={this.toggle}>Save</Button>{' '}
                            <Button color="danger" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default AddPlaylist;