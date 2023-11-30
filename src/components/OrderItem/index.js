import React from "react";
import { Col, Button, Image, Badge } from "react-bootstrap";

import { Row, Title, Brand } from "./styles/order_item";

const StatusBadge = ({ status }) => {
	if (status === "Approved") {
		return <Badge pill bg="success" className="px-4 py-3">{status}</Badge>
	} else if (status === "Missing") {
		return <Badge pill bg="warning" className="px-4 py-3">{status}</Badge>
	} else if (status === "Missing - Urgent") {
		return <Badge pill bg="danger" className="px-4 py-3">{status}</Badge>
	} else if (status === "Price Updated") {
		return <Badge pill bg="success" className="px-4 py-3">{status}</Badge>
	} else if (status === "Quantity Updated") {
		return <Badge pill bg="success" className="px-4 py-3">{status}</Badge>
	} else if (status === "Quantity and Price Updated") {
		return <Badge pill bg="success" className="px-4 py-3">{status}</Badge>
	}
	return null;
}

const OrderItem = ({ item, handleShow, handleApprove }) => {
	return (
		<Row key={item.id} border="true">
			<Col xs={3} md={1} lg={1} className="py-3"><Image src={item.image} alt={item.alt} className="img-fluid w-100" /></Col>
			<Col xs={12} md={2} lg={3} className="py-1"><Title><span className="d-md-none fw-bold">Product: </span>{item.title}</Title></Col>
			<Col xs={12} md={1} lg={1} className="py-1"><Brand><span className="d-md-none fw-bold">Brand: </span>{item.brand}</Brand></Col>
			<Col xs={12} md={2} lg={2} className="py-1"><span className="d-md-none fw-bold">Price: </span>{item.price} / 6*1LB</Col>
			<Col xs={12} md={1} lg={1} className="py-1"><span className="d-md-none fw-bold">Quantity: </span>{item.quantity} x 6*1LB</Col>
			<Col xs={12} md={2} lg={1} className="py-1"><span className="d-md-none fw-bold">Total: </span>{item.total}</Col>
			<Col xs={12} md={3} lg={3} className="py-3 bg-light">
				<Row>
					<Col xs={12} xl={6} className="d-flex justify-content-center justify-content-xl-start align-items-center">
						{item.status && <StatusBadge status={item.status} />}
					</Col>
					<Col xs={12} xl={6} className="d-flex justify-content-center justify-content-xl-end align-items-center">
						<Button
							variant="transparent"
							onClick={() => handleApprove(item.id)}
						>
							<span className={item.status === "Approved" ? "text-success fw-bold" : "text-muted"}>&#10003;</span>
						</Button>
						<Button
							variant="transparent"
							onClick={handleShow}
						>
							<span className={item.status === "Missing" || item.status === "Missing - Urgent" ? "text-danger fw-bold" : "text-muted"}>&#x2717;</span>
						</Button>
						<Button variant="transparent">Edit</Button>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default OrderItem;
