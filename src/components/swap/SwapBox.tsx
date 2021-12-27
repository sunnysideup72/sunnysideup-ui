import React, { useCallback, useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import Select, { SingleValue } from 'react-select';

import {
  SwapTop,
  SwapBottom,
  SwapTit,
  Balance,
  SelectSol,
  SelectSSol,
  SwapItem,
  BtnSwap,
  BtnHalf,
  TotalSwap,
  TotalSwapTit,
  TotalSwapFee,
  TokenTo,
  TokenToWr,
  RouteInfo,
  RouteBox,
} from './style';

import Swap from '../../images/swap.svg';
import IconInfo from '../../images/i.svg';
import IconGo from '../../images/goes.svg';
import IconRate from '../../images/rate.svg';
import { TOKENS } from '../../action/tokens';
import { LIQUIDITY_POOLS, LiquidityPoolInfo } from '../../action/liquidity';
import { createSwapTransaction, getPoolInfo, getSwapOutAmount } from '../../action/swap';
import { Notification } from '../../utils/notify';
import { refreshAllCaches } from '../../utils/fetch-loop';
import { useBalance, useTokenAccounts } from '../../utils/balance';
import { intlNumberFormat4 } from '../../utils/utils';

const SelectTokenList = [
  {
    value: 'SOL',
    label: (
      <div className="select-box">
        <SelectSol />
        SOL
      </div>
    ),
  },
  {
    value: 'sSOL',
    label: (
      <div className="select-box">
        <SelectSSol />
        sSOL
      </div>
    ),
  },
];

const customStyle = {
  control: (provided: any) => ({
    ...provided,
    minHeight: 'none',
    padding: '0',
    backgroundColor: 'transparent',
    border: 0,
    boxShadow: 'none',
    fontSize: '20',
    fontWeight: '600',
    width: '130px',
  }),
};

const SwapBox = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [solBalance] = useBalance();
  const [tokenAccounts] = useTokenAccounts();

  const [selectedPool, setSelectedPool] = useState<LiquidityPoolInfo | null>(null);
  const [poolState, setPoolState] = useState<any | null>(null);
  const [toCoinWithSlippage, setToCoinWithSlippage] = useState('');
  const [priceImpact, setPriceImpact] = useState(0);
  const [ratio, setRatio] = useState('');

  const [state, setState] = useState({
    fromAmount: '',
    toAmount: '',
  });
  const [fromToken, setFromToken] = useState<SingleValue<{ label: JSX.Element; value: string }>>(null);
  const [toToken, setToToken] = useState<SingleValue<{ label: JSX.Element; value: string }>>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const getTokenInfo = (token: any) => {
    if (!token || !token.value) return null;
    return TOKENS?.[token.value] ?? null;
  };

  useEffect(() => {
    async function update() {
      const fromTokenInfo = getTokenInfo(fromToken);
      const toTokenInfo = getTokenInfo(toToken);

      const findFunc = (val: LiquidityPoolInfo) =>
        (fromTokenInfo.mintAddress === val.pc.mintAddress && toTokenInfo.mintAddress === val.coin.mintAddress) ||
        (fromTokenInfo.mintAddress === val.coin.mintAddress && toTokenInfo.mintAddress === val.pc.mintAddress);

      setPoolState(null);

      if (!fromTokenInfo || !toTokenInfo) {
        return;
      }

      const poolInfo = LIQUIDITY_POOLS.find(findFunc) ?? null;
      setSelectedPool(poolInfo);

      if (poolInfo) {
        getPoolInfo(connection, poolInfo).then((res) => {
          setPoolState(res);
        });
      }
    }

    update();
  }, [fromToken, toToken]);

  useEffect(() => {
    if (poolState && state.fromAmount) {
      const { fees, coinBalance, pcBalance } = poolState;

      const fromTokenInfo = (fromToken && TOKENS?.[fromToken.value]) ?? null;
      const toTokenInfo = (toToken && TOKENS?.[toToken.value]) ?? null;

      if (fromTokenInfo && toTokenInfo) {
        const res = getSwapOutAmount(
          selectedPool,
          fromTokenInfo.mintAddress,
          toTokenInfo.mintAddress,
          state.fromAmount,
          0.5,
          fees,
          coinBalance,
          pcBalance,
        );

        setState({
          ...state,
          toAmount: res.amountOut.isNullOrZero() ? '' : res.amountOut.fixed(),
        });
        // console.log(res);
        setToCoinWithSlippage(res.amountOutWithSlippage.isNullOrZero() ? '' : res.amountOutWithSlippage.fixed());
        setPriceImpact(res.priceImpact);
        setRatio(res.ratio.toFixed(9));
      }

      return;
    }

    setState({
      ...state,
      toAmount: '',
    });
    setToCoinWithSlippage('');
    setPriceImpact(0);
    setRatio('');
  }, [poolState, state.fromAmount, fromToken, toToken]);

  useEffect(() => {
    setFromToken(SelectTokenList[0]);
    setToToken(SelectTokenList[1]);
  }, []);

  const swap = useCallback(async () => {
    if (!publicKey) return;

    try {
      if (selectedPool) {
        const transaction = await createSwapTransaction(
        );

        const signature = await sendTransaction(transaction, connection);
        toast.info(Notification({ msg: 'Transaction Sent', signature }));

        const res = await connection.confirmTransaction(signature, 'confirmed');

        if (res.value.err) {
          toast.error(Notification({ msg: 'failed', signature }));
        } else {
          toast.success(Notification({ msg: `Transaction confirmed`, signature }));
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e?.message);
      }
    }
    refreshAllCaches();
  }, [tokenAccounts, publicKey, state]);

  const swapExchangeToken = useCallback(() => {
    const { toAmount } = state;

    setFromToken(toToken);
    setToToken(fromToken);
    setState({
      ...state,
      fromAmount: toAmount,
      toAmount: '',
    });
  }, [state]);

  return (
    <>
      <SwapTop>
        <SwapTit>Exchange your tokens</SwapTit>
        <Balance>
          Balance{' '}
          <span>
            {fromToken?.value === 'SOL'
              ? solBalance || ''
              : tokenAccounts
                  ?.find((val) => val.mintAddress === getTokenInfo(fromToken)?.mintAddress)
                  ?.balance?.fixed() || 0}
          </span>
        </Balance>
        <>
          <SwapItem>
            <div className="left-box">
              <input
                inputMode="decimal"
                autoComplete="off"
                placeholder="0.00"
                minLength={1}
                maxLength={79}
                spellCheck="false"
                type="text"
                pattern="^[0-9]*[.,]?[0-9]*$"
                name="fromAmount"
                value={state.fromAmount}
                onChange={handleChange}
              />
            </div>
            <BtnHalf
              type="button"
              onClick={() => {
                const amount =
                  fromToken?.value === 'SOL'
                    ? solBalance || 0
                    : tokenAccounts
                        ?.find((val) => val.mintAddress === getTokenInfo(fromToken)?.mintAddress)
                        ?.balance?.toEther()
                        ?.toNumber() || 0;

                setState({
                  ...state,
                  fromAmount: (amount / 2).toString(),
                });
              }}
            >
              HALF
            </BtnHalf>
            <BtnHalf
              type="button"
              onClick={() => {
                const amount =
                  fromToken?.value === 'SOL'
                    ? Math.max((solBalance || 0) - 0.003, 0)
                    : tokenAccounts
                        ?.find((val) => val.mintAddress === getTokenInfo(fromToken)?.mintAddress)
                        ?.balance?.toEther()
                        ?.toNumber() || 0;

                setState({
                  ...state,
                  fromAmount: amount.toString(),
                });
              }}
            >
              MAX
            </BtnHalf>
            <Select
              value={fromToken}
              options={SelectTokenList}
              onChange={setFromToken}
              styles={customStyle}
              isSearchable={false}
            />
          </SwapItem>
          <img src={Swap} alt="swap icon" onClick={swapExchangeToken} />
          <SwapItem>
            <div className="left-box">
              <input type="text" name="toAmount" value={state.toAmount || ''} readOnly />
            </div>

            <Select
              value={toToken}
              options={SelectTokenList}
              onChange={setToToken}
              styles={customStyle}
              isSearchable={false}
            />
          </SwapItem>
        </>
      </SwapTop>
      <SwapBottom>
        <div>
          <RouteBox>
            <RouteInfo>
              Route
              <img src={IconInfo} alt="info" />
            </RouteInfo>
            <TokenToWr>
              <TokenTo>
                <img src={getTokenInfo(fromToken)?.picUrl ?? ''} alt="fromTOken" />
                <span>{getTokenInfo(fromToken)?.symbol}</span>
              </TokenTo>
              <i>
                <img src={IconGo} alt="info" />
              </i>
              <TokenTo>
                <img src={getTokenInfo(toToken)?.picUrl ?? ''} alt="toToken" />
                <span>{getTokenInfo(toToken)?.symbol}</span>
              </TokenTo>
            </TokenToWr>
          </RouteBox>
          {toToken && fromToken && state.toAmount && state.fromAmount ? (
            <TotalSwap>
              <TotalSwapTit className="rate">
                <div className="tip-wr">Rate</div>
              </TotalSwapTit>
              <TotalSwapFee>
                <span>
                  <img src={IconRate} alt="rate" />
                </span>
                <span>≈ {intlNumberFormat4(Number(ratio))}</span>
                <span>{fromToken.value}</span>
                <span>per</span>
                <span>{toToken.value}</span>
              </TotalSwapFee>

              <TotalSwapTit>
                <div className="tip-wr">
                  Slippage Tolerance
                  <i>
                    <img src={IconInfo} alt="info" />
                    <span>The fee to unstake now is higher than delayed unstake.</span>
                  </i>
                </div>
              </TotalSwapTit>
              <TotalSwapFee>
                <span>0.5%</span>
              </TotalSwapFee>

              <TotalSwapTit>
                <div className="tip-wr">
                  Price Impact
                  <i>
                    <img src={IconInfo} alt="info" />
                    <span>The fee to unstake now is higher than delayed unstake.</span>
                  </i>
                </div>
              </TotalSwapTit>
              <TotalSwapFee>{priceImpact < 0.01 ? '< 0.01' : priceImpact?.toFixed(2) || ''} %</TotalSwapFee>
              <TotalSwapTit>
                <div className="tip-wr">
                  Minimum received
                  <i>
                    <img src={IconInfo} alt="info" />
                    <span>The fee to unstake now is higher than delayed unstake.</span>
                  </i>
                </div>
              </TotalSwapTit>
              <TotalSwapFee>
                {toCoinWithSlippage} {toToken?.value}
              </TotalSwapFee>
              <TotalSwapTit>
                <div className="tip-wr">
                  Swap fees
                  <i>
                    <img src={IconInfo} alt="info" />
                    <span>The fee to unstake now is higher than delayed unstake.</span>
                  </i>
                </div>
              </TotalSwapTit>
              <TotalSwapFee>0.25%</TotalSwapFee>
            </TotalSwap>
          ) : null}
        </div>
        {/* <Warning> */}
        {/*   <span>⚠️</span> */}
        {/*   <p> */}
        {/*     The amount you entered is too high. A minimum balance of 0.003 SOL is required to complete a transaction. */}
        {/*     Please try entering a lower amount or depositing more SOL. */}
        {/*   </p> */}
        {/* </Warning> */}
        {/* <BtnNot>Not enough SOL</BtnNot> */}
        <BtnSwap onClick={swap}>Swap</BtnSwap>
      </SwapBottom>
    </>
  );
};

export default SwapBox;
