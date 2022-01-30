import React from 'react';
import { render, screen } from '@testing-library/react';
import List from './List';

describe('<List>', () => {
  test('Empty list', () => {
    render(<List />);

    const emptyListText = screen.getByText(/You're all done 😃/i);

    expect(emptyListText).toBeInTheDocument();
  });
});
