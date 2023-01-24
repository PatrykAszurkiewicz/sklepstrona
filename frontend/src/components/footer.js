import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Container bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Połącz się z nami</span>
        </div>
      </section>

      <section className="">
        <Container className="text-center text-md-start mt-5">
          <Row className="mt-3">
            <Col md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h4 className="text-uppercase fw-bold mb-4">ITshop</h4>
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident.
              </p>
            </Col>
            <Col md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Moje konto</h6>
              <p>
                <Link to="/cart" className="text-reset">
                  Koszyk
                </Link>
              </p>
              <p>
                <Link to="/orders" className="text-reset">
                  Zamówienia
                </Link>
              </p>
            </Col>

            <Col md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Przydatne linki</h6>
              <p>
                <Link to="/regulamin" className="text-reset">
                  Regulamin
                </Link>
              </p>
              <p>
                <Link to="/contact" className="text-reset">
                  Kontakt
                </Link>
              </p>
            </Col>

            <Col md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Kontakt</h6>
              <p>Konstantego Ciołkowskiego 1, 15-245 Białystok</p>
              <p>csgorandomly@gmail.com</p>
            </Col>
          </Row>
        </Container>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2023 Copyright
      </div>
    </Container>
  );
}
