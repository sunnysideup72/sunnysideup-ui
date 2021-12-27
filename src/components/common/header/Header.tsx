import React, { useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import styled from 'styled-components';

import { Headers, HomeLink, Logo, Menu, NavLink, HamburgerWr, Items, HamburgerLink, SocialWr } from './style';
import Token from '../../../images/token_ssu.svg';
import hamburger from '../../../images/hamburger.svg';
import close from '../../../images/x.svg';
import Twitter from '../../../images/twitter.svg';
import Telegram from '../../../images/telegram.svg';
import Medium from '../../../images/medium.svg';

export const TotalSwapTit = styled.div`
  width: 30px;

  &:last-child {
    font-weight: 600;
  }

  .tip-wr {
    display: flex;
    align-items: center;

    i {
      position: relative;
      display: inline-block;
      margin: 0 0 0 4px;
      cursor: pointer;

      span {
        position: absolute;
        top: 5px;
        left: 45px;
        z-index: 3;
        display: none;
        min-width: 140px;
        padding: 13px;
        background: #e6e3e3;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 400;
        color: #3e3a3a;
      }

      &:hover {
        cursor: default;

        span {
          display: block;
        }
      }
    }
  }
`;

const Header = () => {
  const network =
    process.env.REACT_APP_SOLANA_API_ENDPOINT === 'https://api.devnet.solana.com'
      ? WalletAdapterNetwork.Devnet
      : WalletAdapterNetwork.Mainnet;

  const [isMenu, setIsMenu] = useState(true);
  return (
    <Headers>
      <Logo>
        <img src={Token} alt="token ssu" />
        <HomeLink to="/">Sunny Side Up</HomeLink>
      </Logo>

      <div className="header-wr">
        <nav>
          <Menu>
            <li>
              <NavLink to="/staking">Staking</NavLink>
            </li>
            {network === WalletAdapterNetwork.Mainnet ? (
              <li>
                <NavLink to="/swap">Swap</NavLink>
              </li>
            ) : null}
            {network === WalletAdapterNetwork.Mainnet ? (
              <li>
                <NavLink to="/liquidity">Liquidity</NavLink>
              </li>
            ) : null}
          </Menu>
        </nav>
        <WalletMultiButton />
        <button
          type="button"
          className={isMenu ? 'btn-m' : 'on btn-m'}
          onClick={() => {
            setIsMenu(!isMenu);
          }}
        >
          {isMenu ? <img src={hamburger} alt="button mobile" /> : <img src={close} alt="button mobile" />}
        </button>
        <HamburgerWr>
          <div
            className={isMenu ? 'm-menus' : 'on m-menus'}
            onChange={() => {
              setIsMenu(!isMenu);
            }}
          >
            <Items>
              <div>
                <HamburgerLink to="/staking">Staking</HamburgerLink>
                <HamburgerLink to="/swap">Swap</HamburgerLink>
                <HamburgerLink to="/liquidity">liquidity</HamburgerLink>
              </div>
              <div>
                <HamburgerLink to="terms">Terms & Conditions</HamburgerLink>
                <HamburgerLink to="privacy">Privacy Policy</HamburgerLink>
                <SocialWr>
                  <img src={Twitter} alt="twitter logo" />
                  <img src={Telegram} alt="telegram logo" />
                  <img src={Medium} alt="medium logo" />
                </SocialWr>
              </div>
            </Items>
          </div>
        </HamburgerWr>
      </div>
    </Headers>
  );
};

export default Header;
