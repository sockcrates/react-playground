import React, { ChangeEvent, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuid } from 'uuid';

import styles from './List.module.scss';

interface Item {
  id: string;
  name: string;
  price?: number;
}

function List(): JSX.Element {
  const [items, setItems] = useState<Map<string, Item>>(new Map());

  const duration = 300;

  const handleAddItem = () => {
    const id = uuid();
    setItems(new Map(items.set(id, { id, name: '' })));
  };

  const handleItemNameChange = (id: string, name: string) => {
    const item = items.get(id);
    if (item) {
      setItems(new Map(items.set(id, { ...item, name })));
    }
  };

  const handleItemPriceChange = (id: string, price: number) => {
    const item = items.get(id);
    if (item) {
      setItems(new Map(items.set(id, { ...item, price })));
    }
  };

  const handleRemoveItem = () => setItems(new Map(Array.from(items).slice(0, -1)));

  return (
    <div className={styles.list}>
      <div className={styles.listHeaderContainer}>
        <h1>Shopping List</h1>

        <button
          aria-label="Add item"
          className={styles.headerPush}
          onClick={handleAddItem}
          type="button"
        >
          Add Item
        </button>

        <button aria-label="Remove item" onClick={handleRemoveItem} type="button">
          Remove Item
        </button>
      </div>

      {items.size ? (
        <TransitionGroup className={styles.listItem}>
          {Array.from(items.entries()).map(([id, { name, price }]) => (
            <CSSTransition
              classNames={{
                enter: styles.listEnter,
                enterActive: styles.listEnterActive,
                exit: styles.listExit,
                exitActive: styles.listExitActive,
              }}
              key={id}
              style={{ '--duration': `${duration}ms` }}
              timeout={duration}
            >
              <div className={styles.rowFix}>
                <label className={styles.firstColumn} htmlFor={`${id}-name`}>
                  Item name:
                  <input
                    className={styles.labelPush}
                    id={`${id}-name`}
                    placeholder="Item name"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleItemNameChange(id, e.target.value)
                    }
                    type="text"
                    value={name ?? ''}
                  />
                </label>

                <label className={styles.lastColumn} htmlFor={`${id}-price`}>
                  Price:
                  <input
                    className={styles.labelPush}
                    id={`${id}-price`}
                    inputMode="decimal"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleItemPriceChange(id, e.target.valueAsNumber)
                    }
                    placeholder="Price (optional)"
                    type="number"
                    value={price ?? ''}
                  />
                </label>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <p className={styles.listColumnSpan}>You&apos;re all done 😃</p>
      )}
    </div>
  );
}

export default List;
