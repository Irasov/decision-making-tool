import HeaderView from '../view/header/header-view';
import FooterView from '../view/footer/footer-view';
import View from '../view/view';
import MainView from '../view/main/main-view';
import Router from '../router/router';
import type { Route } from '../router/router';
import { Pages } from '../router/pages';
import OptionsView from '../view/main/options/options';
import DecisionView from '../view/main/decision/decision';
import NotFoundView from '../view/main/not-found/not-found-view';

const wrapperConst = {
  tag: 'div',
  content: '',
  classes: ['wrapper'],
};

export default class App {
  private body = document.body;
  private main: MainView;
  private router: Router;

  constructor() {
    const routes = this.createRoutes();
    this.router = new Router(routes);
    this.main = new MainView();
  }

  public createView(): void {
    const wrapper = new View(wrapperConst);
    const header = new HeaderView();
    const footer = new FooterView();
    wrapper
      .getComponent()
      .appendChildren([
        header.getComponent(),
        this.main.getComponent(),
        footer.getComponent(),
      ]);
    this.body.append(wrapper.getComponent().getNode());
  }

  private createRoutes(): Route[] {
    return [
      {
        path: ``,
        callback: (): void => {
          this.setContent(new OptionsView(this.router));
        },
      },
      {
        path: `${Pages.OPTIONS}`,
        callback: (): void => {
          this.setContent(new OptionsView(this.router));
        },
      },
      {
        path: `${Pages.DECISION}`,
        callback: (): void => {
          this.setContent(new DecisionView(this.router));
        },
      },
      {
        path: `${Pages.NOT_FOUND}`,
        callback: (): void => {
          this.setContent(new NotFoundView());
        },
      },
    ];
  }

  private setContent(view: View): void {
    this.main.setContent(view);
  }
}
