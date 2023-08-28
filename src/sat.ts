import {
  CYCLE_EPOCHS,
  DIFFCHANGE_INTERVAL,
  SUBSIDY_HALVING_INTERVAL,
  SUPPLY,
} from './constants';
import { Decimal } from './decimal';
import { Degree } from './degree';
import { Epoch } from './epoch';
import { Height } from './height';

export class Sat {
  private _epoch?: Epoch;
  private _height?: Height;
  private _degree?: Degree;
  private _decimal?: Decimal;
  private _name?: string;

  constructor(public readonly n: number) {
    if (n < 0) throw new Error('Sat must be positive');
    if (!Number.isInteger(n)) throw new Error('Sat must be an integer');
    if (n > SUPPLY) throw new Error('Sat must be less than supply');
  }

  get decimal() {
    this._decimal = this._decimal ?? Decimal.fromSat(this);
    return this._decimal;
  }
  get degree() {
    this._degree = this._degree ?? Degree.fromSat(this);
    return this._degree;
  }

  get epoch() {
    this._epoch = this._epoch ?? Epoch.fromSat(this);
    return this._epoch;
  }
  get height() {
    this._height = this._height ?? Height.fromSat(this);
    return this._height;
  }

  get cycle() {
    return Math.floor(this.epoch.n / CYCLE_EPOCHS);
  }

  get period() {
    return Math.floor(this.height.n / DIFFCHANGE_INTERVAL);
  }

  get third() {
    return this.epochPosition % this.epoch.subsidy;
  }

  get epochPosition() {
    return this.n - this.epoch.startingSat.n;
  }

  get rarity(): string {
    throw new Error('Not implemented');
  }

  get isCommon() {
    return (this.n - this.epoch.startingSat.n) % this.epoch.subsidy != 0;
  }

  get name() {
    if (typeof this._name === 'undefined') {
      let x = BigInt(SUPPLY - this.n);
      const name: string[] = [];
      while (x > 0) {
        name.push('abcdefghijklmnopqrstuvwxyz'[Number((x - 1n) % 26n)]);
        x = (x - 1n) / 26n;
      }
      this._name = name.reverse().join('');
    }
    return this._name;
  }

  toString(): string {
    return this.degree.toString();
  }

  static fromName(name: string): Sat {
    let x = 0;
    for (const c of name) {
      if (c < 'a' || c > 'z') {
        throw new Error('Invalid character in sat name: ' + c);
      }
      x = x * 26 + c.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    }

    return new Sat(SUPPLY - x);
  }

  static fromDegree(degree: string): Sat {
    const [cycleNumberStr, restOffset] = degree.split('°');
    const cycleNumber = parseInt(cycleNumberStr);
    const [epochOffsetStr, restPeriod] = restOffset.split('′');
    const epochOffset = parseInt(epochOffsetStr);

    if (epochOffset >= SUBSIDY_HALVING_INTERVAL) {
      throw new Error('Invalid epoch offset');
    }

    const [periodOffsetStr, restBlock] = restPeriod.split('″');
    const periodOffset = parseInt(periodOffsetStr);
    if (periodOffset >= DIFFCHANGE_INTERVAL) {
      throw new Error('Invalid period offset');
    }

    const cycleStartEpoch = cycleNumber * CYCLE_EPOCHS;
    const HALVING_INCREMENT = SUBSIDY_HALVING_INTERVAL % DIFFCHANGE_INTERVAL;
    const relationship =
      periodOffset + SUBSIDY_HALVING_INTERVAL * CYCLE_EPOCHS - epochOffset;
    if (relationship % HALVING_INCREMENT != 0) {
      throw new Error(
        'Relationship between epoch offset and period offset must be multiple of 336'
      );
    }

    const epochsSinceCycleStart = Number(
      BigInt(relationship % DIFFCHANGE_INTERVAL) / BigInt(HALVING_INCREMENT)
    );
    const epoch = cycleStartEpoch + epochsSinceCycleStart;
    const height = new Height(epoch * SUBSIDY_HALVING_INTERVAL + epochOffset);
    const [blockOffsetStr] = restBlock.split('‴');
    const blockOffset = parseInt(blockOffsetStr);
    if (blockOffset >= height.subsidy) {
      throw new Error('Invalid block offset');
    }
    return new Sat(height.startingSat.n + blockOffset);
  }

  static fromDecimal(decimal: string): Sat {
    const [heightStr, offsetStr] = decimal.split('.');
    const height = new Height(parseInt(heightStr));
    const offset = parseInt(offsetStr);
    if (offset >= height.subsidy) {
      throw new Error('Invalid block offset');
    }
    return new Sat(height.startingSat.n + offset);
  }

  static fromPercentile(percentile: string): Sat {
    if (!percentile.endsWith('%')) {
      throw new Error('Invalid percentile: ' + percentile);
    }

    const percentileNum = parseFloat(percentile.slice(0, -1));
    if (percentileNum < 0) {
      throw new Error('Invalid percentile: ' + percentile);
    }

    const last = SUPPLY - 1;

    const n = Math.round((percentileNum / 100) * last);

    if (n > last) {
      throw new Error('Invalid percentile: ' + percentile);
    }

    return new Sat(n);
  }

  static fromString(sat: string): Sat {
    if (sat.match(/[a-z]/)) {
      return Sat.fromName(sat);
    } else if (sat.includes('%')) {
      return Sat.fromPercentile(sat);
    } else if (sat.includes('.')) {
      return Sat.fromDecimal(sat);
    } else if (sat.includes('°')) {
      return Sat.fromDegree(sat);
    } else {
      return new Sat(parseInt(sat));
    }
  }
}
