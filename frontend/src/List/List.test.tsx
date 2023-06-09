import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { byRole, byText } from 'testing-library-selector';
import List from './List';

const ui = {
  addItemButton: byRole('button', { name: 'Add item' }),
  allDoneText: byText("You're all done 😃"),
  itemNameInput: byRole('textbox', { name: /Item name/ }),
  itemPriceInput: byRole('spinbutton', { name: /Price/ }),
  removeItemButton: byRole('button', { name: 'Remove item' }),
};

const renderComponent = () => ({
  user: userEvent.setup(),
  ...render(<List />),
});

describe('<List>', () => {
  it('should display an empty list', () => {
    renderComponent();

    expect(ui.allDoneText.get()).toBeInTheDocument();
  });

  it('should add an item to the list', async () => {
    const { user } = renderComponent();

    await user.click(ui.addItemButton.get());

    expect(ui.itemNameInput.get()).toBeInTheDocument();
    expect(ui.itemPriceInput.get()).toBeInTheDocument();
  });

  it('should add and then remove items from the list', async () => {
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

  it('should add an item to the list and then update its name', async () => {
    const { user } = renderComponent();

    await user.click(ui.addItemButton.get());

    expect(ui.itemNameInput.get()).toBeInTheDocument();

    await user.type(ui.itemNameInput.get(), 'Bread');

    expect(ui.itemNameInput.get()).toHaveValue('Bread');
  });

  it('should add an item to the list and then update its price', async () => {
    const { user } = renderComponent();

    await user.click(ui.addItemButton.get());

    expect(ui.itemPriceInput.get()).toBeInTheDocument();

    await user.type(ui.itemPriceInput.get(), '1.23');

    expect(ui.itemPriceInput.get()).toHaveValue(1.23);
  });
});
