import './not-found.scss';
import type { typeHTMLElement } from '../../../util/component';
import View from '../../view';
import Component from '../../../util/component';

const TEXT_NOT_FOUND = 'Page not found!!!';

const notfound: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['notfound'],
};

const notfoundTitle: typeHTMLElement = {
  tag: 'h2',
  content: TEXT_NOT_FOUND,
  classes: ['notfound__title'],
};

export default class NotFoundView extends View {
  constructor() {
    super(notfound);
    this.configurate();
  }

  private configurate(): void {
    const title = new Component(notfoundTitle);
    this.getComponent().appendChildren([title]);
  }
}
