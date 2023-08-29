import { Height, Sat } from './index';

export class Decimal {
    public readonly height: Height;

    constructor(block: Height | number, public readonly offset: number) {
        if (typeof block === 'number') {
            this.height = new Height(block);
        } else if (block instanceof Height) {
            this.height = block;
        } else {
            throw new Error('Invalid block');
        }
    }

    static fromSat(sat: Sat): Decimal {
        return new Decimal(sat.height, sat.third);
    }

    toString(): string {
        return `${this.height.n}.${this.offset}`;
    }
}
