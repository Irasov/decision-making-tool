import Component from '../component';
import Option from '../option/option';
import type OptionsView from '../../view/main/options/options';
import type { typeHTMLElement } from '../component';
import { Events } from '../events-const';
import './button.scss';

const btn: typeHTMLElement = {
  tag: 'button',
  content: 'ADD',
  classes: ['options__add', 'btn'],
};

export default class AddButton extends Component {
  constructor(optionsView: OptionsView) {
    super(btn);
    this.configureBtn(optionsView);
  }

  private configureBtn(optionsView: OptionsView): void {
    this.addListner(Events.CLICK, () => {
      optionsView.setIdOptions();
      const option = new Option(optionsView.getLastIdOptions(), optionsView);
      optionsView.setOption(optionsView.getLastIdOptions(), option);
      optionsView.addOption(option);
    });
  }
}
