import styled from 'styled-components';
import { Link } from 'react-router-dom';
import close from '../../../images/x.svg';

export const Headers = styled.header`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  max-width: 1145px;
  height: 14.6vh;
  max-height: 150px;
  margin: 0 auto;
  font-weight: 600;

  .header-wr {
    display: flex;
    align-items: center;
  }
  .wallet-adapter-button-trigger {
    width: auto;
    height: 30px;
    background: #ffe872;
    border-radius: 10px;
    color: #3e3a3a;
    font-size: 12px;
    font-weight: 600;
    line-height: 30px;

    &:hover {
      background: #000;
      color: #fff;
      transition: all 0.3s ease-in;
    }
    .wallet-adapter-button-start-icon {
      display: none;
    }
    @media all and (max-width: 700px) {
      /* justify-content: center !important;
      position: fixed;
      left: 50%;
      bottom: 20px;
      z-index: 2;
      transform: translateX(-50%);
      width: calc(100% - 100px);
      height: 53px;
      font-size: 20px;
      line-height: 30px;
      background: #fff;
      border: solid 1px #cecece;
      border-radius: 10px;
      font-weight: 600;
      font-family: 'Poppins', sans-serif;
      text-align: center; */
      display: none;
    }
  }
  .btn-m {
    display: none;
    z-index: 4;
    width: 27px;
    height: 18px;
    transition: all 0.3s ease-in-out;

    @media all and (max-width: 700px) {
      display: block;
    }
  }
`;

export const HomeLink = styled(Link)`
  color: #000;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const Logo = styled.h1`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  margin: 0 70px 0 0;
  font-size: 14px;
  line-height: 21px;
  font-weight: 600;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    margin: 0 5px 0 0;
    vertical-align: middle;
  }
`;

export const Menu = styled.ul`
  li {
    display: inline-block;
    margin: 0 30px 0 0;

    @media all and (max-width: 700px) {
      display: none;
    }
  }
`;

export const NavLink = styled(Link)`
  position: relative;
  color: #3e3a3a;
  text-decoration: none;
  transition: all 0.3s ease-in;

  &:hover {
    &:after {
      width: 100%;
      animation: right 1s;
      text-decoration: none;
    }
  }

  &:after {
    content: '';
    display: block;
    position: relative;
    bottom: 0px;
    right: 0px;
    z-index: 1;
    width: 0;
    height: 3px;
    background: #ffe872;
  }
`;

export const ButtonWallet = styled.button`
  width: auto;
  height: 34px;
  border: solid 1px #000;
  border-radius: 30px;
  font-size: 16px;
  line-height: 32px;

  &:hover {
    background: #000;
    color: #fff;
    transition: all 0.3s ease-in;
  }

  @media all and (max-width: 700px) {
    position: fixed;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    width: calc(100% - 100px);
    height: 53px;
    font-size: 20px;
    line-height: 30px;
    background: #e6d9be;
    border: 0;
    border-radius: 100px;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }
`;

export const HamburgerWr = styled.div`
  position: fixed;
  z-index: 3;

  .m-menus {
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
    transition: all 0.3s ease-in-out;

    &.on {
      right: 0;
    }
  }
`;

export const BtnClose = styled.button`
  position: fixed;
  top: 30px;
  right: 30px;
  display: block;
  width: 20px;
  height: 20px;
  background: url(${close}) no-repeat;
  background-size: contain;
`;

export const Items = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
`;

export const HamburgerLink = styled(Link)`
  display: block;
  margin: 10px 0;
  text-decoration: none;
  font-size: 16px;
  line-height: 24px;
  font-weight: 300;
`;

export const SocialWr = styled.div`
  margin-top: 30px;

  > img {
    display: inline-block;
    margin-right: 10px;
  }
`;
