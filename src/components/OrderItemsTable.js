import styled from "styled-components";
import { Table as BsTable } from "react-bootstrap";

const Table = styled(BsTable)`
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;

  td{
    vertical-align: middle;
  }

  .table-active{
    min-width: 250px;
  }

  tbody tr td{
    padding: 1rem;
  }

  tbody tr:last-child, tbody tr:last-child td{
    border-bottom: 0px solid #dee2e6;    
  }
  tbody tr:not(:last-child) td{
    border-bottom: 2px solid #dee2e6;    
  }

  thead tr th{
    border-top: 2px solid #dee2e6;
    border-bottom: 2px solid #dee2e6;
    &:first-child{
      border-left: 2px solid #dee2e6;
    }
    &:last-child{
      border-right: 2px solid #dee2e6;
    }
  }

  thead tr:first-child th:first-child {
    border-top-left-radius: 10px;
  }

  thead tr:first-child th:last-child {
    border-top-right-radius: 10px;
  }

  tbody tr:last-child td:first-child {
    border-bottom-left-radius: 10px;
  }

  tbody tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
  }
`;

export default Table;