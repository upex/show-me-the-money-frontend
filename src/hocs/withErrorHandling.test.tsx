import React from 'react';
import { render, screen } from '@testing-library/react';
import withErrorHandling from './withErrorHandling';

interface TestComponentProps {
  message: string;
}

const TestComponent: React.FC<TestComponentProps> = ({ message }) => {
  return <div>{message}</div>;
};

const TestComponentWithErrorHandling = withErrorHandling(TestComponent);

describe('withErrorHandling HOC', () => {
  it('renders the component without error', () => {
   render(<TestComponentWithErrorHandling message="No error" />);

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('renders the error message when there is an error', () => {
    const error = { message: 'Something went wrong' };
    render(<TestComponentWithErrorHandling error={error} message="This should not be displayed" />);

    expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument();
  });
});
