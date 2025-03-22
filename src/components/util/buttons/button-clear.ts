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
  constructor() {
    super(btn);
    this.configureBtn();
  }

  private configureBtn(): void {
    this.addListner(Events.CLICK, () => {});
  }
}
