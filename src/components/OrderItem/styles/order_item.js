import styled, { css } from "styled-components";
import { Row as BsRow } from "react-bootstrap";

export const Row = styled(BsRow)`
  margin: 0;
  ${props => props.border && css`
    &:not(:last-child) {
      border-bottom: 3px solid #dee2e6 !important;
    }
  `}
`;

export const Title = styled.span`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  @media screen and (max-width: 1200px) {
    -webkit-line-clamp: 2;
  }
`;

export const Brand = styled.span`
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  @media screen and (max-width: 1200px) {
    -webkit-line-clamp: 2;
  }
`;
