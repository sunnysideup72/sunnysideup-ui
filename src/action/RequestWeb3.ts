/* eslint-disable @typescript-eslint/ban-ts-comment, no-underscore-dangle, no-param-reassign */
/* eslint-disable no-plusplus, @typescript-eslint/no-use-before-define */

import {
  Connection,
  PublicKey,
  Transaction,
  LAMPORTS_PER_SOL,
  AccountInfo,
  Keypair,
  SystemProgram,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, Token, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { publicKey, struct, u32, u64, u8 } from '@project-serum/borsh';
import { initializeAccount } from '@project-serum/serum/lib/token-instructions';

export const ACCOUNT_LAYOUT = struct([
  publicKey('mint'),
  publicKey('owner'),
  u64('amount'),
  u32('delegateOption'),
  publicKey('delegate'),
  u8('state'),
  u32('isNativeOption'),
  u64('isNative'),
  u64('delegatedAmount'),
  u32('closeAuthorityOption'),
  publicKey('closeAuthority'),
]);

export const getBalance = async (connection: Connection, pubKey: PublicKey | undefined): Promise<number> => {
  try {
    if (pubKey) {
      const balance = await connection.getBalance(pubKey);
      return balance / LAMPORTS_PER_SOL;
    }
  } catch (e) {
    console.error(e);
  }
  return 0;
};

export const getTokenBalance = async (connection: Connection, pubKey: PublicKey | undefined): Promise<number> => {
  try {
    if (pubKey) {
      const balance = await connection.getTokenAccountBalance(pubKey);
      return balance?.value?.uiAmount || 0;
    }
  } catch (e) {
    // console.error(e);
  }
  return 0;
};

export async function createTokenAccountTransaction(): Promise<{
  transaction: Transaction;
}> {
  const transaction = new Transaction();

  return {
    transaction,
  };
}

export async function createProgramAccountIfNotExist(
  connection: Connection,
  account: string | undefined | null,
  owner: PublicKey,
  programId: PublicKey,
  lamports: number | null,
  layout: any,

  transaction: Transaction,
  signer: Array<Keypair>,
) {
  let publicKey;

  if (account) {
    publicKey = new PublicKey(account);
  } else {
    const newAccount = new Keypair();
    publicKey = newAccount.publicKey;

    transaction.add(
      SystemProgram.createAccount({
        fromPubkey: owner,
        newAccountPubkey: publicKey,
        lamports: lamports ?? (await connection.getMinimumBalanceForRentExemption(layout.span)),
        space: layout.span,
        programId,
      }),
    );

    signer.push(newAccount);
  }

  return publicKey;
}

export async function createTokenAccountIfNotExist(
  connection: Connection,
  account: string | undefined | null,
  owner: PublicKey,
  mintAddress: string,
  lamports: number | null,

  transaction: Transaction,
  signer: Array<Keypair>,
) {
  let publicKey;

  if (account) {
    publicKey = new PublicKey(account);
  } else {
    publicKey = await createProgramAccountIfNotExist(
      connection,
      account,
      owner,
      TOKEN_PROGRAM_ID,
      lamports,
      ACCOUNT_LAYOUT,
      transaction,
      signer,
    );

    transaction.add(
      initializeAccount({
        account: publicKey,
        mint: new PublicKey(mintAddress),
        owner,
      }),
    );
  }

  return publicKey;
}

export async function createAssociatedTokenAccountIfNotExist(
  account: string | undefined | null,
  owner: PublicKey,
  mintAddress: string,

  transaction: Transaction,
  atas: string[] = [],
) {
  let publicKey;
  if (account) {
    publicKey = new PublicKey(account);
  }

  const mint = new PublicKey(mintAddress);
  // @ts-ignore without ts ignore, yarn build will failed
  const ata = await Token.getAssociatedTokenAddress(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, mint, owner, true);

  if ((!publicKey || !ata.equals(publicKey)) && !atas.includes(ata.toBase58())) {
    transaction.add(
      Token.createAssociatedTokenAccountInstruction(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        mint,
        ata,
        owner,
        owner,
      ),
    );
    atas.push(ata.toBase58());
  }

  return ata;
}

export async function getFilteredProgramAccounts(
  connection: Connection,
  programId: PublicKey,
  filters: any,
): Promise<{ publicKey: PublicKey; accountInfo: AccountInfo<Buffer> }[]> {
  // @ts-ignore
  const resp = await connection._rpcRequest('getProgramAccounts', [
    programId.toBase58(),
    {
      commitment: connection.commitment,
      filters,
      encoding: 'base64',
    },
  ]);
  if (resp.error) {
    throw new Error(resp.error.message);
  }
  // @ts-ignore
  return resp.result.map(({ pubkey, account: { data, executable, owner, lamports } }) => ({
    publicKey: new PublicKey(pubkey),
    accountInfo: {
      data: Buffer.from(data[0], 'base64'),
      executable,
      owner: new PublicKey(owner),
      lamports,
    },
  }));
}

export async function getFilteredProgramAccountsAmmOrMarketCache(
  cacheName: string,
  connection: Connection,
  programId: PublicKey,
  filters: any,
): Promise<{ publicKey: PublicKey; accountInfo: AccountInfo<Buffer> }[]> {
  try {
    if (!cacheName) {
      throw new Error('cacheName error');
    }

    const resp = await (await fetch(`https://api.raydium.io/cache/rpc/${cacheName}`)).json();
    if (resp.error) {
      throw new Error(resp.error.message);
    }
    // @ts-ignore
    return resp.result.map(({ pubkey, account: { data, executable, owner, lamports } }) => ({
      publicKey: new PublicKey(pubkey),
      accountInfo: {
        data: Buffer.from(data[0], 'base64'),
        executable,
        owner: new PublicKey(owner),
        lamports,
      },
    }));
  } catch (e) {
    return getFilteredProgramAccounts(connection, programId, filters);
  }
}

export async function findProgramAddress(seeds: Array<Buffer | Uint8Array>, programId: PublicKey) {
  const [publicKey, nonce] = await PublicKey.findProgramAddress(seeds, programId);
  return { publicKey, nonce };
}
