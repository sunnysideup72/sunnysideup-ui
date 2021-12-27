import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import close from '../../../images/x.svg';
import Twitter from '../../../images/twitter.svg';
import Telegram from '../../../images/telegram.svg';
import Medium from '../../../images/medium.svg';

const HamburgerWr = styled.div`
  position: fixed;
  bottom: 0;
  right: -100%;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  padding: 66px 30px 30px 30px;
  background: #e5e5e5;
  transform: 0.3s ease 0s, background-color 0.1s ease 0.3s;
  transform: translateX(0px);
`;

const BtnClose = styled.button`
  position: fixed;
  top: 30px;
  right: 30px;
  display: block;
  width: 20px;
  height: 20px;
  background: url(${close}) no-repeat;
  background-size: contain;
`;

const Items = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
`;

const HamburgerLink = styled(Link)`
  display: block;
  margin: 10px 0;
  color: #000;
  text-decoration: none;
`;

const SocialWr = styled.div`
  margin-top: 30px;
  > img {
    display: inline-block;
    margin-right: 10px;
  }
`;

const Hamburger = () => {
  return (
    <HamburgerWr>
      <Items>
        <div>
          <HamburgerLink to="/staking">Staking</HamburgerLink>
          <HamburgerLink to="/swap">Swap</HamburgerLink>
          <HamburgerLink to="/liquidity">Liquidity</HamburgerLink>
        </div>
        <div>
          <HamburgerLink to="">Docs</HamburgerLink>
          <HamburgerLink to="">Privacy Policy</HamburgerLink>
          <HamburgerLink to="">Support</HamburgerLink>
          <SocialWr>
            <img src={Twitter} alt="twitter logo" />
            <img src={Telegram} alt="telegram logo" />
            <img src={Medium} alt="medium logo" />
          </SocialWr>
        </div>
      </Items>
    </HamburgerWr>
  );
};

export default Hamburger;
