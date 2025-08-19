'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export function DashboardError({ error }: { error: string }) {
  useEffect(() => {
    toast.error('Error in dashboard:', { description: error });
  }, [error]);

  return null;
}
