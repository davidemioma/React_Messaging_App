import React, { useState, useCallback } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useConversation } from "../contexts/ConversationProvider";

export default function OpenConversations() {
  const conversationCtx = useConversation();

  const [text, setText] = useState("");

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const recipient = conversationCtx.selectedConversation.recipients.map(
      (r) => r.id
    );

    conversationCtx.sendMessage(recipient, text);

    setText("");
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {conversationCtx.selectedConversation.messages.map((message, i) => {
            const isLast =
              conversationCtx.selectedConversation.messages.length - 1 === i;

            return (
              <div
                ref={isLast ? setRef : null}
                key={i}
                className={`my-1 d-flex flex-column ${
                  message.fromMe
                    ? "align-self-end align-items-end"
                    : "align-items-start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.fromMe ? "bg-primary text-white" : "border"
                  }`}
                >
                  {message.text}
                </div>

                <div
                  className={`text-muted small ${
                    message.fromMe ? "text-right" : ""
                  }`}
                >
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-4">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <InputGroup>
              <Button style={{ marginTop: "1rem" }} type="submit">
                Send
              </Button>
            </InputGroup>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
