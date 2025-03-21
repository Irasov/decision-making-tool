import View from '../view';
import Component from '../../util/component';
import type { typeHTMLElement } from '../../util/component';
import './main.scss';

const main: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['mainpage'],
};

const mainContainer: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['mainpage__container'],
};

const mainBody: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['mainpage__body'],
};

export default class MainView extends View {
  private mainBody: Component;
  constructor() {
    super(main);
    this.mainBody = new Component(mainBody);
    this.configure();
  }

  public setContent(view: View): void {
    this.mainBody.destroyChildren();
    this.mainBody.append(view.getComponent());
  }

  private configure(): void {
    const containner = new Component(mainContainer, this.mainBody);
    this.getComponent().append(containner);
  }
}
