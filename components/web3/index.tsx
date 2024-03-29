'use client';

import dynamic from 'next/dynamic';

const UploadComponent = dynamic(
  () => import('./UploadComponent').then((mod) => mod.UploadComponent),
  {
    ssr: false,
    loading: () => <div>loading...</div>,
  }
);

const MintTokenComponent = dynamic(
  () => import('./MintTokenComponent').then((mod) => mod.MintTokenComponent),
  {
    ssr: false,
    loading: () => <div>loading...</div>,
  }
);

export { UploadComponent, MintTokenComponent };
