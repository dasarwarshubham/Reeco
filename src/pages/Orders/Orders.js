import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Container from "react-bootstrap/Container";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from "react-router-dom";
import { ORDERS } from "../../constants/routes";
import { Col, Row, Card, Badge } from "react-bootstrap";

// import required redux actions
import { retrieveOrders } from "../../redux/orders/orderActions";

// import required redux selectors
import { selectLoadingStatus, selectAllOrders, selectError } from "../../redux/orders/orderSelectors";
import Loader from "../../components/Loader";

const OrderCard = styled(Card)`
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  border: 3px solid transparent;
  background-color: #ffffff;
  color: #111111;
  height: 100%;
  padding: 1rem;
  transition: 0.25s all ease-in-out;
  &:hover{
    border: 3px solid #1e633f;
  }
  a{
    text-decoration: none;
  }
`;

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const loading = useSelector(selectLoadingStatus);
  const error = useSelector(selectError);
  
  useEffect(() => {
    dispatch(retrieveOrders());
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "88vh" }}
      >
        <h4>{error}</h4>
      </div>
    );
  }

  return (
    <>
      <Container fluid className="bg-white shadow">
        <Container>
          <Breadcrumb className="py-3">
            <Breadcrumb.Item active><Link to={ORDERS}>Orders</Link></Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </Container>
      <Container className="my-5 px-3 px-md-5">
        <Row className="my-5">
          {orders.map((order, index) => (
            <Col xs={12} sm={6} lg={4} key={index} className="mb-4">
              <OrderCard>
                <Link to={`${ORDERS}/${order?.id}`}>
                  <OrderCard.Body>
                    <OrderCard.Title>Order Id: {order?.id}</OrderCard.Title>
                    <OrderCard.Text>Total: {order?.order_total}</OrderCard.Text>
                    <OrderCard.Text>Shipping Date: {order?.shipping_date}</OrderCard.Text>
                    <OrderCard.Text>
                      Order Status: &nbsp;
                      {order?.order_status ? 
                      <Badge bg="success">Approved</Badge> : 
                      <Badge bg="danger">Awaiting your approval</Badge>}
                      </OrderCard.Text>
                  </OrderCard.Body>
                </Link>
              </OrderCard>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Orders;
