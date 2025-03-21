import { Pages } from './pages';
import { Events } from '../util/events-const';

export type Route = {
  path: string;
  callback: () => void;
};

export default class Router {
  private routes: Route[];

  constructor(routes: Route[]) {
    this.routes = routes;
    window.addEventListener(Events.DOM_LOADED, () => {
      this.navigate(Router.getCurrentPath());
    });
    window.addEventListener(
      Events.HASH_CHANGE,
      this.browserChangeHandler.bind(this)
    );
  }

  public static getCurrentPath(): string {
    return window.location.hash ? window.location.hash.slice(1) : Pages.OPTIONS;
  }

  public static parseURL(url: string): string {
    const path = url.replace(/^#/, '');
    return path;
  }

  public navigate(url: string): void {
    window.location.hash = `#${url}`;
    const pathForFind = Router.parseURL(url);
    const route = this.routes.find((item) => item.path === pathForFind);
    if (!route) {
      this.redirectNotFound();
      return;
    }
    route.callback();
  }

  private browserChangeHandler(): void {
    this.navigate(Router.getCurrentPath());
  }

  private redirectNotFound(): void {
    const routeNotFound = this.routes.find(
      (item) => item.path === Pages.NOT_FOUND
    );
    if (routeNotFound) {
      this.navigate(routeNotFound.path);
    }
  }
}
