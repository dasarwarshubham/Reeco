import React from "react";
import { ReactComponent as ShoppingCart } from "../../assets/shopping-cart-icon.svg";

import styled from "styled-components";

const CartContainer = styled.div`
  position: relative;

  .cartCount {
    background-color: #38b574;
    position: absolute;
    top: -0.25rem;
    right: -0.5rem;
    padding: 0.3rem;
    min-width: 1.75rem;
    min-height: 1.75rem;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
`;

const CartButton = () => {
  return (
    <>
      <CartContainer>
        <ShoppingCart
          className="cartIcon"
          style={{ color: "#ffffff" }}
          size={28}
        />
        <span className="badge cartCount">
          1
        </span>
        <span className="visually-hidden">number of items in cart</span>
      </CartContainer>
    </>
  );
};

export default CartButton;
