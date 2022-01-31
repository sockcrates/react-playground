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
      <div className={styles.listHeader}>
        Shopping List

        <button className={styles.headerPush} onClick={handleAddItem} type="button">Add Item</button>

        <button onClick={handleRemoveItem} type="button">Remove Item</button>
      </div>

      {items.length ? (
        <TransitionGroup className={styles.listItem}>
          {items.map((item) => (
            <CSSTransition
              classNames={{
                enter: styles.listEnter,
                enterActive: styles.listEnterActive,
                exit: styles.listExit,
                exitActive: styles.listExitActive,
              }}
              key={item.id}
              style={{ '--duration': `${duration}ms` }}
              timeout={duration}
            >
              <div className={styles.rowFix}>
                <label className={styles.firstColumn} htmlFor="name">
                  Item name:
                  <input className={styles.labelPush} id="name" placeholder="Item name" type="text" />
                </label>

                <label className={styles.lastColumn} htmlFor="price">
                  Price:
                  <input className={styles.labelPush} id="price" placeholder="Price (optional)" type="text" />
                </label>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <p className={styles.listColumnSpan}>
          You&apos;re all done 😃
        </p>
      )}
    </div>
  );
}

export default List;
