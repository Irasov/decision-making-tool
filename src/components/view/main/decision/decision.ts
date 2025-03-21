import Component from '../../../util/component';
import View from '../../view';
import type Router from '../../../router/router';
import type { typeHTMLElement } from '../../../util/component';
import BackButton from '../../../util/buttons/button-back';
import './decision.scss';

const decision: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['decision'],
};

const decisionControl: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['decision__control'],
};

export default class DecisionView extends View {
  constructor(router: Router) {
    super(decision);
    this.configure(router);
  }

  private configure(router: Router): void {
    const controlBlock = new Component(decisionControl, new BackButton(router));
    this.getComponent().append(controlBlock);
  }
}
