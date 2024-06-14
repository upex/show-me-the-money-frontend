import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
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

export interface ErrorProps {
  error?: {
    message: string;
  };
}

function withErrorHandling<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithErrorHandling(props: P & ErrorProps) {
    const { error, ...restProps } = props;

    if (error) {
      return <ErrorContainer>Error: {error.message}</ErrorContainer>;
    }

    return <Component {...(restProps as P)} />;
  };
}

export default withErrorHandling;
