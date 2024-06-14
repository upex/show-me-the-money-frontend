import React from 'react';
import styled from 'styled-components';

interface TableRowProps {
  issummary?: boolean;
  islast?: boolean;
  indentation: number;
}

const TableRow = styled.div<TableRowProps>`
  display: flex;
  border-bottom: ${(props) => (props.issummary && props.islast ? 'none' : '1px solid transparent')};
  padding-left: ${(props) => `${props.indentation * 20}px`};
`;

interface TableCellProps {
  issummary?: boolean;
  islast?: boolean;
}

const TableCell = styled.div<TableCellProps>`
  flex: 1;
  padding: 8px;
  border-bottom: ${(props) => (props.issummary && props.islast ? 'none' : '1px solid lightgrey')};
  font-weight: ${(props) => (props.issummary && props.islast ? 'bold' : 'normal')};
  &:not(:last-child) {
    border-right: 1px solid transparent;
  }
`;

interface Row {
  RowType: 'Section' | 'Row' | 'SummaryRow' | 'Header';
  Title?: string;
  Cells: { Value: string | number }[];
  Rows?: Row[];
}

const withRows = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const renderRows = (rows: Row[], indentation = 0): React.ReactNode => {
    let nextIndentation = indentation;

    return rows.map((row, index, array) => {
      const hasEmptyRows = row.Rows && row.Rows.length === 0;
      let currentIndentation = hasEmptyRows || !row.Title ? indentation : nextIndentation;

      if (row.RowType === 'Section') {
        nextIndentation = hasEmptyRows ? currentIndentation + 1 : currentIndentation;

        return (
          <React.Fragment key={index}>
            <TableRow indentation={currentIndentation}>
              <TableCell><strong>{row.Title}</strong></TableCell>
            </TableRow>
            {renderRows(row.Rows || [], nextIndentation + 1)}
          </React.Fragment>
        );
      }

      if (row.RowType === 'Row' || row.RowType === 'SummaryRow') {
        const islast = index === array.length - 1;
        return (
          <TableRow key={index} indentation={currentIndentation} issummary={row.RowType === 'SummaryRow'} islast={islast}>
            {row.Cells.map((cell, cellIndex) => (
              <TableCell key={cellIndex} issummary={row.RowType === 'SummaryRow'} islast={islast}>{cell.Value}</TableCell>
            ))}
          </TableRow>
        );
      }

      if (row.RowType === 'Header') {
        return (
          <TableRow key={index} indentation={currentIndentation}>
            {row.Cells.map((cell, cellIndex) => (
              <TableCell key={cellIndex}><strong>{cell.Value}</strong></TableCell>
            ))}
          </TableRow>
        );
      }

      return null;
    });
  };

  return (props: P) => <WrappedComponent {...props as P} renderRows={renderRows} />;
};

export default withRows;
