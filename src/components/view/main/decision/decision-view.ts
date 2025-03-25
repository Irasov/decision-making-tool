import Component from '../../../util/component';
import View from '../../view';
import type Router from '../../../router/router';
import type { typeHTMLElement } from '../../../util/component';
import BackButton from '../../../util/buttons/button-back';
import './decision.scss';
import Wheel from '../../../util/wheel/wheel';

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

const decisionWhell: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['decision__wheel'],
};

export default class DecisionView extends View {
  private dataWheel: [number, string, number][];
  constructor(router: Router, options: [number, string, number][]) {
    super(decision);
    this.dataWheel = options;
    this.configure(router, options);
  }

  private configure(router: Router, options: [number, string, number][]): void {
    const controlBlock = new Component(decisionControl, new BackButton(router));
    const wheelBlock = new Component(decisionWhell, new Wheel(options));
    this.getComponent().appendChildren([controlBlock, wheelBlock]);
  }
}
