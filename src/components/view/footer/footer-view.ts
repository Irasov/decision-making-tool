import View from '../view';
import Component from '../../util/component';
import type { typeHTMLElement } from '../../util/component';
import './footer.scss';
import img from './../../../assets/rss.svg';

const footer: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['footer'],
};

const footerContainer: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['footer__container'],
};

const footerBody: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['footer__body'],
};

const itemGit: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['footer__git'],
};

const itemRss: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['footer__rss'],
};

const footerLink: typeHTMLElement = {
  tag: 'a',
  content: '',
  classes: ['footer__link'],
};
const footerImg: typeHTMLElement = {
  tag: 'img',
  content: '',
  classes: ['footer__img'],
};

const LINK_GIT = 'https://github.com/Irasov';
const LINK_RSS = 'https://rs.school/courses/javascript-preschool-ru';
const CONTENT_LINK_GIT = '@2025 Irasov';
const ATTRIBUTE_GIT = ['href', 'target', '_blank'];
const ATTRIBUTE_IMG = ['src', 'alt', 'RSS'];

export default class FooterView extends View {
  constructor() {
    super(footer);
    this.configurate();
  }

  private configurate(): void {
    const gitLink = new Component(footerLink);
    gitLink.setTextContent(CONTENT_LINK_GIT);
    gitLink.setAttribute(ATTRIBUTE_GIT[0], LINK_GIT);
    gitLink.setAttribute(ATTRIBUTE_GIT[1], ATTRIBUTE_GIT[2]);
    const gitBlock = new Component(itemGit, gitLink);
    const imgRss = new Component(footerImg);
    imgRss.setAttribute(ATTRIBUTE_IMG[0], img);
    imgRss.setAttribute(ATTRIBUTE_IMG[1], ATTRIBUTE_IMG[2]);
    const rssLink = new Component(footerLink, imgRss);
    rssLink.setAttribute(ATTRIBUTE_GIT[0], LINK_RSS);
    rssLink.setAttribute(ATTRIBUTE_GIT[1], ATTRIBUTE_GIT[2]);
    const rssBlock = new Component(itemRss, rssLink);
    const conainer = new Component(
      footerContainer,
      new Component(footerBody, gitBlock, rssBlock)
    );
    this.getComponent().appendChildren([conainer]);
  }
}
