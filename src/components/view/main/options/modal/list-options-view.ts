import View from '../../../view';
import Component from '../../../../util/component';
import type { typeHTMLElement } from '../../../../util/component';
import { Events } from '../../../../util/events-const';
import './list-options.scss';
import type OptionsView from '../options-view';

const modal: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['options__modal', 'modal'],
};

const confirm: typeHTMLElement = {
  tag: 'button',
  content: 'Confirm',
  classes: ['modal__btn'],
};

const cancel: typeHTMLElement = {
  tag: 'button',
  content: 'Cancel',
  classes: ['modal__btn'],
};

const control: typeHTMLElement = {
  tag: 'div',
  content: '',
  classes: ['modal__control'],
};

const textField: typeHTMLElement = {
  tag: 'textarea',
  content: '',
  classes: ['modal__text'],
};

const STATUS = 'active';

const attrText = {
  ROW: 'row',
  ROWS: '10',
  PLACEHOLDER: 'placeholder',
  TEXT: `title,1 -> | title |1|;
title with whitespace,2 -> | title with whitespace |2|;`,
};

export default class ListOptions extends View {
  constructor(optionsView: OptionsView) {
    super(modal);
    this.configure(optionsView);
  }

  private static parseValue(value: string): string[][] {
    const parseRow = value.split('\n');
    let parse: string[][] = [];
    parseRow.forEach((e: string) => {
      const arr = e.split(/,(?=\d+$)/);
      parse.push(arr);
    });
    return parse;
  }

  private configure(optionsView: OptionsView): void {
    const text = new Component(textField);
    text.setAttribute(attrText.ROW, attrText.ROWS);
    text.setAttribute(attrText.PLACEHOLDER, attrText.TEXT);
    const btnConfirm = new Component(confirm);
    const btnCancel = new Component(cancel);
    btnCancel.addListner(Events.CLICK, () => {
      const textArea = text.getNode() as HTMLTextAreaElement;
      textArea.value = '';
      this.getComponent().toggleClass(STATUS);
    });
    btnConfirm.addListner(Events.CLICK, () => {
      const textArea = text.getNode() as HTMLTextAreaElement;
      optionsView.setListOptions(ListOptions.parseValue(textArea.value));
      this.getComponent().toggleClass(STATUS);
    });
    const controlBlock = new Component(control, btnConfirm, btnCancel);
    this.getComponent().appendChildren([text, controlBlock]);
  }
}
