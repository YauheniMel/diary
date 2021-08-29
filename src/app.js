import './style.scss';
import FormPostManager from './js/form-post/form-post-manager';
import getServerValues from './js/get-server-values';
import CardReviewerManager from './js/card-reviewer/card-reviewer-manager';
import NavManager from './js/nav-elem/nav-manager';

const formPostEl = document.querySelector('.form-post');

new FormPostManager(formPostEl);
new CardReviewerManager();
new NavManager(formPostEl);

getServerValues();
