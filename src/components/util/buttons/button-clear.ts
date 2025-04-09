import type OptionsView from '../../view/main/options/options-view';
import Component from '../component';
import type { typeHTMLElement } from '../component';
import { Events } from '../events-const';
import './button.scss';

const btn: typeHTMLElement = {
  tag: 'button',
  content: 'CLEAR LIST',
  classes: ['options__clear', 'btn'],
};

export default class ClearButton extends Component {
  constructor(optionsView: OptionsView) {
    super(btn);
    this.configureBtn(optionsView);
  }

  private configureBtn(optionsView: OptionsView): void {
    this.addListner(Events.CLICK, () => {
      optionsView.removeOptions();
    });
  }
}
