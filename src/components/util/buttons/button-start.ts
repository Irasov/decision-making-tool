import type Router from '../../router/router';
import Component from '../component';
import type { typeHTMLElement } from '../component';
import { Pages } from '../../router/pages';
import { Events } from '../events-const';
import './button.scss';
import type OptionsView from '../../view/main/options/options-view';
import type ModalWarningView from '../../view/main/options/modal/window-warning-view';

const btn: typeHTMLElement = {
  tag: 'button',
  content: 'START',
  classes: ['options__start', 'btn'],
};

const WARNING_MIN =
  'WARNING: To start the wheel, there must be at least two options!';
const WARNING_TITLE =
  'WARNING: To start the wheel, the TITLE field must be filled in!';
const WARNING_POSITIVE =
  'WARNING: To start the wheel, the WEIGHT field must be a positive number greater than zero!';
const STATUS = 'active';

export default class StartButton extends Component {
  constructor(
    router: Router,
    optionsView: OptionsView,
    warning: ModalWarningView
  ) {
    super(btn);
    this.configure(router, optionsView, warning);
  }

  private static checkDate(
    optionsView: OptionsView,
    warning: ModalWarningView
  ): boolean {
    if (optionsView.getOptions().size < 2) {
      warning.setText(WARNING_MIN);
      warning.getComponent().toggleClass(STATUS);
      return false;
    }
    for (let e of optionsView.getOptions().values()) {
      if (e.getTitle() === '') {
        warning.setText(WARNING_TITLE);
        warning.getComponent().toggleClass(STATUS);
        return false;
      }
      if (e.getWeight() < 1) {
        warning.setText(WARNING_POSITIVE);
        warning.getComponent().toggleClass(STATUS);
        return false;
      }
    }
    return true;
  }

  private configure(
    router: Router,
    optionsView: OptionsView,
    warning: ModalWarningView
  ): void {
    this.addListner(Events.CLICK, () => {
      if (StartButton.checkDate(optionsView, warning)) {
        router.navigate(Pages.DECISION);
      }
    });
  }
}
