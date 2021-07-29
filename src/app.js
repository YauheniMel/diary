import './style.scss';
import FormManager from './js/form-memory/form-manager';
import getServerValues from './js/get-server-values';
import CardReviewerManager from './js/card-reviewer/card-reviewer-manager';

const formMemoryEl = document.querySelector('.form-memory');

new FormManager(formMemoryEl);
new CardReviewerManager();

getServerValues();
