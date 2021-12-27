import React from 'react';
import axios from 'axios';

export enum SolanabeachStatus {
  Success,
  FetchFailed,
}

export interface StakingInfo {
  apy: number;
}

export interface APYInfoResult {
  data: {
    apy: number;
  };
}

export type StakingInfoResult = {
  stakingInfo?: StakingInfo;
  status: SolanabeachStatus;
};

export function useSolanabeachInfo(): StakingInfoResult | undefined {
  const [stakingInfo, setStakingInfo] = React.useState<StakingInfoResult>();
  React.useEffect(() => {
    const getAPYInfo = () => {
      axios
        .get('https://api.solanabeach.io/v1/staking-apy', {
          headers: {
            'Access-Control-Allow-Origin': 'https://api.solanabeach.io',
            Authorization: `Bearer 9ca4639a-b16f-4648-ae63-fb1c16d5d119`,
          },
        })
        .then((info: APYInfoResult) => {
          setStakingInfo({
            stakingInfo: {
              apy: info.data.apy,
            },
            status: SolanabeachStatus.Success,
          });
        })
        .catch(() => {
          setStakingInfo({
            status: SolanabeachStatus.FetchFailed,
          });
        });
    };

    getAPYInfo();
  }, [setStakingInfo]);

  return stakingInfo;
}
