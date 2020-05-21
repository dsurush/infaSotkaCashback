'use strict';

const rootEl = document.getElementById('root');

const formEl = document.createElement('form');
formEl.dataset.id = 'purchase-form';
rootEl.appendChild(formEl);

const inputNameEl = document.createElement('input');
inputNameEl.dataset.input = 'name';
formEl.appendChild(inputNameEl);

const inputPriceEl = document.createElement('input');
inputPriceEl.dataset.input = 'price';
inputPriceEl.type = 'number';
formEl.appendChild(inputPriceEl);

const addEl = document.createElement('button');
addEl.dataset.action = 'add';
addEl.textContent = 'Добавить';
formEl.appendChild(addEl);

const PurchaseListEl = document.createElement('ul');
PurchaseListEl.dataset.id = 'purchases-list';
rootEl.appendChild(PurchaseListEl);

const errorEl = document.createElement('div');
errorEl.dataset.id = 'message';
formEl.insertBefore(errorEl, formEl.firstElementChild);

const totalNameEl = document.createElement('div');
const totalCashback = document.createElement('span');
totalCashback.dataset.id = 'total-cashback';
totalNameEl.textContent = 'Итоговый кэшбек: ';
totalCashback.textContent = '0 с.';

totalNameEl.appendChild(totalCashback);
rootEl.appendChild(totalNameEl);
let nextId = 1;
const purchases = [];


formEl.onsubmit = evt => {
    evt.preventDefault();

    errorEl.textContent = '';
    let error = null;

    const inputName = inputNameEl.value.trim();
    if (inputName === '') {
        error = 'Значение поля имя не может быть пустым';
        errorEl.textContent = error;
        inputNameEl.focus();
        return;
    }

    const inputPrice = Number(inputPriceEl.value);
    if (Number.isNaN(inputPrice) || (+inputPrice < 0)) {
        error = 'Значение поля не цена не может быть пустым';
        errorEl.textContent = error;
        inputPriceEl.focus();
        return;
    }

    const purchase = {
        id: nextId++,
        name: inputName,
        price: +inputPrice,
    };

    purchases.push(purchase);
    formEl.reset();
    inputNameEl.focus();

    const rowEl = document.createElement('li');
    rowEl.dataset.purchaseId = purchase.id;
    const percent = 0.5;
    const cashback = Math.floor(purchase.price * percent) / 100;
    rowEl.textContent = `${purchase.name} на сумму ${purchase.price} с. (кэшбек - ${cashback} с.)`;
    PurchaseListEl.insertBefore(rowEl, PurchaseListEl.firstElementChild);

    const OverCashback = purchases.reduce((prev, curr) => (prev + Math.floor(curr.price * percent) / 100), 0);
    console.log(OverCashback);
    totalCashback.textContent = `${OverCashback} с.`;
};