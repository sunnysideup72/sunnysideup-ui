import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import Select, { SingleValue } from 'react-select';

import {
  LiquidityLayout,
  LiquidityTop,
  LiquidityTit,
  TotalLiquidity,
  SelectSol,
  SelectSSol,
  AddLiquidityItem,
  Balance,
  BtnWr,
  BtnMax,
  BtnAddLiquidity,
  TotalSwapTit,
  TotalSwapFee,
} from './style';

import IconPlus from '../../images/plus.svg';
import IconRate from '../../images/rate.svg';
import { TOKENS } from '../../action/tokens';
import {
  createAddLiquidityTransaction,
  getOutAmount,
  getOutAmountStable,
  LIQUIDITY_POOLS,
  LiquidityPoolInfo,
} from '../../action/liquidity';
import { getPoolInfo } from '../../action/swap';
import { Notification } from '../../utils/notify';
import { refreshAllCaches } from '../../utils/fetch-loop';
import { useBalance, useTokenAccounts } from '../../utils/balance';
import { intlNumberFormat2, intlNumberFormat6 } from '../../utils/utils';

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

const LiquidityBox = forwardRef((props, ref) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [tokenAccounts] = useTokenAccounts();
  const [balance] = useBalance();

  const [selectedPool, setSelectedPool] = useState<LiquidityPoolInfo | null>(null);
  const [poolState, setPoolState] = useState<any | null>(null);
  const [fixedCoin, setFixedCoin] = useState('');

  const [state, setState] = useState({
    tokenAAmount: '',
    tokenBAmount: '',
  });
  const [AToken, setAToken] = useState<SingleValue<{ label: JSX.Element; value: string }>>(null);
  const [BToken, setBToken] = useState<SingleValue<{ label: JSX.Element; value: string }>>(null);

  const [balanceA, setBalanceA] = useState('');
  const [balanceB, setBalanceB] = useState('');

  const [rate, setRate] = useState('');

  useImperativeHandle(ref, () => ({
    setTokens: (tokenA: string, tokenB: string) => {
      if (!tokenA || !tokenB) return;
      const selectedTokenA = SelectTokenList.find((val) => val.value === tokenA);
      const selectedTokenB = SelectTokenList.find((val) => val.value === tokenB);
      if (selectedTokenA && selectedTokenB) {
        setAToken(selectedTokenA);
        setBToken(selectedTokenB);
      }
    },
  }));

  useEffect(() => {
    if (!selectedPool || !poolState) {
      setRate('');
      return;
    }

    const fromTokenInfo = getTokenInfo(AToken);
    const toTokenInfo = getTokenInfo(BToken);

    const { coinBalance, pcBalance } = poolState;

    const amount = (selectedPool.version === 4 ? getOutAmount : getOutAmountStable)(
      selectedPool,
      '1',
      fromTokenInfo.mintAddress,
      toTokenInfo.mintAddress,
      0.5,
      coinBalance,
      pcBalance,
    );

    setRate(amount.toFixed(6));
  }, [selectedPool, poolState]);

  useEffect(() => {
    if (AToken?.value === 'SOL' && balance) {
      setBalanceA(intlNumberFormat6(balance));
    }
    if (!tokenAccounts || !AToken) return;

    const ATokenInfo = getTokenInfo(AToken);
    const tokenA = tokenAccounts.find((val) => val.mintAddress === ATokenInfo.mintAddress);

    if (!tokenA) return;

    setBalanceA(tokenA?.balance?.toEther()?.toFixed(6));
  }, [tokenAccounts, AToken]);

  useEffect(() => {
    if (BToken?.value === 'SOL' && balance) {
      setBalanceB(intlNumberFormat6(balance));
    }
    if (!tokenAccounts || !BToken) return;

    const BTokenInfo = getTokenInfo(BToken);
    const tokenB = tokenAccounts.find((val) => val.mintAddress === BTokenInfo.mintAddress);

    if (!tokenB) return;

    setBalanceB(tokenB?.balance?.toEther()?.toFixed(6));
  }, [tokenAccounts, BToken]);

  const updateTokenA = (tokenAmount: string) => {
    if (!selectedPool || !poolState) return;
    const { coinBalance, pcBalance } = poolState;

    const fromTokenInfo = getTokenInfo(AToken);
    const toTokenInfo = getTokenInfo(BToken);

    const amount = (selectedPool.version === 4 ? getOutAmount : getOutAmountStable)(
      selectedPool,
      tokenAmount,
      fromTokenInfo.mintAddress,
      toTokenInfo.mintAddress,
      0.5,
      coinBalance,
      pcBalance,
    );

    setState({
      ...state,
      tokenAAmount: tokenAmount,
      tokenBAmount: amount.isNaN() || !amount.isFinite() ? '' : amount.toFixed(toTokenInfo.decimals),
    });
    setFixedCoin(fromTokenInfo.mintAddress);
  };

  const updateTokenB = (tokenAmount: string) => {
    if (!selectedPool || !poolState) return;
    const { coinBalance, pcBalance } = poolState;

    const fromTokenInfo = getTokenInfo(BToken);
    const toTokenInfo = getTokenInfo(AToken);

    const amount = (selectedPool.version === 4 ? getOutAmount : getOutAmountStable)(
      selectedPool,
      tokenAmount,
      fromTokenInfo.mintAddress,
      toTokenInfo.mintAddress,
      0.5,
      coinBalance,
      pcBalance,
    );

    setState({
      ...state,
      tokenAAmount: amount.isNaN() || !amount.isFinite() ? '' : amount.toFixed(toTokenInfo.decimals),
      tokenBAmount: tokenAmount,
    });
    setFixedCoin(fromTokenInfo.mintAddress);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedPool || !poolState) {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
      return;
    }
    switch (e.target.name) {
      case 'tokenAAmount':
        updateTokenA(e.target.value);
        break;
      case 'tokenBAmount':
        updateTokenB(e.target.value);
        break;
      default:
    }
  };

  const getTokenInfo = (token: any) => {
    if (!token || !token.value) return null;
    return TOKENS?.[token.value] ?? null;
  };

  useEffect(() => {
    async function update() {
      const fromTokenInfo = getTokenInfo(AToken);
      const toTokenInfo = getTokenInfo(BToken);

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
  }, [AToken, BToken]);

  useEffect(() => {
    setAToken(SelectTokenList[0]);
    setBToken(SelectTokenList[1]);
  }, []);

  const addLiquidity = useCallback(async () => {
    if (!publicKey) return;

    try {
      if (selectedPool) {
        const transaction = await createAddLiquidityTransaction();

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
  }, [tokenAccounts, publicKey, state, fixedCoin]);

  return (
    <LiquidityLayout>
      <LiquidityTop>
        <LiquidityTit>
          <strong>Receive LP Tokens</strong>
        </LiquidityTit>

        <>
          <AddLiquidityItem>
            <Balance>
              Balance <span>{balanceA}</span>
            </Balance>
            <div className="left-box">
              <input
                inputMode="decimal"
                autoComplete="off"
                placeholder="Input"
                minLength={1}
                maxLength={79}
                spellCheck="false"
                type="text"
                name="tokenAAmount"
                value={state.tokenAAmount}
                onChange={handleChange}
              />
            </div>
            <BtnMax
              onClick={() => {
                updateTokenA(balanceA);
              }}
            >
              MAX
            </BtnMax>
            <Select
              value={AToken}
              options={SelectTokenList}
              onChange={setAToken}
              styles={customStyle}
              isSearchable={false}
            />
          </AddLiquidityItem>
          <img src={IconPlus} alt="liquidity icon" />

          <AddLiquidityItem>
            <Balance>
              Balance <span>{balanceB}</span>
            </Balance>
            <div className="left-box">
              <input
                inputMode="decimal"
                autoComplete="off"
                placeholder="Input"
                minLength={1}
                maxLength={79}
                spellCheck="false"
                type="text"
                name="tokenBAmount"
                value={state.tokenBAmount}
                onChange={handleChange}
              />
            </div>
            <BtnMax
              onClick={() => {
                updateTokenB(balanceB);
              }}
            >
              MAX
            </BtnMax>
            <Select
              value={BToken}
              options={SelectTokenList}
              onChange={setBToken}
              styles={customStyle}
              isSearchable={false}
            />
          </AddLiquidityItem>
          {/* <TotalLiquidity>
          <li>
            <p className="total-left">Pool Liquidity</p>
            <p className="total-right">
              <span>{poolState?.coinBalance?.format() ?? ''}</span>
              <span className="token">{poolState?.coinName ?? ''}</span>
            </p>
          </li>
          <li>
            <p className="total-right">
              <span>{poolState?.pcBalance?.format() ?? ''}</span>
              <span className="token">{poolState?.pcName ?? ''}</span>
            </p>
          </li>
          <li>
            <p className="total-left">LP Supply</p>
            <p className="total-right">
              <span>{poolState?.lpSupply ?? ''}</span>
            </p>
          </li>
        </TotalLiquidity> */}
        </>
      </LiquidityTop>
      <BtnWr>
        <TotalLiquidity>
          <TotalSwapTit>
            <div className="tip-wr">Rate</div>
          </TotalSwapTit>
          <TotalSwapFee>
            <span>
              <img src={IconRate} alt="rate" />
            </span>
            <span>≈ {rate}</span>
            <span>{BToken?.value ?? ''}</span>
            <span>per</span>
            <span>{AToken?.value ?? ''}</span>
          </TotalSwapFee>
          <TotalSwapTit>Share of Pool</TotalSwapTit>
          <TotalSwapFee>
            <span>
              {intlNumberFormat2(
                (tokenAccounts
                  ?.find((val) => val?.mintAddress === selectedPool?.lp?.mintAddress)
                  ?.balance?.toEther()
                  ?.toNumber() ?? 0) / (poolState?.lpSupply ?? 1),
              )}{' '}
              %
            </span>
          </TotalSwapFee>
        </TotalLiquidity>
        <BtnAddLiquidity onClick={addLiquidity}>Add Liquidity</BtnAddLiquidity>
      </BtnWr>
    </LiquidityLayout>
  );
});

export default LiquidityBox;
