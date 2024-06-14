import React from 'react';
import styled from 'styled-components';
import Table, { BalanceSheetResponse } from '../table/Table';

const ReportsContainer = styled.div`
    width: 60%;
    margin: auto;
`;

interface ReportsProps {
  data: BalanceSheetResponse[];
}

const Reports: React.FC<ReportsProps> = ({ data }) => {
  return (
    <ReportsContainer>
      {data?.map((rows, index) => (
        <Table key={index} data={rows} />
      ))}
    </ReportsContainer>
  );
};

export default Reports;
