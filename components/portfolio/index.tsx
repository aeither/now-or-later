'use client';

import dynamic from 'next/dynamic';

const PortfolioComponent = dynamic(
  () => import('./PortfolioComponent').then((mod) => mod.PortfolioComponent),
  {
    ssr: false,
    loading: () => <div>loading...</div>,
  }
);

export { PortfolioComponent };
