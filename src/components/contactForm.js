import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

const ContactForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(111, data);
    axios.post("http://localhost:8000/api/contact", data).then((response) => {
      console.log(222, response);
      if (response.status == 200) {
        reset();
        setSuccessMessage("Contact Save SuccessFully");
      }
    });
  };

  return (
    <Container>
      {successMessage && <p>{successMessage}</p>}
      <Row className="justify-content-center">
        <Col md="6">
          <Card className="mt-5">
            <Card.Body>
              <Card.Title>Contact Form</Card.Title>
              <Form data-testid="form" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-4">
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    name="firstName"
                    {...register("firstName", {
                      required: true,
                      maxLength: 25,
                    })}
                    data-testid="firstName"
                  />
                  <small className="text-danger">
                    {errors.firstName &&
                      errors.firstName.type === "required" && (
                        <span>This is required</span>
                      )}
                    {errors.firstName &&
                      errors.firstName.type === "maxLength" && (
                        <span>25 Max length exceeded</span>
                      )}
                  </small>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Last Name *</Form.Label>
                  <Form.Control
                    name="lastName"
                    {...register("lastName", { required: true, maxLength: 25 })}
                    data-testid="lastName"
                  />
                  <small className="text-danger">
                    {errors.lastName && errors.lastName.type === "required" && (
                      <span>This is required</span>
                    )}
                    {errors.lastName &&
                      errors.lastName.type === "maxLength" && (
                        <span>25 Max length exceeded</span>
                      )}
                  </small>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address",
                      },
                      maxLength: 50,
                    })}
                    data-testid="email"
                  />
                  <small className="text-danger">
                    {errors.email && errors.email.type === "required" && (
                      <span>This is required</span>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <span>Email needs to be in valid format</span>
                    )}
                  </small>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Message *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="message"
                    {...register("message", { required: true, maxLength: 500 })}
                    data-testid="message"
                  />
                  <small className="text-danger">
                    {errors.message && errors.message.type === "required" && (
                      <span>This is required</span>
                    )}
                    {errors.message && errors.message.type === "maxLength" && (
                      <span>500 Max length exceeded</span>
                    )}
                  </small>
                </Form.Group>
                <Button type="submit" className="btn-primary mt-3">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default ContactForm;
