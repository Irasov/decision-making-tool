import Component from '../component';
import type { typeHTMLElement } from '../component';
import { Events } from '../events-const';
import './button.scss';

const btn: typeHTMLElement = {
  tag: 'button',
  content: '',
  classes: ['decision__add', 'btn'],
};

export default class AddButton extends Component {
  constructor() {
    super(btn);
    this.configureBtn();
  }

  private configureBtn(): void {
    this.addListner(Events.CLICK, () => {});
  }
}
