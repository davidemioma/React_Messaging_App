import React from "react";
import { ListGroup } from "react-bootstrap";
import { useContacts } from "../contexts/ContactProvider";

export default function Contacts() {
  const contactCtx = useContacts();

  return (
    <ListGroup variant="flush">
      {contactCtx.contacts.map((contact) => (
        <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}
