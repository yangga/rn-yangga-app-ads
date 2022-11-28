import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useInterval } from 'react-use-timeout';
import { URI_META } from './const';
import { Context, IContextProp } from './Context';
import type { IDatabase } from './types';

export interface IYanggaAppAdsProviderProp {
  children?: React.ReactElement | React.ReactElement[];
}

export const Provider = (props: IYanggaAppAdsProviderProp) => {
  const [isReady, setReady] = useState(false);
  const [database, setDatabase] = useState<IContextProp['database']>();

  const fetchDatabase = useCallback(async () => {
    try {
      const res = await fetch(URI_META);
      const resJson = (await res.json()) as IDatabase;
      setDatabase(resJson);
      setReady(true);
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  }, []);

  const intervalFetchDatabase = useInterval(() => fetchDatabase(), 1000 * 10);

  useEffect(() => {
    if (database) {
      intervalFetchDatabase.stop();
    } else {
      intervalFetchDatabase.start();
      fetchDatabase();
    }
  }, [database, fetchDatabase, intervalFetchDatabase]);

  const value = useMemo<IContextProp>(
    () => ({
      isReady,
      database,
    }),
    [isReady, database]
  );

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
