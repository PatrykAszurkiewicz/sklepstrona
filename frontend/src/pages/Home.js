import axios from "../axios";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import categories from "../categories";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 8);
  useEffect(() => {
    axios.get("/products").then(({ data }) => console.log(data));
  }, []);
  return (
    <div>
      <img
        src="https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        width="1000"
        height="500"
        className="home-banner"
      />
      <div className="featured-products-container container mt-4">
        <h2>Ostatnie produkty</h2>
        {/* last products here */}
        <div className="d-flex justify-content-center flex-wrap">
          {lastProducts.map((product) => (
            <ProductPreview {...product} />
          ))}
        </div>
        <div>
          <Link
            to="/category/all"
            style={{
              textAlign: "right",
              display: "block",
              textDecoration: "none",
            }}
          >
            Zobacz więcej {">>"}
          </Link>
        </div>
      </div>
      {/* sale banner
      <div className="sale__banner--container mt-4">
        <img
          src="https://a.allegroimg.com/original/114743/be44bb61457fb2471ebc421dab6c/BANER-PROMOCJA-WYPRZEDAZ-z-napisem-PROJEKT-1x2m"
          alt="Promo banner"
        />
      </div> */}
      {/* <div className="recent-products-container container mt-4">
        <h2>Popular categories</h2>
        <Row>
          {categories.map((category) => (
            <LinkContainer
              to={`/category/${category.name.toLocaleLowerCase()}`}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                    gap: "10px",
                  }}
                  className="category-tile"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div> */}
    </div>
  );
}

export default Home;
