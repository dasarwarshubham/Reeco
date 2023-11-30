import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { ORDERS } from "../../constants/routes";
import {
  Button,
  Breadcrumb,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row
} from "react-bootstrap";

import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import { ReactComponent as PrintIcon } from "../../assets/print-icon.svg";

import Loader from "../../components/Loader";
import OrderItem from "../../components/OrderItem";
import OrderInfo from "../../containers/OrderInfo";

// import required redux selectors
import {
  selectOrderById,
  selectLoadingStatus,
  selectError,
} from "../../redux/orders/orderSelectors";

// import required redux actions
import { getOrderById } from "../../redux/orders/orderActions";
import { updateOrderItemStatus } from "../../redux/orders/orderSlice";

const Wrapper = styled.div`
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const SearchForm = () => {
  return (
    <Form className="d-flex">
      <InputGroup className="border border-3 rounded-pill">
        <Form.Control
          id="search"
          name="search"
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="search"
          className="border-0 rounded-pill"
        />
        <Button variant="transparent" className="px-4 rounded-pill">
          <SearchIcon style={{ fill: "#adb5bd"}} />
        </Button>
      </InputGroup>
    </Form>
  )
}

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const loading = useSelector(selectLoadingStatus);
  const orderDetails = useSelector(selectOrderById);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getOrderById(orderId));
    // eslint-disable-next-line
  }, [orderId]);

  const [show, setShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleApprove = (itemId) => {
    dispatch(updateOrderItemStatus({ status: "Approved", id: itemId }));
  }
  const handleClose = (newStatus) => {
    dispatch(updateOrderItemStatus({ status: newStatus, id: selectedRow?.id }))
    setShow(false);
  }
  const handleShow = (item) => {
    setSelectedRow(item);
    setShow(true);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "75vh" }}
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
            <Breadcrumb.Item linkAs="span">
              <Link to={ORDERS}>Orders</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active disabled>
              <Link to={`${ORDERS}/${orderId}`}>
                Order {orderId.toUpperCase()}
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Row className="pb-3">
            <Col xs={12} md={6}>
              <h4 className="fw-bold">Order {orderId.toUpperCase()}</h4>
            </Col>
            <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-end">
              <Button variant="outline-primary" className="fw-bold border-2 rounded-pill px-5 me-5"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              <Button variant="primary" className="fw-bold border-2 rounded-pill px-5 me-5">
                Approve Order
              </Button>
            </Col>
          </Row>
        </Container>
      </Container >
      <Container>
        <Container className="my-5 px-3 px-md-4 bg-white border border-2 rounded-4">
          <OrderInfo orderDetails={orderDetails} />
        </Container>
      </Container>
      <Container>
        <Container className="my-5 bg-white border border-2 rounded-4">
          <Row className="my-5 mx-3 mx-md-5 g-4">
            <Col xs={12} md={6} lg={4} className="px-0">
              <SearchForm />
            </Col>
            <Col xs={12} md={6} lg={8} className="d-flex justify-content-between justify-content-md-end">
              <Button variant="outline-primary" className="fw-bold border-2 rounded-pill px-5 me-5">
                Add item
              </Button>
              <Button variant="transparent">
                <PrintIcon />
              </Button>
            </Col>
          </Row>
          <Row className="d-none d-md-flex border border-3 rounded-bottom-0 rounded-4 mt-5 mx-3 mx-md-5">
            <Col xs={12} md={1} lg={1}></Col>
            <Col xs={12} md={2} lg={3} className="py-3"><span className="text-muted">Product Name</span></Col>
            <Col xs={12} md={1} lg={1} className="py-3"><span className="text-muted">Brand</span></Col>
            <Col xs={12} md={2} lg={2} className="py-3"><span className="text-muted">Price</span></Col>
            <Col xs={12} md={1} lg={1} className="py-3"><span className="text-muted">Quantity</span></Col>
            <Col xs={12} md={2} lg={1} className="py-3"><span className="text-muted">Total</span></Col>
            <Col xs={12} md={3} lg={3} className="py-3"><span className="text-muted">Status</span></Col>
          </Row>
          <Wrapper className="table-scroll-div mx-3 mx-md-5 mb-5">
            {orderDetails?.order_items?.map((item, index) => (
              <OrderItem
                item={item}
                key={index}
                handleShow={() => handleShow(item)}
                handleApprove={handleApprove}
              />
            ))}
          </Wrapper>
        </Container>
      </Container>
      <Modal
        centered
        show={show}
        onHide={() => setShow(false)}
        contentClassName="px-3 py-4"
      >
        <Modal.Header className="border-0" closeButton closeVariant="white">
          <Modal.Title>Missing Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>is, "<div className="text-truncate">{selectedRow?.title}</div>" urgent?</Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="transparent" onClick={() => handleClose("Missing")} className="fw-bold me-4">
            No
          </Button>
          <Button variant="transparent" onClick={() => handleClose("Missing - Urgent")} className="fw-bold">
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderDetails;
