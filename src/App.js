import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts';
import CreateContact from './CreateContact'
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
  createContact = (contact)=>{
    ContactsAPI.create(contact)
    .then((contact)=>{
      this.setState((state)=>({
        contacts:state.contacts.concat([contact])
      }))
    })
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
        <Route path='/create' render={({history})=>(
          <CreateContact
            onCreateContact={(contact)=>{
              this.createContact(contact)
              history.push("/")
            }}
          />)
        }/>
      </div>
    )
  }
}

export default App;
