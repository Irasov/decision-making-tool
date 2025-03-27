import Component from '../component';
import type { typeHTMLElement } from '../component';
import { Events } from '../events-const';
import type Wheel from '../wheel/wheel';
import './button-start-wheels.scss';

const btn: typeHTMLElement = {
  tag: 'button',
  content: '',
  classes: ['decision__play'],
};

export default class StartWheel extends Component {
  constructor(wheel: Wheel) {
    super(btn);
    this.configureBtn(wheel);
  }

  private configureBtn(wheel: Wheel): void {
    this.addListner(Events.CLICK, () => {
      wheel.spin();
    });
  }
}
