import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./About.module.css";

function Contact() {
  const submitHandler = (e) => {
    e.preventDefault();

    const contact = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      number: numberRef.current.value,
    };
    addContact(contact);
  };

  async function addContact(contact) {
    const response = await fetch(
      "https://ecommerce-a08fc-default-rtdb.firebaseio.com/contacts.json",
      {
        method: "POST",
        body: JSON.stringify(contact),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  const nameRef = useRef("");
  const emailRef = useRef("");
  const numberRef = useRef("");

  return (
    <>
          <div className={classes.title}>The Generics</div>

      <div
        style={{
          alignItems: "center",
          paddingLeft: "500px",
          paddingTop: "100px",
        }}
      >
        <h1>Contact Page</h1>
        <Form style={{ width: "40%", padding: 10 }} onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              ref={nameRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailRef}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control placeholder="Phone Number" ref={numberRef} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Contact;
