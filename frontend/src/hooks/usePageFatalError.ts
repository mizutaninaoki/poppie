import { PageFatalErrorContext } from '@/providers/PageFatalErrorProvider';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect } from 'react';

interface Returning {
  pageFatalError: Error | undefined;
  setPageFatalError: (error: Error) => void;
  resetPageFatalError: () => void;
}

/**
 * PageFatalError: ページ表示できないような致命的エラーメッセージ
 */
export function usePageFatalError(): Returning {
  const context = useContext(PageFatalErrorContext);
  if (!context) throw new Error('page fatal error contextが初期化されていません');
  const router = useRouter();

  const setPageFatalError = useCallback((error: Error) => {
    context.setPageFatalError(error);
  }, []);

  const resetPageFatalError = useCallback(() => {
    context.setPageFatalError(undefined);
  }, []);

  // ページ遷移開始時にリセットする
  useEffect(() => {
    router.events.on('routeChangeStart', resetPageFatalError);
    return () => {
      router.events.off('routeChangeStart', resetPageFatalError);
    };
  }, [router.events]);

  return {
    pageFatalError: context.pageFatalError,
    setPageFatalError,
    resetPageFatalError,
  };
}
