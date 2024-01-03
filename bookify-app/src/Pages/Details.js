import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../Context/Firebase";
import { Button, Container, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const BookDetailsPage = () => {
  const params = useParams();
  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  const [qty, setQty] = useState();

  const [qtyErr, setQtyErr] = useState(false);

  console.log("PARAMS:=> ", params);
  const firebase = useFirebase();

  useEffect(() => {
    firebase
      .getBooksById(params.bookId)
      .then((result) => setData(result.data()));
  }, [firebase, params.bookId]);

  useEffect(() => {
    if (data) {
      const imgeUrl = data.imageURL;
      firebase.getImageURL(imgeUrl).then((url) => setURL(url));
    }
  }, [firebase, data]);

  const placeOrder = async () => {
    var qtyPattern = /^[0-9]*$/;
    if (qty === "" || qtyPattern.test(qty) === false) {
      setQtyErr(true);
      alert("Quantity is required! ⚠️");
      return;
    }
    const result = await firebase.placeOrder(params.bookId, qty);
    alert("Order placed! ✅");
    console.log("ORDER:=> ", result);

    if (qty !== "" || qtyPattern.test(qty) === true) {
      setQtyErr(false);
      return;
    }
  };

  if (data === null) {
    return <h1 className="text-center">Loading...</h1>;
  }

  return (
    <Container className="my-5 p-3">
      <Row className="">
        <Col>
          <div className="d-lg-flex ">
            <div className="">
              <img src={url} alt="" height={500} fluid />
            </div>
            <Container>
              <Row>
                <div className="p-2">
                  <h2 className="text-primary my-3">{data.bookName}</h2>
                  <p>
                    <strong className="text-info">ISBN: </strong>
                    <small className="text-danger">{data.bookISBN}</small>
                  </p>
                  <h4 className="my-5">
                    <strong className="text-success">Author: </strong>
                    <span className="text-danger">{data.bookAuthor}</span>
                  </h4>
                  <h3 className="my-3">
                    <strong className="text-success">Price: </strong>
                    {data.bookPrice}
                  </h3>

                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>

                  <Container>
                    <Row>
                      <InputGroup className="mb-1">
                        <InputGroup.Text
                          id="basic-addon3"
                          className="bg-secondary text-light"
                        >
                          Quantity
                        </InputGroup.Text>
                        <Form.Control
                          type="number"
                          id="quantity"
                          className="qtyBox text-center relative"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                          aria-describedby="basic-addon3"
                        />
                      </InputGroup>
                      <p className="">
                        {qtyErr ? (
                          <span className="text-danger qty-absolute">
                            Required
                          </span>
                        ) : (
                          ""
                        )}
                      </p>
                    </Row>
                  </Container>

                  <Container>
                    <Row>
                      <div className="d-lg-flex justify-content-around">
                        <Button variant="warning" className="">
                          Add To Cart
                        </Button>
                        <Button
                          variant="danger"
                          className=""
                          onClick={placeOrder}
                        >
                          Buy Now
                        </Button>
                      </div>
                    </Row>
                  </Container>
                </div>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BookDetailsPage;
