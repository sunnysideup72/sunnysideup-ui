import { AccountInfo, PublicKey } from '@solana/web3.js';

export interface DashboardContextValues {
  totalStaked: number;
  unstakeLiqudity: number;
  solPerSSol: number;
}

export interface MarketInfo {
  address: PublicKey;
  name: string;
  programId: PublicKey;
  deprecated: boolean;
  quoteLabel?: string;
  baseLabel?: string;
}

export interface CustomMarketInfo {
  address: string;
  name: string;
  programId: string;
  quoteLabel?: string;
  baseLabel?: string;
}

export interface FullMarketInfo {
  address?: PublicKey;
  name?: string;
  programId?: PublicKey;
  deprecated?: boolean;
  quoteLabel?: string;
  baseLabel?: string;
  marketName?: string;
  baseCurrency?: string;
  quoteCurrency?: string;
  marketInfo?: MarketInfo;
}

export interface TokenAccount {
  pubkey: PublicKey;
  account: AccountInfo<Buffer> | null;
  effectiveMint: PublicKey;
  amount: number;
}

export interface Trade extends Event {
  side: string;
  price: number;
  feeCost: number;
  size: number;
}

export interface PreferencesContextValues {
  autoSettleEnabled: boolean;
  setAutoSettleEnabled: (newAutoSettleEnabled: boolean) => void;
}

export interface EndpointInfo {
  endpoint: string;
  cluster: string;
}

/**
 * {tokenMint: preferred token account's base58 encoded public key}
 */
export interface SelectedTokenAccounts {
  [tokenMint: string]: string;
}

export interface BonfidaTrade {
  market: string;
  size: number;
  price: number;
  orderId: string;
  time: number;
  side: string;
  feeCost: number;
  marketAddress: string;
}
