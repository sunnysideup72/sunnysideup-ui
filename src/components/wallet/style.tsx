import styled from 'styled-components';
import TokenSolana from '../../images/token_solana.svg';
import TokenSSolImg from '../../images/token_ssol.svg';
import TokenSSUImg from '../../images/token_ssu.svg';

export const WalletLayout = styled.div`
  position: relative;

  .btn-wallet {
    position: fixed;
    top: 45%;
    left: 270px;
    z-index: 2;
    width: 40px;
    height: 58px;
    background: #fff;
    border: 1px solid #f3f3f3;
    border-radius: 0 16px 16px 0;
    transition: all 0.3s ease-in-out;

    &.on {
      left: 0;
    }
  }
`;

export const WalletWr = styled.div`
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  width: 270px;
  margin: 0 auto 75px;
  padding: 20px;
  background: #fff;
  border-radius: 0 20px 20px 0;
  text-align: left;
  color: #575757;
  transition: all 0.3s ease-in-out;

  &.on {
    left: -270px;
  }
`;

export const WalletTit = styled.h3`
  width: 100%;
  line-height: 30px;
  margin: 0 0 15px 0;
  padding: 0 0 10px 0;
  border-bottom: 1px solid #cacaca;
  font-size: 20px;
  font-weight: 600;
`;

export const WalletId = styled.span`
  margin: 0 0 0 12px;
  font-size: 16px;
  line-height: 24px;
  color: #585757;
`;

export const WalletBoxs = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 35px;
  margin: 0 0 20px 0;
  line-height: 35px;

  &:last-child {
    margin: 0;
  }
`;

export const TokenUnit = styled.div`
  width: calc(100% - 30px);
`;

export const TokenSol = styled.i`
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 0 15px 0 0;
  background: url(${TokenSolana}) no-repeat;
  background-size: contain;
`;

export const TokenSSol = styled.i`
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 0 15px 0 0;
  background: url(${TokenSSolImg}) no-repeat;
  background-size: contain;
`;

export const TokenSSU = styled.i`
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 0 15px 0 0;
  background: url(${TokenSSUImg}) no-repeat;
  background-size: contain;
`;

export const Token = styled.img`
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 0 15px 0 0;
  background-size: contain;
  border-radius: 50%;
`;

export const TokenBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 17px;
  font-size: 12px;

  &:last-child {
    font-size: 11px;
    color: #c6c6c6;
  }
`;

export const TokenTit = styled.div``;
export const TokenTxt = styled.div``;

export const TokenAmout = styled.span``;
