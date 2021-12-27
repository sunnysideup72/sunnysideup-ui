import styled from 'styled-components';
import TokenSolana from '../../images/token_solana.svg';
import TokenSSolImg from '../../images/token_ssol.svg';
import TokenSSUImg from '../../images/token_ssu.svg';

export const LiquidityLayout = styled.div`
  position: relative;
  width: 100%;
  border-radius: 20px;

  .css-1okebmr-indicatorSeparator {
    background-color: transparent;
  }

  .css-tlfecz-indicatorContainer {
    color: #3e3a3a;
  }
`;

export const LiquidityTop = styled.div`
  padding: 30px 30px 60px 30px;
  background: #ffe872;
  border: 1px solid #cecece;
  border-radius: 20px 20px 0 0;
`;

export const LiquidityTit = styled.div`
  margin: 0 0 29px 0;
  color: #3e3a3a;
  font-weight: 600;
  text-align: left;

  strong {
    display: block;
    margin: 0 0 60px 0;
    font-size: 20px;
    line-height: 30px;
  }

  span {
    font-size: 14px;
    font-weight: 300;
    line-height: 21px;
  }
`;

export const Balance = styled.div`
  position: absolute;
  top: -25px;
  left: 0;
  font-size: 12px;
  text-align: left;
`;

export const AddLiquidityItem = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 12px 0;
  padding: 15px 20px;
  background: #fffceb;
  border-radius: 10px;
  text-align: left;

  .left-box {
    width: calc(100% - 160px);
    height: 100%;

    > input {
      margin: 6px 0 0 0;
      border: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: transparent;
      font-size: 20px;
    }
  }
`;

export const TotalLiquidity = styled.ul`
  width: 100%;
  padding: 25px 20px;
  margin: 30px 0 0 0;
  background: #f6f6f6;
  border-radius: 20px;
`;

export const BtnMax = styled.button`
  width: 50px;
  height: 30px;
  line-height: 30px;
  background: #ffe872;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
`;

export const SelectSol = styled.i`
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 0 7px 0 0;
  background: url(${TokenSolana}) no-repeat;
  background-size: contain;
  vertical-align: middle;
`;

export const SelectSSol = styled.i`
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 0 7px 0 0;
  background: url(${TokenSSolImg}) no-repeat;
  background-size: contain;
  vertical-align: middle;
`;

export const Txt = styled.p`
  font-size: 12px;
  line-height: 18px;
  text-align: center;
`;

export const TotalSwapTit = styled.li`
  display: inline-block;
  width: 160px;
  text-align: left;
`;

export const TotalSwapFee = styled.li`
  display: inline-block;
  width: calc(100% - 160px);
  margin: 0 0 8px 0;
  font-weight: 600;
  text-align: right;

  span {
    margin: 0 1px;

    img {
      margin: 0 10px 0 0;
    }
  }
`;

export const BtnWr = styled.div`
  position: relative;
  top: -30px;
  left: 0;
  width: 100%;
  padding: 0 30px;
  background: #fff;
  border: 1px solid #cecece;
  border-radius: 20px;

  p {
    font-size: 12px;
    font-weight: 500;
    line-height: 17px;
    color: #afafaf;
  }
`;

export const BtnAddLiquidity = styled.button`
  width: 100%;
  height: 67px;
  margin: 28px 0;
  background: #ffe872;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 600;
  line-height: 67px;
  text-align: center;
`;

export const TokenSSU = styled.i`
  display: block;
  width: 40px;
  height: 40px;
  margin: 0 18px 0 0;
  background: url(${TokenSSUImg});
  background-size: contain;
`;
