'use client';

import dynamic from 'next/dynamic';

const LeaderboardList = dynamic(
  () => import('./LeaderboardList').then((mod) => mod.LeaderboardList),
  {
    ssr: false,
    loading: () => <div>loading...</div>,
  }
);

export { LeaderboardList };
