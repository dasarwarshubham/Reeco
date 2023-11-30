import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    @media screen and (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (max-width: 576px) {
        grid-template-columns: repeat(2, 1fr);
    }
    grid-template-rows: 1fr;
    grid-column-gap: 5px;
    grid-row-gap: 0.5rem;
    overflow: hidden;
`;

export const Item = styled.div`
    position: relative;
    &::after {
        content: "";
        position: absolute;
        height: 75%;
        background: #d2e0d9;
        top: 50%;
        transform: translateY(-50%);
    }
    &:not(:nth-child(1))::after { width: 2px; }
    @media screen and (max-width: 1024px) {
        &:nth-child(3n+1)::after { width: 0px;}
    }
    @media screen and (max-width: 576px) {
        &:nth-child(3n+1)::after { width: 2px;}
        &:nth-child(2n+1)::after { width: 0px;}
    }
`;

export const Content = styled.div`
    padding: 2rem;
    position: unset;
    display: block;
`;

export const CategoryGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0.5rem;
    /* justify-items: center; */
`;