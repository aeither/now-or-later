'use client';

import dynamic from 'next/dynamic';

const AddRecipientComponent = dynamic(
  () =>
    import('./AddRecipientComponent').then((mod) => mod.AddRecipientComponent),
  {
    ssr: false,
    loading: () => <div>loading...</div>,
  }
);

const ViewRecipentsComponent = dynamic(
  () =>
    import('./ViewRecipentsComponent').then(
      (mod) => mod.ViewRecipentsComponent
    ),
  {
    ssr: false,
    loading: () => <div>loading...</div>,
  }
);

export { AddRecipientComponent, ViewRecipentsComponent };
