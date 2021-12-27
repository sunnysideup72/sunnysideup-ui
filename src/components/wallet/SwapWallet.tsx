import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

import {
  WalletWr,
  WalletTit,
  WalletBoxs,
  WalletId,
  TokenSol,
  TokenSSol,
  TokenTxt,
  TokenUnit,
  TokenBox,
  TokenAmout,
  TokenTit,
} from './style';
import { intlNumberFormat2 } from '../../utils/utils';
import { useBalance, useSSolBalance } from '../../utils/balance';
import { useDashboard } from '../../utils/dashboard';
import { useCoinGecko } from '../../utils/coingecko';

const Swap = () => {
  const { publicKey } = useWallet();
  const [balance] = useBalance();
  const [sSolBalance] = useSSolBalance();
  const dashboard = useDashboard();
  const solanaInfo = useCoinGecko('solana');

  const walletAddress = () => {
    if (!publicKey) return '';
    const address = publicKey?.toBase58() || '';
    return `(${address.slice(0, 4)}...${address.slice(-6)})`;
  };

  return (
    <WalletWr>
      <WalletTit>
        Wallet
        <WalletId>{walletAddress()}</WalletId>
      </WalletTit>
      <WalletBoxs>
        <TokenUnit>
          <TokenSol />
          <TokenBox>
            <TokenTit>SOL</TokenTit>
            {solanaInfo?.coinInfo?.price ? (
              <TokenTxt>≈ USD {intlNumberFormat2((balance || 0) * solanaInfo.coinInfo.price)} $</TokenTxt>
            ) : null}
          </TokenBox>
        </TokenUnit>
        <TokenAmout>{intlNumberFormat2(balance || 0)}</TokenAmout>
      </WalletBoxs>
      <WalletBoxs>
        <TokenUnit>
          <TokenSSol />
          <TokenBox>
            <TokenTit>sSOL</TokenTit>
            {solanaInfo?.coinInfo?.price ? (
              <TokenTxt>
                ≈ USD {intlNumberFormat2((sSolBalance || 0) * dashboard.solPerSSol * solanaInfo.coinInfo.price)} $
              </TokenTxt>
            ) : null}
          </TokenBox>
        </TokenUnit>
        <TokenAmout>{intlNumberFormat2(sSolBalance || 0)}</TokenAmout>
      </WalletBoxs>
      {/* <WalletBoxs> */}
      {/*   <TokenUnit> */}
      {/*     <TokenSSU /> */}
      {/*     <TokenBox> */}
      {/*       <TokenTit>SSU</TokenTit> */}
      {/*     </TokenBox> */}
      {/*   </TokenUnit> */}

      {/*   <TokenAmout> */}
      {/*     {tokenAccounts */}
      {/*       ?.find((val) => val?.mintAddress === TOKENS.SSU.mintAddress) */}
      {/*       ?.balance?.toWei() */}
      {/*       ?.toFixed(2) || '0.00'} */}
      {/*   </TokenAmout> */}
      {/* </WalletBoxs> */}
    </WalletWr>
  );
};

export default Swap;
