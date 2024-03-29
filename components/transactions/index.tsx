'use client';

import dynamic from 'next/dynamic';

const TransactionList = dynamic(
  () => import('./TransactionList').then((mod) => mod.TransactionList),
  {
    ssr: false,
    loading: () => <div>loading...</div>,
  }
);

export { TransactionList };
