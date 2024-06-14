import React from 'react';
import { render, screen } from '@testing-library/react';
import withLoading from './withLoading';

interface TestComponentProps {
  message: string;
}

const TestComponent: React.FC<TestComponentProps> = ({ message }) => {
  return <div>{message}</div>;
};

const TestComponentWithLoading = withLoading(TestComponent);

describe('withLoading HOC', () => {
  it('renders the loading message when isLoading is true', () => {
    render(<TestComponentWithLoading isLoading={true} message="No error" />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the component when isLoading is false', () => {
    render(<TestComponentWithLoading isLoading={false} message="Loaded successfully" />);

    expect(screen.getByText('Loaded successfully')).toBeInTheDocument();
  });
});
