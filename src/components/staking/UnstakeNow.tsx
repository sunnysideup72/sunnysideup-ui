import React, { useCallback, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';

import { BtnMax, BtnStakes, InputWr, TokenAmout, TokenUnit, TotalItems, TotalWr, TxtGray } from './style';
import TokenSSOL from '../../images/token_ssol.svg';
import TokenSolana from '../../images/token_solana.svg';
import IconInfo from '../../images/i.svg';
import { useSSolBalance, useSSolTokenAccount } from '../../utils/balance';
import { useDashboard } from '../../utils/dashboard';
import { createUnstakingTransaction } from '../../action/staking';
import { Notification } from '../../utils/notify';
import { refreshAllCaches } from '../../utils/fetch-loop';
import { intlNumberFormat10, intlNumberFormat6 } from '../../utils/utils';
import { useCoinGecko } from '../../utils/coingecko';

const UnstakeNow = () => {
  const [sSolBalance] = useSSolBalance();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [sSolTokenAccount] = useSSolTokenAccount();
  const { solPerSSol } = useDashboard();
  const solanaInfo = useCoinGecko('solana');

  const [state, setState] = useState({
    unstakingAmount: 0,
  });

  const transactionFee = 0.000005;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const unstaking = useCallback(async () => {
    if (!publicKey || !sSolTokenAccount) return;

    try {
      const transaction = await createUnstakingTransaction();

      const signature = await sendTransaction(transaction, connection);
      toast.info(Notification({ msg: `Transaction Sent`, signature }));

      const res = await connection.confirmTransaction(signature, 'confirmed');

      if (res.value.err) {
        toast.error(Notification({ msg: `failed`, signature }));
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
    <>
      <InputWr>
        <TokenUnit>
          <img src={TokenSSOL} alt="token solana" />
        </TokenUnit>
        <TokenAmout
          name="unstakingAmount"
          onChange={handleChange}
          type="number"
          step="0.1"
          min="0"
          value={state.unstakingAmount}
          placeholder="Amount"
        />
        <BtnMax
          onClick={() => {
            setState({
              ...state,
              unstakingAmount: sSolBalance || 0,
            });
          }}
        >
          MAX
        </BtnMax>
      </InputWr>
      <InputWr>
        <TokenUnit>
          <img src={TokenSolana} alt="token solana" />
        </TokenUnit>
        <TokenAmout
          type="text"
          value={intlNumberFormat10(state.unstakingAmount * solPerSSol * 0.997)}
          readOnly
          placeholder=""
        />
        <TxtGray>sSoL</TxtGray>
      </InputWr>

      <TotalWr>
        <TotalItems className="blue">
          Unstake now fee
          <i>
            <img src={IconInfo} alt="info" />
            <span>The fee to unstake now is higher than delayed unstake.</span>
          </i>
        </TotalItems>
        <TotalItems className="blue">0.3%</TotalItems>
      </TotalWr>

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
      <BtnStakes onClick={unstaking}>Unstake Now</BtnStakes>
    </>
  );
};

export default UnstakeNow;
