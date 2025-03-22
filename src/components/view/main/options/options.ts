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
import type Option from '../../../util/option/option';
import Component from '../../../util/component';

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

export default class OptionsView extends View {
  private optionsBlock: Component;
  private options: Map<number, Option> = new Map();
  private idOptions: number[] = [];
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

  public setIdOptions(): void {
    if (this.idOptions.length > 0) {
      this.idOptions.push(this.idOptions[this.idOptions.length - 1] + 1);
    } else {
      this.idOptions.push(1);
    }
  }

  public getLastIdOptions(): number {
    return this.idOptions[this.idOptions.length - 1];
  }

  public addOption(option: Option): void {
    this.optionsBlock.append(option);
  }

  private configure(router: Router): void {
    this.getComponent().appendChildren([
      this.optionsBlock,
      new AddButton(this),
      new PasteButton(),
      new ClearButton(),
      new SaveButton(),
      new LoadButton(),
      new StartButton(router),
    ]);
  }
}
