import test from 'ava';

import { SUBSIDY_HALVING_INTERVAL } from '../constants';
import { Height } from '../height';

test('constructor', async (t) => {
    t.is(new Height(0).n, 0);
    t.is(new Height(1).n, 1);
});

test('subsidy', async (t) => {
    t.is(new Height(0).subsidy, 5000000000);
    t.is(new Height(1).subsidy, 5000000000);
    t.is(new Height(SUBSIDY_HALVING_INTERVAL - 1).subsidy, 5000000000);
    t.is(new Height(SUBSIDY_HALVING_INTERVAL).subsidy, 2500000000);
    t.is(new Height(SUBSIDY_HALVING_INTERVAL + 1).subsidy, 2500000000);
});
// #[test]
// fn subsidy() {
//   assert_eq!(Height(0).subsidy(), 5000000000);
//   assert_eq!(Height(1).subsidy(), 5000000000);
//   assert_eq!(Height(SUBSIDY_HALVING_INTERVAL - 1).subsidy(), 5000000000);
//   assert_eq!(Height(SUBSIDY_HALVING_INTERVAL).subsidy(), 2500000000);
//   assert_eq!(Height(SUBSIDY_HALVING_INTERVAL + 1).subsidy(), 2500000000);
// }

// #[test]
// fn starting_sat() {
//   assert_eq!(Height(0).starting_sat(), 0);
//   assert_eq!(Height(1).starting_sat(), 5000000000);
//   assert_eq!(
//     Height(SUBSIDY_HALVING_INTERVAL - 1).starting_sat(),
//     (SUBSIDY_HALVING_INTERVAL - 1) * 5000000000
//   );
//   assert_eq!(
//     Height(SUBSIDY_HALVING_INTERVAL).starting_sat(),
//     SUBSIDY_HALVING_INTERVAL * 5000000000
//   );
//   assert_eq!(
//     Height(SUBSIDY_HALVING_INTERVAL + 1).starting_sat(),
//     SUBSIDY_HALVING_INTERVAL * 5000000000 + 2500000000
//   );
//   assert_eq!(
//     Height(u64::max_value()).starting_sat(),
//     *Epoch::STARTING_SATS.last().unwrap()
//   );
// }

// #[test]
// fn period_offset() {
//   assert_eq!(Height(0).period_offset(), 0);
//   assert_eq!(Height(1).period_offset(), 1);
//   assert_eq!(Height(DIFFCHANGE_INTERVAL - 1).period_offset(), 2015);
//   assert_eq!(Height(DIFFCHANGE_INTERVAL).period_offset(), 0);
//   assert_eq!(Height(DIFFCHANGE_INTERVAL + 1).period_offset(), 1);
// }
