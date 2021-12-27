/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isValidPublicKey(key: string | number | Buffer | Uint8Array | number[]) {
  if (!key) {
    return false;
  }
  try {
    // eslint-disable-next-line no-new
    new PublicKey(key);
    return true;
  } catch {
    return false;
  }
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const percentFormat = new Intl.NumberFormat(undefined, {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function floorToDecimal(value: number, decimals: number | undefined | null) {
  return decimals ? Math.floor(value * 10 ** decimals) / 10 ** decimals : Math.floor(value);
}

export function roundToDecimal(value: number, decimals: number | undefined | null) {
  return decimals ? Math.round(value * 10 ** decimals) / 10 ** decimals : value;
}

export function getDecimalCount(value: number): number {
  if (!Number.isNaN(value) && Math.floor(value) !== value && value.toString().includes('.'))
    return value.toString().split('.')[1].length || 0;
  if (!Number.isNaN(value) && Math.floor(value) !== value && value.toString().includes('e'))
    // eslint-disable-next-line radix
    return parseInt(value.toString().split('e-')[1] || '0');
  return 0;
}

export function divideBnToNumber(numerator: BN, denominator: BN): number {
  const quotient = numerator.div(denominator).toNumber();
  const rem = numerator.umod(denominator);
  const gcd = rem.gcd(denominator);
  return quotient + rem.div(gcd).toNumber() / denominator.div(gcd).toNumber();
}

export function getTokenMultiplierFromDecimals(decimals: number): BN {
  return new BN(10).pow(new BN(decimals));
}

const localStorageListeners: { [index: string]: any } = {};

export function useLocalStorageStringState(
  key: string,
  defaultState: string | null = null,
): [string | null, (newState: string | null) => void] {
  const state = localStorage.getItem(key) || defaultState;

  const [, notify] = useState(`${key}\n${state}`);

  useEffect(() => {
    if (!localStorageListeners[key]) {
      localStorageListeners[key] = [];
    }
    localStorageListeners[key].push(notify);
    return () => {
      localStorageListeners[key] = localStorageListeners[key].filter(
        (listener: React.Dispatch<React.SetStateAction<string>>) => listener !== notify,
      );
      if (localStorageListeners[key].length === 0) {
        delete localStorageListeners[key];
      }
    };
  }, [key]);

  const setState = useCallback<(newState: string | null) => void>(
    (newState) => {
      const changed = state !== newState;
      if (!changed) {
        return;
      }

      if (newState === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, newState);
      }
      localStorageListeners[key].forEach((listener: React.Dispatch<React.SetStateAction<string>>) =>
        listener(`${key}\n${newState}`),
      );
    },
    [state, key],
  );

  return [state, setState];
}

export function useLocalStorageState<T = any>(key: string, defaultState: T | null = null): [T, (newState: T) => void] {
  const [stringState, setStringState] = useLocalStorageStringState(key, JSON.stringify(defaultState));
  return [
    useMemo(() => stringState && JSON.parse(stringState), [stringState]),
    (newState) => setStringState(JSON.stringify(newState)),
  ];
}

export function useEffectAfterTimeout(effect: (...args: any[]) => void, timeout: number) {
  useEffect(() => {
    const handle = setTimeout(effect, timeout);
    return () => clearTimeout(handle);
  });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// @ts-ignore
export function useListener(emitter, eventName: any) {
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const listener = () => forceUpdate((i) => i + 1);
    emitter.on(eventName, listener);
    return () => emitter.removeListener(eventName, listener);
  }, [emitter, eventName]);
}

export function abbreviateAddress(address: PublicKey, size = 4) {
  const base58 = address.toBase58();
  return `${base58.slice(0, size)}…${base58.slice(-size)}`;
}

export function isEqual(obj1: any, obj2: any, keys: any) {
  if (!keys && Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  // eslint-disable-next-line no-param-reassign
  keys = keys || Object.keys(obj1);
  // eslint-disable-next-line no-restricted-syntax
  for (const k of keys) {
    if (obj1[k] !== obj2[k]) {
      // shallow comparison
      return false;
    }
  }
  return true;
}

export const intlNumberFormat2 = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format;

export const intlNumberFormat6 = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 6,
  maximumFractionDigits: 6,
}).format;

export const intlNumberFormat4 = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
}).format;

export const intlNumberFormat10 = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 10,
  maximumFractionDigits: 10,
}).format;

export function getBigNumber(num: any) {
  return num === undefined || num === null ? 0 : parseFloat(num.toString());
}
