import {
    CYCLE_EPOCHS,
    DIFFCHANGE_INTERVAL,
    LAST,
    SUBSIDY_HALVING_INTERVAL,
    SUPPLY,
} from './constants';

import { Decimal, Degree, Epoch, Height } from './index';

export class Sat {
    private _epoch?: Epoch;
    private _height?: Height;
    private _degree?: Degree;
    private _decimal?: Decimal;
    private _name?: string;

    constructor(public readonly n: number) {
        if (n < 0) throw new Error('Sat must be positive');
        if (!Number.isInteger(n)) throw new Error('Sat must be an integer');
        if (n >= SUPPLY) throw new Error('Sat must be less than supply');
    }

    // Returns the percentile representation of this satoshi.
    //
    // @example
    // ```ts
    // import test from 'ava'
    // import { Sat, LAST, COIN_VALUE, SUBSIDY_HALVING_INTERVAL } from '@tookey-io/sats'
    //
    // test('example', async (t) => {
    //     t.is(new Sat(0).percentile, '0%')
    //     t.is(new Sat(Number(BigInt(LAST) / 2n)).percentile, '49.99999999999998%')
    //     t.is(new Sat(LAST).percentile, '100%')
    // })
    // ```
    get percentile() {
        const big = (this.n / LAST) * 100;

        return `${big.toString()}%`;
    }

    /**
     * Returns {@link Decimal} representation of this {@link Sat}.
     * @date 29/08/2023 - 12:23:33
     * @example
     * ```ts
     * deepEqual(new Sat(0).decimal, new Decimal(0, 0));
     * deepEqual(new Sat(1).decimal, new Decimal(0, 1));
     * deepEqual(new Sat(50 * 1_0000_0000).decimal, new Decimal(1, 0));
     * deepEqual(new Sat(2099999997689999).decimal, new Decimal(6929999, 0));
     * ```
     * @returns {Decimal}
     */
    get decimal() {
        this._decimal = this._decimal ?? Decimal.fromSat(this);
        return this._decimal;
    }

    get degree() {
        this._degree = this._degree ?? Degree.fromSat(this);
        return this._degree;
    }

    /**
     * Returns the {@link Epoch} where this satoshi was mined.
     * @date 29/08/2023 - 12:24:49
     *
     * @example
     * ```ts
     * t.deepEqual(new Sat(0).epoch, new Epoch(0));
     * t.deepEqual(new Sat(1).epoch, new Epoch(0));
     * t.is(new Sat(1).epoch.n, 0);
     * t.is(new Sat(50 * COIN_VALUE * SUBSIDY_HALVING_INTERVAL).epoch.n, 1);
     * t.is(new Sat(50 * COIN_VALUE * SUBSIDY_HALVING_INTERVAL - 1).epoch.n, 0);
     * t.is(new Sat(2099999997689999).epoch.n, 32);
     * ```
     * @readonly
     * @type {Epoch}
     */
    get epoch() {
        this._epoch = this._epoch ?? Epoch.fromSat(this);
        return this._epoch;
    }

    /**
   * Returns the block height where this satoshi was mined.
   * 
   * @example
   * ```ts
import test from 'ava'
import { Sat, LAST, COIN_VALUE, SUBSIDY_HALVING_INTERVAL } from '@tookey-io/sats'

test('example', async (t) => {
    t.is(new Sat(0).height.n, 0)
    t.is(new Sat(1).height.n, 0)
    t.is(new Sat(50 * COIN_VALUE * SUBSIDY_HALVING_INTERVAL).height.n, 210000)
    t.is(new Sat(50 * COIN_VALUE).height.n, 1)
})
   */
    get height() {
        this._height = this._height ?? Height.fromSat(this);
        return this._height;
    }

    /**
   * Returns the cycle of this satoshi.
   * 
   * @example
   * ```ts
import test from 'ava';
import { Sat } from '@tookey-io/sats';

test('example', async (t) => {
    t.is(new Sat(0).cycle, 0);
    t.is(new Sat(2067187500000000 - 1).cycle, 0);
    t.is(new Sat(2067187500000000).cycle, 1);
    t.is(new Sat(2067187500000000 + 1).cycle, 1);
});
   * ```
   */
    get cycle() {
        return Math.floor(this.epoch.n / CYCLE_EPOCHS);
    }

    /**
   * Returns the number of the block in difficulty change period where this satoshi was mined.
   * 
   * @example
   * ```ts
import { Sat } from '@tookey-io/sats';
import test from 'ava';

test('example', async (t) => {
    t.is(new Sat(0).period, 0);
    t.is(new Sat(10080000000000).period, 1);
    t.is(new Sat(2099999997689999).period, 3437);
    t.is(new Sat(10075000000000).period, 0);
    t.is(new Sat(10080000000000 - 1).period, 0);
    t.is(new Sat(10080000000000).period, 1);
    t.is(new Sat(10080000000000 + 1).period, 1);
    t.is(new Sat(10085000000000).period, 1);
    t.is(new Sat(2099999997689999).period, 3437);
});
   * ```
   */
    get period() {
        return Math.floor(this.height.n / DIFFCHANGE_INTERVAL);
    }

    /**
     * Returns the offset in the coinbase transaction where this satoshi was mined.
     * 
     * @example
     * ```ts
import test from 'ava';
import { Sat } from '@tookey-io/sats';

test('example', async (t) => {
    t.is(new Sat(0).third, 0);
    t.is(new Sat(1).third, 1);
    t.is(new Sat(100).third, 100);
    t.is(new Sat(50 * COIN_VALUE).third, 0);
    t.is(new Sat(50 * COIN_VALUE - 1).third, 4999999999);
});
     * ```
     */
    get third() {
        return this.epochPosition % this.epoch.subsidy;
    }

    /**
     * Returns the position of this satoshi in the current epoch.
     * 
     * @example
     * ```ts
import test from 'ava';
import { Sat } from '@tookey-io/sats';

test('example', async (t) => {
    t.is(new Epoch(0).startingSat.epochPosition, 0);
    t.is(new Sat(new Epoch(0).startingSat.n + 100).epochPosition, 100);
    t.is(new Epoch(1).startingSat.epochPosition, 0);
    t.is(new Epoch(2).startingSat.epochPosition, 0);
});
     * ```
     */
    get epochPosition() {
        return this.n - this.epoch.startingSat.n;
    }

    get rarity(): string {
        throw new Error('Not implemented');
    }

    get isCommon() {
        return (this.n - this.epoch.startingSat.n) % this.epoch.subsidy != 0;
    }

    /**
     * Returns the name of this satoshi.
     * 
     * @example
     * ```ts
import test from 'ava';
import { Sat } from '@tookey-io/sats';

test('example', async (t) => {
    t.is(new Sat(0).name, 'nvtdijuwxlp');
    t.is(new Sat(1).name, 'nvtdijuwxlo');
    t.is(new Sat(26).name, 'nvtdijuwxkp');
    t.is(new Sat(27).name, 'nvtdijuwxko');
    t.is(new Sat(2099999997689999).name, 'a');
    t.is(new Sat(2099999997689999 - 1).name, 'b');
    t.is(new Sat(2099999997689999 - 25).name, 'z');
    t.is(new Sat(2099999997689999 - 26).name, 'aa');
});
     * ```
     */
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

    /**
     * Creates {@link Sat} from a name.
     *
     * @param name a-z representation of the satoshi
     * @returns {@link Sat}
     */
    static fromName(name: string): Sat {
        if (name === '' || !name) throw new Error('Invalid name');
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
        const HALVING_INCREMENT =
            SUBSIDY_HALVING_INTERVAL % DIFFCHANGE_INTERVAL;
        const relationship =
            periodOffset +
            SUBSIDY_HALVING_INTERVAL * CYCLE_EPOCHS -
            epochOffset;
        if (relationship % HALVING_INCREMENT != 0) {
            throw new Error(
                'Relationship between epoch offset and period offset must be multiple of 336'
            );
        }

        const epochsSinceCycleStart = Number(
            BigInt(relationship % DIFFCHANGE_INTERVAL) /
                BigInt(HALVING_INCREMENT)
        );
        const epoch = cycleStartEpoch + epochsSinceCycleStart;
        const height = new Height(
            epoch * SUBSIDY_HALVING_INTERVAL + epochOffset
        );
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
