import Component from '../util/component';
import type { typeHTMLElement } from '../util/component';

export default class View {
  private viewComponent: Component;
  constructor(options: typeHTMLElement) {
    this.viewComponent = this.creatorView(options);
  }

  public getHTMLComponent(): HTMLElement {
    return this.viewComponent.getNode();
  }

  public getComponent(): Component {
    return this.viewComponent;
  }

  // eslint-disable-next-line class-methods-use-this
  private creatorView(options: typeHTMLElement): Component {
    const view = new Component(options);
    return view;
  }
}
