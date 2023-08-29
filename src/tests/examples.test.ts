import {
    COIN_VALUE,
    Decimal,
    Epoch,
    Sat,
    SUBSIDY_HALVING_INTERVAL,
} from '@tookey-io/sats';
import test from 'ava';

test('decimal', async (t) => {
    t.deepEqual(new Sat(0).decimal, new Decimal(0, 0));
    t.deepEqual(new Sat(1).decimal, new Decimal(0, 1));
    t.deepEqual(new Sat(50 * 1_0000_0000).decimal, new Decimal(1, 0));
    t.deepEqual(new Sat(2099999997689999).decimal, new Decimal(6929999, 0));
});

test('degree', async (t) => {
    t.is(new Sat(0).degree.toString(), '0°0′0″0‴');
});

test('epoch', async (t) => {
    t.deepEqual(new Sat(0).epoch, new Epoch(0));
    t.deepEqual(new Sat(1).epoch, new Epoch(0));
    t.is(new Sat(1).epoch.n, 0);
    t.is(new Sat(50 * COIN_VALUE * SUBSIDY_HALVING_INTERVAL).epoch.n, 1);
    t.is(new Sat(50 * COIN_VALUE * SUBSIDY_HALVING_INTERVAL - 1).epoch.n, 0);
    t.is(new Sat(2099999997689999).epoch.n, 32);
});
