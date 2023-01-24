import React, { useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAddCategoryMutation } from "../services/appApi";
import axios from "../axios";
import "./NewProduct.css";

function NewCategory() {
  const [name, setName] = useState("");
  // const [image, setImage] = useState({});
  // const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [createCategory, { isError, error, isLoading, isSuccess }] =
    useAddCategoryMutation();

  // function handleRemoveImg(imgObj) {
  //   setImgToRemove(imgObj.public_id);
  //   axios
  //     .delete(`/images/${imgObj.public_id}/`)
  //     .then((res) => {
  //       setImgToRemove(null);
  //       setImage({});
  //     })
  //     .catch((e) => console.log(e));
  // }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      return alert("Proszę o wypełnienie wszystkich pól");
    }
    createCategory({ name }).then(({ data }) => {
      if (data.length > 0) {
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    });
  }

  // function showWidget() {
  //   const widget = window.cloudinary.createUploadWidget(
  //     {
  //       cloudName: "dchhtlabo",
  //       uploadPreset: "gk7dcv0k",
  //     },
  //     (error, result) => {
  //       if (!error && result.event === "success") {
  //         setImage({
  //           url: result.info.url,
  //           public_id: result.info.public_id,
  //         });
  //       }
  //     }
  //   );
  //   widget.open();
  // }

  return (
    <Container>
      <Row>
        <Col md={6} className="new-product__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1 className="mt-4">Stwórz kategorię</h1>
            {isSuccess && (
              <Alert variant="success">Kategoria utworzona pomyślnie</Alert>
            )}
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Nazwa kategorii</Form.Label>
              <Form.Control
                type="text"
                placeholder="Wpisz nazwę kategorii"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Button type="button" onClick={showWidget}>
                Prześlij zdjęcie
              </Button>
              <div className="images-preview-container">
                <div className="image-preview">
                  {image.url && <img src={image.url} />}
                  {imgToRemove != image.public_id && (
                    <i
                      className="fa fa-times-circle"
                      onClick={() => handleRemoveImg(image)}
                    ></i>
                  )}
                </div>
              </div>
            </Form.Group> */}

            <Form.Group>
              <Button type="submit" disabled={isLoading || isSuccess}>
                Stwórz kategorię
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="new-product__image--container"></Col>
      </Row>
    </Container>
  );
}

export default NewCategory;
