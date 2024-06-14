import React from 'react';
import styled from 'styled-components';
import withRows from '../../hocs/withRows';

interface Cell {
  Value?: string;
}

export interface Row {
  RowType: 'Header' | 'Row' | 'SummaryRow';
  Cells: Cell[];
}

export interface Section {
  RowType: 'Section';
  Title?: string;
  Rows: (Row | Section)[];
}

export interface BalanceSheetResponse {
  ReportID: string;
  ReportName: string;
  ReportType: string;
  ReportTitles: string[];
  ReportDate: string;
  UpdatedDateUTC?: string;
  Fields?: any[];
  Rows: (Row | Section)[];
}

interface TableProps {
  data: BalanceSheetResponse;
  renderRows?: (rows: (Row | Section)[], indentation?: number) => React.ReactNode;
}

const TableContainer = styled.div`
  margin: 20px 40px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(0, 10, 30, .2);
  padding: 40px;
`;

const Table: React.FC<TableProps> = ({ data, renderRows }) => {
  return (
    <TableContainer>
      {
        data.ReportTitles.map((item, index) => {
          if (index === 0) {
            return <h2 key={index}>{item}</h2>
          }
          return <p key={index}>{item}</p>
        })
      }
      {renderRows && renderRows(data.Rows)}
    </TableContainer>
  );
};

export default withRows(Table);
