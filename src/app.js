import './style.scss';
import FormPostManager from './js/form-post/form-post-manager';
import CardReviewerManager from './js/card-reviewer/card-reviewer-manager';
import NavManager from './js/nav-elem/nav-manager';
import CollageElementHandler from './js/collage-element-handler/collage-element-handler';
import getLocalStorageValue from './js/get-local-storage-value';

const formPostEl = document.querySelector('.form-post');

new FormPostManager(formPostEl);
new CardReviewerManager();
new NavManager(formPostEl);
new CollageElementHandler();

getLocalStorageValue();
