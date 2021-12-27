import React from 'react';
import { Footers, MenuAbout, MenuAboutItems, MenuSocial, TokenWr, TokenTit } from './style';
import Twitter from '../../../images/twitter.svg';
import Telegram from '../../../images/telegram.svg';
import Medium from '../../../images/medium.svg';

const Footer = () => {
  return (
    <Footers>
      <TokenWr>
        <TokenTit>© 2022 Sunny Side Up</TokenTit>
      </TokenWr>
      <div className="footer-wr">
        <MenuAbout>
          <MenuAboutItems to="/terms">Terms & Conditions</MenuAboutItems>
          <MenuAboutItems to="/privacy">Privacy Policy</MenuAboutItems>
          {/* <MenuAboutItems>Docs</MenuAboutItems>          
          <MenuAboutItems>Support</MenuAboutItems> */}
        </MenuAbout>
        <MenuSocial>
          <img src={Twitter} alt="twitter logo" />
          <img src={Telegram} alt="telegram logo" />
          <img src={Medium} alt="medium logo" />
        </MenuSocial>
      </div>
    </Footers>
  );
};

export default Footer;
