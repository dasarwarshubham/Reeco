import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { ReactComponent as SearchIcon } from "../assets/search-icon.svg";

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
					style={{ textIndent: "1rem" }}
				/>
				<Button variant="transparent" className="px-4 rounded-pill" aria-label="search">
					<SearchIcon style={{ fill: "#adb5bd" }} />
				</Button>
			</InputGroup>
		</Form>
	)
}

export default SearchForm;
