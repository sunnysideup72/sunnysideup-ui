import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import _ from 'lodash';

import {
  WalletLayout,
  WalletWr,
  WalletTit,
  WalletBoxs,
  WalletId,
  TokenSol,
  TokenTxt,
  TokenUnit,
  TokenBox,
  TokenTit,
  Token,
} from './style';
import IconWallet from '../../images/wallet_off.svg';
import IconWallet2 from '../../images/wallet_on.svg';
import { intlNumberFormat4 } from '../../utils/utils';
import { useBalance, useTokenAccounts } from '../../utils/balance';
import { useCoinGecko } from '../../utils/coingecko';
import { LP_TOKENS_ARRAY, TOKENS_ARRAY } from '../../action/tokens';

const Staking = () => {
  const { publicKey } = useWallet();
  const [balance] = useBalance();
  const solanaInfo = useCoinGecko('solana');

  const [tokenAccounts] = useTokenAccounts();

  const [tokens, setTokens] = useState<any>([]);
  const [lpTokens, setLpTokens] = useState<any>([]);

  useEffect(() => {
    setLpTokens(
      _.values(
        _.merge(_.keyBy(_.cloneDeep(tokenAccounts), 'mintAddress'), _.keyBy(LP_TOKENS_ARRAY, 'mintAddress')),
      ).filter((val) => val.name && val.balance),
    );

    setTokens(
      _.values(
        _.merge(_.keyBy(_.cloneDeep(tokenAccounts), 'mintAddress'), _.keyBy(TOKENS_ARRAY, 'mintAddress')),
      ).filter((val) => val.name && val.balance),
    );
  }, [tokenAccounts]);

  const walletAddress = () => {
    if (!publicKey) return '';
    const address = publicKey?.toBase58() || '';
    return `(${address.slice(0, 4)}...${address.slice(-6)})`;
  };

  const [isWallet, setIsWallet] = useState(false);

  return (
    <WalletLayout>
      <button
        type="button"
        className={isWallet ? 'on btn-wallet' : 'btn-wallet'}
        onClick={() => {
          setIsWallet(!isWallet);
        }}
      >
        {!isWallet ? <img src={IconWallet} alt="on" /> : <img src={IconWallet2} alt="off" />}
      </button>
      <WalletWr
        className={isWallet ? 'on' : ''}
        onChange={() => {
          setIsWallet(!isWallet);
        }}
      >
        <WalletTit>
          Wallet
          <WalletId>{walletAddress()}</WalletId>
        </WalletTit>
        <WalletBoxs>
          <TokenSol />
          <TokenUnit>
            <TokenBox>
              <TokenTit>SOL</TokenTit>
              <p>{intlNumberFormat4(balance || 0)}</p>
            </TokenBox>

            <TokenBox>
              {solanaInfo?.coinInfo?.price ? (
                <>
                  <p>
                    <TokenTxt>≈ USD {solanaInfo.coinInfo.price} $</TokenTxt>
                  </p>
                  <p>{intlNumberFormat4((balance || 0) * solanaInfo.coinInfo.price)} $</p>
                </>
              ) : null}
            </TokenBox>
          </TokenUnit>
        </WalletBoxs>
        {tokens
          ? tokens.map((val: any) => (
              <WalletBoxs key={val.publicKey.toBase58()}>
                <Token className="token-img" src={val.picUrl} alt={val.symbol} />
                <TokenUnit>
                  <TokenBox>
                    <TokenTit>{val.symbol}</TokenTit>
                    <p>{intlNumberFormat4(val.balance?.toEther()?.toNumber() || 0)}</p>
                  </TokenBox>
                  <TokenBox />
                </TokenUnit>
              </WalletBoxs>
            ))
          : null}
        {lpTokens
          ? lpTokens.map((val: any) => (
              <WalletBoxs key={val.publicKey.toBase58()}>
                <Token className="token-img" src={val.coin.picUrl} alt={val.coin.symbol} />
                <Token className="token-img" src={val.pc.picUrl} alt={val.pc.symbol} />
                <TokenUnit>
                  <TokenBox>
                    <TokenTit>{val.symbol}</TokenTit>
                    <p>{intlNumberFormat4(val.balance?.toEther()?.toNumber() || 0)}</p>
                  </TokenBox>
                  <TokenBox />
                </TokenUnit>
              </WalletBoxs>
            ))
          : null}
      </WalletWr>
    </WalletLayout>
  );
};

export default Staking;
