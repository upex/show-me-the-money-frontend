import React from 'react';
import styled from 'styled-components';
import { BalanceSheetResponse } from '../components/table/Table';

const NoDataContainer = styled.div`
  width: 60%;
  margin: auto;
  margin: 60px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgrey;
  min-height: 100px;
  border-radius: 3px;
`;

interface NoDataProps {
  data: BalanceSheetResponse[];
}

function withNoData<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithNoData(props: P & NoDataProps) {
    const { data, ...restProps } = props;

    if (data && !data?.length) {
      return <NoDataContainer>No Data Available.</NoDataContainer>;
    }

    return <Component data={data} {...(restProps as P)} />;
  };
}

export default withNoData;
