import { DIFFCHANGE_INTERVAL } from './constants';
import { Epoch } from './epoch';
import { Sat } from './sat';

export class Height {
  private _epoch?: Epoch;

  constructor(public readonly n: number) {}

  static fromSat(sat: Sat): Height {
    return new Height(
      sat.epoch.startingHeight.n +
        Number(BigInt(sat.epochPosition) / BigInt(sat.epoch.subsidy))
    );
  }

  get epoch() {
    this._epoch = this._epoch ?? Epoch.fromHeight(this);
    return this._epoch;
  }

  get subsidy() {
    return this.epoch.subsidy;
  }
  get startingSat() {
    return this.epoch.startingSat;
  }
  get periodOffset() {
    return this.n % DIFFCHANGE_INTERVAL;
  }
}
