import React from 'react';
import { render, screen } from '@testing-library/react';
import Reports from './Reports'; 
import { BalanceSheetResponse } from '../table/Table';

const mockData: BalanceSheetResponse[] = [
  {
    ReportID: 'BalanceSheet1',
    ReportName: 'Balance Sheet 1',
    ReportType: 'BalanceSheet',
    ReportTitles: ['Balance Sheet', 'Company A', 'As at 31 Dec 2023'],
    ReportDate: '31 Dec 2023',
    UpdatedDateUTC: '/Date(1718279396747)/',
    Fields: [],
    Rows: [
      {
        RowType: 'Header',
        Cells: [{ Value: 'Header 1' }, { Value: 'Header 2' }]
      },
      {
        RowType: 'Section',
        Title: 'Assets',
        Rows: []
      },
      {
        RowType: 'Row',
        Cells: [{ Value: 'Cell 1' }, { Value: 'Cell 2' }]
      },
      {
        RowType: 'SummaryRow',
        Cells: [{ Value: 'Total' }]
      }
    ]
  }
];

describe('Reports component', () => {
  it('renders correctly with data', () => {
    render(<Reports data={mockData} />);

    // Check if the Table component rendered the data correctly
    expect(screen.getByText('Header 1')).toBeInTheDocument();
    expect(screen.getByText('Header 2')).toBeInTheDocument();
    expect(screen.getByText('Cell 1')).toBeInTheDocument();
    expect(screen.getByText('Cell 2')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('renders without crashing with no data', () => {
    const { container } = render(<Reports data={[]} />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
