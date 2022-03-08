import { Transaction } from './transaction.dto';

// fields for conversion and round
export const FIELDS_TO_TRANSFORM = [
  'amount',
  'marketplace',
  'balance',
  'vendor',
];

export type TransactionResponse = Transaction | Transaction[];
