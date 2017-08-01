import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI';


class App extends Component {
  state={
    screen: 'list',
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
    let { screen }= this.state
    return (
      <div className='app'>
        {screen === 'list' && (
          <ListContacts
            onContactDelete={this.removeContact}
            contacts={this.state.contacts}
            onContactCreate= {()=>this.setState({screen:'create'})}
          />
        )}
        {screen === 'create' && (
          <CreateContact />
        )}
      </div>
    )
  }
}

export default App;
