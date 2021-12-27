import {
  AccountInfo,
  Connection,
  LAMPORTS_PER_SOL,
  ParsedAccountData,
  PublicKey,
  StakeProgram,
  Transaction,
} from '@solana/web3.js';

// @ts-ignore
import BufferLayout from 'buffer-layout';
import { Buffer } from 'buffer';
import base58 from 'bs58';

export const uint256 = (property = 'uint256') => {
  return BufferLayout.blob(32, property);
};

const STAKE_ACCOUNT_LAYOUT = BufferLayout.struct([
  BufferLayout.blob(12),
  BufferLayout.blob(32, 'stake_authority'),
  BufferLayout.blob(32, 'withdraw_authority'),
  BufferLayout.blob(124),
]);

export const getTotalStakeBalance = async (connection: Connection): Promise<number> => {
  try {
    const stakeAuthority = new PublicKey(process.env.REACT_APP_MANAGER_ACC || '');
    const withdrawAuthority = new PublicKey(process.env.REACT_APP_UNSTAKE_LIQUIDITY || '');

    const buffer = Buffer.concat([stakeAuthority.toBytes(), withdrawAuthority.toBytes()]);

    const stakeAccounts = await connection.getProgramAccounts(StakeProgram.programId, {
      filters: [
        {
          memcmp: {
            offset: STAKE_ACCOUNT_LAYOUT.offsetOf('stake_authority'),
            bytes: base58.encode(buffer),
          },
        },
        {
          dataSize: 200,
        },
      ],
    });

    const balance = stakeAccounts.reduce((acc, cur) => acc + cur.account.lamports, 0);

    return balance / LAMPORTS_PER_SOL;
  } catch (e) {
    console.error(e);
  }
  return 0;
};

export const getDelayedUnstakeAccounts = async (
  connection: Connection,
  withdrawAuthority: PublicKey,
): Promise<{ pubkey: PublicKey; account: AccountInfo<Buffer | ParsedAccountData> }[]> => {
  try {
    const stakeAuthority = new PublicKey(process.env.REACT_APP_UNSTAKE_LIQUIDITY || '');

    const buffer = Buffer.concat([stakeAuthority.toBytes(), withdrawAuthority.toBytes()]);

    const stakeAccounts = connection.getParsedProgramAccounts(StakeProgram.programId, {
      filters: [
        {
          memcmp: {
            offset: STAKE_ACCOUNT_LAYOUT.offsetOf('stake_authority'),
            bytes: base58.encode(buffer),
          },
        },
        {
          dataSize: 200,
        },
      ],
    });

    return stakeAccounts;
  } catch (e) {
    console.error(e);
  }
  return [];
};

export async function createStakingTransaction() {
  const transaction = new Transaction();
  return transaction;
}

export async function createUnstakingTransaction() {
  const transaction = new Transaction();
  return transaction;
}

export async function createDelayedUnstakeTransaction() {
  const transaction = new Transaction();
  return transaction;
}

export async function createWithdrawTransaction() {
  const transaction = new Transaction();

  return transaction;
}
