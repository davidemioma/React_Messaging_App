import React, { Fragment, useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contexts/ContactProvider";

export default function NewContactModal({ closeModal }) {
  const idRef = useRef();

  const nameRef = useRef();

  const contactCtx = useContacts();

  const handleSubmit = (e) => {
    e.preventDefault();

    contactCtx.createContact(idRef.current.value, nameRef.current.value);

    closeModal();
  };

  return (
    <Fragment>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>

          <Button style={{ marginTop: "1rem" }} type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </Fragment>
  );
}
