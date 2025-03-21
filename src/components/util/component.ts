export type typeHTMLElement = {
  tag: string;
  content: string;
  classes: string[];
};

export default class Component {
  private children: Component[] = [];
  private node: HTMLElement;

  constructor(options: typeHTMLElement, ...children: Component[]) {
    const node = document.createElement(options.tag);
    node.textContent = options.content;
    if (options.classes.length > 0) node.classList.add(...options.classes);
    this.node = node;
    if (children) this.appendChildren(children);
  }

  public append(child: Component): void {
    this.children.push(child);
    this.node.append(child.getNode());
  }

  public appendChildren(children: Component[]): void {
    children.forEach((child: Component) => {
      this.append(child);
    });
  }

  public getNode(): HTMLElement {
    return this.node;
  }

  public setTextContent(content: string): void {
    this.node.textContent = content;
  }

  public setAttribute(attribute: string, value: string): void {
    this.node.setAttribute(attribute, value);
  }

  public removeAttribute(attribute: string): void {
    this.node.removeAttribute(attribute);
  }

  public toggleClass(className: string): void {
    this.node.classList.toggle(className);
  }

  public addListner(event: string, listner: EventListener): void {
    this.node.addEventListener(event, listner);
  }

  public removeListner(event: string, listner: EventListener): void {
    this.node.removeEventListener(event, listner);
  }

  public destroyChildren(): void {
    this.children.forEach((child: Component) => {
      child.destroy();
    });
    this.children.length = 0;
  }

  public destroy(): void {
    if (this.children.length > 0) this.destroyChildren();
    this.node.remove();
  }
}
