import React from "react";

import { Container, Item, Content, CategoryGrid } from "./styles/order_info";

const OrderDetails = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>;
};

OrderDetails.Item = ({ children, ...restProps }) => {
    return <Item {...restProps}><Content>{children}</Content></Item>;
};

OrderDetails.Title = ({ children, ...restProps }) => {
    return <span className="fw-bold text-muted mb-2" {...restProps}>{children}</span>;
};

OrderDetails.Content = ({ children, ...restProps }) => {
    return <p className="fs-5 fw-bold" {...restProps}>{children}</p>;
};

OrderDetails.CategoryGrid = ({ children, ...restProps }) => {
    return <CategoryGrid {...restProps}>{children}</CategoryGrid>;
};

export default OrderDetails;
