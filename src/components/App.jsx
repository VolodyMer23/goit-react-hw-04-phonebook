import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Container, PhonebookContainer, PhonebookTitle } from './App.styled';
import Contacts from './Phonebook/ContactsList/ContactList';
import { ContactAddForm } from './Phonebook/ContactAddForm/ContactAddForm';
import Filter from './Phonebook/Filter/Filter';

const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

export default function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => parsedContacts ?? []);
  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    console.log('contacts', contacts);
  }, [contacts]);
  
  const nameCheker = name => {
    return this.state.contacts.find(contact => contact.name === name);
  };

  const onFormSubmit = data => {
    if (this.nameCheker(data.name)) {
      return alert(`${data.name} is already in contacts.`);
    }
    this.setState(prevState => {
      const contactId = nanoid();
      return {
        contacts: prevState.contacts.concat({ ...data, id: contactId }),
      };
    });
  };

  const onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  const onFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  const onFilterContact = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return filteredContacts;
  };

  return (
    <Container>
      <PhonebookContainer>
        <PhonebookTitle>Phonebook</PhonebookTitle>
        <ContactAddForm onSubmit={onFormSubmit}></ContactAddForm>
      </PhonebookContainer>
      <Filter value={filter} onChange={onFilterChange}></Filter>
      <Contacts
        title="Contacts"
        contacts={onFilterContact()}
        onDelete={onDeleteContact}
      ></Contacts>
    </Container>
  );
}

