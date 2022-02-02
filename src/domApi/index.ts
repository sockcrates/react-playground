import styles from '../react/components/List/List.module.scss';

function getId(): string {
  return `${new Date().toUTCString()}${Math.random()}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const listElement = document.getElementById('dom-list');

  const addItemButton = document.getElementById('dom-add-item');
  addItemButton?.addEventListener('click', () => {
    const listItemElement = document.createElement('li');
    listItemElement.className = styles.rowFix;

    const fragment = document.createDocumentFragment();
    fragment.appendChild(listItemElement);

    const nameInputElement = document.createElement('input');
    nameInputElement.className = styles.labelPush;

    const nameInputElementId = `dom-name-${getId()}`;
    nameInputElement.id = nameInputElementId;

    nameInputElement.type = 'text';
    nameInputElement.placeholder = 'Item name';

    const nameLabelElement = document.createElement('label');
    nameLabelElement.className = styles.firstColumn;
    nameLabelElement.htmlFor = nameInputElementId;
    nameLabelElement.append('Item name:', nameInputElement);

    nameLabelElement.appendChild(nameInputElement);
    listItemElement.appendChild(nameLabelElement);

    const priceInputElement = document.createElement('input');
    priceInputElement.className = styles.labelPush;

    const priceInputElementId = `dom-price-${getId()}`;
    priceInputElement.id = priceInputElementId;

    priceInputElement.type = 'text';
    priceInputElement.placeholder = 'Price';

    const priceLabelElement = document.createElement('label');
    priceLabelElement.className = styles.firstColumn;
    priceLabelElement.htmlFor = priceInputElementId;
    priceLabelElement.append('Price: (optional)', priceInputElement);

    priceLabelElement.appendChild(priceInputElement);
    listItemElement.appendChild(priceLabelElement);

    listItemElement.animate({ opacity: 0, offset: 0 }, { duration: 300 });

    listElement?.appendChild(fragment);
  });

  const removeItemButton = document.getElementById('dom-remove-item');
  removeItemButton?.addEventListener('click', () => {
    if (!listElement?.lastChild) return;

    const { lastChild } = listElement;

    if (lastChild instanceof HTMLLIElement) {
      const exitAnimation = lastChild.animate(
        { opacity: 0, offset: 1 },
        { duration: 300 },
      );

      exitAnimation.finished.then(() => { listElement.removeChild(lastChild); });
    }
  });
});

export {};