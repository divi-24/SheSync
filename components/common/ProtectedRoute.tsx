'use client'

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  if (!isLoaded) {
    return <LoadingSpinner fullScreen text="Checking authentication..." />;
  }

  if (!isSignedIn) {
    router.push(redirectTo);
    return <LoadingSpinner fullScreen text="Redirecting to login..." />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;