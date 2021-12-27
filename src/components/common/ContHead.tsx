import React from 'react';
import styled from 'styled-components';

const ContTitWr = styled.div`
  width: 100%;
`;

const ContTit = styled.h2`
  font-size: 40px;
  font-weight: 600;
  line-height: 60px;

  @media all and (max-width: 700px) {
    font-size: 32px;
  }
`;

const ContTitSub = styled.p`
  margin: 0 0 98px 0;
  font-weight: 300;
  font-size: 18px;
  line-height: 27px;

  @media all and (max-width: 700px) {
    margin: 0 0 50px 0;
    font-size: 16px;
  }
`;

interface PropsTit {
  tit: any;
  subTit: any;
}

const ContHead = ({ tit, subTit }: PropsTit) => {
  return (
    <ContTitWr>
      <ContTit>{tit}</ContTit>
      <ContTitSub>{subTit}</ContTitSub>
    </ContTitWr>
  );
};

export default ContHead;
