import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Col, Image, Row, Modal, Button, Form, CloseButton, InputGroup } from "react-bootstrap";

import { updateItem } from "../../redux/orders/orderSlice";
import status from "../../constants/status";

const OrderEditModal = ({ item, show, setShow }) => {
	const dispatch = useDispatch();

	const [price, setPrice] = useState(item?.price || 0);
	const [quantity, setQuantity] = useState(item?.quantity || 1);
	const [comment, setComment] = useState(item?.comment || null);

	const incrementQuantity = () => {
		setQuantity((prevQuantity) => prevQuantity + 1);
	};

	const decrementQuantity = () => {
		setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
	};

	useEffect(() => {
		setPrice(item?.price || 0);
		setQuantity(item?.quantity || 0)
		setComment(item?.comment || null)
	}, [item]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const newStatus =
			item.price !== price && item.quantity !== quantity
				? status.QUANTITY_PRICE_UPDATED.key
				: item.price !== price
					? status.PRICE_UPDATED.key
					: item.quantity !== quantity
						? status.QUANTITY_UPDATED.key
						: item.status;

		dispatch(updateItem({
			...item,
			price: price,
			quantity: quantity,
			total: price * quantity,
			status: newStatus,
			comment: comment
		}))

		setPrice(price);
		setQuantity(quantity);
		setShow(false);
	}

	return (
		<Modal
			size="lg"
			centered
			show={show}
			onHide={() => setShow(false)}
			contentClassName="px-3 py-4"
		>
			<Modal.Body className="position-relative p-3 p-md-5">
				<div className="position-absolute top-2 end-2">
					<CloseButton variant="white" onClick={() => setShow(false)} />
				</div>
				<h4 className="d-inline-block fs-5 text-truncate w-100">
					{item?.title}
				</h4>
				<p className="d-inline-block fs-6 text-muted text-truncate w-100">
					{item?.brand}
				</p>
				<Form onSubmit={handleSubmit}>
					<Row>
						<Col xs={12} md={4} lg={3}>
							<Image src={item?.image} alt={item?.alt} className="img-fluid w-100" />
						</Col>
						<Col xs={12} md={8} lg={9}>
							<Form.Group as={Row} className="mb-4 pb-3">
								<Form.Label column htmlFor="price" xs={12} sm={3}>Price ({item?.currency})</Form.Label>
								<Col xs={12} sm={9} md={8} lg={7} xl={6} className="d-flex justify-content-center align-items-center">
									<div className="d-flex justify-content-center align-items-center">
										<Form.Control
											id="price"
											name="price"
											type="number"
											min={0}
											step={0.01}
											placeholder="Enter your price"
											value={price}
											onChange={(event) => setPrice(event.target.value)}
											className="rounded-4 text-center"
											style={{ width: "80px" }}
										/>
									</div>
									<span className="ms-3 text-nowrap">/ 6 * 1LB</span>
								</Col>
							</Form.Group>
							<Form.Group as={Row} className="mb-4 pb-3">
								<Form.Label column htmlFor="quantity" xs={12} sm={3}>Quantity</Form.Label>
								<Col xs={12} sm={9} md={8} lg={7} xl={6} className="d-flex align-items-center">
									<InputGroup className="d-flex justify-content-center align-items-center">
										<Button variant="success" className="rounded-circle p-0 d-flex justify-content-center align-items-center" style={{ width: "25px", height: "25px" }} onClick={decrementQuantity}>
											-
										</Button>
										<div>
											<Form.Control
												id="quantity"
												name="quantity"
												type="number"
												min={0}
												placeholder="Enter your quantity"
												value={quantity}
												onChange={(event) => setQuantity(event.target.value)}
												className="mx-3 rounded-4 text-center"
												style={{ width: "80px" }}
											/>
										</div>
										<Button variant="success" className="rounded-circle p-0 d-flex justify-content-center align-items-center" style={{ width: "25px", height: "25px" }} onClick={incrementQuantity}>
											+
										</Button>
										<span className="ms-3 text-nowrap"> x 6 * 1LB</span>
									</InputGroup>
								</Col>
							</Form.Group>
							<Form.Group as={Row} className="mb-4 pb-3">
								<Form.Label column htmlFor="total" xs={12} sm={3}>Total</Form.Label>
								<Col xs={12} sm={9} md={8} lg={7} xl={6} className="d-flex justify-content-center align-items-center">
									<div className="me-5 pe-5">
										<span
											id="total"
											className="form-control border-0 rounded-4 text-center"
										>{item?.currency}{(quantity * price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
									</div>
								</Col>
							</Form.Group>
						</Col>
						<Col xs={12}>
							<p className="h6 mb-3">Choose Reason <span className="text-muted">(optional)</span></p>
							<Form.Check
								inline
								name="comment"
								className="mb-3 ms-0 ps-0 me-3"
							>
								<Form.Check.Input id={`inline-comment-1`} type="radio" className="d-none" />
								<Form.Check.Label>
									<div
										className={`border border-3 ${comment === 'Missing Product' && "border-primary"} rounded-pill px-4 py-2`}
										onClick={() => setComment('Missing Product')}
									>Missing Product</div>
								</Form.Check.Label>
							</Form.Check>
							<Form.Check
								inline
								name="comment"
								className="mb-3 ms-0 ps-0 me-3"
							>
								<Form.Check.Input id={`inline-comment-2`} type="radio" className="d-none" />
								<Form.Check.Label>
									<div
										className={`border border-3 ${comment === 'Quantity is not the same' && "border-primary"} rounded-pill px-4 py-2`}
										onClick={() => setComment('Quantity is not the same')}
									>Quantity is not the same</div>
								</Form.Check.Label>
							</Form.Check>
							<Form.Check
								inline
								name="comment"
								className="mb-3 ms-0 ps-0 me-3"
							>
								<Form.Check.Input id={`inline-comment-3`} type="radio" className="d-none" />
								<Form.Check.Label>
									<div
										className={`border border-3 ${comment === 'Price is not the same' && "border-primary"} rounded-pill px-4 py-2`}
										onClick={() => setComment('Price is not the same')}
									>Price is not the same</div>
								</Form.Check.Label>
							</Form.Check>
							<Form.Check
								inline
								name="comment"
								className="mb-3 ms-0 ps-0"
							>
								<Form.Check.Input id={`inline-comment-4`} type="radio" className="d-none" />
								<Form.Check.Label>
									<div
										className={`border border-3 ${comment === 'Other' && "border-primary"} rounded-pill px-4 py-2`}
										onClick={() => setComment('Other')}
									>Other</div>
								</Form.Check.Label>
							</Form.Check>
						</Col>
						<Col xs={12}>
							<div className="d-flex justify-content-center justify-content-md-end mt-4">
								<Button variant="transparent" onClick={() => setShow(false)} className="rounded-pill px-5 fw-bold text-success me-2">
									Cancel
								</Button>
								<Button type="submit" variant="primary" className="rounded-pill px-5 fw-bold">
									Send
								</Button>
							</div>
						</Col>
					</Row>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default memo(OrderEditModal);
