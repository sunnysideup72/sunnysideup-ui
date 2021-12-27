import React, { useCallback, useState } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';

import {
  BtnMax,
  BtnStakes,
  InputWr,
  StakingLayout,
  StakingTit,
  TokenAmout,
  TokenUnit,
  TotalItems,
  TotalWr,
  TxtGray,
} from './style';
import TokenSolana from '../../images/token_solana.svg';
import TokenSSOL from '../../images/token_ssol.svg';
import { useBalance, useSSolTokenAccount } from '../../utils/balance';
import { useDashboard } from '../../utils/dashboard';
import { createStakingTransaction } from '../../action/staking';
import { Notification } from '../../utils/notify';
import { refreshAllCaches } from '../../utils/fetch-loop';
import { intlNumberFormat10, intlNumberFormat6 } from '../../utils/utils';
import { useCoinGecko } from '../../utils/coingecko';

const StakingBox = () => {
  const [balance] = useBalance();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [sSolTokenAccount] = useSSolTokenAccount();
  const { solPerSSol } = useDashboard();
  const solanaInfo = useCoinGecko('solana');

  const transactionFee = 0.000005;

  const [state, setState] = useState({
    stakingAmount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
  };

  const staking = useCallback(async () => {
    if (!publicKey) return;

    try {
      const transaction = await createStakingTransaction();

      const signature = await sendTransaction(transaction, connection);
      toast.info(Notification({ msg: 'Transaction Sent', signature }));

      const res = await connection.confirmTransaction(signature, 'confirmed');

      if (res.value.err) {
        toast.error(Notification({ msg: 'failed', signature }));
      } else {
        toast.success(Notification({ msg: `Transaction confirmed`, signature }));
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e?.message);
      }
    }
    refreshAllCaches();
  }, [publicKey, sSolTokenAccount, connection, state]);

  return (
    <StakingLayout>
      <StakingTit>Stake</StakingTit>

      <>
        <InputWr>
          <TokenUnit>
            <img src={TokenSolana} alt="token solana" />
          </TokenUnit>
          <TokenAmout
            name="stakingAmount"
            type="number"
            step="0.1"
            min="0"
            value={state.stakingAmount}
            onChange={handleChange}
            placeholder="Amount"
          />
          <BtnMax
            onClick={() => {
              const fee = !sSolTokenAccount ? 0.01 : 0.001;
              setState({
                ...state,
                stakingAmount:
                  // 0.000005가 트랜잭션 수수료. 몇번 반복해도 여유가 있도록 적당히 빼줌
                  Math.trunc(Math.max((balance || 0) - fee, 0) * LAMPORTS_PER_SOL) / LAMPORTS_PER_SOL,
              });
            }}
          >
            MAX
          </BtnMax>
        </InputWr>
        <InputWr>
          <TokenUnit>
            <img src={TokenSSOL} alt="token solana" />
          </TokenUnit>
          <TokenAmout
            type="text"
            placeholder=""
            readOnly
            value={intlNumberFormat10(state.stakingAmount / solPerSSol)}
          />
          <TxtGray>sSoL</TxtGray>
        </InputWr>
      </>

      <TotalWr>
        <TotalItems>Current exchange rate</TotalItems>
        <TotalItems>1 sSOL ≈ {intlNumberFormat6(solPerSSol)} SOL</TotalItems>
        <TotalItems>Transaction cost</TotalItems>
        <TotalItems>
          {transactionFee}{' '}
          {solanaInfo?.coinInfo?.price ? (
            <>(${intlNumberFormat6(solanaInfo?.coinInfo?.price * transactionFee)})</>
          ) : null}
        </TotalItems>
      </TotalWr>
      <BtnStakes onClick={staking}>Stake</BtnStakes>
    </StakingLayout>
  );
};

export default StakingBox;
