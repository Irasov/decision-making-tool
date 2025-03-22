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
  constructor() {
    super(btn);
    this.configureBtn();
  }

  private configureBtn(): void {
    this.addListner(Events.CLICK, () => {});
  }
}
