/// Total number of satoshis possible to exist.
export const SUPPLY = 2099999997690000;
/// The last satoshi that can be mined.
export const LAST = SUPPLY - 1;
/// How many seconds between blocks we expect on average.
export const TARGET_BLOCK_SPACING = 600;
/// How many blocks between diffchanges.
export const DIFFCHANGE_INTERVAL = 2016;
/// How much time on average should occur between diffchanges.
export const DIFFCHANGE_TIMESPAN = 14 * 24 * 3600;
/// The factor that non-witness serialization data is multiplied by during weight calculation.
export const WITNESS_SCALE_FACTOR = 4;
/// The maximum allowed number of signature check operations in a block.
export const MAX_BLOCK_SIGOPS_COST = 80_000;
/// Mainnet (bitcoin) pubkey address prefix.
export const PUBKEY_ADDRESS_PREFIX_MAIN = 0; // 0x00
/// Mainnet (bitcoin) script address prefix.
export const SCRIPT_ADDRESS_PREFIX_MAIN = 5; // 0x05
/// Test (tesnet, signet, regtest) pubkey address prefix.
export const PUBKEY_ADDRESS_PREFIX_TEST = 111; // 0x6f
/// Test (tesnet, signet, regtest) script address prefix.
export const SCRIPT_ADDRESS_PREFIX_TEST = 196; // 0xc4
/// The maximum allowed script size.
export const MAX_SCRIPT_ELEMENT_SIZE = 520;
/// How may blocks between halvings.
export const SUBSIDY_HALVING_INTERVAL = 210_000;
/// Maximum allowed value for an integer in Script.
export const MAX_SCRIPTNUM_VALUE = 0x80000000; // 2^31
/// Number of blocks needed for an output from a coinbase transaction to be spendable.
export const COINBASE_MATURITY = 100;
/// Number of epochs subsidy halvings.
export const CYCLE_EPOCHS = 6;
/// How many satoshis are in "one bitcoin".
export const COIN_VALUE = 100_000_000;

export const STARTING_SATS = [
    0,
    1050000000000000,
    1575000000000000,
    1837500000000000,
    1968750000000000,
    2034375000000000,
    2067187500000000,
    2083593750000000,
    2091796875000000,
    2095898437500000,
    2097949218750000,
    2098974609270000,
    2099487304530000,
    2099743652160000,
    2099871825870000,
    2099935912620000,
    2099967955890000,
    2099983977420000,
    2099991988080000,
    2099995993410000,
    2099997995970000,
    2099998997250000,
    2099999497890000,
    2099999748210000,
    2099999873370000,
    2099999935950000,
    2099999967240000,
    2099999982780000,
    2099999990550000,
    2099999994330000,
    2099999996220000,
    2099999997060000,
    2099999997480000,
    SUPPLY,
];

export const FIRST_POST_SUBSIDY = 33;
