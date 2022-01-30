import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import List from './List';

describe('<List>', () => {
  test('Empty list', () => {
    render(<List />);

    const emptyListText = screen.getByText(/You're all done 😃/i);

    expect(emptyListText).toBeInTheDocument();
  });

  test('Add to list', async () => {
    render(<List />);

    fireEvent.click(screen.getByText(/Add Item/i));

    expect(screen.getByPlaceholderText(/Item name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Price \(optional\)/i)).toBeInTheDocument();
  });
});
