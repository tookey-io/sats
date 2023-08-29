import test from 'ava';

import {
    COIN_VALUE,
    CYCLE_EPOCHS,
    DIFFCHANGE_INTERVAL,
    LAST,
    SUBSIDY_HALVING_INTERVAL,
    SUPPLY,
} from '../constants';
import { Epoch } from '../epoch';
import { Height } from '../height';
import { Sat } from '../sat';

test('constructor', async (t) => {
    t.is(new Sat(1).n, 1);
    t.is(new Sat(100).n, 100);
    t.throws(() => new Sat(-1), { message: 'Sat must be positive' });
    t.throws(() => new Sat(0.5), { message: 'Sat must be an integer' });
    t.throws(() => new Sat(2099999997690000 + 1), {
        message: 'Sat must be less than supply',
    });
});

test('height', async (t) => {
    t.is(new Sat(0).height.n, 0);
    t.is(new Sat(1).height.n, 0);
    t.is(new Sat(new Epoch(0).subsidy).height.n, 1);
    t.is(new Sat(new Epoch(0).subsidy * 2).height.n, 2);

    t.is(new Epoch(2).startingSat.height.n, SUBSIDY_HALVING_INTERVAL * 2);

    t.is(new Sat(2099999997689999).height.n, 6929999);
    t.is(new Sat(2099999997689998).height.n, 6929998);
    t.is(new Sat(50 * COIN_VALUE).height.n, 1);
});

test('name', async (t) => {
    t.is(new Sat(0).name, 'nvtdijuwxlp');
    t.is(new Sat(1).name, 'nvtdijuwxlo');
    t.is(new Sat(26).name, 'nvtdijuwxkp');
    t.is(new Sat(27).name, 'nvtdijuwxko');
    t.is(new Sat(2099999997689999).name, 'a');
    t.is(new Sat(2099999997689999 - 1).name, 'b');
    t.is(new Sat(2099999997689999 - 25).name, 'z');
    t.is(new Sat(2099999997689999 - 26).name, 'aa');
});

test('degree', async (t) => {
    t.is(new Sat(0).degree.toString(), '0°0′0″0‴');
    t.is(new Sat(1).degree.toString(), '0°0′0″1‴');
    t.is(new Sat(50 * COIN_VALUE - 1).degree.toString(), '0°0′0″4999999999‴');
    t.is(new Sat(50 * COIN_VALUE).degree.toString(), '0°1′1″0‴');
    t.is(new Sat(50 * COIN_VALUE + 1).degree.toString(), '0°1′1″1‴');
    t.is(
        new Sat(50 * COIN_VALUE * DIFFCHANGE_INTERVAL - 1).degree.toString(),
        '0°2015′2015″4999999999‴'
    );
    t.is(
        new Sat(50 * COIN_VALUE * DIFFCHANGE_INTERVAL).degree.toString(),
        '0°2016′0″0‴'
    );
    t.is(
        new Sat(50 * COIN_VALUE * DIFFCHANGE_INTERVAL + 1).degree.toString(),
        '0°2016′0″1‴'
    );
    t.is(
        new Sat(
            50 * COIN_VALUE * SUBSIDY_HALVING_INTERVAL - 1
        ).degree.toString(),
        '0°209999′335″4999999999‴'
    );
    t.is(
        new Sat(50 * COIN_VALUE * SUBSIDY_HALVING_INTERVAL).degree.toString(),
        '0°0′336″0‴'
    );
    t.is(
        new Sat(
            50 * COIN_VALUE * SUBSIDY_HALVING_INTERVAL + 1
        ).degree.toString(),
        '0°0′336″1‴'
    );
    t.is(
        new Sat(2067187500000000 - 1).degree.toString(),
        '0°209999′2015″156249999‴'
    );
    t.is(new Sat(2067187500000000).degree.toString(), '1°0′0″0‴');
    t.is(new Sat(2067187500000000 + 1).degree.toString(), '1°0′0″1‴');
    t.is(new Sat(1054200000000000).degree.toString(), '0°1680′0″0‴');
    t.is(Sat.fromDegree('0°1680′0″0‴').n, 1054200000000000);
    t.is(Sat.fromDegree('0°122762′794″0‴').n, 1914226250000000);
    t.is(new Sat(1914226250000000).degree.toString(), '0°122762′794″0‴');
});

test('period', async (t) => {
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

test('epoch', async (t) => {
    t.is(new Sat(0).epoch.n, 0);
    t.is(new Sat(1).epoch.n, 0);
    t.is(new Sat(50 * COIN_VALUE * SUBSIDY_HALVING_INTERVAL).epoch.n, 1);
    t.is(new Sat(50 * COIN_VALUE * SUBSIDY_HALVING_INTERVAL - 1).epoch.n, 0);
    t.is(new Sat(2099999997689999).epoch.n, 32);
});

test('epochPosition', async (t) => {
    t.is(new Epoch(0).startingSat.epochPosition, 0);
    t.is(new Sat(new Epoch(0).startingSat.n + 100).epochPosition, 100);
    t.is(new Epoch(1).startingSat.epochPosition, 0);
    t.is(new Epoch(2).startingSat.epochPosition, 0);
});

test('subsidyPosition', async (t) => {
    t.is(new Sat(0).third, 0);
    t.is(new Sat(1).third, 1);
    t.is(new Sat(100).third, 100);
    t.is(new Sat(50 * COIN_VALUE).third, 0);
    t.is(new Sat(50 * COIN_VALUE - 1).third, 4999999999);
    t.is(new Sat(new Height(0).subsidy - 1).third, new Height(0).subsidy - 1);
    t.is(new Sat(new Height(0).subsidy).third, 0);
    t.is(new Sat(new Height(0).subsidy + 1).third, 1);
    t.is(new Sat(new Epoch(1).startingSat.n + new Epoch(1).subsidy).third, 0);
    t.is(new Sat(SUPPLY - 1).third, 0);
});

test('supply', async (t) => {
    let mined = 0;
    for (let height = 0; ; height++) {
        const subsidy = new Height(height).subsidy;
        if (subsidy == 0) {
            break;
        }
        mined += subsidy;
    }
    t.is(SUPPLY, mined);
});

test('parse', async (t) => {
    t.is(Sat.fromString('0.0').n, 0);
    t.is(Sat.fromString('0.1').n, 1);
    t.is(Sat.fromString('1.0').n, 50 * COIN_VALUE);
    t.is(Sat.fromString('6929999.0').n, 2099999997689999);
    t.throws(() => Sat.fromString('0.5000000000'), {
        message: 'Invalid block offset',
    });
    t.throws(() => Sat.fromString('6930000.0'), {
        message: 'Invalid block offset',
    });
    t.is(Sat.fromString('0°0′0″0‴').n, 0);
    t.throws(() => Sat.fromString('0°0′0″').n, {
        message: 'Sat must be an integer',
    });
    t.is(Sat.fromString('0°0′0″1‴').n, 1);
    t.is(Sat.fromString('0°2015′2015″0‴').n, 10075000000000);
    t.is(Sat.fromString('0°2016′0″0‴').n, 10080000000000);
    t.is(Sat.fromString('0°2017′1″0‴').n, 10085000000000);
    t.is(Sat.fromString('0°2016′0″1‴').n, 10080000000001);
    t.is(Sat.fromString('0°2017′1″1‴').n, 10085000000001);
    t.is(Sat.fromString('0°209999′335″0‴').n, 1049995000000000);
    t.is(Sat.fromString('0°0′336″0‴').n, 1050000000000000);
    t.is(Sat.fromString('0°0′672″0‴').n, 1575000000000000);
    t.is(Sat.fromString('0°209999′1007″0‴').n, 1837498750000000);
    t.is(Sat.fromString('0°0′1008″0‴').n, 1837500000000000);
    t.is(Sat.fromString('1°0′0″0‴').n, 2067187500000000);
    t.is(Sat.fromString('2°0′0″0‴').n, 2099487304530000);
    t.is(Sat.fromString('3°0′0″0‴').n, 2099991988080000);
    t.is(Sat.fromString('4°0′0″0‴').n, 2099999873370000);
    t.is(Sat.fromString('5°0′0″0‴').n, 2099999996220000);
    t.is(Sat.fromString('5°0′336″0‴').n, 2099999997060000);
    t.is(Sat.fromString('5°0′672″0‴').n, 2099999997480000);
    t.is(Sat.fromString('5°1′673″0‴').n, 2099999997480001);
    t.is(Sat.fromString('5°209999′1007″0‴').n, 2099999997689999);

    t.is(Sat.fromString('0').n, 0);
    t.is(Sat.fromString('2099999997689999').n, 2099999997689999);
    t.throws(() => Sat.fromString('2099999997690000'), {
        message: 'Sat must be less than supply',
    });
    t.throws(() => Sat.fromString('6°0′0″0‴'), {
        message: 'Invalid block offset',
    });
    t.throws(() => Sat.fromString('0°210000′336″0‴'), {
        message: 'Invalid epoch offset',
    });
    t.throws(() => Sat.fromString('0°2016′2016″0‴'), {
        message: 'Invalid period offset',
    });
});

test('degree invalid block offset', async (t) => {
    t.notThrows(() => Sat.fromString('0°0′0″4999999999‴'));
    t.throws(() => Sat.fromString('0°0′0″5000000000‴'), {
        message: 'Invalid block offset',
    });
    t.notThrows(() => Sat.fromString('0°209999′335″4999999999‴'));
    t.throws(() => Sat.fromString('0°0′336″4999999999‴'), {
        message: 'Invalid block offset',
    });
});

test('degree invalid period block relationship', async (t) => {
    t.notThrows(() => Sat.fromString('0°2015′2015″0‴'));
    t.notThrows(() => Sat.fromString('0°2016′0″0‴'));
    t.throws(() => Sat.fromString('0°2016′1″0‴'), {
        message:
            'Relationship between epoch offset and period offset must be multiple of 336',
    });
    t.notThrows(() => Sat.fromString('0°0′336″0‴'));
});

test('degree invalid post distribution', async (t) => {
    t.notThrows(() => Sat.fromString('0°209999′1007″0‴'));
    t.throws(() => Sat.fromString('5°0′1008″0‴'), {
        message: 'Invalid block offset',
    });
});

test('from name', async (t) => {
    t.is(Sat.fromName('nvtdijuwxlp').n, 0);
    t.is(Sat.fromName('a').n, 2099999997689999);
    t.throws(() => Sat.fromName('('), {
        message: 'Invalid character in sat name: (',
    });
    t.throws(() => Sat.fromName(''), { message: 'Invalid name' });
    t.throws(() => Sat.fromName('nvtdijuwxlq'), {
        message: 'Sat must be positive',
    });
});

test('cycle', async (t) => {
    t.is((SUBSIDY_HALVING_INTERVAL * CYCLE_EPOCHS) % DIFFCHANGE_INTERVAL, 0);

    for (let i = 1; i < CYCLE_EPOCHS; i++) {
        t.not((SUBSIDY_HALVING_INTERVAL * i) % DIFFCHANGE_INTERVAL, 0);
    }

    t.is((CYCLE_EPOCHS * SUBSIDY_HALVING_INTERVAL) % DIFFCHANGE_INTERVAL, 0);

    t.is(new Sat(0).cycle, 0);
    t.is(new Sat(2067187500000000 - 1).cycle, 0);
    t.is(new Sat(2067187500000000).cycle, 1);
    t.is(new Sat(2067187500000000 + 1).cycle, 1);
});

test('third', async (t) => {
    t.is(new Sat(0).third, 0);
    t.is(new Sat(50 * COIN_VALUE - 1).third, 4999999999);
    t.is(new Sat(50 * COIN_VALUE).third, 0);
    t.is(new Sat(50 * COIN_VALUE + 1).third, 1);
});

test('percentile', async (t) => {
    t.is(new Sat(0).percentile, '0%');
    t.is(new Sat(Number(BigInt(LAST) / 2n)).percentile, '49.99999999999998%');
    t.is(new Sat(LAST).percentile, '100%');
});

test('isCommon', async (t) => {
    t.false(new Sat(0).isCommon);
    t.true(new Sat(1).isCommon);
    t.true(new Sat(50 * COIN_VALUE - 1).isCommon);
    t.false(new Sat(50 * COIN_VALUE).isCommon);
    t.true(new Sat(50 * COIN_VALUE + 1).isCommon);
    t.true(new Sat(2067187500000000 - 1).isCommon);
    t.false(new Sat(2067187500000000).isCommon);
    t.true(new Sat(2067187500000000 + 1).isCommon);
});
