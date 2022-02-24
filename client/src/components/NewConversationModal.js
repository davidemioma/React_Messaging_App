import React, { Fragment, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contexts/ContactProvider";
import { useConversation } from "../contexts/ConversationProvider";

export default function NewConversationModal({ closeModal }) {
  const contactsCtx = useContacts();

  const conversationsCtx = useConversation();

  const [selectedContactsId, setSelectedContactsId] = useState([]);

  const handleCheckBoxChange = (contactId) => {
    setSelectedContactsId((prevSelectedContactId) => {
      if (prevSelectedContactId.includes(contactId)) {
        return prevSelectedContactId.filter((prevId) => contactId !== prevId);
      } else {
        return [...prevSelectedContactId, contactId];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    conversationsCtx.createConversation(selectedContactsId);

    closeModal();
  };

  return (
    <Fragment>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contactsCtx.contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                value={selectedContactsId.includes(contact.id)}
                type="checkbox"
                label={contact.name}
                onChange={() => handleCheckBoxChange(contact.id)}
              />
            </Form.Group>
          ))}

          <Button style={{ marginTop: "1rem" }} type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </Fragment>
  );
}
