import View from '../../../view';
import type { typeHTMLElement } from '../../../../util/component';
import Component from '../../../../util/component';
import { Events } from '../../../../util/events-const';
import './list-options.scss';

const warning: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['options__modal', 'warning'],
};

const text: typeHTMLElement = {
  tag: 'p',
  content: 'WARNING:',
  classes: ['warning__content'],
};

const button: typeHTMLElement = {
  tag: 'button',
  content: 'CLOSE',
  classes: ['warning__btn', 'modal__btn'],
};

const STATUS = 'active';

export default class ModalWarningView extends View {
  private textWarning = new Component(text);
  constructor() {
    super(warning);
    this.configuration();
  }

  public setText(text: string): void {
    this.textWarning.setTextContent(text);
  }

  private configuration(): void {
    const btn = new Component(button);
    btn.addListner(Events.CLICK, () => {
      this.getComponent().toggleClass(STATUS);
    });
    this.getComponent().appendChildren([this.textWarning, btn]);
  }
}
