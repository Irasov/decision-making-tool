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
const TYPE_BLOB = 'application/json';
const LINK = 'a';
const FILE_NAME = 'option-list.json';

export type typeObj = {
  id: number;
  title: string;
  weight: number;
};

type optionsJson = {
  options: typeObj[];
  lastIndex: number;
};

export default class OptionsView extends View {
  private optionsBlock: Component;
  private options: Map<number, Option> = new Map();
  private idOptions: number = 0;
  private jsonOptions: optionsJson = {
    options: [
      {
        id: 0,
        title: '',
        weight: 0,
      },
    ],
    lastIndex: 0,
  };

  constructor(router: Router) {
    super(options);
    this.optionsBlock = new Component(optionsDiv);
    this.configure(router);
  }

  public static readFileAsJson(file: File): Promise<optionsJson> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (): void => {
        try {
          resolve(JSON.parse(reader.result as string));
        } catch (error) {
          throw new Error('Error Download JSON' + String(error));
        }
      };
      reader.onerror = (): void => reject(reader.error);
      reader.readAsText(file);
    });
  }

  public setOption(id: number, option: Option): void {
    this.options.set(id, option);
  }

  public removeOption(key: number): void {
    this.options.delete(key);
  }

  public removeOptions(): void {
    this.optionsBlock.destroyChildren();
    this.options.clear();
    this.idOptions = 0;
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

  public dataJson(): void {
    let optionsJson: typeObj[] = [];
    this.options.forEach((e) => {
      const obj = {
        id: e.getId(),
        title: e.getTitle(),
        weight: e.getWeight(),
      };
      optionsJson.push(obj);
    });
    const allJson = {
      options: optionsJson,
      lastIndex: this.getIdOptions(),
    };
    const data = JSON.stringify(allJson, null);
    const blob = new Blob([data], { type: TYPE_BLOB });
    const url = URL.createObjectURL(blob);
    const a = document.createElement(LINK);
    a.href = url;
    a.download = FILE_NAME;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  public loadDataJson(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.style.display = 'none';
    document.body.appendChild(input);
    input.addEventListener('change', this.handleFileUpload.bind(this));
    input.click();
    document.body.removeChild(input);
  }

  public async handleFileUpload(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    try {
      this.jsonOptions = await OptionsView.readFileAsJson(file);
      this.jsonRender(this.jsonOptions);
    } catch (error) {
      throw new Error('Error Download JSON' + String(error));
    }
  }

  public jsonRender(data: optionsJson): void {
    this.removeOptions();
    this.idOptions = data.lastIndex;
    data.options.forEach((e) => {
      const option = new Option(e.id, this);
      option.setTitle(e.title);
      option.setWeight(e.weight);
      option.getChildren().forEach((child) => {
        const weight = child.getNode() as HTMLInputElement;
        if (weight.classList.contains(CLASS_WEIGHT))
          weight.value = String(e.weight);
        if (weight.classList.contains(CLASS_TTILE)) weight.value = e.title;
      });
      this.setOption(e.id, option);
      this.addOption(option);
    });
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
      new ClearButton(this),
      new SaveButton(this),
      new LoadButton(this),
      new StartButton(router),
    ]);
  }
}
