import Component from "../component";
import { typeHTMLElement } from "../component";

const optionId: typeHTMLElement = {
  tag: 'canvas',
  content: '',
  classes: ['decision__Wheel'],
};

export default class Wheel extends Component {
  constructor(options: [number, string, number][]) {
    super(optionId);
    this.configure(options);
  }

  private configure(options: [number, string, number][]): void {
  }
}