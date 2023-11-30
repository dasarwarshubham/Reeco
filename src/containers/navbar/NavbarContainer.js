import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from '../../constants/routes';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import CartButton from "./CartButton";

function NavbarContainer() {
	const [show, setShow] = useState(false);
	const [showDropdownBtn, setShowDropdownBtn] = useState(false);

	const handleToggle = () => setShow(!show);
	const handleClose = () => show && setShow(false);

	const showDropdown = () => setShowDropdownBtn(!showDropdownBtn);
	const hideDropdown = () => setShowDropdownBtn(false);

	return (
		<>
			<Navbar
				key={false}
				bg="primary"
				variant="dark"
				expand={false}
				className="py-0"
			>
				<Container fluid="md" className="d-flex justify-content-between w-100 py-0">
					<div className="d-flex">
						<Navbar.Brand className="text-light pe-5 py-3" as={Link} to={ROUTES.HOME} onClick={handleClose}>REECO</Navbar.Brand>
						<div className="d-none d-md-flex">
							<Nav.Link
								className="text-light px-5 py-3 d-flex align-items-center"
								onClick={handleClose}
								as={Link}
								to={ROUTES.STORE}
							>
								Store
							</Nav.Link>
							<Nav.Link
								className="text-light px-5 py-3 d-flex align-items-center"
								onClick={handleClose}
								as={Link}
								to={ROUTES.ORDERS}
							>
								Orders
							</Nav.Link>
							<Nav.Link
								className="text-light px-5 py-3 d-flex align-items-center"
								onClick={handleClose}
								as={Link}
								to={ROUTES.ANAYLTICS}
							>
								Analytics
							</Nav.Link>
						</div>
					</div>
					<div>
						<Navbar.Toggle onClick={handleToggle} className="d-block d-md-none" />
						<div className="d-none d-md-flex">
							<Nav.Link
								className="me-5"
								onClick={handleClose}
								as={Link}
								to={ROUTES.CART}
							>
								<CartButton />
							</Nav.Link>
							<NavDropdown
								className="ms-5"
								title="Hello, James"
								show={showDropdownBtn}
								onMouseEnter={showDropdown}
								onMouseLeave={hideDropdown}
								id={`offcanvasNavbarDropdown-expand-md`}
							>
								<NavDropdown.Item as={Link} to={ROUTES.PROFILE}>Profile</NavDropdown.Item>
								<NavDropdown.Item as={Link} to={ROUTES.SETTINGS}>
									Settings
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item>
									Logout
								</NavDropdown.Item>
							</NavDropdown>
						</div>
					</div>

				</Container>
			</Navbar>
			<Offcanvas show={show} onHide={handleToggle}>
				<Offcanvas.Header className="ps-5" closeButton>
					<Offcanvas.Title className="text-light fs-3">Hello, James</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body className="d-flex justify-content-center">
					<Nav className="d-flex flex-column justify-content-start align-items-center text-light">
						<Nav.Link onClick={handleClose} as={Link} to={ROUTES.CART}>
							<span className="d-inline-flex">Cart&nbsp;<CartButton /></span>
						</Nav.Link>
						<Nav.Link onClick={handleClose} as={Link} to={ROUTES.STORE}>Store</Nav.Link>
						<Nav.Link onClick={handleClose} as={Link} to={ROUTES.ORDERS}>Orders</Nav.Link>
						<Nav.Link onClick={handleClose} as={Link} to={ROUTES.ANAYLTICS}>Analytics</Nav.Link>
						<Nav.Link onClick={handleClose} as={Link} to={ROUTES.PROFILE}>Profile</Nav.Link>
						<Nav.Link onClick={handleClose} as={Link} to={ROUTES.SETTINGS}>Settings</Nav.Link>
						<Nav.Link onClick={handleClose}>Logout</Nav.Link>
					</Nav>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}

export default NavbarContainer;