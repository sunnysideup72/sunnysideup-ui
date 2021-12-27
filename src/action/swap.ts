import { Connection, PublicKey, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';

import { OpenOrders } from '@project-serum/serum';

import { TokenAmount } from '../utils/safe-math';
import {  NATIVE_SOL, TOKENS } from './tokens';
import { ACCOUNT_LAYOUT } from './RequestWeb3';
import { getBigNumber } from '../utils/utils';
import {
  AMM_INFO_LAYOUT,
  AMM_INFO_LAYOUT_STABLE,
  AMM_INFO_LAYOUT_V3,
  AMM_INFO_LAYOUT_V4,
  LiquidityPoolInfo,
} from './liquidity';
import { parseTokenMintData } from '../utils/dashboard';

export async function createSwapTransaction(
) {
  const transaction = new Transaction();

  return transaction;
}

export const getPoolInfo = async (connection: Connection, poolInfo: LiquidityPoolInfo) => {
  let fees = {};
  const coinBalance = new TokenAmount(0, poolInfo.coin.decimals);
  const pcBalance = new TokenAmount(0, poolInfo.pc.decimals);
  const coinName = poolInfo.coin.symbol;
  const pcName = poolInfo.pc.symbol;

  const [poolCoinTokenAccount, poolPcTokenAccount, amm, lpAccount] = await connection.getMultipleAccountsInfo(
    [
      new PublicKey(poolInfo.poolCoinTokenAccount),
      new PublicKey(poolInfo.poolPcTokenAccount),
      new PublicKey(poolInfo.ammId),
      new PublicKey(poolInfo.lp.mintAddress),
    ],
    'confirmed',
  );

  if (poolCoinTokenAccount) {
    const data = Buffer.from(poolCoinTokenAccount.data);
    const parsed = ACCOUNT_LAYOUT.decode(data);

    coinBalance.wei = coinBalance.wei.plus(getBigNumber(parsed.amount));
  }

  if (poolPcTokenAccount) {
    const data = Buffer.from(poolPcTokenAccount.data);
    const parsed = ACCOUNT_LAYOUT.decode(data);

    pcBalance.wei = pcBalance.wei.plus(getBigNumber(parsed.amount));
  }

  const ammOpenOrders = await connection.getAccountInfo(new PublicKey(poolInfo.ammOpenOrders));
  if (ammOpenOrders) {
    const OPEN_ORODERS_LAYOUT = OpenOrders.getLayout(new PublicKey(poolInfo.serumProgramId));
    const parsed = OPEN_ORODERS_LAYOUT.decode(ammOpenOrders.data);

    const { baseTokenTotal, quoteTokenTotal } = parsed;
    coinBalance.wei = coinBalance.wei.plus(getBigNumber(baseTokenTotal));
    pcBalance.wei = pcBalance.wei.plus(getBigNumber(quoteTokenTotal));
  }

  if (amm) {
    let parsed;

    const data = Buffer.from(amm.data);

    if (poolInfo.version === 2) {
      parsed = AMM_INFO_LAYOUT.decode(data);
    } else if (poolInfo.version === 3) {
      parsed = AMM_INFO_LAYOUT_V3.decode(data);
    } else {
      if (poolInfo.version === 5) {
        parsed = AMM_INFO_LAYOUT_STABLE.decode(data);
        // poolInfo.currentK = getBigNumber(parsed.currentK);
      } else parsed = AMM_INFO_LAYOUT_V4.decode(data);

      const { swapFeeNumerator, swapFeeDenominator } = parsed;
      fees = {
        swapFeeNumerator: getBigNumber(swapFeeNumerator),
        swapFeeDenominator: getBigNumber(swapFeeDenominator),
      };
    }

    const { needTakePnlCoin, needTakePnlPc } = parsed;
    // poolInfo.status = getBigNumber(status);

    coinBalance.wei.minus(getBigNumber(needTakePnlCoin));
    pcBalance.wei.minus(getBigNumber(needTakePnlPc));
  }

  let lpSupply = 0;
  if (lpAccount) {
    const mintAccountData = parseTokenMintData(lpAccount.data);
    lpSupply = (mintAccountData.supply.toNumber() || 0) / LAMPORTS_PER_SOL;
  }

  return {
    fees,
    coinBalance,
    coinName,
    pcBalance,
    pcName,
    lpSupply,
  };
};

export function getSwapOutAmount(
  poolInfo: any,
  fromCoinMint: string,
  toCoinMint: string,
  amount: string,
  slippage: number,
  fees: any,
  coinBalance: TokenAmount,
  pcBalance: TokenAmount,
) {
  const { coin, pc } = poolInfo;
  const { swapFeeNumerator, swapFeeDenominator } = fees;
  let fromCoinMint2 = fromCoinMint;
  let toCoinMint2 = toCoinMint;

  if (fromCoinMint2 === TOKENS.WSOL.mintAddress) fromCoinMint2 = NATIVE_SOL.mintAddress;
  if (toCoinMint2 === TOKENS.WSOL.mintAddress) toCoinMint2 = NATIVE_SOL.mintAddress;

  if (fromCoinMint2 === coin.mintAddress && toCoinMint2 === pc.mintAddress) {
    // coin2pc
    const fromAmount = new TokenAmount(amount, coin.decimals, false);
    const fromAmountWithFee = fromAmount.wei
      .multipliedBy(swapFeeDenominator - swapFeeNumerator)
      .dividedBy(swapFeeDenominator);

    const denominator = coinBalance.wei.plus(fromAmountWithFee);
    const amountOut = pcBalance.wei.multipliedBy(fromAmountWithFee).dividedBy(denominator);
    const amountOutWithSlippage = amountOut.dividedBy(1 + slippage / 100);

    const outBalance = pcBalance.wei.minus(amountOut);
    const beforePrice = new TokenAmount(
      parseFloat(new TokenAmount(pcBalance.wei, pc.decimals).fixed()) /
        parseFloat(new TokenAmount(coinBalance.wei, coin.decimals).fixed()),
      pc.decimals,
      false,
    );
    const afterPrice = new TokenAmount(
      parseFloat(new TokenAmount(outBalance, pc.decimals).fixed()) /
        parseFloat(new TokenAmount(denominator, coin.decimals).fixed()),
      pc.decimals,
      false,
    );
    const priceImpact =
      Math.abs((parseFloat(beforePrice.fixed()) - parseFloat(afterPrice.fixed())) / parseFloat(beforePrice.fixed())) *
      100;

    return {
      amountIn: fromAmount,
      amountOut: new TokenAmount(amountOut, pc.decimals),
      amountOutWithSlippage: new TokenAmount(amountOutWithSlippage, pc.decimals),
      priceImpact,
      ratio: fromAmount.wei.dividedBy(amountOut),
    };
  }
  // pc2coin
  const fromAmount = new TokenAmount(amount, pc.decimals, false);
  const fromAmountWithFee = fromAmount.wei
    .multipliedBy(swapFeeDenominator - swapFeeNumerator)
    .dividedBy(swapFeeDenominator);

  const denominator = pcBalance.wei.plus(fromAmountWithFee);
  const amountOut = coinBalance.wei.multipliedBy(fromAmountWithFee).dividedBy(denominator);
  const amountOutWithSlippage = amountOut.dividedBy(1 + slippage / 100);

  const outBalance = coinBalance.wei.minus(amountOut);

  const beforePrice = new TokenAmount(
    parseFloat(new TokenAmount(pcBalance.wei, pc.decimals).fixed()) /
      parseFloat(new TokenAmount(coinBalance.wei, coin.decimals).fixed()),
    pc.decimals,
    false,
  );
  const afterPrice = new TokenAmount(
    parseFloat(new TokenAmount(denominator, pc.decimals).fixed()) /
      parseFloat(new TokenAmount(outBalance, coin.decimals).fixed()),
    pc.decimals,
    false,
  );
  const priceImpact =
    Math.abs((parseFloat(afterPrice.fixed()) - parseFloat(beforePrice.fixed())) / parseFloat(beforePrice.fixed())) *
    100;

  return {
    amountIn: fromAmount,
    amountOut: new TokenAmount(amountOut, coin.decimals),
    amountOutWithSlippage: new TokenAmount(amountOutWithSlippage, coin.decimals),
    priceImpact,
    ratio: fromAmount.wei.dividedBy(amountOut),
  };
}
