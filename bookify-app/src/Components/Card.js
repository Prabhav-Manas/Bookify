import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../Context/Firebase";
import { useNavigate } from "react-router-dom";

const BookCard = (props) => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [url, setUrl] = useState(null);

  useEffect(() => {
    firebase.getImageURL(props.imageURL).then((url) => setUrl(url));
  }, [firebase, props.imageURL]);

  console.log("PROPS:=> ", props);

  return (
    <Card className="mx-2" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={url} height={300} />
      <Card.Body className="text-left">
        <Card.Title className="">{props.bookName}</Card.Title>
        <Card.Text className="">
          {props.bookName} is a great & worthfull to read.
        </Card.Text>
        <div className="d-flex justify-content-between">
          <p>
            <strong className="text-primary">Price: </strong>
            {props.bookPrice}
          </p>
          <p>
            <strong className="text-success">Author: </strong>
            {props.bookAuthor}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <Button
            variant="primary"
            className=""
            onClick={(e) => navigate(props.link)}
          >
            View
          </Button>
          <Button variant="danger" className="">
            Add To Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
