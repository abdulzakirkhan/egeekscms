// In your page file (e.g., app/dashboard/newsletter/page.tsx)
"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import LoadingSkeleton from '@/components/LoadingSkeleton'; // Create a loading component

const DynamicBlogsPage = dynamic(
  () => import('@/components/NewsLetter'),
  { 
    ssr: false,
    loading: () => <LoadingSkeleton />
  }
);

export default function Page() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <DynamicBlogsPage />
    </Suspense>
  );
}