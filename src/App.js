import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  state={
    contacts : []
  }
  
  componentDidMount(){
    ContactsAPI.getAll()
    .then((contacts)=> this.setState({contacts}))
  }
  removeContact = (contactToRemove)=>{
    this.setState((state)=>({
      contacts: state.contacts.filter((c)=>c.id !== contactToRemove.id)
    }));
    ContactsAPI.remove(contactToRemove)
    .then((response)=>console.log('Response after delete: ', response))
  }
  render() {
    return (
      <div>
      <ListContacts
        onContactDelete={this.removeContact}
        contacts={this.state.contacts}
      />
      </div>
    )
  }
}

export default App;
