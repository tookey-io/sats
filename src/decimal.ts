import { Height } from './height';
import { Sat } from './sat';

export class Decimal {
  constructor(public readonly height: Height, public readonly offset: number) {}

  static fromSat(sat: Sat): Decimal {
    return new Decimal(sat.height, sat.third);
  }
}
