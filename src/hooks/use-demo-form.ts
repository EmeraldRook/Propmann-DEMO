'use client';

import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface UseDemoFormOptions {
  successMessage: string;
  delay?: number;
}

export function useDemoForm({ successMessage, delay = 800 }: UseDemoFormOptions) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const submit = useCallback(
    async (onDone?: () => void) => {
      setPending(true);
      await new Promise((r) => setTimeout(r, delay));
      setPending(false);
      setOpen(false);
      toast.success(successMessage);
      onDone?.();
    },
    [successMessage, delay],
  );

  return { open, setOpen, pending, submit };
}
