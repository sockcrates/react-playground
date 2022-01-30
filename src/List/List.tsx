import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import styles from './List.module.scss';

interface Item {
  id: string;
  name: string;
  price?: number;
}

function List(): JSX.Element {
  const [items, setItems] = useState<Array<Item>>([]);

  const duration = 300;

  const handleAddItem = () => {
    const id = `${new Date().toUTCString()}${Math.random()}`;
    setItems([...items, { id, name: '' }]);
  };

  const handleRemoveItem = () => {
    items.pop();
    setItems([...items]);
  };

  return (
    <div className={styles.list}>
      <button onClick={handleAddItem} type="button">Add Item</button>

      <button onClick={handleRemoveItem} type="button">Remove Item</button>

      {items.length ? (
        <TransitionGroup>
          {items.map((item) => (
            <CSSTransition
              classNames={{
                enter: styles.listEnter,
                enterActive: styles.listEnterActive,
                exit: styles.listExit,
                exitActive: styles.listExitActive,
              }}
              style={{ '--duration': `${duration}ms` }}
              timeout={duration}
            >
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
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : ('You\'re all done 😃')}
    </div>
  );
}

export default List;
