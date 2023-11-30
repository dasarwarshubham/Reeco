import React from "react"
import { ReactComponent as CategoryIcon } from "../assets/soup-cup-and-soup-icon.svg";

import OrderDetails from "../components/OrderInfo";

const OrderInfo = ({ orderDetails }) => {
    function convertDateFormat(dateString) {
        const dateParts = dateString.split('/');
        const day = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return day.toLocaleDateString('en-US', options);
    }
    return (
        <OrderDetails>
            <OrderDetails.Item>
                <OrderDetails.Title>Supplier</OrderDetails.Title>
                <OrderDetails.Content>{orderDetails?.supplier}</OrderDetails.Content>
            </OrderDetails.Item>
            <OrderDetails.Item>
                <OrderDetails.Title>Shipping date</OrderDetails.Title>
                <OrderDetails.Content>{orderDetails && convertDateFormat(orderDetails?.shipping_date)}</OrderDetails.Content>
            </OrderDetails.Item>
            <OrderDetails.Item>
                <OrderDetails.Title>Total</OrderDetails.Title>
                <OrderDetails.Content>{orderDetails?.order_total}</OrderDetails.Content>
            </OrderDetails.Item>
            <OrderDetails.Item>
                <OrderDetails.Title className="mb-2 fw-bold text-muted">Category</OrderDetails.Title>
                <OrderDetails.CategoryGrid>
                    {orderDetails?.category?.map((item,index) => (
                        <div key={index}>
                            <CategoryIcon />
                        </div>
                    ))}
                </OrderDetails.CategoryGrid>
            </OrderDetails.Item>
            <OrderDetails.Item>
                <OrderDetails.Title>Department</OrderDetails.Title>
                <OrderDetails.Content>{orderDetails?.department}</OrderDetails.Content>
            </OrderDetails.Item>
            <OrderDetails.Item>
                <OrderDetails.Title>Status</OrderDetails.Title>
                <OrderDetails.Content>
                    {orderDetails?.order_status ? "Approved" : "Awaiting your approval"}
                </OrderDetails.Content>
            </OrderDetails.Item>
        </OrderDetails>
    );
};

export default OrderInfo;
