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
  constructor(wheel: Wheel, time: Component) {
    super(btn);
    this.configureBtn(wheel, time);
  }

  private configureBtn(wheel: Wheel, time: Component): void {
    this.addListner(Events.CLICK, () => {
      const value = time.getNode() as HTMLInputElement;
      wheel.setTotalTime(+value.value);
      wheel.spin();
    });
  }
}
