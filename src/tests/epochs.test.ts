import test from 'ava';

import { Epoch } from '../index';

test('epoch.constructor', async (t) => {
    t.is(new Epoch(0).n, 0);
    t.is(new Epoch(1).n, 1);
});
