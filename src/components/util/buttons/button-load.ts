import Component from '../component';
import type { typeHTMLElement } from '../component';
import { Events } from '../events-const';
import './button.scss';

const btn: typeHTMLElement = {
  tag: 'button',
  content: '',
  classes: ['options__load', 'btn'],
};

export default class LoadButton extends Component {
  constructor() {
    super(btn);
    this.configureBtn();
  }

  private configureBtn(): void {
    this.addListner(Events.CLICK, () => {});
  }
}
