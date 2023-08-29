import {
    COIN_VALUE,
    FIRST_POST_SUBSIDY,
    STARTING_SATS,
    SUBSIDY_HALVING_INTERVAL,
} from './constants';

import { Height, Sat } from './index';

export class Epoch {
    private _height?: Height;

    constructor(public readonly n: number) {
        if (n < 0) throw new Error('Epoch must be positive');
        if (!Number.isInteger(n)) throw new Error('Epoch must be an integer');
    }

    static fromSat(sat: Sat): Epoch {
        let epoch = STARTING_SATS.findIndex((s) => sat.n < s) - 1;
        if (epoch < 0) {
            epoch = 33;
        }
        return new Epoch(epoch);
    }

    static fromHeight(height: Height): Epoch {
        return new Epoch(Math.floor(height.n / SUBSIDY_HALVING_INTERVAL));
    }

    public get subsidy() {
        if (this.n < FIRST_POST_SUBSIDY) {
            return Number(BigInt(50 * COIN_VALUE) >> BigInt(this.n));
        } else {
            return 0;
        }
    }

    public get startingSat(): Sat {
        return new Sat(STARTING_SATS[this.n]);
    }

    public get startingHeight(): Height {
        this._height =
            this._height ?? new Height(this.n * SUBSIDY_HALVING_INTERVAL);
        return this._height;
    }
}
