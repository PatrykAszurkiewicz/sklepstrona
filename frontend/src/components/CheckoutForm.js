import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [createOrder, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [paying, setPaying] = useState(false);

  async function handlePay(e) {
    e.preventDefault();
    if (!stripe || !elements || user.cart.count <= 0) return;
    setPaying(true);
    const { client_secret } = await fetch(
      "https://itshop-sklep.herokuapp.com/create-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `^Bearer ${process.env.REACT_APP_CLIENT_SECRET}:^`,
        },
        body: JSON.stringify({ amount: user.cart.total.toFixed(2) * 100 }),
      }
    ).then((res) => res.json());
    const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    setPaying(false);

    if (paymentIntent) {
      createOrder({ userId: user._id, cart: user.cart, address, country }).then(
        (res) => {
          if (!isLoading && !isError) {
            setAlertMessage(`Payment ${paymentIntent.status}`);
            setTimeout(() => {
              navigate("/orders");
            }, 3000);
          }
        }
      );
    }
  }

  return (
    <Col className="cart-payment-container">
      <Form onSubmit={handlePay}>
        <Row>
          {alertMessage && <Alert>{alertMessage}</Alert>}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Imie</Form.Label>
              <Form.Control
                type="text"
                placeholder="Wpisz imie"
                value={user.name}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Podaj email"
                value={user.email}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={7}>
            <Form.Group className="mb-3">
              <Form.Label>Adres</Form.Label>
              <Form.Control
                type="text"
                placeholder="Wpisz adres"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group className="mb-3">
              <Form.Label>Kraj</Form.Label>
              <Form.Control
                type="text"
                placeholder="Wpisz nazwę swojego kraju"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <label htmlFor="card-element">Karta</label>
        <CardElement id="card-element" />
        <Button
          className="mt-3"
          type="submit"
          disabled={user.cart.count <= 0 || paying || isSuccess}
        >
          {paying ? "Przetwarzanie..." : "Zapłać"}
        </Button>
      </Form>
    </Col>
  );
}

export default CheckoutForm;
