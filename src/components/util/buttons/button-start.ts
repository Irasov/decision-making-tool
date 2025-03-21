import type Router from '../../router/router';
import Component from '../component';
import type { typeHTMLElement } from '../component';
import { Pages } from '../../router/pages';
import { Events } from '../events-const';
import './button.scss';

const btn: typeHTMLElement = {
  tag: 'button',
  content: 'START',
  classes: ['options__start', 'btn'],
};

export default class StartButton extends Component {
  constructor(router: Router) {
    super(btn);
    this.configure(router);
  }

  private configure(router: Router): void {
    this.addListner(Events.CLICK, () => {
      router.navigate(Pages.DECISION);
    });
  }
}
