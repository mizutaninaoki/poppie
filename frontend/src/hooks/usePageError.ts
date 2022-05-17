import { useCallback, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PageErrorContext } from '@/providers/PageErrorProvider';
import { scrollTop } from '@/utils/scroll';

interface Returning {
  pageError: Error | undefined;
  setPageError: (error: Error) => void;
  resetPageError: () => void;
}

export function usePageError(): Returning {
  const context = useContext(PageErrorContext);
  if (!context) throw new Error('error contextが初期化されていません');
  const router = useRouter();

  const setPageError = useCallback((error: Error) => {
    scrollTop();
    context.setPageError(error);
  }, []);

  const resetPageError = useCallback(() => {
    context.setPageError(undefined);
  }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', resetPageError);
    return () => {
      router.events.off('routeChangeStart', resetPageError);
    };
  }, [router.events]);

  return {
    pageError: context.pageError,
    setPageError,
    resetPageError,
  };
}
