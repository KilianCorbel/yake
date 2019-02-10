import React, { Component } from 'react';

class Formulaire extends Component {
  constructor(props){
    super(props);
    this.state={
      inputValue:""
    }
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
  render() {
    return (
      <div className="Formulaire">
        <input placeholder="Recherche" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}></input>
        <button type="submit" onClick={()=>{this.props.search(this.state.inputValue)}}>{this.props.value}</button>
      </div>
    );
  }

}

export default Formulaire;