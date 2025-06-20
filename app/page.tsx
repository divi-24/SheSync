"use client";

import dynamic from 'next/dynamic';
import SheSyncLoader from '@/components/Loader';

const Landing = dynamic(() => import('@/components/Landing').then((mod) => mod.Landing), {
  loading: () => <SheSyncLoader />,
  ssr: false
});

export default function HomePage() {
  return <Landing />;
}