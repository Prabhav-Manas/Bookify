import React, { useState } from "react";
import { Container, Form, Row } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useFirebase } from "../Context/Firebase";

const Listing = () => {
  const [bookName, setBookName] = useState("");
  const [bookISBN, setBookISBN] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookCoverPic, setBookCoverPic] = useState("");

  const [bookNameErr, setBookNameErr] = useState(false);
  const [bookISBNErr, setBookISBNErr] = useState(false);
  const [bookPriceErr, setBookPriceErr] = useState(false);
  const [bookAuthorErr, setBookAuthorErr] = useState(false);
  const [bookCoverPicErr, setBookCoverPicErr] = useState(false);

  const firebase = useFirebase();
  console.log("FIREBASE:=> ", firebase);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await firebase.handleCreateNewListing(
    //   bookName,
    //   bookISBN,
    //   bookPrice,
    //   bookAuthor,
    //   bookCoverPic
    // );
  };

  const submitBookDetails = async () => {
    // var bookNamePattern = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/;
    if (bookName === "") {
      setBookNameErr(true);
      return;
    }

    var bookISBNPattern = /^(?:\d{9}[\dXx])$/;
    if (bookISBN === "" || bookISBNPattern.test(bookISBN) === false) {
      setBookISBNErr(true);
      return;
    }

    var bookPricePattern = /^\d+(?:\.\d{1,2})?$/;
    if (bookPrice === "" || bookPricePattern.test(bookPrice)) {
      setBookPriceErr(true);
      return;
    }

    var bookAuthorPattern = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/;
    if (bookAuthor === "" || bookAuthorPattern.test(bookAuthor)) {
      setBookAuthorErr(true);
      return;
    }

    if (bookCoverPic === "") {
      setBookCoverPicErr(true);
      return;
    }

    if (
      !bookNameErr &&
      !bookISBNErr &&
      !bookPriceErr &&
      !bookAuthorErr &&
      !bookCoverPicErr
    ) {
      const formBookDetailsData = {
        bookName,
        bookISBN,
        bookPrice,
        bookAuthor,
        bookCoverPic,
      };

      await firebase.handleCreateNewListing(
        bookName,
        bookISBN,
        bookPrice,
        bookAuthor,
        bookCoverPic
      );

      console.log("Book Details ==> ", formBookDetailsData);
      alert("Submitted!");

      setBookName("");
      setBookISBN("");
      setBookPrice("");
      setBookAuthor("");
      setBookCoverPic("");
    }
  };

  // ================== Reset Error =================
  const bookNameHandler = () => {
    // var bookNamePattern = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/;
    if (bookName !== "") {
      setBookNameErr(false);
      return;
    }
  };

  const bookISBNHandler = () => {
    var bookISBNPattern = /^(?:\d{9}[\dXx])$/;
    if (bookISBN !== "" && bookISBNPattern.test(bookISBN)) {
      setBookISBNErr(false);
      return;
    }
  };

  const bookPriceHandler = () => {
    var bookPricePattern = /^\d+(?:\.\d{1,2})?$/;
    if (bookPrice !== "" && bookPricePattern.test(bookPrice)) {
      setBookPriceErr(false);
      return;
    }
  };

  const bookAuthorHandler = () => {
    var bookAuthorPattern = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/;
    if (bookAuthor !== "" && bookAuthorPattern.test(bookAuthor)) {
      setBookAuthorErr(false);
      return;
    }
  };

  const bookCoverPicHandler = () => {
    if (bookCoverPic !== "") {
      setBookCoverPicErr(false);
      return;
    }
  };
  // ================== Reset Error =================
  return (
    <Container>
      <Row>
        <Col lg={6} className="m-auto shadow my-5 p-4">
          <h1 className="listFormHeader">Book Details</h1>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingInputName"
              label="Enter Book Name"
              className="mb-4"
            >
              <Form.Control
                type="text"
                placeholder="BookName"
                className="relative"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                onKeyUp={bookNameHandler}
              />
              <p className="text-danger absolute">
                {bookNameErr ? <span>Invalid Book Name</span> : ""}
              </p>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingISBN"
              label="ISBN"
              className="mb-4"
            >
              <Form.Control
                type="text"
                placeholder="BookISBN"
                className="relative"
                value={bookISBN}
                onChange={(e) => setBookISBN(e.target.value)}
                onKeyUp={bookISBNHandler}
              />
              <p className="text-danger absolute">
                {bookISBNErr ? <span>Invalid ISBN</span> : ""}
              </p>
            </FloatingLabel>

            <div className="d-flex justify-content-between">
              <Col md={6} className="w-25">
                <FloatingLabel
                  controlId="floatingPrice"
                  label="Enter Price"
                  className="mb-4"
                >
                  <Form.Control
                    type="text"
                    placeholder="BookPrice"
                    className="relative"
                    value={bookPrice}
                    onChange={(e) => setBookPrice(e.target.value)}
                    onKeyUp={bookPriceHandler}
                  />
                  <p className="text-danger absolute">
                    {bookPriceErr ? <span>Invalid Price</span> : ""}
                  </p>
                </FloatingLabel>
              </Col>

              <Col md={6} className="w-50">
                <FloatingLabel
                  controlId="floatingAuthor"
                  label="Enter Author Name"
                  className="mb-4"
                >
                  <Form.Control
                    type="text"
                    placeholder="BookAuthor"
                    className="relative"
                    value={bookAuthor}
                    onChange={(e) => setBookAuthor(e.target.value)}
                    onKeyUp={bookAuthorHandler}
                  />
                  <p className="text-danger absolute">
                    {bookAuthorErr ? <span>Invalid Author Name</span> : ""}
                  </p>
                </FloatingLabel>
              </Col>
            </div>

            <FloatingLabel
              controlId="floatingCoverPic"
              label="Cover Picture"
              className="mb-4"
            >
              <Form.Control
                type="file"
                className="relative"
                onChange={(e) => setBookCoverPic(e.target.files[0])}
                onKeyUp={bookCoverPicHandler}
              />
              <p className="text-danger absolute">
                {bookCoverPicErr ? <span>Cover Picture required</span> : ""}
              </p>
            </FloatingLabel>

            <Button
              type="submit"
              className="d-flex submitBtn text-white"
              variant=""
              onClick={submitBookDetails}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default Listing;
