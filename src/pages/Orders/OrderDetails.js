import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { ORDERS } from "../../constants/routes";
import {
  Button,
  Breadcrumb,
  Col,
  Container,
  Row
} from "react-bootstrap";

import { ReactComponent as PrintIcon } from "../../assets/print-icon.svg";

import OrderInfo from "../../containers/OrderInfo";
import Loader from "../../components/Loader";
import OrderItem from "../../components/OrderItem";
import OrderCancelModal from "../../components/OrderModal/OrderCancelModal";
import OrderAddModal from "../../components/OrderModal/OrderAddModal";
import OrderEditModal from "../../components/OrderModal/OrderEditModal";
import SearchForm from "../../components/SearchForm";
import OrderItemsTable from "../../components/OrderItemsTable";

// import required redux selectors
import {
  selectOrderById,
  selectLoadingStatus,
  selectError,
} from "../../redux/orders/orderSelectors";

// import required redux actions
import { getOrderById } from "../../redux/orders/orderActions";
import { updateItem } from "../../redux/orders/orderSlice";

import status from "../../constants/status";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const loading = useSelector(selectLoadingStatus);
  const orderDetails = useSelector(selectOrderById);
  const error = useSelector(selectError);

  const [showAdd, setShowAdd] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const showCancelModal = (item) => {
    setSelectedRow(item);
    setShowCancel(true);
  };
  const showEditModal = (item) => {
    setSelectedRow(item);
    setShowEdit(true);
  };

  const handleApprove = (item) => {
    dispatch(updateItem({ ...item, status: status.APPROVED.key }));
  }

  useEffect(() => {
    dispatch(getOrderById(orderId));
    // eslint-disable-next-line
  }, [orderId]);

  if (loading) {
    return <Loader />;
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
            <Col xs={12} md={6} lg={5} className="px-0">
              <SearchForm />
            </Col>
            <Col xs={12} md={6} lg={7} className="d-flex justify-content-between justify-content-md-end">
              <Button
                variant="outline-primary"
                className="fw-bold border-2 rounded-pill px-5 me-5"
                onClick={() => setShowAdd(true)}
              >
                Add item
              </Button>
              <Button variant="transparent" aria-label="print">
                <PrintIcon />
              </Button>
            </Col>
          </Row>
          <div className="mx-3 mx-md-5 mb-5">
            <OrderItemsTable responsive>
              <thead>
                <tr>
                  <th></th>
                  <th className="py-3 text-muted">Product Name</th>
                  <th className="py-3 text-muted">Brand</th>
                  <th className="py-3 text-muted">Price</th>
                  <th className="py-3 text-muted">Quantity</th>
                  <th className="py-3 text-muted">Total</th>
                  <th className="py-3 text-muted">Status</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails?.order_items?.map((item, index) => (
                  <OrderItem
                    item={item}
                    key={index}
                    handleApprove={() => handleApprove(item)}
                    handleCancel={() => showCancelModal(item)}
                    handleEdit={() => showEditModal(item)}
                  />
                ))}
              </tbody>
            </OrderItemsTable>
          </div>
        </Container>
      </Container>
      <OrderAddModal
        show={showAdd}
        setShow={setShowAdd}
        order_items={orderDetails?.order_items}
      />
      <OrderCancelModal
        item={selectedRow}
        show={showCancel}
        setShow={setShowCancel}
      />
      <OrderEditModal
        item={selectedRow}
        show={showEdit}
        setShow={setShowEdit}
      />
    </>
  );
};

export default OrderDetails;
