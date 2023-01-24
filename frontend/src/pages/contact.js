import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { contactConfig } from "./content_option";
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Contact() {
  const user = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      // Username: "csgorandomly@gmail.com",
      // Password: "fd7771fe-8ae1-452f-9e1c-ea49ab721d1a",
      // Host: "smtp.elasticemail.com",
      // Port: 2525,
      // SecureToken: "fd7771fe-8ae1-452f-9e1c-ea49ab721d1a",
      // SecureToken: "bb22a12f-bbb7-459b-b8ea-124b41b801f5",
      // To: "csgorandomly@gmail.com",
      From: email,
      Subject: "Wiadomość",
      Body: message,
    };
    if (window.Email) {
      window.Email.send(config).then(() => alert("email został wysłany!"));
      // .error((err) => alert(err));
    }
    console.log(email);
  };

  return (
    <Container>
      <Row className="mb-5 mt-3">
        <Col lg="8">
          <h1 className="display-4 mb-4">Skontaktuj się z nami</h1>
          <hr className="t_border my-4 ml-0 text-left" />
        </Col>
      </Row>
      <Row className="sec_sp">
        <Col lg="5" className="mb-5">
          <h3 className="color_sec py-4">Zapraszamy</h3>
          <address>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
              {contactConfig.YOUR_EMAIL}
            </a>
            <br />
            <br />
            {contactConfig.hasOwnProperty("YOUR_FONE") ? (
              <p>
                <strong>Phone:</strong> {contactConfig.YOUR_FONE}
              </p>
            ) : (
              ""
            )}
          </address>
          <p>{contactConfig.description}</p>
        </Col>
        {!user.isAdmin && (
          <Col lg="7" className="d-flex align-items-center">
            <form onSubmit={handleSubmit} className="contact__form w-100">
              <Row>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    type="text"
                    required
                  />
                </Col>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    required
                  />
                </Col>
              </Row>
              <textarea
                className="form-control rounded-0"
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                rows="5"
                required
              ></textarea>
              <br />
              <Row>
                <Col lg="12" className="form-group">
                  <button className="btn ac_btn" type="submit">
                    Wyślij
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        )}
      </Row>

      <Row>
        <MapContainer
          center={[53.10856631499629, 23.15429932640648]}
          zoom={16}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[53.10856631499629, 23.15429932640648]}>
            <Popup>Mapa.</Popup>
          </Marker>
        </MapContainer>
      </Row>
    </Container>
  );
}
