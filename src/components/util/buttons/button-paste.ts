import type View from '../../view/view';
import Component from '../component';
import type { typeHTMLElement } from '../component';
import { Events } from '../events-const';
import './button.scss';

const btn: typeHTMLElement = {
  tag: 'button',
  content: 'PASTE LIST',
  classes: ['options__paste', 'btn'],
};

const STATUS = 'active';

export default class PasteButton extends Component {
  constructor(view: View) {
    super(btn);
    this.configureBtn(view);
  }

  private configureBtn(view: View): void {
    this.addListner(Events.CLICK, () => {
      view.getComponent().toggleClass(STATUS);
    });
  }
}
