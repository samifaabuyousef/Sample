import {ContainerFieldsBase} from '../services/container-fields';
import {NodeElementBase} from '../services/node-element';

export class SliderOptions {
  invert?: boolean;
  max?: number;
  min?: number;
  step?: number;
  thumbLabel?: boolean;
  tickInterval?: number | 'auto';
  vertical?: boolean;
}
export class SliderConfig {
  invert: boolean;
  max: number;
  min: number;
  step: number;
  thumbLabel: boolean;
  tickInterval: number | 'auto';
  vertical: boolean;

  constructor(options: SliderOptions = {}) {
    this.invert = options.invert || false;
    this.max = options.max || 100;
    this.min = options.min || 1;
    this.step = options.step || 1;
    this.thumbLabel = options.thumbLabel || false;
    this.tickInterval = options.tickInterval || 0;
    this.vertical = options.vertical || false;
  }
}
