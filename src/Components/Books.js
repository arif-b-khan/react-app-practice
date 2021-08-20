import React from "react";
import useFetch from "../Services/useFetch";
import { useRouteMatch, useHistory } from "react-router-dom";
import CustomSpinner from "../Shared/CustomSpinner";
import { Button, Card, Col, Row } from "react-bootstrap";


export default function Books() {
  const { data, error, isLoading } = useFetch("books");
  const books = data;
  const { path, url } = useRouteMatch();
  const history = useHistory();
  console.log(`Path: ${path}, Url: ${url}`);
  if (error) throw error;

  if (isLoading) {
    return <CustomSpinner />;
  }

  const bookList = books && books.map((c) => {
    return (
      <a href={`books/${c.id}`}>
        <Col>
          <Card key={c.id}>
            <Card.Img
              variant="top"
              src="http://localhost:3001/static/images/1.jpeg"
            ></Card.Img>
            <Card.Body>
              <Card.Title>{c.title}</Card.Title>
              <Card.Text>{c.description && c.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </a>
    );
  });

  return (
    <div>
      <div style={{"textAlign":"right"}}>
      <Button variant="primary" className="Add-Button" onClick={() => history.push("/books/add/0")}>Add Book</Button>
      </div>
      <Row xs={1} md={6} className="g-4">
        {bookList}
      </Row>
    </div>
  );
}
