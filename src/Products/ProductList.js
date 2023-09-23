import React from "react";
import { Container, Row } from "react-bootstrap";
import productsArr from "./data";

import Product from "./Product";

const ProductList = (props) => {
  const ProductItems = productsArr.map((product) => (
    <Product
      key={product.title}
      title={product.title}
      price={product.price}
      image={product.imageUrl}
    />
  ));

  return (
    <Container style={{ margin: 20 }}>
      <Row xs={1} lg={2} className="g-4">
        {ProductItems}
      </Row>
    </Container>
  );
};

export default ProductList;
