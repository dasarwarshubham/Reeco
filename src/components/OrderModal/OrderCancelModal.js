import React from "react";
import { useDispatch } from "react-redux";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { updateItem } from "../../redux/orders/orderSlice";

import status from "../../constants/status";

const OrderCancelModal = ({ item, show, setShow }) => {
	const dispatch = useDispatch();
	const handleClose = (newStatus) => {
		dispatch(updateItem({ ...item, status: newStatus, id: item?.id }));
		setShow(false);
	}
	return (
		<Modal
			centered
			show={show}
			onHide={() => setShow(false)}
			contentClassName="px-3 py-4"
		>
			<Modal.Header className="border-0" closeButton closeVariant="white">
				<Modal.Title>Missing Product</Modal.Title>
			</Modal.Header>
			<Modal.Body>is, "<div className="text-truncate">{item?.title}</div>" urgent?</Modal.Body>
			<Modal.Footer className="border-0">
				<Button variant="transparent" onClick={() => handleClose(status.MISSING.key)} className="fw-bold me-4">
					No
				</Button>
				<Button variant="transparent" onClick={() => handleClose(status.MISSING_URGENT.key)} className="fw-bold">
					Yes
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default OrderCancelModal;
