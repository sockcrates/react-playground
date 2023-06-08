import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { byPlaceholderText, byText } from 'testing-library-selector';
import List from './List';

const ui = {
  addItemButton: byText('Add Item'),
  allDoneText: byText("You're all done 😃"),
  placeholderText: byPlaceholderText('Item name'),
  pricePlaceholderText: byPlaceholderText('Price (optional)'),
  removeItemButton: byText('Remove Item'),
};

const renderComponent = () => ({
  user: userEvent.setup(),
  ...render(<List />),
});

describe('<List>', () => {
  it('renders an empty list', () => {
    renderComponent();

    expect(ui.allDoneText.get()).toBeInTheDocument();
  });

  it('adds an item to the list', async () => {
    const { user } = renderComponent();

    await user.click(ui.addItemButton.get());

    expect(ui.placeholderText.get()).toBeInTheDocument();
    expect(ui.pricePlaceholderText.get()).toBeInTheDocument();
  });

  it('adds and removes items from the list', async () => {
    const { user } = renderComponent();

    await user.click(ui.addItemButton.get());
    await user.click(ui.addItemButton.get());
    await user.click(ui.addItemButton.get());

    expect(ui.placeholderText.queryAll()).toHaveLength(3);
    expect(ui.pricePlaceholderText.queryAll()).toHaveLength(3);

    await user.click(ui.removeItemButton.get());
    await user.click(ui.removeItemButton.get());
    await user.click(ui.removeItemButton.get());

    expect(ui.placeholderText.query()).not.toBeInTheDocument();
    expect(ui.pricePlaceholderText.query()).not.toBeInTheDocument();
  });
});
