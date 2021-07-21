import './style.scss';
import FormManager from './js/form-memory/form-manager';
import getServerValues from './js/get-server-values';

const formMemoryEl = document.querySelector('.form-memory');

new FormManager(formMemoryEl);

getServerValues();
