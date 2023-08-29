import test from 'ava';

import { Height } from '../height';

test('epoch.constructor', async (t) => {
    t.is(new Height(0).n, 0);
    t.is(new Height(1).n, 1);
});
