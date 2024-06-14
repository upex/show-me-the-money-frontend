import React from 'react';
import { render, screen } from '@testing-library/react';
import withRows from './withRows';

interface Cell {
  Value: string;
}

interface Row {
  RowType: 'Section' | 'Row' | 'SummaryRow' | 'Header';
  Title?: string;
  Cells: Cell[];
  Rows?: Row[];
}

interface TableProps {
  rows: Row[];
  renderRows?: (rows: Row[], indentation?: number) => React.ReactNode;
}

const Table: React.FC<TableProps> = ({ renderRows, rows }) => {
  return (
    <div>
      {renderRows && renderRows(rows)}
    </div>
  );
};

const TableWithRows = withRows(Table);

describe('withRows HOC', () => {
  const mockData: Row[] = [
    {
      RowType: 'Header',
      Cells: [{ Value: 'Header 1' }, { Value: 'Header 2' }]
    },
    {
      RowType: 'Section',
      Title: 'Section 1',
      Cells: [],
      Rows: [
        {
          RowType: 'Row',
          Cells: [{ Value: 'Cell 1' }, { Value: 'Cell 2' }]
        },
        {
          RowType: 'SummaryRow',
          Cells: [{ Value: 'Summary 1' }, { Value: 'Summary 2' }]
        }
      ]
    }
  ];

  it('renders headers correctly', () => {
    render(<TableWithRows rows={mockData} />);

    expect(screen.getByText('Header 1')).toBeInTheDocument();
    expect(screen.getByText('Header 2')).toBeInTheDocument();
  });

  it('renders sections correctly', () => {
    render(<TableWithRows rows={mockData} />);

    expect(screen.getByText('Section 1')).toBeInTheDocument();
  });

  it('renders rows and summary rows correctly', () => {
    render(<TableWithRows rows={mockData} />);

    expect(screen.getByText('Cell 1')).toBeInTheDocument();
    expect(screen.getByText('Cell 2')).toBeInTheDocument();
    expect(screen.getByText('Summary 1')).toBeInTheDocument();
    expect(screen.getByText('Summary 2')).toBeInTheDocument();
  });
});
