import React, { useState } from 'react';

interface Item {
  id: string;
  name: string;
  price?: number;
}

function List(): JSX.Element {
  const [items, setItems] = useState<Array<Item>>([]);

  const handleClick = () => {
    const id = new Date().toUTCString();
    setItems([...items, { id, name: '' }]);
  };

  return (
    <div>
      <button onClick={handleClick} type="button">Add Item</button>

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
