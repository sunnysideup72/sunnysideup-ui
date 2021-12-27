// @ts-ignore
import { struct } from 'buffer-layout';
import { publicKey, u128, u64 } from '@project-serum/borsh';
import BigNumber from 'bignumber.js';
import {  Transaction } from '@solana/web3.js';

import { LP_TOKENS, NATIVE_SOL, TokenInfo, TOKENS } from './tokens';
import { LIQUIDITY_POOL_PROGRAM_ID_V4, SERUM_PROGRAM_ID_V3 } from './ids';
import { TokenAmount } from '../utils/safe-math';

export default {};

export interface LiquidityPoolInfo {
  name: string;
  coin: TokenInfo;
  pc: TokenInfo;
  lp: TokenInfo;

  version: number;
  programId: string;

  ammId: string;
  ammAuthority: string;
  ammOpenOrders: string;
  ammTargetOrders: string;
  ammQuantities: string;

  poolCoinTokenAccount: string;
  poolPcTokenAccount: string;
  poolWithdrawQueue: string;
  poolTempLpTokenAccount: string;

  serumProgramId: string;
  serumMarket: string;
  serumBids?: string;
  serumAsks?: string;
  serumEventQueue?: string;
  serumCoinVaultAccount: string;
  serumPcVaultAccount: string;
  serumVaultSigner: string;

  official: boolean;

  status?: number;
  currentK?: number;
}

export const PoolInfos = [];

export const LIQUIDITY_POOLS: LiquidityPoolInfo[] = [
  {
    name: 'sSOL-SOL',
    coin: { ...TOKENS.sSOL },
    pc: { ...TOKENS.SOL },
    lp: { ...LP_TOKENS['sSOL-SOL'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '3zrq2oXNi3SKsWnoUQQh2aNKPrqA7hPqdA9VvDgTr9eX',
    ammAuthority: '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1',
    ammOpenOrders: 'CoWpzGAXH7VCfDLhayNz6ovLyxaS3HGaEJcKezg6JRjC',
    ammTargetOrders: '8ksNQZr5DnYDspXXDXUc7bdh1e1ZhkJoKRPzDQKXJczp',
    ammQuantities: NATIVE_SOL.mintAddress,
    poolCoinTokenAccount: '8czBqwDTG7RkdVx6hLJoahYM4qVqgy994uZb87RqazkB',
    poolPcTokenAccount: '8L5Dat8zWbKHamABYtLQRBoyf73iKY5Bgmbuj7HJNV8X',
    poolWithdrawQueue: 'BGzTS1cvKmwWezgdap5wNpvCiwbADGnydS62rNRKWp9L',
    poolTempLpTokenAccount: '64g4dbsyrDXcQKu3DrCBRs6K3sh5sSrch6ucNcPY35E8',
    serumProgramId: SERUM_PROGRAM_ID_V3,
    serumMarket: '3dCnhVwEfAh8fvQPcWvtUZouH4VUmbLmcbUVCVeGkgXy',
    serumBids: 'EBatuBsCFNa8s2X7rE8pXVF9DNFZCsyZMtBj3fDVLsSD',
    serumAsks: 'J4fL72xbgpxrNcvFu7NQQmmc6GLtwacJaQCNJAA1ZJ4W',
    serumEventQueue: 'FpCHyReqwPPFzRS3L1XcUgBpHd7naXjzyRCq8qXdSXpw',
    serumCoinVaultAccount: 'FMbjTq3yFp1zCh5sG9EvzMRZM7NxZvSuiC9BChvBunWV',
    serumPcVaultAccount: '4uHzZq7P3PdZbHTyYxEktFvKLxKoJ99z4dr7ph2NuZrd',
    serumVaultSigner: '4QbCeTuaTG5VB83hhYS7zmhCTXzwKL25Kwf6UXoVr9hW',
    official: false,
  },
];

export const AMM_INFO_LAYOUT = struct([
  u64('status'),
  u64('nonce'),
  u64('orderNum'),
  u64('depth'),
  u64('coinDecimals'),
  u64('pcDecimals'),
  u64('state'),
  u64('resetFlag'),
  u64('fee'),
  u64('minSize'),
  u64('volMaxCutRatio'),
  u64('pnlRatio'),
  u64('amountWaveRatio'),
  u64('coinLotSize'),
  u64('pcLotSize'),
  u64('minPriceMultiplier'),
  u64('maxPriceMultiplier'),
  u64('needTakePnlCoin'),
  u64('needTakePnlPc'),
  u64('totalPnlX'),
  u64('totalPnlY'),
  u64('systemDecimalsValue'),
  publicKey('poolCoinTokenAccount'),
  publicKey('poolPcTokenAccount'),
  publicKey('coinMintAddress'),
  publicKey('pcMintAddress'),
  publicKey('lpMintAddress'),
  publicKey('ammOpenOrders'),
  publicKey('serumMarket'),
  publicKey('serumProgramId'),
  publicKey('ammTargetOrders'),
  publicKey('ammQuantities'),
  publicKey('poolWithdrawQueue'),
  publicKey('poolTempLpTokenAccount'),
  publicKey('ammOwner'),
  publicKey('pnlOwner'),
]);

export const AMM_INFO_LAYOUT_V3 = struct([
  u64('status'),
  u64('nonce'),
  u64('orderNum'),
  u64('depth'),
  u64('coinDecimals'),
  u64('pcDecimals'),
  u64('state'),
  u64('resetFlag'),
  u64('fee'),
  u64('min_separate'),
  u64('minSize'),
  u64('volMaxCutRatio'),
  u64('pnlRatio'),
  u64('amountWaveRatio'),
  u64('coinLotSize'),
  u64('pcLotSize'),
  u64('minPriceMultiplier'),
  u64('maxPriceMultiplier'),
  u64('needTakePnlCoin'),
  u64('needTakePnlPc'),
  u64('totalPnlX'),
  u64('totalPnlY'),
  u64('poolTotalDepositPc'),
  u64('poolTotalDepositCoin'),
  u64('systemDecimalsValue'),
  publicKey('poolCoinTokenAccount'),
  publicKey('poolPcTokenAccount'),
  publicKey('coinMintAddress'),
  publicKey('pcMintAddress'),
  publicKey('lpMintAddress'),
  publicKey('ammOpenOrders'),
  publicKey('serumMarket'),
  publicKey('serumProgramId'),
  publicKey('ammTargetOrders'),
  publicKey('ammQuantities'),
  publicKey('poolWithdrawQueue'),
  publicKey('poolTempLpTokenAccount'),
  publicKey('ammOwner'),
  publicKey('pnlOwner'),
  publicKey('srmTokenAccount'),
]);

export const AMM_INFO_LAYOUT_V4 = struct([
  u64('status'),
  u64('nonce'),
  u64('orderNum'),
  u64('depth'),
  u64('coinDecimals'),
  u64('pcDecimals'),
  u64('state'),
  u64('resetFlag'),
  u64('minSize'),
  u64('volMaxCutRatio'),
  u64('amountWaveRatio'),
  u64('coinLotSize'),
  u64('pcLotSize'),
  u64('minPriceMultiplier'),
  u64('maxPriceMultiplier'),
  u64('systemDecimalsValue'),
  // Fees
  u64('minSeparateNumerator'),
  u64('minSeparateDenominator'),
  u64('tradeFeeNumerator'),
  u64('tradeFeeDenominator'),
  u64('pnlNumerator'),
  u64('pnlDenominator'),
  u64('swapFeeNumerator'),
  u64('swapFeeDenominator'),
  // OutPutData
  u64('needTakePnlCoin'),
  u64('needTakePnlPc'),
  u64('totalPnlPc'),
  u64('totalPnlCoin'),
  u128('poolTotalDepositPc'),
  u128('poolTotalDepositCoin'),
  u128('swapCoinInAmount'),
  u128('swapPcOutAmount'),
  u64('swapCoin2PcFee'),
  u128('swapPcInAmount'),
  u128('swapCoinOutAmount'),
  u64('swapPc2CoinFee'),

  publicKey('poolCoinTokenAccount'),
  publicKey('poolPcTokenAccount'),
  publicKey('coinMintAddress'),
  publicKey('pcMintAddress'),
  publicKey('lpMintAddress'),
  publicKey('ammOpenOrders'),
  publicKey('serumMarket'),
  publicKey('serumProgramId'),
  publicKey('ammTargetOrders'),
  publicKey('poolWithdrawQueue'),
  publicKey('poolTempLpTokenAccount'),
  publicKey('ammOwner'),
  publicKey('pnlOwner'),
]);

export const AMM_INFO_LAYOUT_STABLE = struct([
  u64('status'),
  publicKey('own_address'),
  u64('nonce'),
  u64('orderNum'),
  u64('depth'),
  u64('coinDecimals'),
  u64('pcDecimals'),
  u64('state'),
  u64('resetFlag'),
  u64('minSize'),
  u64('volMaxCutRatio'),
  u64('amountWaveRatio'),
  u64('coinLotSize'),
  u64('pcLotSize'),
  u64('minPriceMultiplier'),
  u64('maxPriceMultiplier'),
  u64('systemDecimalsValue'),

  u64('ammMaxPrice'),
  u64('ammMiddlePrice'),
  u64('ammPriceMultiplier'),

  // Fees
  u64('minSeparateNumerator'),
  u64('minSeparateDenominator'),
  u64('tradeFeeNumerator'),
  u64('tradeFeeDenominator'),
  u64('pnlNumerator'),
  u64('pnlDenominator'),
  u64('swapFeeNumerator'),
  u64('swapFeeDenominator'),
  // OutPutData
  u64('needTakePnlCoin'),
  u64('needTakePnlPc'),
  u64('totalPnlPc'),
  u64('totalPnlCoin'),
  u128('poolTotalDepositPc'),
  u128('poolTotalDepositCoin'),
  u128('swapCoinInAmount'),
  u128('swapPcOutAmount'),
  u128('swapPcInAmount'),
  u128('swapCoinOutAmount'),
  u64('swapPcFee'),
  u64('swapCoinFee'),

  publicKey('poolCoinTokenAccount'),
  publicKey('poolPcTokenAccount'),
  publicKey('coinMintAddress'),
  publicKey('pcMintAddress'),
  publicKey('lpMintAddress'),
  publicKey('ammOpenOrders'),
  publicKey('serumMarket'),
  publicKey('serumProgramId'),
  publicKey('ammTargetOrders'),
  publicKey('poolWithdrawQueue'),
  publicKey('poolTempLpTokenAccount'),
  publicKey('ammOwner'),
  publicKey('pnlOwner'),

  u128('currentK'),
  u128('padding1'),
  publicKey('padding2'),
]);

export function getPrice(
  poolInfo: LiquidityPoolInfo,
  coinBase = true,
  coinBalance: TokenAmount,
  pcBalance: TokenAmount,
) {
  const { coin, pc } = poolInfo;

  if (!coinBalance || !pcBalance) {
    return new BigNumber(0);
  }

  if (poolInfo.version === 5) {
    const { currentK = 1 } = poolInfo;
    const systemDecimal = Math.max(coin.decimals, pc.decimals);
    const k = currentK / (10 ** systemDecimal * 10 ** systemDecimal);
    const y = parseFloat(coinBalance.fixed());
    let price = Math.sqrt(((10 - 1) * y * y) / (10 * y * y - k));
    if (!coinBase) price = 1 / price;
    return new BigNumber(price);
  }
  if (coinBase) {
    return pcBalance.toEther().dividedBy(coinBalance.toEther());
  }
  return coinBalance.toEther().dividedBy(pcBalance.toEther());
}

export function getOutAmount(
  poolInfo: LiquidityPoolInfo,
  amount: string,
  fromCoinMint: string,
  toCoinMint: string,
  slippage: number,
  coinBalance: TokenAmount,
  pcBalance: TokenAmount,
) {
  const { coin, pc } = poolInfo;

  const price = getPrice(poolInfo, true, coinBalance, pcBalance);
  const fromAmount = new BigNumber(amount);
  let outAmount = new BigNumber(0);

  const percent = new BigNumber(100).plus(slippage).dividedBy(100);

  if (!coinBalance || !pcBalance) {
    return outAmount;
  }

  if (fromCoinMint === coin.mintAddress && toCoinMint === pc.mintAddress) {
    // outcoin is pc
    outAmount = fromAmount.multipliedBy(price);
    outAmount = outAmount.multipliedBy(percent);
  } else if (fromCoinMint === pc.mintAddress && toCoinMint === coin.mintAddress) {
    // outcoin is coin
    outAmount = fromAmount.dividedBy(price);
    outAmount = outAmount.multipliedBy(percent);
  }

  return outAmount;
}

export function getOutAmountStable(
  poolInfo: any,
  amount: string,
  fromCoinMint: string,
  toCoinMint: string,
  slippage: number,
  coinBalance: TokenAmount,
  pcBalance: TokenAmount,
) {
  const { coin, pc, currentK } = poolInfo;
  const systemDecimal = Math.max(coin.decimals, pc.decimals);
  const k = currentK / (10 ** systemDecimal * 10 ** systemDecimal);
  const y = parseFloat(coinBalance.fixed());
  const price = Math.sqrt(((10 - 1) * y * y) / (10 * y * y - k));

  const amountIn = parseFloat(amount);
  let amountOut = 1;
  if (fromCoinMint === coin.mintAddress && toCoinMint === pc.mintAddress) {
    // outcoin is pc
    amountOut = amountIn * price;
  } else if (fromCoinMint === pc.mintAddress && toCoinMint === coin.mintAddress) {
    // outcoin is coin
    amountOut = amountIn / price;
  }

  const amountOutWithSlippage = amountOut / (1 - slippage / 100);

  // const price = Math.sqrt((10 - 1) * y * y /(10 * y * y - k))
  // const afterY = y - amountOut
  // const afterPrice = Math.sqrt((10 - 1) * afterY  * afterY /(10 * afterY * afterY - k))
  // const priceImpact = (beforePrice - afterPrice) / beforePrice * 100

  return new BigNumber(amountOutWithSlippage);
}

/* eslint-disable */
export async function createAddLiquidityTransaction(
): Promise<Transaction> {
  const transaction = new Transaction();

  return transaction;
}

export async function createRemoveLiquidityTransaction(
) {
  const transaction = new Transaction();

  return transaction;
}
