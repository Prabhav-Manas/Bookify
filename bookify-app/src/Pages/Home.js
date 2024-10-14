import React, { useEffect, useState } from "react";
import { useFirebase } from "../Context/Firebase";
import BookCard from "../Components/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardGroup from "react-bootstrap/CardGroup";

const Home = () => {
  const firebase = useFirebase();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, [firebase]);

  return (
    <Container className="mt-5">
      <Row className="p-3">
        <Col className="">
          <div className="d-flex justiy-content-between">
            <CardGroup>
              {books.map((book) => (
                <BookCard
                  link={`/book/view/${book.id}`}
                  key={book.id}
                  id={book.id}
                  {...book.data()}
                />
              ))}
            </CardGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
