import Component from '../util/component';
import type { typeHTMLElement } from '../util/component';
import type Option from '../util/option/option';
import { Events } from '../util/events-const';
import './input.scss';
import './weight.scss';

const input: typeHTMLElement = {
  tag: 'input',
  content: '',
  classes: ['option__input', 'input-weight'],
};

const attrType = {
  ATTR: 'type',
  TYPE: 'number',
  ATTR_PALCE: 'placeholder',
  PLACE: 'WEIGHT',
};

export default class InputWeight extends Component {
  constructor(option: Option) {
    super(input);
    this.configure(option);
  }

  private configure(option: Option): void {
    this.setAttribute(attrType.ATTR, attrType.TYPE);
    this.setAttribute(attrType.ATTR_PALCE, attrType.PLACE);
    this.addListner(Events.CHANGE, () => {
      const value = this.getNode() as HTMLInputElement;
      option.setWeight(+value.value);
    });
  }
}
