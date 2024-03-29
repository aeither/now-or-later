'use client';

import dynamic from 'next/dynamic';

const TokenListComponent = dynamic(
  () => import('./TokenListComponent').then((mod) => mod.TokenListComponent),
  {
    ssr: false,
    loading: () => <div>loading...</div>,
  }
);

export { TokenListComponent };
