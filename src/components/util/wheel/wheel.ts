import Component from '../component';
import type { typeHTMLElement } from '../component';

const optionId: typeHTMLElement = {
  tag: 'canvas',
  content: '',
  classes: ['decision__Wheel'],
};

const LETTERS_COLOR = '0123456789ABCDEF';
const PREFIX_COLOR = '#';
const LENGTH_COLOR = 6;
const WEIGHT_OPTION = 2;

export default class Wheel extends Component {
  constructor(options: [number, string, number][]) {
    super(optionId);
    this.configure(options);
  }

  private static randomColor(): string {
    let color = PREFIX_COLOR;
    for (let i = 0; i < LENGTH_COLOR; i += 1) {
      color += LETTERS_COLOR[Math.floor(Math.random() * LETTERS_COLOR.length)];
    }
    return color;
  }

  private static draw(
    wheel: HTMLCanvasElement,
    options: [number, string, number][]
  ): void {
    const ctx: CanvasRenderingContext2D = wheel.getContext('2d')!;
    ctx.clearRect(0, 0, wheel.width, wheel.height);
    let startAngle = 0;
    const totalWeight = options.reduce(
      (sum: number, option: [number, string, number]) =>
        sum + option[WEIGHT_OPTION],
      0
    );
    options.forEach((option) => {
      const sliceAngle = (2 * Math.PI * option[WEIGHT_OPTION]) / totalWeight;
      ctx.fillStyle = Wheel.randomColor();
      ctx.beginPath();
      ctx.moveTo(wheel.width / 2, wheel.height / 2);
      ctx.arc(
        wheel.width / 2,
        wheel.height / 2,
        Math.min(wheel.width, wheel.height) / 2,
        startAngle,
        startAngle + sliceAngle
      );
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.stroke();
      startAngle += sliceAngle;
    });
    startAngle = 0;
    options.forEach((option) => {
      const sliceAngle = (2 * Math.PI * option[2]) / totalWeight;
      const middleAngle = startAngle + sliceAngle / 2;
      const radius = Math.min(wheel.width, wheel.height) / 2;
      const labelRadius = radius * 0.7;
      const textX = wheel.width / 2 + Math.cos(middleAngle) * labelRadius;
      const textY = wheel.height / 2 + Math.sin(middleAngle) * labelRadius;
      ctx.fillStyle = '#000';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(option[1], textX, textY);
      startAngle += sliceAngle;
    });
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(wheel.width / 2, wheel.height / 2, 50, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(wheel.width / 2, 0);
    ctx.lineTo(wheel.width / 2 + 50, 0);
    ctx.lineTo(wheel.width / 2, 50);
    ctx.lineTo(wheel.width / 2 - 50, 0);
    ctx.closePath();
    ctx.fill();
  }

  private configure(options: [number, string, number][]): void {
    const wheel = this.getNode() as HTMLCanvasElement;
    wheel.width = 500;
    wheel.height = 500;
    Wheel.draw(wheel, options);
  }
}
