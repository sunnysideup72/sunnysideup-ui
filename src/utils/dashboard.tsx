import React, { useContext, useState, useEffect } from 'react';

import BN from 'bn.js';
// @ts-ignore
import BufferLayout from 'buffer-layout';
// @ts-ignore
import tuple from 'immutable-tuple';
import { LAMPORTS_PER_SOL, ParsedAccountData, PublicKey } from '@solana/web3.js';
import { useConnection } from '@solana/wallet-adapter-react';

import { DashboardContextValues } from './types';

import { getBalance } from '../action/RequestWeb3';
import { getTotalStakeBalance } from '../action/staking';
import { useAsyncData } from './fetch-loop';

const DashboardContext = React.createContext<null | DashboardContextValues>(null);

export interface MintInfo {
  decimals: number;
  initialized: boolean;
  supply: BN;
}

export const MINT_LAYOUT = BufferLayout.struct([
  BufferLayout.blob(36),
  BufferLayout.blob(8, 'supply'),
  BufferLayout.u8('decimals'),
  BufferLayout.u8('initialized'),
  BufferLayout.blob(36),
]);

export function parseTokenMintData(data: any): MintInfo {
  const { decimals, initialized, supply } = MINT_LAYOUT.decode(data);
  return {
    decimals,
    initialized: !!initialized,
    supply: new BN(supply, 10, 'le'),
  };
}

// @ts-ignore
export function DashboardProvider({ children }) {
  const { connection } = useConnection();

  const [totalStaked, setTotalStaked] = useState(0);
  const [unstakeLiqudity, setUnstakeLiqudity] = useState(0);
  const [solPerSSol, setSolPerSSol] = useState(1);

  useEffect(() => {
    async function getStakingState() {
      const total = await getTotalStakeBalance(connection);
      const unstake = await getBalance(connection, new PublicKey(process.env.REACT_APP_UNSTAKE_LIQUIDITY || ''));
      const refStakeAccountInfo = await connection.getParsedAccountInfo(
        new PublicKey(process.env.REACT_APP_REF_STAKING_ACC || ''),
      );

      if (refStakeAccountInfo) {
        const parsed = (refStakeAccountInfo.value?.data as ParsedAccountData)?.parsed;
        if (parsed) {
          const stakeBalance = (parsed?.info?.stake?.delegation?.stake || 10 * LAMPORTS_PER_SOL) / LAMPORTS_PER_SOL;
          setSolPerSSol(stakeBalance / 10);
        }
      }

      setTotalStaked(total);
      setUnstakeLiqudity(unstake);
    }
    getStakingState();
    const intervalId = setInterval(getStakingState, 30 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [connection]);

  return (
    <DashboardContext.Provider
      value={{
        totalStaked,
        unstakeLiqudity,
        solPerSSol,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('Missing Dashboard context');
  }

  return {
    totalStaked: context.totalStaked,
    unstakeLiqudity: context.unstakeLiqudity,
    solPerSSol: context.solPerSSol,
  };
}

const SLOW_REFRESH_INTERVAL = 60 * 1000;

export function useEpochInfo() {
  const { connection } = useConnection();
  async function fetchData() {
    const epochInfo = await connection.getEpochInfo();

    return epochInfo;
  }

  return useAsyncData(fetchData, tuple('useEpochInfo'), {
    refreshInterval: SLOW_REFRESH_INTERVAL,
  });
}
