import View from '../../view';
import type { typeHTMLElement } from '../../../util/component';
import type Router from '../../../router/router';
import StartButton from '../../../util/buttons/button-start';
import './options.scss';
import AddButton from '../../../util/buttons/button-add';
import PasteButton from '../../../util/buttons/button-paste';
import ClearButton from '../../../util/buttons/button-clear';
import SaveButton from '../../../util/buttons/button-save';
import LoadButton from '../../../util/buttons/button-load';

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
    this.getComponent().appendChildren([
      new AddButton(),
      new PasteButton(),
      new ClearButton(),
      new SaveButton(),
      new LoadButton(),
      new StartButton(router),
    ]);
  }
}
