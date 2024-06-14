import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
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

interface LoadingProps {
  isLoading?: boolean;
}

function withLoading<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithLoading(props: P & LoadingProps) {
    const { isLoading, ...restProps } = props;

    if (isLoading) {
      return <LoadingContainer>Loading...</LoadingContainer>;
    }

    return <Component {...(restProps as P)} />;
  };
}

export default withLoading;
