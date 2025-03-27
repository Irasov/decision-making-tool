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
  private rotation = 0;
  private spinning = false;
  private spinTime = 0;
  private spinTotalTime = 0;
  private spinVelocity = 0;
  private options: [number, string, number][];
  private colors: string[] = [];
  private callback: (sector: string) => void;

  constructor(
    options: [number, string, number][],
    callback: (sector: string) => void
  ) {
    super(optionId);
    this.options = options;
    this.callback = callback;
    this.colors = options.map(() => Wheel.randomColor());
    this.configure();
  }

  private static randomColor(): string {
    let color = PREFIX_COLOR;
    for (let i = 0; i < LENGTH_COLOR; i++) {
      color += LETTERS_COLOR[Math.floor(Math.random() * LETTERS_COLOR.length)];
    }
    return color;
  }

  public spin(): void {
    if (this.spinning) return;

    this.spinning = true;
    this.spinTime = 0;
    this.spinTotalTime = 3000 + Math.random() * 2000;
    this.spinVelocity = 0.2 + Math.random() * 0.3;
    this.animateSpin();
  }

  private draw(): void {
    const wheel = this.getNode() as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = wheel.getContext('2d')!;
    ctx.clearRect(0, 0, wheel.width, wheel.height);

    let startAngle = this.rotation;
    const totalWeight = this.options.reduce(
      (sum, option) => sum + option[WEIGHT_OPTION],
      0
    );

    this.options.forEach((option, index) => {
      const sliceAngle = (2 * Math.PI * option[WEIGHT_OPTION]) / totalWeight;
      ctx.fillStyle = this.colors[index];
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
      ctx.stroke();
      startAngle += sliceAngle;
    });

    startAngle = this.rotation;
    this.options.forEach((option) => {
      const sliceAngle = (2 * Math.PI * option[WEIGHT_OPTION]) / totalWeight;
      const middleAngle = startAngle + sliceAngle / 2;
      const radius = Math.min(wheel.width, wheel.height) / 2;
      const labelRadius = radius * 0.7;
      const textX = wheel.width / 2 + Math.cos(middleAngle) * labelRadius;
      const textY = wheel.height / 2 + Math.sin(middleAngle) * labelRadius;
      ctx.fillStyle = '#000';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(option[1], textX, textY);
      startAngle += sliceAngle;
    });

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(wheel.width / 2, wheel.height / 2, 20, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(wheel.width / 2, 50);
    ctx.lineTo(wheel.width / 2 + 15, 0);
    ctx.lineTo(wheel.width / 2 - 15, 0);
    ctx.closePath();
    ctx.fill();
  }

  private animateSpin(): void {
    if (!this.spinning) return;

    this.spinTime += 16;
    if (this.spinTime >= this.spinTotalTime) {
      this.spinning = false;
      this.findWinningSector();
      return;
    }

    this.spinVelocity *= 0.98;
    this.rotation += this.spinVelocity;

    this.draw();
    requestAnimationFrame(() => this.animateSpin());
  }

  private findWinningSector(): void {
    const normalizedRotation =
      ((this.rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const pointerAngle = -Math.PI / 2;
    const sectorAngle =
      (pointerAngle - normalizedRotation + 2 * Math.PI) % (2 * Math.PI);
    const totalWeight = this.options.reduce(
      (sum, option) => sum + option[WEIGHT_OPTION],
      0
    );
    let currentAngle = 0;
    for (const option of this.options) {
      const sliceAngle = (2 * Math.PI * option[WEIGHT_OPTION]) / totalWeight;
      if (
        sectorAngle >= currentAngle &&
        sectorAngle < currentAngle + sliceAngle
      ) {
        this.callback(option[1]);
        return;
      }
      currentAngle += sliceAngle;
    }

    this.callback(this.options[this.options.length - 1][1]);
  }

  private configure(): void {
    const wheel = this.getNode() as HTMLCanvasElement;
    wheel.width = 500;
    wheel.height = 500;
    this.draw();
  }
}
