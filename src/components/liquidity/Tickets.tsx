import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import _ from 'lodash';
import { toast } from 'react-toastify';

import { useTokenAccounts } from '../../utils/balance';
import { LP_TOKENS_ARRAY } from '../../action/tokens';
import { POPUP_TYPE } from '../pools/PopupPools';
import { createRemoveLiquidityTransaction, LIQUIDITY_POOLS } from '../../action/liquidity';
import { Notification } from '../../utils/notify';
import { refreshAllCaches } from '../../utils/fetch-loop';

const TicketsWr = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 320px;
  max-width: 460px;
  width: 80%;
  padding: 50px 0 25px 0;
  margin: 0 auto;
  background: #fff;
  border-radius: 20px;
  color: #3a3a3a;
`;

const TicketsTit = styled.h3`
  margin: 240px auto 30px;
  font-size: 30px;
  font-weight: 600;
  line-height: 45px;
`;

const BtnTickets = styled.button`
  width: 147px;
  height: 67px;
  margin: 0 20px;
  line-height: 67px;
  background: #ffe176;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;

const TicketBox = styled.article`
  text-align: center;

  article {
    font-size: 20px;
    line-height: 50px;
    font-weight: 600;
  }
  .token-to {
    margin: 0 0 0 14px;
    font-size: 10px;
    font-weight: 600;
    line-height: 15px;

    vertical-align: top;
  }
  .token-total {
    font-size: 30px;
    font-weight: 400;
    line-height: 45px;
  }
  .token-img {
    border-radius: 50%;
    width: 42px;
    height: 42px;
  }
`;

const BtnWr = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

interface TicketsProps {
  liquidityBoxRef: any;
  popupRef: any;
}

const Tickets = ({ liquidityBoxRef, popupRef }: TicketsProps) => {
  const { publicKey, sendTransaction } = useWallet();
  const [tokenAccounts] = useTokenAccounts();
  const { connection } = useConnection();
  const [ticket, setTicket] = useState<any>([]);

  useEffect(() => {
    setTicket(
      _.values(_.merge(_.keyBy(tokenAccounts, 'mintAddress'), _.keyBy(LP_TOKENS_ARRAY, 'mintAddress'))).filter(
        (val) => val.name && val.balance,
      ),
    );
  }, [tokenAccounts]);

  return (
    <>
      {ticket.length > 0 ? (
        <>
          <TicketsTit>Your LP Tickets</TicketsTit>
          {ticket.map((val: any) => (
            <TicketsWr key={val.name}>
              <TicketBox>
                <article>
                  <>
                    <img className="token-img" src={val.coin.picUrl} alt={val.coin.symbol} />
                    <img className="token-img" src={val.pc.picUrl} alt={val.pc.symbol} />
                    {/* <img className="token-img" src={TokenSSuImg} alt="solana" /> */}
                  </>
                  <p className="token-total">{val.balance?.toEther()?.toNumber()}</p>
                  <span className="token-to">
                    <span>{val.coin.symbol}</span>
                    <span> - </span>
                    <span>{val.pc.symbol}</span>
                    <span> LP</span>
                  </span>
                </article>
                <BtnWr>
                  <BtnTickets
                    onClick={() => {
                      if (!publicKey) return;

                      // @ts-ignore
                      popupRef.current.openPopup(
                        val.balance?.toEther()?.toNumber() ?? 0,
                        POPUP_TYPE.REMOVE_LIQUIDITY,
                        () => async () => {
                          try {
                            const poolInfo = LIQUIDITY_POOLS.find(
                              (liquidity) => liquidity.lp.mintAddress === val.mintAddress,
                            );
                            if (!poolInfo) return;

                            const transaction = await createRemoveLiquidityTransaction(
                            );

                            const signature = await sendTransaction(transaction, connection);
                            toast.info(Notification({ msg: `Transaction Sent`, signature }));

                            const res = await connection.confirmTransaction(signature, 'confirmed');

                            if (res.value.err) {
                              toast.error(Notification({ msg: `failed`, signature }));
                            } else {
                              toast.success(Notification({ msg: `Transaction confirmed`, signature }));
                            }
                          } catch (e) {
                            if (e instanceof Error) {
                              toast.error(e?.message);
                            }
                          }

                          refreshAllCaches();
                        },
                      );
                    }}
                  >
                    Remove
                  </BtnTickets>
                  <BtnTickets
                    onClick={() => {
                      // @ts-ignore
                      liquidityBoxRef.current.setTokens(val.coin.symbol, val.pc.symbol);
                    }}
                  >
                    Add
                  </BtnTickets>
                </BtnWr>
              </TicketBox>
            </TicketsWr>
          ))}
        </>
      ) : null}
    </>
  );
};

export default Tickets;
