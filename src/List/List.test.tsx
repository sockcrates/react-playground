import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { byRole, byText } from 'testing-library-selector';
import List from './List';

const ui = {
  addItemButton: byRole('button', { name: 'Add item' }),
  allDoneText: byText("You're all done 😃"),
  itemNameInput: byRole('textbox', { name: /Item name/ }),
  itemPriceInput: byRole('textbox', { name: /Price/ }),
  removeItemButton: byRole('button', { name: 'Remove item' }),
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

    expect(ui.itemNameInput.get()).toBeInTheDocument();
    expect(ui.itemPriceInput.get()).toBeInTheDocument();
  });

  it('adds and removes items from the list', async () => {
    const { user } = renderComponent();

    await user.click(ui.addItemButton.get());
    await user.click(ui.addItemButton.get());
    await user.click(ui.addItemButton.get());

    expect(ui.itemNameInput.queryAll()).toHaveLength(3);
    expect(ui.itemPriceInput.queryAll()).toHaveLength(3);

    await user.click(ui.removeItemButton.get());
    await user.click(ui.removeItemButton.get());
    await user.click(ui.removeItemButton.get());

    expect(ui.itemNameInput.query()).not.toBeInTheDocument();
    expect(ui.itemPriceInput.query()).not.toBeInTheDocument();
  });
});
