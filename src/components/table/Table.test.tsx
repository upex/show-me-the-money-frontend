import React from 'react';
import { render, screen } from '@testing-library/react';
import withRows from '../../hocs/withRows';
import Table, { BalanceSheetResponse, Row, Section } from './Table';

const renderRows = (rows: (Row | Section)[], indentation = 0): React.ReactNode => {
  let nextIndentation = indentation;

  return rows.map((row, index) => {
    if (row.RowType === 'Section') {
      const hasEmptyRows = row.Rows.length === 0;
      let currentIndentation = hasEmptyRows || !row.Title ? indentation : nextIndentation;
      nextIndentation = hasEmptyRows ? currentIndentation + 1 : currentIndentation;

      return (
        <React.Fragment key={index}>
          <div style={{ paddingLeft: `${currentIndentation * 20}px` }}>
            <strong>{row.Title}</strong>
          </div>
          {renderRows(row.Rows, nextIndentation + 1)}
        </React.Fragment>
      );
    }

    const currentIndentation = indentation;

    return (
      <div key={index} style={{ paddingLeft: `${currentIndentation * 20}px` }}>
        {row.Cells.map((cell, cellIndex) => (
          <div key={cellIndex}>{cell.Value}</div>
        ))}
      </div>
    );
  });
};

describe('Table component', () => {
  const mockData: BalanceSheetResponse = {
    ReportID: "BalanceSheet",
    ReportName: "Balance Sheet",
    ReportType: "BalanceSheet",
    ReportTitles: ["Balance Sheet", "Demo Company (Global)", "As at 30 June 2024"],
    ReportDate: "13 June 2024",
    UpdatedDateUTC: "/Date(1718279396747)/",
    Fields: [],
    Rows: [
      {
        RowType: 'Header',
        Cells: [
          { Value: "" },
          { Value: "30 Jun 2024" },
          { Value: "31 May 2024" },
          { Value: "30 Apr 2024" },
          { Value: "31 Mar 2024" },
          { Value: "29 Feb 2024" }
        ]
      },
      {
        RowType: 'Section',
        Title: "Assets",
        Rows: []
      },
      {
        RowType: 'Section',
        Title: "Bank",
        Rows: [
          {
            RowType: 'Row',
            Cells: [
              { Value: "Business Bank Account" },
              { Value: "1760.54" },
              { Value: "2171.89" },
              { Value: "1957.44" },
              { Value: "4115.98" },
              { Value: "0.00" }
            ]
          },
          {
            RowType: 'SummaryRow',
            Cells: [
              { Value: "Total Bank" },
              { Value: "1760.54" },
              { Value: "2171.89" },
              { Value: "1957.44" },
              { Value: "4115.98" },
              { Value: "0.00" }
            ]
          }
        ]
      }
    ]
  };

  it('renders headers correctly', async () => {
    const TableWithRows = withRows(Table);
    render(<TableWithRows data={mockData} renderRows={renderRows} />);

    expect(await screen.findByText('30 Jun 2024')).toBeInTheDocument();
    expect(await screen.findByText('31 May 2024')).toBeInTheDocument();
  });

  it('renders sections correctly', async () => {
    const TableWithRows = withRows(Table);
    render(<TableWithRows data={mockData} renderRows={renderRows} />);

    expect(await screen.findByText('Assets')).toBeInTheDocument();
    expect(await screen.findByText('Bank')).toBeInTheDocument();
  });

  it('renders rows and summary rows correctly', async () => {
    const TableWithRows = withRows(Table);
    render(<TableWithRows data={mockData} renderRows={renderRows} />);

    expect(await screen.findByText('Business Bank Account')).toBeInTheDocument();
    expect(await screen.findByText('Balance Sheet')).toBeInTheDocument();
    expect(await screen.findByText('Total Bank')).toBeInTheDocument();
  });
});
