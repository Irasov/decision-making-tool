import View from '../../view';
import type { typeHTMLElement } from '../../../util/component';
import type Router from '../../../router/router';
import StartButton from '../../../util/buttons/button-start';
import './options.scss';

const options: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['options'],
};

export default class OptionsView extends View {
  constructor(router: Router) {
    super(options);
    this.configure(router);
  }

  private configure(router: Router): void {
    this.getComponent().appendChildren([new StartButton(router)]);
  }
}
