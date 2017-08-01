import React, { Component } from 'react';
import { Route } from 'react-router-dom'
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
    return (
      <div className='app'>
        <Route exact path='/' render={()=>(
          <ListContacts
            onContactDelete={this.removeContact}
            contacts={this.state.contacts}
            onContactCreate= {()=>this.setState({screen:'create'})}
          />
        )}/>
        <Route path='/create' component={CreateContact}/>
      </div>
    )
  }
}

export default App;
