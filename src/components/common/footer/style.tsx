import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Twitter from '../../../images/twitter.png';
import Medium from '../../../images/medium.png';
import Telegram from '../../../images/telegram.png';

export const Footers = styled.footer`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  max-width: 100%;
  height: 33vh;
  max-height: 150px;
  margin: 0 auto;
  font-weight: 600;

  @media all and (max-width: 700px) {
    display: none;
  }

  .footer-wr {
    display: flex;
    align-items: center;
  }
`;

export const TokenWr = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  > img {
    width: 25px;
    height: auto;
  }
`;

export const TokenTit = styled.h5`
  padding: 0 0 0 7px;
  font-size: 12px;
  line-height: 18px;
`;

export const MenuAbout = styled.ul``;

export const MenuAboutItems = styled(Link)`
  display: inline-block;
  margin: 0 0 0 50px;
  font-size: 12px;
  line-height: 18px;
  text-decoration: none;
  color: inherit;
`;

export const MenuSocial = styled.ul`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  img {
    margin: 0 0 0 25px;
  }
`;

export const Twitters = styled.img`
  display: inline-block;
  width: 31px;
  height: 26px;
  background-image: url(${Twitter});
  background-size: contain;
`;

export const Mediums = styled.img`
  display: inline-block;
  width: 35px;
  height: 35px;
  background-image: url(${Medium});
  background-size: contain;
`;

export const Telegrams = styled.img`
  display: inline-block;
  width: 38px;
  height: 38px;
  background-image: url(${Telegram});
  background-size: contain;
`;
