import Component from '../component';
import type { typeHTMLElement } from '../component';
import { Events } from '../events-const';
import './sound.scss';

const btn: typeHTMLElement = {
  tag: 'button',
  content: '',
  classes: ['decision__sound'],
};

const MUTE = "decision__sound_mute";

export default class SoundButton extends Component {
  constructor() {
    super(btn);
    this.configure();
  }

  private configure(): void {
    this.addListner(Events.CLICK, () => {
      this.toggleClass(MUTE);
    });
  }
}
