import { useCallback, useEffect, useState } from 'react';

import { get } from '../base';
import { defaultParams } from '../base/axios';
import { ResponseError } from '../base/types';
import { GetTradesRequestPayload, Trade, UseFetchTradesProps } from './types';

const endpoint = '/Trades';

export const getTrades = ({ seller, ...payload }: GetTradesRequestPayload) => get(`${endpoint}${seller ? '/' + seller : ''}`, { ...defaultParams, params: payload });

export const useTrades = (props: UseFetchTradesProps) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [tradesCount, setTradesCount] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [fetchingError, setFetchingError] = useState<ResponseError | undefined>();

  const fetch = useCallback((payload: GetTradesRequestPayload) => {
    setIsFetching(true);
    getTrades(payload).then((response) => {
      if (response.status === 200) {
        setTrades(response.data.items);
        setTradesCount(response.data.itemsCount);
        setIsFetching(false);
      } else {
        setFetchingError({
          status: response.status,
          message: JSON.stringify(response.data)
        });
      }
    });
  }, []);

  useEffect(() => {
    fetch({ ...props, page: 1 });
  }, []);

  return {
    trades,
    tradesCount,
    isFetching,
    fetchingError,
    fetchMore: fetch
  };
};
