import Component from '../component';
import type OptionsView from '../../view/main/options/options-view';
import type { typeHTMLElement } from '../component';
import InputTitle from '../../inputs/input-title';
import InputWeight from '../../inputs/input-weight';
import DeleteOptionButton from '../buttons/button-delete-option';
import './option.scss'

const option: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['options__otion', 'option'],
};

const optionId: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['option__id'],
};

const ID_PREFIX = '#';

export default class Option extends Component {
  private title = '';
  private weight = 0;
  private id: number;

  constructor(id: number, optionsView: OptionsView) {
    super(option);
    this.id = id;
    this.configure(optionsView);
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public getTitle(): string {
    return this.title;
  }

  public setWeight(weight: number): void {
    this.weight = weight;
  }

  public getWeight(): number {
    return this.weight;
  }

  public getId(): number {
    return this.id;
  }

  private configure(OptionsView: OptionsView): void {
    const id = new Component(optionId);
    id.setTextContent(ID_PREFIX + this.getId());
    this.appendChildren([
      id,
      new InputTitle(this),
      new InputWeight(this),
      new DeleteOptionButton(this, OptionsView),
    ]);
  }
}
