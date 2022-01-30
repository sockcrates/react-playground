import React, { useState } from 'react';

interface Item {
  id: string;
  name: string;
  price?: number;
}

function List(): JSX.Element {
  const [items, setItems] = useState<Array<Item>>([]);

  const handleAddItem = () => {
    const id = `${new Date().toUTCString()}${Math.random()}`;
    setItems([...items, { id, name: '' }]);
  };

  const handleRemoveItem = () => {
    items.pop();
    setItems([...items]);
  };

  return (
    <div>
      <button onClick={handleAddItem} type="button">Add Item</button>

      <button onClick={handleRemoveItem} type="button">Remove Item</button>

      {items.length ? (
        items.map((item) => (
          <div key={item.id}>
            <label htmlFor="name">
              Item name:
              <input id="name" placeholder="Item name" type="text" />
            </label>

            <label htmlFor="price">
              Price:
              <input id="price" placeholder="Price (optional)" type="text" />
            </label>
          </div>
        ))
      ) : ('You\'re all done 😃')}
    </div>
  );
}

export default List;
