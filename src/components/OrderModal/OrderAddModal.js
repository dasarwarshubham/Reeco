import React from "react";
import { useDispatch } from "react-redux";

import { Button, Col, Image, ListGroup, Modal, Row } from "react-bootstrap";

import { addItem } from "../../redux/orders/orderSlice";

const items = [
	{ "id": 11, "title": "Extract - Almond", "image": "/images/apple_green_smith.png", "alt": "Veal Inside - Provimi", "brand": "Oloo", "currency": "$", "price": "85.70" },
	{ "id": 12, "title": "Table Cloth 90x90 Colour", "image": "/images/apple_green_smith.png", "alt": "Apple - Delicious, Golden", "brand": "Kwinu", "currency": "$", "price": "130.14" },
	{ "id": 13, "title": "Sugar - Crumb", "image": "/images/apple_green_smith.png", "alt": "Wine - Magnotta - Cab Sauv", "brand": "Rhycero", "currency": "$", "price": "186.00" },
	{ "id": 14, "title": "The Pop Shoppe - Grape", "image": "/images/apple_green_smith.png", "alt": "Bread Crumbs - Japanese Style", "brand": "Twimbo", "currency": "$", "price": "60.93" },
	{ "id": 15, "title": "Muffin - Mix - Strawberry Rhubarb", "image": "/images/apple_green_smith.png", "alt": "Pasta - Gnocchi, Potato", "brand": "Meemm", "currency": "$", "price": "178.59" },
	{ "id": 16, "title": "Wine - Sherry Dry Sack, William", "image": "/images/apple_green_smith.png", "alt": "Shrimp - Black Tiger 13/15", "brand": "Photobean", "currency": "$", "price": "46.71" },
	{ "id": 17, "title": "Calvados - Boulard", "image": "/images/apple_green_smith.png", "alt": "Flour - Cake", "brand": "Devcast", "currency": "$", "price": "41.20" },
	{ "id": 18, "title": "Paste - Black Olive", "image": "/images/apple_green_smith.png", "alt": "Water - Mineral, Natural", "brand": "Divape", "currency": "$", "price": "139.83" },
	{ "id": 19, "title": "Dc - Frozen Momji", "image": "/images/apple_green_smith.png", "alt": "Hersey Shakes", "brand": "Dazzlesphere", "currency": "$", "price": "144.54" },
	{ "id": 20, "title": "Calypso - Lemonade", "image": "/images/apple_green_smith.png", "alt": "Tomato Puree", "brand": "Rooxo", "currency": "$", "price": "61.23" },
	{ "id": 21, "title": "Tart Shells - Savory, 2", "image": "/images/apple_green_smith.png", "alt": "Brandy - Bar", "brand": "Divanoodle", "currency": "$", "price": "133.11" },
	{ "id": 22, "title": "Latex Rubber Gloves Size 9", "image": "/images/apple_green_smith.png", "alt": "Napkin - Dinner, White", "brand": "Oyoba", "currency": "$", "price": "193.73" },
	{ "id": 23, "title": "Fish - Artic Char, Cold Smoked", "image": "/images/apple_green_smith.png", "alt": "Blueberries", "brand": "Gigazoom", "currency": "$", "price": "39.02" },
	{ "id": 24, "title": "Longos - Penne With Pesto", "image": "/images/apple_green_smith.png", "alt": "Table Cloth 54x54 White", "brand": "Fivespan", "currency": "$", "price": "142.69" },
	{ "id": 25, "title": "Garlic Powder", "image": "/images/apple_green_smith.png", "alt": "Walkers Special Old Whiskey", "brand": "Plajo", "currency": "$", "price": "89.40" },
	{ "id": 26, "title": "Wasabi Powder", "image": "/images/apple_green_smith.png", "alt": "Sponge Cake Mix - Chocolate", "brand": "Twitterbeat", "currency": "$", "price": "50.20" },
	{ "id": 27, "title": "Table Cloth 144x90 White", "image": "/images/apple_green_smith.png", "alt": "Calypso - Strawberry Lemonade", "brand": "Browsedrive", "currency": "$", "price": "106.38" },
	{ "id": 28, "title": "Truffle - Peelings", "image": "/images/apple_green_smith.png", "alt": "Juice - Apple 284ml", "brand": "Pixoboo", "currency": "$", "price": "52.66" },
	{ "id": 29, "title": "Lettuce - Sea / Sea Asparagus", "image": "/images/apple_green_smith.png", "alt": "Napkin - Cocktail,beige 2 - Ply", "brand": "Flipstorm", "currency": "$", "price": "55.76" },
	{ "id": 30, "title": "Cheese - Cottage Cheese", "image": "/images/apple_green_smith.png", "alt": "Beans - Black Bean, Preserved", "brand": "Oyondu", "currency": "$", "price": "39.80" }
]

const OrderAddModal = ({ order_items, show, setShow }) => {
	const dispatch = useDispatch();
	const addableItems = items.filter((item) => !order_items?.some(el => el.id === item.id));
	const addProduct = (item) => {
		dispatch(addItem(item));
		setShow(false);
	}
	return (
		<Modal
			centered
			show={show}
			onHide={() => setShow(false)}
			contentClassName="px-3 py-4"
			scrollable
		>
			<Modal.Header className="border-0" closeButton closeVariant="white">
				<Modal.Title>Add Product</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ListGroup variant="flush">
					{addableItems.length > 0 ? addableItems.map((item, index) => (
						<ListGroup.Item key={index}>
							<Row>
								<Col className="px-0" xs={'auto'}><Image className="img-fluid rounded w-auto" style={{ height: "50px" }} src={item.image} alt={item.alt} /></Col>
								<Col className="d-flex align-items-center">{item.title}</Col>
								<Col className="d-flex align-items-center" xs={'auto'}>{item.price}</Col>
								<Col className="d-flex align-items-center px-0" xs={'auto'}>
									<Button
										variant="outline-success"
										style={{ height: "30px", width: "30px" }}
										className="d-flex align-items-center rounded-circle"
										onClick={() => addProduct(item)}
									>
										<span>&#x2b;</span>
									</Button>
								</Col>
							</Row>
						</ListGroup.Item>
					)) : (
						<p>No more items available</p>
					)}
				</ListGroup>
			</Modal.Body>
		</Modal>
	);
};

export default OrderAddModal;
