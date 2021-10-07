import './style.scss';
import FormPostManager from './js/form-post/form-post-manager';
import getServerValues from './js/get-server-values';
import CardReviewerManager from './js/card-reviewer/card-reviewer-manager';
import NavManager from './js/nav-elem/nav-manager';
import CardHandler from './js/card-elem/card-handler';
import CollageElementHandler from './js/collage-element-handler/collage-element-handler';

const formPostEl = document.querySelector('.form-post');

new CardHandler();
new FormPostManager(formPostEl);
new CardReviewerManager();
new NavManager(formPostEl);
new CollageElementHandler();

getServerValues();
