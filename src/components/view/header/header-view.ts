import View from '../view';
import type { typeHTMLElement } from '../../util/component';
import Component from '../../util/component';
import './header.scss';

const header: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['header'],
};

const headerContainer: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['header__container'],
};

const headerBody: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['header__body'],
};

const headerTitle: typeHTMLElement = {
  tag: 'h1',
  content: 'Decision Making Tool',
  classes: ['header__title'],
};

export default class HeaderView extends View {
  constructor() {
    super(header);
    this.configure();
  }

  public configure(): void {
    const containner = new Component(
      headerContainer,
      new Component(headerBody, new Component(headerTitle))
    );
    this.getComponent().append(containner);
  }
}
