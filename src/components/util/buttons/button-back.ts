import Component from '../component';
import type { typeHTMLElement } from '../component';
import type Router from '../../router/router';
import { Pages } from '../../router/pages';
import { Events } from '../events-const';
import './button-back.scss';

const btn: typeHTMLElement = {
  tag: 'button',
  content: '',
  classes: ['decision__back'],
};

export default class BackButton extends Component {
  constructor(router: Router) {
    super(btn);
    this.configureBtn(router);
  }

  private configureBtn(router: Router): void {
    this.addListner(Events.CLICK, () => {
      router.navigate(Pages.OPTIONS);
    });
  }
}
