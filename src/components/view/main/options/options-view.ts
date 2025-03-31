import View from '../../view';
import type { typeHTMLElement } from '../../../util/component';
import type Router from '../../../router/router';
import StartButton from '../../../util/buttons/button-start';
import './options.scss';
import AddButton from '../../../util/buttons/button-add';
import PasteButton from '../../../util/buttons/button-paste';
import ClearButton from '../../../util/buttons/button-clear';
import SaveButton from '../../../util/buttons/button-save';
import LoadButton from '../../../util/buttons/button-load';
import Option from '../../../util/option/option';
import Component from '../../../util/component';
import ListOptions from './modal/list-options-view';

const options: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['options'],
};

const optionsDiv: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['options__block'],
};

const CLASS_TTILE = 'input-title';
const CLASS_WEIGHT = 'input-weight';
const TITLE = 0;
const WEIGHT = 1;

export default class OptionsView extends View {
  private optionsBlock: Component;
  private options: Map<number, Option> = new Map();
  private idOptions: number = 0;
  constructor(router: Router) {
    super(options);
    this.optionsBlock = new Component(optionsDiv);
    this.configure(router);
  }

  public setOption(id: number, option: Option): void {
    this.options.set(id, option);
  }

  public removeOption(key: number): void {
    this.options.delete(key);
  }

  public getOptions(): Map<number, Option> {
    return this.options;
  }

  public getDataWeel(): [number, string, number][] {
    return Array.from(this.getOptions(), ([key, value]) => [
      key,
      value.getTitle(),
      value.getWeight(),
    ]);
  }

  public setIdOptions(): void {
    this.idOptions += 1;
  }

  public getIdOptions(): number {
    return this.idOptions;
  }

  public addOption(option: Option): void {
    this.optionsBlock.append(option);
  }

  public setListOptions(list: string[][]): void {
    list.forEach((e) => {
      this.setIdOptions();
      const option = new Option(this.getIdOptions(), this);
      option.setTitle(e[TITLE]);
      option.setWeight(+e[WEIGHT]);
      option.getChildren().forEach((child) => {
        const weight = child.getNode() as HTMLInputElement;
        if (weight.classList.contains(CLASS_WEIGHT)) weight.value = e[WEIGHT];
        if (weight.classList.contains(CLASS_TTILE)) weight.value = e[TITLE];
      });
      this.setOption(this.getIdOptions(), option);
      this.addOption(option);
    });
  }

  private configure(router: Router): void {
    const modalList = new ListOptions(this);
    this.getComponent().appendChildren([
      this.optionsBlock,
      modalList.getComponent(),
      new AddButton(this),
      new PasteButton(modalList),
      new ClearButton(),
      new SaveButton(),
      new LoadButton(),
      new StartButton(router),
    ]);
  }
}
