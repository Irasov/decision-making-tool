import type OptionsView from '../../view/main/options/options-view';
import Component from '../component';
import type { typeHTMLElement } from '../component';
import { Events } from '../events-const';
import type Option from '../option/option';
import './button-delete-option.scss';

const btn: typeHTMLElement = {
  tag: 'button',
  content: 'DELETE',
  classes: ['option_delete'],
};

export default class DeleteOptionButton extends Component {
  private container: Option;
  constructor(option: Option, optionsView: OptionsView) {
    super(btn);
    this.container = option;
    this.configureBtn(option, optionsView);
  }

  private configureBtn(option: Option, optionsView: OptionsView): void {
    this.addListner(Events.CLICK, () => {
      optionsView.removeOption(option.getId());
      this.container.destroy();
    });
  }
}
