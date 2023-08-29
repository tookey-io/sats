import {
    CYCLE_EPOCHS,
    DIFFCHANGE_INTERVAL,
    SUBSIDY_HALVING_INTERVAL,
} from './constants';

import { Sat } from './index';

export class Degree {
    constructor(
        public readonly hour: number,
        public readonly minute: number,
        public readonly second: number,
        public readonly third: number
    ) {}

    static fromSat(sat: Sat): Degree {
        const height = sat.height.n;
        return new Degree(
            Math.floor(height / (CYCLE_EPOCHS * SUBSIDY_HALVING_INTERVAL)),
            height % SUBSIDY_HALVING_INTERVAL,
            height % DIFFCHANGE_INTERVAL,
            sat.third
        );
    }

    toString(): string {
        return `${this.hour}°${this.minute}′${this.second}″${this.third}‴`;
    }
}
