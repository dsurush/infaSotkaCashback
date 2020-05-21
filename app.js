'use strict';

const rootEl = document.getElementById('root');

const formEl = document.createElement('form');
formEl.dataset.id = 'purchase-form';
rootEl.appendChild(formEl);

const nameEl = document.createElement('input');
nameEl.dataset.input = 'name';
formEl.appendChild(nameEl);

const priceEl = document.createElement('input');
priceEl.dataset.input = 'price';
priceEl.type = 'number';

formEl.appendChild(priceEl);
const addEl = document.createElement('button');
addEl.dataset.action = 'add';
addEl.textContent = 'Добавить';
formEl.appendChild(addEl);

const errorEl = document.createElement('div');
errorEl.dataset.id = 'message';
formEl.insertBefore(errorEl, formEl.firstElementChild);

const listEl = document.createElement('ul');
listEl.dataset.id = 'purchases-list';
rootEl.appendChild(listEl);

const totalEl = document.createElement('div');
totalEl.textContent = 'Итоговый кэшбэк: ';
rootEl.appendChild(totalEl);

const sumEl = document.createElement('span');
sumEl.dataset.id = 'total-cashback';
sumEl.textContent = 0 + ' с.';
totalEl.appendChild(sumEl);

const guaranteedPercent = 0.5;

let nextId = 1;
const purchases = [];


formEl.onsubmit = evt => {
    evt.preventDefault();

    errorEl.textContent = '';
    let error = null;

    const name = nameEl.value.trim();
        if (name === '') {
        error = 'Заполните поле Товар';
        errorEl.textContent = error;
        console.log(error);
        nameEl.focus();
        return;
    }

    const price = Number(priceEl.value);
    if (Number.isNaN(price)) {
        error = 'Неверно введена цена';
        errorEl.textContent = error;
        priceEl.focus();
        return;
    }

    if (price < 0) {
        error = 'Цена не может быть отрицательной';
        errorEl.textContent = error;
        priceEl.focus();
        return;
    }

    const purchase = {
        id: nextId++,
        name,
        price,
    };
    purchases.unshift(purchase);
    formEl.reset();
    nameEl.focus();

    const cashback = Math.floor(purchase.price * guaranteedPercent) / 100;
    
    const rowEl = document.createElement('li');
    rowEl.dataset.purchaseId = purchase.id;
    rowEl.textContent = purchase.name + ' на сумму ' + purchase.price + ' с.' + ' (кэшбек - ' + cashback + ' с.)';
    listEl.insertBefore(rowEl, listEl.firstElementChild);

    const sum = (purchases.reduce((prev, curr) => prev + (Math.floor(curr.price * guaranteedPercent) / 100), 0));

    sumEl.textContent =sum + ' с.';
};

