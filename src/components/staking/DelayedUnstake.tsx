import React, { useCallback, useState } from 'react';
import { AccountInfo, LAMPORTS_PER_SOL, ParsedAccountData, PublicKey } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import { Buffer } from 'buffer';

import {
  BtnMax,
  BtnStakes,
  InputWr,
  TicketItem,
  TicketStatus,
  TicketTit,
  TicketWr,
  TokenAmout,
  TokenUnit,
  TotalItems,
  TotalWr,
  TxtGray,
  NoPending,
} from './style';
import TokenSSOL from '../../images/token_ssol.svg';
import TokenSolana from '../../images/token_solana.svg';
import IconInfo from '../../images/i.svg';
import { useDelayedStakeAccount, useSSolBalance, useSSolTokenAccount } from '../../utils/balance';
import { useDashboard, useEpochInfo } from '../../utils/dashboard';
import { createDelayedUnstakeTransaction, createWithdrawTransaction } from '../../action/staking';
import { Notification } from '../../utils/notify';
import { refreshAllCaches } from '../../utils/fetch-loop';
import { intlNumberFormat10, intlNumberFormat6 } from '../../utils/utils';
import { useCoinGecko } from '../../utils/coingecko';

function getDeactivationEpoch(account: { pubkey: PublicKey; account: AccountInfo<Buffer | ParsedAccountData> }) {
  const parsedAccountData = (account.account.data as ParsedAccountData)?.parsed;
  if (parsedAccountData) {
    const { deactivationEpoch } = parsedAccountData?.info?.stake?.delegation;
    return deactivationEpoch;
  }
  return null;
}

function sortEpoch(
  a: { pubkey: PublicKey; account: AccountInfo<Buffer | ParsedAccountData> },
  b: { pubkey: PublicKey; account: AccountInfo<Buffer | ParsedAccountData> },
) {
  if (getDeactivationEpoch(a) > getDeactivationEpoch(b)) return 1;
  if (getDeactivationEpoch(a) < getDeactivationEpoch(b)) return -1;

  if (a.pubkey.toBase58() > b.pubkey.toBase58()) return 1;
  if (a.pubkey.toBase58() < b.pubkey.toBase58()) return -1;
  return 0;
}

const DelayedUnstake = () => {
  const [sSolBalance] = useSSolBalance();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [sSolTokenAccount] = useSSolTokenAccount();
  const { solPerSSol } = useDashboard();
  const [delayedStakeAccounts] = useDelayedStakeAccount();
  const [epochInfo] = useEpochInfo();
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

  const delayedUnstaking = useCallback(async () => {
    if (!publicKey || !sSolTokenAccount) return;

    try {
      const transaction = await createDelayedUnstakeTransaction();

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
  }, [connection, publicKey, sSolTokenAccount, state]);

  const withdrawStakeAccount = useCallback(
    async () => {
      if (!publicKey) return;

      try {
        const transaction = await createWithdrawTransaction();
        const signature = await sendTransaction(transaction, connection);
        toast.info(Notification({ msg: `Transaction Sent`, signature }));

        const res = await connection.confirmTransaction(signature, 'confirmed');

        if (res.value.err) {
          console.error(res.value.err);
        } else {
          toast.success(`success ${signature}`);
        }
      } catch (e) {
        if (e instanceof Error) {
          toast.error(e?.message);
        }
      }
      refreshAllCaches();
    },
    [connection, publicKey],
  );

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
          value={intlNumberFormat10(state.unstakingAmount * solPerSSol * 0.9995)}
          placeholder="~0"
        />
        <TxtGray>sSoL</TxtGray>
      </InputWr>

      <TotalWr>
        <TotalItems className="blue">
          Delayed Unstake fee
          <i>
            <img src={IconInfo} alt="info" />
            <span>Delayed unstake can take up to 3-6 days.</span>
          </i>
        </TotalItems>
        <TotalItems className="blue">0.05%</TotalItems>
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
      <BtnStakes onClick={delayedUnstaking}>Start Delayed Unstake</BtnStakes>

      <TicketWr>
        <TicketTit>Ticket Status</TicketTit>
        <NoPending>No Pending Tickets</NoPending>
        <ul>
          {delayedStakeAccounts &&
            delayedStakeAccounts.sort(sortEpoch).map((val) => {
              const pubkey = val.pubkey.toBase58();
              const deactivationEpoch = getDeactivationEpoch(val);
              if (!deactivationEpoch) return null;

              const disableButton = !epochInfo || deactivationEpoch >= epochInfo?.epoch;

              return (
                <TicketItem key={pubkey}>
                  <span>{`${pubkey.slice(0, 3)}...${pubkey.slice(-3)}`}</span>
                  <span>{val.account.lamports / LAMPORTS_PER_SOL}</span>
                  <TicketStatus
                    className={disableButton ? 'pending' : 'completed'}
                    disabled={disableButton}
                    onClick={() => {
                      withdrawStakeAccount();
                    }}
                  >
                    {disableButton ? 'Pending' : 'Completed'}
                  </TicketStatus>
                </TicketItem>
              );
            })}
        </ul>
      </TicketWr>
    </>
  );
};

export default DelayedUnstake;
