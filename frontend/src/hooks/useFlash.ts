import { FlashContext } from '@/providers/FlashProvider';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect } from 'react';

interface Returning {
  setFlash: (message: string) => void;
  resetFlash: () => void;
  flash: string | undefined;
}

export function useFlash(): Returning {
  const context = useContext(FlashContext);
  if (!context) throw new Error('flash contextが初期化されていません');
  const router = useRouter();

  const setFlash = useCallback((message: string) => {
    context.setFlash(message);
  }, []);

  const resetFlash = useCallback(() => {
    context.setFlash(undefined);
  }, []);

  // ページ遷移開始時にリセットする
  useEffect(() => {
    router.events.on('routeChangeStart', resetFlash);
    return () => {
      router.events.off('routeChangeStart', resetFlash);
    };
  }, [router.events]);

  return {
    setFlash,
    resetFlash,
    flash: context.flash,
  };
}
