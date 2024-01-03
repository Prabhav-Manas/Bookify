import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../Context/Firebase";
import Table from "react-bootstrap/Table";
import { Col, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const params = useParams();
  console.log(params);

  const firebase = useFirebase();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs));
  }, [firebase, params.bookId]);

  return (
    <div className="text-center text-danger">
      <Container>
        <Row>
          <Col md={8} className="">
            <h2>Cart Components</h2>
            <Table striped responsive bordered hover>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((orders, i) => {
                  const data = orders.data();
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{data.imageURL}</td>
                      <td>{data.bookName}</td>
                      <td>{data.qty}</td>
                      <td>{data.bookPrice}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-danger"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col md={4}>
            <h3>Calculator</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
