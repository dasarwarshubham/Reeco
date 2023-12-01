import React from "react";
import { Col, Button, Image, Badge } from "react-bootstrap";

import { Row } from "./styles/order_item";

import status from "../../constants/status";

const StatusBadge = ({ currentStatus }) => {
	if (currentStatus === status.APPROVED.key) {
		return <Badge pill bg="success" className="px-4 py-3">{status.APPROVED.value}</Badge>
	} else if (currentStatus === status.MISSING.key) {
		return <Badge pill bg="warning" className="px-4 py-3">{status.MISSING.value}</Badge>
	} else if (currentStatus === status.MISSING_URGENT.key) {
		return <Badge pill bg="danger" className="px-4 py-3">{status.MISSING_URGENT.value}</Badge>
	} else if (currentStatus === status.PRICE_UPDATED.key) {
		return <Badge pill bg="success" className="px-4 py-3">{status.PRICE_UPDATED.value}</Badge>
	} else if (currentStatus === status.QUANTITY_UPDATED.key) {
		return <Badge pill bg="success" className="px-4 py-3">{status.QUANTITY_UPDATED.value}</Badge>
	} else if (currentStatus === status.QUANTITY_PRICE_UPDATED.key) {
		return <Badge pill bg="success" className="px-4 py-3 text-wrap">{status.QUANTITY_PRICE_UPDATED.value}</Badge>
	} else if (currentStatus === status.COMMENT_UPDATED.key) {
		return <Badge pill bg="info" className="px-4 py-3 text-wrap">{status.COMMENT_UPDATED.value}</Badge>
	}
	return null;
}
const OrderItem = ({ item, handleCancel, handleApprove, handleEdit }) => {
	const getCheckClass = () => {
		if (item.status === status.APPROVED.key ||
			item.status === status.PRICE_UPDATED.key ||
			item.status === status.QUANTITY_UPDATED.key ||
			item.status === status.QUANTITY_PRICE_UPDATED.key
		) {
			return "text-success fw-bold";
		} else {
			return "text-muted";
		}
	}
	const getCrossClass = () => {
		if (item.status === status.MISSING.key || item.status === status.MISSING_URGENT.key) {
			return "text-danger fw-bold";
		} else {
			return "text-muted";
		}
	}

	return (
		<tr>
			<td><Image src={item.image} alt={item.alt} style={{ height: "70px", width: "70px", objectFit: "contain" }} /></td>
			<td>{item.title}</td>
			<td>{item.brand}</td>
			<td>{item.currency}{item.price} / 6*1LB</td>
			<td><span className="fw-bold">{item.quantity}</span>&nbsp;x 6*1LB</td>
			<td>{item.currency}<span>{parseFloat(item.total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></td>
			<td colSpan={4} className="table-active">
				<Row className="w-100 gy-2">
					<Col xs={12} xl={6} className="d-flex justify-content-center justify-content-xl-start align-items-center">
						{item.status && <div><StatusBadge currentStatus={item.status} /></div>}
					</Col>
					<Col xs={12} xl={6} className="d-flex justify-content-center justify-content-xl-end align-items-center">
						<Button
							variant="transparent"
							onClick={() => handleApprove(item)}
						>
							<span className={item.status && getCheckClass()}>&#10003;</span>
						</Button>
						<Button
							variant="transparent"
							onClick={handleCancel}
						>
							<span className={item.status && getCrossClass()}>&#x2717;</span>
						</Button>
						<Button variant="transparent" onClick={handleEdit}>Edit</Button>
					</Col>
				</Row>
			</td>
		</tr>
	);
};

export default OrderItem;
