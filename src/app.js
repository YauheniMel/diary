import './style.scss';
import FormManager from './js/form-creator/form-creator-manager';
import getServerValues from './js/get-server-values';
import CardReviewerManager from './js/card-reviewer/card-reviewer-manager';
import NavManager from './js/nav-elem/nav-manager';

const formCreatorEl = document.querySelector('.form-creator');

new FormManager(formCreatorEl);
new CardReviewerManager();
new NavManager(formCreatorEl);

getServerValues();
