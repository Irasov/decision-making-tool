import type OptionsView from '../../view/main/options/options-view';
import Component from '../component';
import type { typeHTMLElement } from '../component';
import { Events } from '../events-const';
import './button.scss';

const btn: typeHTMLElement = {
  tag: 'button',
  content: 'SAVE LIST TO FILE',
  classes: ['options__save', 'btn'],
};

export default class SaveButton extends Component {
  constructor(optionView: OptionsView) {
    super(btn);
    this.configureBtn(optionView);
  }

  private configureBtn(optionView: OptionsView): void {
    this.addListner(Events.CLICK, () => {
      optionView.dataJson();
    });
  }
}
