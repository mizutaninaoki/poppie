import { createContext, FC, useState } from 'react';

type PageFatalErrorContextType = {
  setPageFatalError: (error: Error | undefined) => void;
  pageFatalError: Error | undefined;
};

export const PageFatalErrorContext = createContext<PageFatalErrorContextType | undefined>(
  undefined,
);

export const PageFatalErrorProvider: FC = ({ children }) => {
  // ページ表示できないような致命的エラーメッセージ
  const [pageFatalError, setPageFatalError] = useState<Error | undefined>(undefined);

  return (
    <PageFatalErrorContext.Provider
      value={{
        setPageFatalError,
        pageFatalError,
      }}
    >
      {children}
    </PageFatalErrorContext.Provider>
  );
};
