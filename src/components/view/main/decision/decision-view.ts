import Component from '../../../util/component';
import View from '../../view';
import type Router from '../../../router/router';
import type { typeHTMLElement } from '../../../util/component';
import BackButton from '../../../util/buttons/button-back';
import './decision.scss';
import Wheel from '../../../util/wheel/wheel';
import StartWheel from '../../../util/buttons/button-start-wheel';
import SoundButton from '../../../util/buttons/button-sound';
import notificationSound from './../../../../assets/finish.mp3';

const decision: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['decision'],
};

const decisionControl: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['decision__control'],
};

const decisionWhell: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['decision__wheel'],
};

const decisionResult: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['decision__res'],
};

const CLASS_MUTE = 'decision__sound_mute';

export default class DecisionView extends View {
  private dataWheel: [number, string, number][];
  constructor(router: Router, options: [number, string, number][]) {
    super(decision);
    this.dataWheel = options;
    this.configure(router, options);
  }

  private configure(router: Router, options: [number, string, number][]): void {
    const audio = new Audio(notificationSound);
    audio.preload = 'auto';
    const result = new Component(decisionResult);
    const sound = new SoundButton();
    const wheel = new Wheel(options, (res: string) => {
      result.setTextContent(res);
      if (!sound.getNode().classList.contains(CLASS_MUTE)) {
        audio.play();
      }
    });

    const controlBlock = new Component(
      decisionControl,
      new BackButton(router),
      sound,
      new StartWheel(wheel),
      result
    );
    const wheelBlock = new Component(decisionWhell, wheel);
    this.getComponent().appendChildren([controlBlock, wheelBlock]);
  }
}
