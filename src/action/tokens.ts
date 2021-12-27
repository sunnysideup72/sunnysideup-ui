import _ from 'lodash';
import { TokenAmount } from '../utils/safe-math';

export interface TokenInfo {
  symbol: string;
  name: string;

  mintAddress: string;
  decimals: number;
  totalSupply?: TokenAmount;

  referrer?: string;

  details?: string;
  // docs?: object;
  // socials?: object;

  tokenAccountAddress?: string;
  balance?: TokenAmount;
  tags: string[];
  picUrl?: string;
}

export const NATIVE_SOL: TokenInfo = {
  symbol: 'SOL',
  name: 'Native Solana',
  mintAddress: '11111111111111111111111111111111',
  decimals: 9,
  tags: ['raydium'],
};

interface Tokens {
  [key: string]: any;
  [index: number]: any;
}

//
export const TOKENS: Tokens = {
  SOL: {
    symbol: 'SOL',
    name: 'Native Solana',
    mintAddress: '11111111111111111111111111111111',
    decimals: 9,
    picUrl:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    tags: ['raydium'],
  },
  WSOL: {
    symbol: 'WSOL',
    name: 'Wrapped Solana',
    mintAddress: 'So11111111111111111111111111111111111111112',
    decimals: 9,
    picUrl:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    referrer: 'HTcarLHe7WRxBQCWvhVB8AP56pnEtJUV2jDGvcpY3xo5',
    tags: ['raydium'],
  },

  sSOL: {
    symbol: 'sSOL',
    name: 'SunnySideUp staked SOL (sSOL)',
    mintAddress: '8EDaoeBqpcVACwvkYXh1vAcU29HiBiNhqoF4pRsuUsZS',
    decimals: 9,
    picUrl:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8EDaoeBqpcVACwvkYXh1vAcU29HiBiNhqoF4pRsuUsZS/logo.png',
    tags: ['solana', 'userAdd', 'unofficial'],
  },
};
export const TOKENS_ARRAY = _.valuesIn(TOKENS);

export const LP_TOKENS: Tokens = {
  'sSOL-SOL': {
    symbol: 'sSOL-SOL',
    name: 'sSOL-SOL',
    coin: { ...TOKENS.sSOL },
    pc: { ...TOKENS.SOL },
    mintAddress: '2gd6YHQh2ZpB6nxLyUb4YUfKMEq81i48WPPSpnnvW7UX',
    decimals: 9,
  },
};

export const LP_TOKENS_ARRAY = _.valuesIn(LP_TOKENS);
